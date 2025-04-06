"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { redirect } from "next/navigation";

import bcrypt from "bcrypt";
import { SignupSchema } from "../../../schema";

type CredentialsType = {
  email: string;
  password: string;
  phoneNumber: string;
  name: string;
};

export async function CreateUser(credentials: CredentialsType) {
  // if user is authenticated will be pushed to the dashboard
  const parsedValue = SignupSchema.safeParse(credentials);
  if (!parsedValue.success) {
    throw new Error("Invalid credentials");
  }
  const { name, email, phoneNumber, password } = parsedValue.data;
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!oldUser?.id) {
      const userCreation = await prisma.user.create({
        data: {
          name,
          email,
          phoneNumber,
          password: hashedPassword,
        },
      });

      // adding 200USD per person on account creation
      if (userCreation) {
        await prisma.balance.create({
          data: {
            userId: userCreation.id,
            amount: 20000,
            locked: 0,
          },
        });
      }
      return { success: true, userId: userCreation.id };
    } else {
      return { message: "User exist" };
    }
  } catch (e) {
    console.log("Error catched from signup", e);
    return { message: `${e}` };
  }
}
