"use server";
import { authOptions } from "@/libs/authOptions";
import prisma from "../libs/db";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

export const getUser = async (parm = {}) => {
  const { q = "" } = parm;
  try {
    const data = await prisma.user.findMany({
      include: {
        role: true,
        UserPermission: true,
      },
      where: {
        OR: [
          {
            username: { contains: q, mode: "insensitive" },
          },
          { name: { contains: q, mode: "insensitive" } },
          { phone: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
        ],
      },
    });
    return data;
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const postUser = async (data) => {
  try {
    const { password, permission, category, ...rest } = data;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    rest.password = hash;
    const createInfo = await prisma.user.create({ data: rest });

    if (permission.filter((i) => i !== null)?.length) {
      await prisma.userPermission.createMany({
        data: permission
          .filter((i) => i !== null)
          .map((permissionId) => ({
            userId: createInfo.id,
            permissionId,
          })),
      });
    }
    if (category.filter((i) => i !== null).length) {
      await prisma.userPermission.createMany({
        data: category
          .filter((i) => i !== null)
          .map((categoryId) => ({
            userId: createInfo.id,
            categoryId,
          })),
      });
    }
  } catch (error) {
    // console.error(error);
    throw error?.code || "Unknown";
  }
};

export const updateUser = async (data) => {
  const { id, permission = [], category = [], password, ...rest } = data;
  try {
    await prisma.userPermission.deleteMany({
      where: {
        userId: id,
      },
    });
    if (permission.filter((i) => i !== null)?.length) {
      await prisma.userPermission.createMany({
        data: permission
          .filter((i) => i !== null)
          .map((permissionId) => ({ userId: id, permissionId })),
      });
    }
    if (category.filter((i) => i !== null)?.length) {
      await prisma.userPermission.createMany({
        data: category
          .filter((i) => i !== null)
          .map((categoryId) => ({ userId: id, categoryId })),
      });
    }
    await prisma.rolePermission.deleteMany({
      where: {
        roleId: id,
      },
    });
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      rest.password = hash;
    }
    const updateInfo = await prisma.user.update({
      where: {
        id,
      },
      data: rest,
    });
  } catch (error) {
    // console.error(error, 555);
    throw error?.code || "Unknown";
  }
};

export const deleteUser = async (id) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    // console.error(error, 555);
    throw error?.code || "Unknown";
  }
};

export const loginUser = async (username, password) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    const match = await bcrypt.compare(password, user.password);
    if (!match || !user.isActive) {
      throw "wrong attempt";
    }
    delete user?.password;
    return user;
  } catch (error) {
    // console.log(error);
    throw error?.code || "Unknown";
  }
};

export const getUserByID = async () => {
  try {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
      where: {
        id: session?.token?.id,
      },
      include: {
        role: {
          include: {
            RolePermission: {
              include: {
                permission: true,
              },
            },
          },
        },
        UserPermission: {
          include: {
            permission: true,
          },
        },
      },
    });
    delete user?.password;
    return user;
  } catch (error) {
    // console.log(error);
    throw error?.code || "Unknown";
  }
};

export const changePassword = async ({ current_password, new_password }) => {
  try {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
      where: {
        id: session?.token?.id,
      },
    });
    const match = await bcrypt.compare(current_password, user.password);
    if (!match || !user.isActive) {
      // console.log(555);
      throw "Current Password doesn't match!";
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(new_password, salt);

      await prisma.user.update({
        where: {
          id: session?.token?.id,
        },
        data: { password: hash },
      });
    }
  } catch (error) {
    // console.log(error);
    throw error?.code || error || "Unknown";
  }
};
