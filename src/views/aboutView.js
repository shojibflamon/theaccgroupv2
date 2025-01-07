"use server";
import prisma from "../libs/db";

export const getAboutHeroSection = async () => {
  try {
    const data = await prisma.about.findUnique({
      where: {
        page: "about",
        section: "hero",
      },
    });
    return data;
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const uploadAboutHeroSection = async (data) => {
  try {
    const _ = await prisma.about.findUnique({
      where: {
        page: data.page,
        section: data.section,
      },
    });
    if (_) {
      const updateInfo = await prisma.about.update({
        where: {
          page: data.page,
          section: data.section,
        },
        data: data,
      });
    } else {
      const createInfo = await prisma.about.create({ data });
    }
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const getAboutPromoSection = async () => {
  try {
    const data = await prisma.promo.findUnique({
      where: {
        page: "about",
        section: "promo",
      },
    });
  
    return data;
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const uploadAboutPromoSection = async (data) => {
  try {
    const _ = await prisma.promo.findUnique({
      where: {
        page: data.page,
        section: data.section,
      },
    });
    if (_) {
      const updateInfo = await prisma.promo.update({
        where: {
          page: data.page,
          section: data.section,
        },
        data: data,
      });
    } else {
      const createInfo = await prisma.promo.create({ data });
    }
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};
