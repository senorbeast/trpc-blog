import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();
// If prismaclient already running use that

//  For dev mode, uses same primsa instance
if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}
