"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { findOrCreateVillage } from "@/lib/village";
import { saveUploadedPhoto } from "@/lib/uploads";

function parseOptionalFloat(value: FormDataEntryValue | null) {
  if (!value) return null;
  const n = parseFloat(String(value));
  return Number.isNaN(n) ? null : n;
}

function parseOptionalInt(value: FormDataEntryValue | null) {
  if (!value) return null;
  const n = parseInt(String(value), 10);
  return Number.isNaN(n) ? null : n;
}

export async function assistedEntryAction(formData: FormData) {
  await requireAdmin();

  const farmerName = String(formData.get("farmerName") ?? "").trim();
  const farmerPhone = String(formData.get("farmerPhone") ?? "").trim();
  const villageName = String(formData.get("farmerVillage") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();

  if (!farmerName || !farmerPhone || !villageName) {
    redirect("/admin/entry?error=missing");
  }

  const village = await findOrCreateVillage(villageName);

  let farmer = await prisma.user.findUnique({ where: { phone: farmerPhone } });
  if (!farmer) {
    const defaultPassword = farmerPhone.slice(-4).padStart(4, "0");
    farmer = await prisma.user.create({
      data: {
        name: farmerName,
        phone: farmerPhone,
        password: await bcrypt.hash(defaultPassword, 10),
        role: "FARMER",
        villageId: village.id,
        address: address || null,
        createdByAdmin: true,
      },
    });
  }

  const type = String(formData.get("type") ?? "PILLU") as
    | "BOKAD"
    | "SHELI"
    | "PILLU";
  const ageMonths = parseOptionalInt(formData.get("ageMonths"));
  const genderRaw = String(formData.get("gender") ?? "");
  const gender = genderRaw === "MALE" || genderRaw === "FEMALE" ? genderRaw : null;
  const price = parseOptionalFloat(formData.get("price"));
  const priceNegotiable = formData.get("priceNegotiable") === "on";
  const vaccinated = formData.get("vaccinated") === "on";
  const occasionReady = formData.get("occasionReady") === "on";

  const listingDistrict = String(formData.get("district") ?? "").trim() || null;
  const listingTaluka = String(formData.get("taluka") ?? "").trim() || null;
  const listingVillageName = String(formData.get("village") ?? "").trim();
  const listingVillage = listingVillageName
    ? await findOrCreateVillage(listingVillageName, listingDistrict, listingTaluka)
    : null;
  const hamlet = String(formData.get("hamlet") ?? "").trim() || null;
  const contactPhone =
    String(formData.get("contactPhone") ?? "").trim() || farmerPhone;

  const listing = await prisma.listing.create({
    data: {
      type,
      ageMonths,
      gender,
      price,
      priceNegotiable,
      vaccinated,
      occasionReady,
      ownerId: farmer.id,
      villageId: listingVillage?.id ?? farmer.villageId,
      hamlet,
      contactPhone,
      latitude: farmer.latitude,
      longitude: farmer.longitude,
    },
  });

  const photos = formData.getAll("photos") as File[];
  for (const photo of photos) {
    if (photo && photo.size > 0) {
      const url = await saveUploadedPhoto(photo);
      await prisma.listingPhoto.create({
        data: { url, listingId: listing.id },
      });
    }
  }

  redirect("/admin");
}

export async function adminDeleteListingAction(formData: FormData) {
  await requireAdmin();
  const id = parseInt(String(formData.get("id")), 10);
  await prisma.listing.delete({ where: { id } });
  redirect("/admin");
}
