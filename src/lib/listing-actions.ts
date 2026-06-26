"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireFarmer } from "@/lib/auth";
import { saveUploadedPhoto } from "@/lib/uploads";
import { findOrCreateVillage } from "@/lib/village";

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

export async function createListingAction(formData: FormData) {
  const user = await requireFarmer();

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
  const latitude = parseOptionalFloat(formData.get("latitude"));
  const longitude = parseOptionalFloat(formData.get("longitude"));

  const district = String(formData.get("district") ?? "").trim() || null;
  const taluka = String(formData.get("taluka") ?? "").trim() || null;
  const villageName = String(formData.get("village") ?? "").trim();
  const village = villageName
    ? await findOrCreateVillage(villageName, district, taluka)
    : null;
  const hamlet = String(formData.get("hamlet") ?? "").trim() || null;
  const contactPhone = String(formData.get("contactPhone") ?? "").trim() || null;

  const listing = await prisma.listing.create({
    data: {
      type,
      ageMonths,
      gender,
      price,
      priceNegotiable,
      vaccinated,
      ownerId: user.id,
      villageId: village?.id ?? user.villageId,
      hamlet,
      contactPhone,
      latitude: latitude ?? user.latitude,
      longitude: longitude ?? user.longitude,
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

  redirect("/dashboard");
}

export async function markSoldAction(formData: FormData) {
  const user = await requireFarmer();
  const id = parseInt(String(formData.get("id")), 10);

  await prisma.listing.updateMany({
    where: { id, ownerId: user.id },
    data: { available: false },
  });

  redirect("/dashboard");
}

export async function markAvailableAction(formData: FormData) {
  const user = await requireFarmer();
  const id = parseInt(String(formData.get("id")), 10);

  await prisma.listing.updateMany({
    where: { id, ownerId: user.id },
    data: { available: true },
  });

  redirect("/dashboard");
}

export async function deleteListingAction(formData: FormData) {
  const user = await requireFarmer();
  const id = parseInt(String(formData.get("id")), 10);

  await prisma.listing.deleteMany({
    where: { id, ownerId: user.id },
  });

  redirect("/dashboard");
}
