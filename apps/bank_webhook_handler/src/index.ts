import express from "express";
import db from "@repo/db/client";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    const isNewTransaction = await db.onRampTransaction.findFirst({
      where: {
        token: paymentInformation.token,
      },
    });

    if (isNewTransaction?.status === "Processing") {
      await db.$transaction([
        db.balance.upsert({
          where: {
            userId: paymentInformation.userId,
          },
          update: {
            amount: {
              increment: Number(paymentInformation.amount),
            },
          },
          create: {
            userId: paymentInformation.userId,
            amount: BigInt(paymentInformation.amount),
            locked: 0,
          },
        }),
        db.onRampTransaction.updateMany({
          where: {
            token: paymentInformation.token,
          },
          data: {
            status: "Success",
          },
        }),
      ]);

      res.json({
        message: "Captured",
      });
    } else {
      res.status(200).json({
        message: "Invalid Transaction",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
