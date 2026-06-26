import { prisma } from "@/lib/prisma";

export async function findOrCreateVillage(
  name: string,
  district?: string | null,
  taluka?: string | null,
) {
  const trimmed = name.trim();
  const existing = await prisma.village.findFirst({
    where: { name: trimmed },
  });
  if (existing) {
    if (!existing.district && district) {
      return prisma.village.update({
        where: { id: existing.id },
        data: { district, taluka: taluka ?? existing.taluka },
      });
    }
    return existing;
  }
  return prisma.village.create({
    data: { name: trimmed, district: district || null, taluka: taluka || null },
  });
}
