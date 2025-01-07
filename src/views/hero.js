"use server";
import prisma from "../libs/db";
export const manageHeroImageView = async (data) => {
  try {
    const _ = await prisma.landing.findUnique({
      where: {
        page: data.page,
        section: data.section,
      },
    });
    if (_) {
      await prisma.landing.update({
        where: {
          page: data.page,
          section: data.section,
        },
        data: data,
      });
    } else {
      await prisma.landing.create({ data: data });
    }
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const getLandingImages = async () => {
  try {
    const data = await prisma.landing.findUnique({
      where: {
        page: "landing",
        section: "hero",
      },
    });
    return data;
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};
