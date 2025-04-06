"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Authentication error while sending",
    };
  }
  try {
    const toUser = await prisma.user.findFirst({
      where: {
        email: to,
      },
    });
    if (!toUser) {
      return {
        message: "User not found",
      };
    }
    await prisma.$transaction(async (tx: any) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`;
      const fromBalance = await tx.balance.findUnique({
        where: { userId: from },
      });
      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await tx.balance.update({
        where: { userId: from },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });
      await tx.p2pTransfer.create({
        data: {
          fromUserId: from,
          toUserId: toUser.id,
          amount,
          timeStamp: new Date(),
        },
      });
    });

    return {
      message: "Transfer Success",
    };
  } catch (err) {
    return { message: `Error Occured ${err}` };
  } finally {
    await prisma.$disconnect();
  }
}
