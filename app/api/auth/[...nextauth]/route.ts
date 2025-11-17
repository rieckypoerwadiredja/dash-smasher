import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import MicrosoftProvider from "next-auth/providers/azure-ad";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      authorization: { params: { allow_signup: "true" } },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      authorization: { params: { prompt: "select_account" } },
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_ID ?? "",
      clientSecret: process.env.MICROSOFT_SECRET ?? "",
      tenantId: process.env.MICROSOFT_TENANT_ID ?? "common",
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24, // exp in 1 day after no open website
  },
  signIn: "/login",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
