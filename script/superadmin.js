const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const postUser = async (data) => {
  try {
    const { password, ...rest } = data;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    rest.password = hash;
    const createInfo = await prisma.user.create({ data: rest });
  } catch (error) {
    console.error(error);
    throw new Error(error?.code);
  }
};

postUser({ username: "admin", password: "admin", isSuperAdmin: true });
console.log("user created...");
