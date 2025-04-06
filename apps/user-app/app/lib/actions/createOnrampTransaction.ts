"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnrampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }

  const token = (Math.random() * 1000).toString();

  try {
    const res = await prisma.onRampTransaction.create({
      data: {
        provider,
        status: "Processing",
        startTime: new Date(),
        token,
        userId: session?.user?.id,
        amount: amount * 100,
      },
    });

    return {
      message: "Done",
      token: res.token,
      userId: session.user.id,
      amount: res.amount,
    };
  } catch (e) {
    console.error(e);
    return {
      message: `Error Occured : ${e}`,
    };
  }
}
