import NextAuth from 'next-auth';
import { prisma } from '@/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compareSync } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, //30days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials === null) {
          return null;
        }
        // Find user in the database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string, // Use the email provided by the user
          },
        });
        //Check if the user exists and the password is correct
        if (user && user.password) {
          const isValid = compareSync(
            credentials.password as string,
            user.password
          );
          // If the password is correct, return the user object
          if (isValid) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // If user not found or password is incorrect, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }) {
      //set user ID from the token
      session.user.id = token.sub as string;
      //if there is an updated, set the user name
      if (trigger === 'update') {
        session.user.name = user.name;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
