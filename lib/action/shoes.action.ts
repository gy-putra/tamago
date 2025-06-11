"use server";

import { auth } from "@/auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export const createShoes = async (data: any) => {
  try {
    const session = await auth();

    if (!session) throw new Error("Unauthenticated");

    const {
      values: { name, price, description, stock },
      image,
    } = data;

    const shoes = await prisma.product.create({
      data: {
        image,
        name,
        price: Number(price),
        stock: Number(stock),
        description: description || "",
      },
    });

    revalidatePath("/admin");

    return { success: true, shoes };
  } catch (error) {
    return { success: false, error };
  }
};

export const getShoe = async (id: string) => {
  try {
    const shoes = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return shoes;
  } catch (error) {
    console.log(error);
  }
};

export const getAllShoes = async () => {
  try {
    const shoes = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return shoes;
  } catch (error) {
    console.log(error);
  }
};

export const updateShoes = async (id: string, data: any) => {
  try {
    const session = await auth();
    if (!session) throw new Error("Unauthenticated");

    const shoes = await prisma.product.update({
      where: {
        id,
      },
      data: {
        image: data.image,
        name: data.name,
        price: Number(data.price),
        stock: Number(data.stock),
        description: data.description,
      },
    });

    return { success: true, shoes };
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteShoes = async (id: string) => {
  try {
    const session = await auth();

    if (!session) throw new Error("Unauthenticated");

    const shoes = await prisma.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const getNewShoes = async () => {
  try {
    const shoes = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });
    return shoes;
  } catch (error) {
    console.log(error);
  }
};

export const getPricyShoes = async () => {
  try {
    const shoes = await prisma.product.findMany({
      orderBy: {
        price: "desc",
      },
      take: 1,
    });
    return shoes;
  } catch (error) {
    console.log(error);
  }
};

export const takeFourShoes = async () => {
  try {
    const shoes = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });
    return shoes;
  } catch (error) {
    console.log(error);
  }
};
