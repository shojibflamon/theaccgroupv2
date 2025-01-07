"use server";
import prisma from "../libs/db";
export const getProductCategory = async (parm = {}) => {
  const { q = "" } = parm;
  try {
    const data = await prisma.category.findMany({
      where: {
        OR: [{ title: { contains: q, mode: "insensitive" } }],
      },
      orderBy: {
        weight_value: "desc",
      },
    });
    return data;
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const postProductCategory = async (data) => {
  try {
    const createInfo = await prisma.category.create({ data });
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const updateProductCategory = async (data) => {
  const { id, ...rest } = data;
  try {
    const updateInfo = await prisma.category.update({
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

export const deleteProductCategory = async (id) => {
  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    throw error?.code || "Unknown";
  }
};
