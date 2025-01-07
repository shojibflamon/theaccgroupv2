"use server";
import prisma from "../libs/db";

export const getPermission = async () => {
  try {
    const data = await prisma.permission.findMany();
    return data;
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};
