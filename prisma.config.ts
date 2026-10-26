import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.POSTGRES_PRISMA_URL || "postgresql://placeholder:placeholder@localhost:5432/db",
  },
});