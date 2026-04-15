import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "CANDIDATE" | "ADMIN";
      vn_id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "CANDIDATE" | "ADMIN";
    vn_id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "CANDIDATE" | "ADMIN";
    vn_id?: string;
  }
}
