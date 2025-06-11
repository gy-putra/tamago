import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email dan password harus diisi");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || user.password !== password) {
          return null;
        }

        const { password: _password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
});
