"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth";

export async function getFindUser(searchName: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      message: "Authentication Error",
    };
  }

  try {
    const user = await prisma.user.findMany({
      where: {
        email: {
          startsWith: searchName,
        },
      },
      select: {
        email: true,
        id: true,
      },
    });

    return { users: user };
  } catch (err) {
    console.log("Error Occured in finding user email", err);
    return {
      message: "Error Occured",
    };
  } finally {
    await prisma.$disconnect();
  }
}
