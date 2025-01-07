"use server";
import prisma from "../libs/db";

export const getColors = async (parm = {}) => {
  const { q = "" } = parm;
  try {
    const data = await prisma.color.findMany({
      where: {
        OR: [{ title: { contains: q, mode: "insensitive" } }],
      },
      include: { ProductColor: true},
    });
    return data;
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const postColor = async (data) => {
  try {
    const createInfo = await prisma.color.create({ data });
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const updateColor = async (data) => {
  const { id, ...rest } = data;
  try {
    const updateInfo = await prisma.color.update({
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

export const deleteColor = async (id) => {
  try {
    await prisma.color.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};
