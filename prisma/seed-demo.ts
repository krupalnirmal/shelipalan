import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

// Rahata taluka (Ahilyanagar district) village names
const VILLAGES = [
  "आडगाव बु.", "आडगाव खु.", "आस्तगाव", "बाभळेश्वर", "भगवतीपूर",
  "चांदापूर", "चितळी", "दाढ बु.", "धनगरवाडी", "दोरहळे",
  "दुर्गापूर", "दहिगाव कोऱ्हाळे", "एकरुखे", "गोगलगाव", "हनमंतगाव",
  "हसनापूर", "जळगाव", "खडकेवाके", "कानकुरी", "केळवड",
  "कोऱ्हाळे", "कोल्हार बुद्रुक", "लोहगाव", "लोणी बु.", "लोणी खु.",
  "मामदापूर", "नांदुर बु.", "नांदुरखी बु.", "नांदुरखी खु.", "निघोज",
  "निमगाव कोऱ्हाळे", "पाथरे बुद्रुक", "पिंपळस", "पिंप्री लोकाई",
  "पिंप्री निर्मळ", "पिंपळवाडी", "पुणतांबे", "राजुरी", "रामपूरवाडी",
  "रांजणगाव खुर्द", "रांजणखोळ", "रुई", "साकुरी", "सावळवीहीर बु.",
  "सावळवीहीर खु.", "शिंगवे", "शिर्डी", "तिसगाव", "वाकडी", "वाळकी",
];

const FIRST_NAMES = [
  "संतोष", "विठ्ठल", "बाळासाहेब", "अशोक", "गणेश", "सुनिल", "राजेंद्र",
  "दत्तात्रय", "भाऊसाहेब", "नामदेव", "शिवाजी", "रामदास", "अनिल",
  "सुरेश", "विजय", "प्रकाश", "संजय", "मधुकर", "बबन", "हनुमंत",
  "तुकाराम", "पांडुरंग", "यशवंत", "कैलास", "गोरख", "रोहिदास",
  "महादेव", "किसन", "रघुनाथ", "देवराम",
];

const LAST_NAMES = [
  "पाटील", "शिंदे", "जाधव", "गायकवाड", "साळुंके", "चव्हाण", "मोरे",
  "कदम", "वाघ", "निर्मळ", "भोसले", "गिते", "औटी", "फटांगरे",
  "ससाणे", "बोरुडे", "ठुबे", "नाईकवडे",
];

const BREEDS = ["उस्मानाबादी", "संगमनेरी", "बीटल", "सिरोही", "बोअर", "स्थानिक जात"];

const PHOTOS_BY_TYPE: Record<"BOKAD" | "SHELI" | "PILLU", string[]> = {
  BOKAD: ["/images/seed/bokad-1.jpg", "/images/seed/bokad-2.jpg", "/images/seed/bokad-3.jpg", "/images/seed/bokad-4.jpg"],
  SHELI: ["/images/seed/sheli-1.jpg", "/images/seed/sheli-2.jpg", "/images/seed/sheli-3.jpg", "/images/seed/sheli-4.jpg"],
  PILLU: ["/images/seed/pillu-1.jpg", "/images/seed/pillu-2.jpg", "/images/seed/pillu-3.jpg", "/images/seed/pillu-4.jpg"],
};

// Rough centre of Rahata taluka (near Rahata/Shirdi) - jittered per farmer
const BASE_LAT = 19.7;
const BASE_LON = 74.48;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 1) {
  const n = Math.random() * (max - min) + min;
  return parseFloat(n.toFixed(decimals));
}

async function getOrCreateVillage(name: string) {
  const existing = await prisma.village.findFirst({ where: { name } });
  if (existing) return existing;
  return prisma.village.create({ data: { name } });
}

function listingForType(type: "BOKAD" | "SHELI" | "PILLU") {
  if (type === "PILLU") {
    const ageMonths = randInt(1, 5);
    return {
      ageMonths,
      weightKg: randFloat(4, 12),
      gender: (Math.random() < 0.5 ? "MALE" : "FEMALE") as "MALE" | "FEMALE",
      birthDate: new Date(Date.now() - ageMonths * 30 * 24 * 60 * 60 * 1000),
      price: randInt(1500, 4000),
    };
  }
  if (type === "SHELI") {
    return {
      ageMonths: randInt(12, 48),
      weightKg: randFloat(25, 45),
      gender: "FEMALE" as const,
      birthDate: null,
      price: randInt(6000, 12000),
    };
  }
  return {
    ageMonths: randInt(10, 36),
    weightKg: randFloat(30, 65),
    gender: "MALE" as const,
    birthDate: null,
    price: randInt(8000, 20000),
  };
}

async function main() {
  const password = await bcrypt.hash("farmer123", 10);
  const villageCache = new Map<string, { id: number }>();

  let createdFarmers = 0;
  let createdListings = 0;

  for (let i = 1; i <= 50; i++) {
    const phone = String(9000000000 + i);
    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) continue;

    const villageName = pick(VILLAGES);
    let village = villageCache.get(villageName);
    if (!village) {
      village = await getOrCreateVillage(villageName);
      villageCache.set(villageName, village);
    }

    const latitude = BASE_LAT + randFloat(-0.12, 0.12, 4);
    const longitude = BASE_LON + randFloat(-0.12, 0.12, 4);

    const farmer = await prisma.user.create({
      data: {
        name: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
        phone,
        password,
        role: "FARMER",
        villageId: village.id,
        latitude,
        longitude,
      },
    });
    createdFarmers++;

    const listingCount = randInt(1, 3);
    for (let j = 0; j < listingCount; j++) {
      const type = pick(["BOKAD", "SHELI", "PILLU"] as const);
      const details = listingForType(type);
      const listing = await prisma.listing.create({
        data: {
          type,
          breed: pick(BREEDS),
          ageMonths: details.ageMonths,
          weightKg: details.weightKg,
          gender: details.gender,
          birthDate: details.birthDate,
          price: details.price,
          priceNegotiable: Math.random() < 0.7,
          vaccinated: Math.random() < 0.5,
          available: Math.random() < 0.85,
          ownerId: farmer.id,
          villageId: village.id,
          latitude,
          longitude,
        },
      });
      await prisma.listingPhoto.create({
        data: { url: pick(PHOTOS_BY_TYPE[type]), listingId: listing.id },
      });
      createdListings++;
    }
  }

  console.log(`तयार झालं -> शेतकरी: ${createdFarmers}, एंट्री: ${createdListings}`);
  console.log(`सगळ्या डेमो शेतकऱ्यांचा पासवर्ड: farmer123 (फोन नंबर: 9000000001 ते 9000000050)`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
