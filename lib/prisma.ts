import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Next.js sometimes evaluates files during the static build phase.
// Providing a dummy fallback prevents the compiler from crashing if variables load late.
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/dummy_db";

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool as any);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;