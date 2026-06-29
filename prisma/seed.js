import 'dotenv/config';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

// ESM-safe __dirname replacement:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

// Load JSON file
const jsonPath = path.join(__dirname, "../assets/final_data.json");
const rawData = fs.readFileSync(jsonPath, "utf8");

// Remove BOM if present
const cleanData = rawData.replace(/^\ufeff/, "").trim();
const data = JSON.parse(cleanData);

// Data is inside Sheet1
const rawWatchData = data.Sheet1 || data;

// Deduplication
const uniqueModelNumbers = new Set();

const deduplicatedRawData = rawWatchData.filter((w) => {
  const modelNumKey = w["SL Number"];
  if (modelNumKey && String(modelNumKey).trim() !== "") {
    const modelNumber = String(modelNumKey).trim();
    if (uniqueModelNumbers.has(modelNumber)) return false;
    uniqueModelNumbers.add(modelNumber);
    return true;
  }
  return false;
});

// Transform data for Prisma
const transformedData = deduplicatedRawData.map((w) => {
  const imagesArray =
    (w["Image Links"] || "").toString().match(/https?:\/\/\S+/g) || [];

  const cleanPrice = (priceStr) => {
    if (!priceStr) return 0.0;
    return parseFloat(String(priceStr).replace(/,/g, "").trim()) || 0.0;
  };

  return {
    name: String(w["Name"] || "").trim(),
    price: cleanPrice(w["Price"]),
    discountedPrice: cleanPrice(w["Discounted Price"]),
    brand: String(w["Brand Name"] || "").trim(),
    modelNumber: String(w["SL Number"] || "").trim(),
    category: String(w["Category"] || "").trim().toLowerCase(),
    description: String(w["Description"] || "").trim(),
    images: imagesArray,
    inStock: 10,
  };
});

async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "FOUND" : "MISSING");

  console.log("Clearing existing database records...");

  await prisma.orderItem.deleteMany({});
  console.log("Cleared OrderItem records.");

  await prisma.order.deleteMany({});
  console.log("Cleared Order records.");

  await prisma.watch.deleteMany({});
  console.log("Cleared Watch records.");

  console.log(`Seeding ${transformedData.length} unique records...`);
  console.log(
    `Duplicates removed: ${rawWatchData.length - deduplicatedRawData.length}`
  );

  // Batch insert using createMany for performance and stability
  const BATCH_SIZE = 10;
  for (let i = 0; i < transformedData.length; i += BATCH_SIZE) {
    const batch = transformedData.slice(i, i + BATCH_SIZE);
    await prisma.watch.createMany({
      data: batch,
      skipDuplicates: true,
    });
    console.log(`Processed batch ${Math.floor(i / BATCH_SIZE) + 1} (${Math.min(i + BATCH_SIZE, transformedData.length)} / ${transformedData.length})`);
    // Add a small delay to prevent overwhelming the database
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
