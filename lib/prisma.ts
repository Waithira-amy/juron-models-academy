// lib/prisma.ts
import { PrismaClient } from "@prisma/client/edge";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

let prismaInstance: PrismaClient | undefined;

export const getPrisma = () => {
  if (!prismaInstance) {
    const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
    
    if (!connectionString) {
      throw new Error("CRITICAL: Database connection string is missing from environment variables.");
    }
    
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool as any);
    prismaInstance = new PrismaClient({ adapter });
  }
  return prismaInstance;
};