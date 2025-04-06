"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function getDashboardData(usage: string) {
  const session = await getServerSession(authOptions);
  const user = session.user.id;

  try {
    const balance = await prisma.balance.findFirst({
      where: {
        userId: user,
      },
    });
    const limitTransaction = usage === "dashboard" ? 10 : 100;
    const transaction = await prisma.p2pTransfer.findMany({
      where: {
        OR: [{ fromUserId: user }, { toUserId: user }],
      },
      include: {
        fromUser: {
          select: {
            email: true,
          },
        },
        toUser: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        timeStamp: "desc",
      },
      take: limitTransaction,
    });

    const spendLastSevenDays = async () => {
      const lastSevenDays = new Date();
      lastSevenDays.setDate(lastSevenDays.getDate() - 7);

      const sevenDaysTransactions = await prisma.p2pTransfer.findMany({
        where: {
          fromUserId: user,
          timeStamp: {
            gte: lastSevenDays,
          },
        },
        select: {
          amount: true,
          timeStamp: true,
        },
      });

      const dateArray = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        // return date.toISOString().split("T")[0];
        return `${day}-${month}-${year}`;
      }).reverse();

      const dailySummaries = dateArray.map((date) => {
        const dayTransaction = sevenDaysTransactions.filter((tx) =>
          tx.timeStamp.toISOString().startsWith(
            // date ? date : ""
            new Date(date.split("-").reverse().join("-"))
              .toISOString()
              .split("T")[0] || ""
          )
        );
        const totalAmount = dayTransaction.reduce(
          (sum, tx) => sum + tx.amount / 100,
          0
        );

        return {
          date,
          Total_Transactions: totalAmount,
        };
      });
      return dailySummaries;
    };

    const receivedLastSevenDays = async () => {
      const lastSevenDays = new Date();
      lastSevenDays.setDate(lastSevenDays.getDate() - 7);

      const sevenDaysTransaction = await prisma.p2pTransfer.findMany({
        where: {
          toUserId: user,
          timeStamp: {
            gte: lastSevenDays,
          },
        },
        select: {
          amount: true,
          timeStamp: true,
        },
      });

      // generating the seven dates in an array and reversing the dates as the latest date should be at the end

      const dateArray = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
      }).reverse();
      const dailySummaries = dateArray.map((date) => {
        const dayReceived = sevenDaysTransaction.filter((tx) =>
          tx.timeStamp
            .toISOString()
            .startsWith(
              new Date(date.split("-").reverse().join("-"))
                .toISOString()
                .split("T")[0] || ""
            )
        );
        const totalAmount = dayReceived.reduce(
          (sum, tx) => sum + tx.amount / 100,
          0
        );

        return {
          date,
          Total_Transactions: totalAmount,
        };
      });
      return dailySummaries;
    };

    return {
      balance: balance?.amount,
      transactions: transaction,
      spendSevenDaysTransactions: await spendLastSevenDays(),
      receivedSevenDaysTransaction: await receivedLastSevenDays(),
    };
  } catch (err) {
    console.log("Error Occured while fetching the data for database", err);
    return { error: "Something went wrong." };
  } finally {
    await prisma.$disconnect();
  }
}
