import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "./db";
import { Users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }
        try {
          const db = await connectDB();
          const user = await db.select().from(Users).where(eq(Users.email, credentials?.email))
          if (!user) {
            throw new Error("No Account Found With This Email")
          }
          const isPasswordCorrect = await bcrypt.compare(credentials?.password, user[0].password)
          if (!isPasswordCorrect) {
            throw new Error("Invalid Password")
          }
          return {
            id: user[0].id.toString(),
            email: user[0].email,
          }
        } catch (error: any) {
          throw new Error(error)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as Number
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET
}