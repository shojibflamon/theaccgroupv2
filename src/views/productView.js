"use server";
import prisma from "../libs/db";

export const getProduct = async (parm = {}) => {
  const { q = "", ...rest } = parm;
  try {
    const data = await prisma.product.findMany({
      where: {
        ...rest,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { model: { contains: q, mode: "insensitive" } },
          { slug: { contains: q, mode: "insensitive" } },
        ],
      },
      include: {
        category: true,
        FeatureProduct: true,
      },
      orderBy: {
        weight_value: "desc",
      },
    });
    return data;
  } catch (error) {
    throw error?.code || "Unknown";
  }
};

export const getProductByID = async (id) => {
  try {
    const data = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        ProductColor: {
          include: {
            color: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const data = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        ProductColor: {
          include: {
            color: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const postProduct = async (data) => {
  const { color_varients, ...rest } = data;
  try {
    const createInfo = await prisma.product.create({ data: rest });
    if (color_varients.length) {
      await prisma.productColor.createMany({
        data: color_varients.map((color) => ({
          productId: createInfo.id,
          colorId: color.id,
        })),
      });
    }
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const updateProduct = async (data) => {
  const { id, color_varients, ...rest } = data;
  try {
    await prisma.productColor.deleteMany({
      where: {
        productId: id,
      },
    });
    if (color_varients?.length) {
      await prisma.productColor.createMany({
        data: color_varients.map((color) => ({
          productId: id,
          colorId: color.id,
        })),
      });
    }
    const updateInfo = await prisma.product.update({
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

export const deleteProduct = async (id) => {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

/**
 *
 * Feature Product
 */

export const getFeatureProduct = async () => {
  try {
    const data = await prisma.featureProduct.findMany({
      include: {
        product: { include: { category: true } },
      },
    });
    return data;
  } catch (error) {
    // console.error(error);
    throw error?.code || "Error: Unknown";
  }
};

export const postFeatureProduct = async (data) => {
  try {
    await prisma.featureProduct.deleteMany({});
    if (data.length) {
      await prisma.featureProduct.createMany({
        data,
      });
    }
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};
