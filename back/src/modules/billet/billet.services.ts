import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class BilletServices {
    static async getAllUsers() {
        const billets: any = await db.user.findMany();

        return billets;
    };

    static async uploadBillet() {
        const billets: any = await db.user.findMany();

        return billets;
    };
};