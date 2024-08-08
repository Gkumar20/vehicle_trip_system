import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";


const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const githubClientId = process.env.GITHUB_CLIENT_ID as string;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET as string;

const handler = NextAuth({
  adapter: PrismaAdapter({}),
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    GithubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "hello@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = {
          id : "34",
          name:"sapna",
          email:"sapna@gmail.com",
          password:"12345"
        }

        const { email, password } = credentials as { email: string; password: string };

        

        if (user) {
          if (user.password === password && user.email === email) {
            return user;
          } else {
            throw new Error("Invalid credentials");
          }
        } else {
          throw new Error("User not found");
        }
      }
    }),
  ],
  session: {
    strategy: "jwt"
  }
});

export { handler as GET, handler as POST };
