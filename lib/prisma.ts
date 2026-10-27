import { PrismaClient } from "@prisma/client/edge";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

let prismaInstance: PrismaClient | undefined;

export const getPrisma = (connectionString?: string) => {
  if (!prismaInstance) {
    // Fallback to process.env if not passed, ensuring no backticks are used
    const url = connectionString || process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
    
    if (!url || url === "undefined") {
      throw new Error("CRITICAL: Database URL is missing or evaluating to the string 'undefined'.");
    }
    
    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaNeon(pool as any);
    prismaInstance = new PrismaClient({ adapter });
  }
  return prismaInstance;
};

// Proxy to ensure other API routes do not break during the build
const prisma = new Proxy({} as PrismaClient, {
  get: (_, prop) => {
    return getPrisma()[prop as keyof PrismaClient];
  },
});

export default prisma;