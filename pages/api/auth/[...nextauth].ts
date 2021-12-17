import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Custom SignIn",
      id: "personal",
      authorize: async (cred) => {
        return {};
      },
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: { secret: process.env.SECRET },
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: async ({ session }) => {
      return session;
    },
  },
});
