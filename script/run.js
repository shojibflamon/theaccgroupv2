const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const permissionsData = [
  { title: "Home Banner Management", code: 100 },
  { title: "About Us Promo Management", code: 200 },
  { title: "About Us Hero Management", code: 300 },
  { title: "Store Management", code: 400 },
  { title: "Category Management", code: 500 },
  { title: "User Management", code: 600 },
  { title: "Color Management", code: 700 },
  { title: "Product Management", code: 800 },
  { title: "Role Management", code: 900 },
];

const createData = async () =>
  await Promise.all(
    permissionsData.map(async (permission) => {
      await prisma.permission.upsert({
        where: { title: permission.title },
        update: {},
        create: permission,
      });
    })
  );

try {
  createData();
  console.log("creating...");
} catch (error) {
  console.log(error);
}
