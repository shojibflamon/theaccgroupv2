"use server";
import prisma from "../libs/db";

export const getRole = async (parm = {}) => {
  const { q = "" } = parm;
  try {
    const data = await prisma.role.findMany({
      where: {
        OR: [{ title: { contains: q, mode: "insensitive" } }],
      },
      include: { RolePermission: true, User: true },
    });
    return data;
  } catch (error) {
    // console.error(error, 555);
    throw error?.code || "Unknown";
  }
};

export const postRole = async (data) => {
  const { permission, category, ...rest } = data;
  try {
    const createInfo = await prisma.role.create({ data: rest });
    if (permission.filter((i) => i !== null).length) {
      await prisma.rolePermission.createMany({
        data: permission
          .filter((i) => i !== null)
          .map((permissionId) => ({
            roleId: createInfo.id,
            permissionId,
          })),
      });
    }
    if (category.filter((i) => i !== null).length) {
      await prisma.rolePermission.createMany({
        data: category
          .filter((i) => i !== null)
          .map((categoryId) => ({
            roleId: createInfo.id,
            categoryId,
          })),
      });
    }
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const updateRole = async (data) => {
  const { id, permission, category, ...rest } = data;
  try {
    await prisma.rolePermission.deleteMany({
      where: {
        roleId: id,
      },
    });
    if (permission.filter((i) => i !== null).length) {
      await prisma.rolePermission.createMany({
        data: permission
          .filter((i) => i !== null)
          .map((permissionId) => ({ roleId: id, permissionId })),
      });
    }

    if (category.filter((i) => i !== null).length) {
      await prisma.rolePermission.createMany({
        data: category
          .filter((i) => i !== null)
          .map((categoryId) => ({ roleId: id, categoryId })),
      });
    }

    const updateInfo = await prisma.role.update({
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

export const deleteRole = async (id) => {
  try {
    await prisma.role.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const getRoleByID = async (id) => {
  try {
    const role = await prisma.role.findUnique({
      include: {
        RolePermission: true,
      },
      where: {
        id,
      },
    });
    return role;
  } catch (error) {
    throw error?.code || "Unknown";
  }
};
