"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/session";
import { findOrCreateVillage } from "@/lib/village";

export async function registerAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const villageName = String(formData.get("village") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();

  if (!name || !phone || !password || !villageName) {
    redirect("/register?error=missing");
  }

  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing) {
    redirect("/register?error=phone-exists");
  }

  const village = await findOrCreateVillage(villageName);
  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      phone,
      password: hashed,
      role: "FARMER",
      villageId: village.id,
      address: address || null,
    },
  });

  await createSession({ userId: user.id, role: user.role });
  redirect("/dashboard");
}

export async function loginAction(formData: FormData) {
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    redirect("/login?error=invalid");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    redirect("/login?error=invalid");
  }

  await createSession({ userId: user.id, role: user.role });

  if (user.role === "ADMIN") redirect("/admin");
  if (user.role === "FARMER") redirect("/dashboard");
  redirect("/");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
