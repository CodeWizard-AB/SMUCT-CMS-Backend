import { betterAuth } from 'better-auth';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import 'dotenv/config';

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  }),
});
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_BASE_URL!,
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  emailVerification: {
    sendOnSignUp: true,
    async sendVerificationEmail({ user, url, token }) {
      console.log(`--- [DEV EMAIL SIMULATION] ---`);
      console.log(`Sending email to: ${user.email}`);
      console.log(`Verification URL: ${url}`);
      console.log(`Token stored in DB: ${token}`);
      console.log(`--------------------------------`);
    },
  },
});
