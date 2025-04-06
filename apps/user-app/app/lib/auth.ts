import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { SigninSchema } from "../../schema";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Enter Email",
          type: "text",
          placeholder: "8883xxxxxx6",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },

      async authorize(credentials: any, req) {
        // checking with zod for the incoming data
        const parsedValue = SigninSchema.safeParse(credentials);
        if (!parsedValue.success) {
          throw new Error("Invalid credentials");
        }
        const { email, password } = parsedValue.data;
        const existingUser = await db.user.findFirst({
          where: {
            email: email,
          },
        });

        // if existing user let him login
        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password || ""
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
      async profile(profile) {
        const existingUser = await db.user.findFirst({
          where: { email: profile.email },
        });

        let userId;

        // creating the user in db if it's a new user
        if (!existingUser?.id) {
          const userCreation = await db.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              googleId: profile.sub,
            },
          });
          profile.id = userCreation.id;
          userId = userCreation.id;

          // adding 200USD on account creation

          if (userId) {
            await db.balance.create({
              data: {
                userId: userId,
                amount: 20000,
                locked: 0,
              },
            });
          } else {
            profile.id = existingUser?.id;
          }
        } else {
          profile.id = existingUser?.id;
        }
        return {
          id: profile.id,
          googleId: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
