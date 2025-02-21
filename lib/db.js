// import { PrismaClient } from "@prisma/client";
// import "server-only";

// if (typeof global === "undefined") {
//   var global = globalThis;
// }

// let cachedPrisma;

// if (typeof global.cachedPrisma === "undefined") {
//   global.cachedPrisma = new PrismaClient();
// }

// cachedPrisma = global.cachedPrisma;

// let prisma;

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   prisma = cachedPrisma;
// }

// export const db = prisma;

import "server-only";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";

import ws from "ws";
neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

// Type definitions
// declare global {
//   var prisma: PrismaClient | undefined
// }

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export const db = prisma;
