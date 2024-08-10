import { PrismaClient } from "@prisma/client";

export const dbPages = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = dbPages;
