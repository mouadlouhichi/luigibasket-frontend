import { faker } from "@faker-js/faker";
import { PrismaClient, ProductCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Seeding prodicts...");

    for (let i = 0; i < 5; i++) {
      const name = faker.commerce.productName();
      const description = faker.commerce.productDescription();
      const price = faker.commerce.price();
      const image = faker.image.imageUrl();
      const category = Object.values(ProductCategory)[
        faker.datatype.number({ min: 0, max: 2 })
      ] as ProductCategory;

      await prisma.product.create({
        data: {
          name,
          description,
          price,
          image,
          category,
        },
      });

      console.log(`Product ${i + 1} seeded.`);
    }

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding therapists:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
