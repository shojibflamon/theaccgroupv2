"use server";
import prisma from "../libs/db";

export const getStore = async (parm = {}) => {
  const { q = "" } = parm;
  try {
    const data = await prisma.store.findMany({
      where: {
        OR: [
          { outlet: { contains: q || "", mode: "insensitive" } },
          { number: { contains: q || "", mode: "insensitive" } },
          { email: { contains: q || "", mode: "insensitive" } },
          { address: { contains: q || "", mode: "insensitive" } },
        ],
      },
    });
    return data;
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const postStore = async (data) => {
  try {
    const createInfo = await prisma.store.create({ data });
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const updateStore = async (data) => {
  const { id, ...rest } = data;
  try {
    const updateInfo = await prisma.store.update({
      where: {
        id,
      },
      data: rest,
    });
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const deleteStore = async (id) => {
  try {
    await prisma.store.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};
