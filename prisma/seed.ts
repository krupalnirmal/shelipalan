import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const phone = "9999999999";
  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing) {
    console.log("Admin आधीच आहे, फोन:", phone);
    return;
  }

  const password = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: { name: "Admin", phone, password, role: "ADMIN" },
  });

  console.log("Admin तयार झाला -> फोन:", phone, "| पासवर्ड: admin123");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
