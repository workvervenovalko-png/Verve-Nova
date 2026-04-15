import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./mongodb";
import clientPromise from "./mongodb-client";
import User from "@/models/User";
import bcrypt from "bcryptjs";

console.log(">>> [AUTH_SYSTEM] lib/auth.ts LOADED");

export const authOptions: any = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("**************************************************");
        console.log(">>> [AUTH_SYSTEM] AUTHORIZE TRIGGERED");
        console.log("**************************************************");
        
        if (!credentials?.email || !credentials?.password) {
          console.log(">>> [AUTH_SYSTEM] Missing Credentials");
          throw new Error("Invalid credentials");
        }

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        console.log(`>>> [AUTH_SYSTEM] Attempting for: ${email}`);

        try {
          await dbConnect();
          console.log(">>> [AUTH_SYSTEM] DB Connected");

          const user = await User.findOne({ email });

          if (!user || !user.password) {
            console.log(`>>> [AUTH_SYSTEM] User not found: ${email}`);
            throw new Error("User not found");
          }

          console.log(`>>> [AUTH_SYSTEM] User found, comparing password...`);
          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            console.log(`>>> [AUTH_SYSTEM] Password mismatch for: ${email}`);
            throw new Error("Invalid password");
          }

          console.log(`>>> [AUTH_SYSTEM] SUCCESS: ${email}`);

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            vn_id: user.vn_id
          };
        } catch (err: any) {
          console.log(`>>> [AUTH_SYSTEM] CRITICAL ERROR:`, err.message);
          throw err;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.vn_id = user.vn_id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).vn_id = token.vn_id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/careers/auth',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
