import { PrismaClient, User } from "@prisma/client";
import { hashPassword } from "../../utils/hashPassword";

const db = new PrismaClient();

export class UserServices {
    static async getAllUsers() {
        const users: User[] = await db.user.findMany();

        return users;
    };

    static async getUserById(id: number) {
        const user = await db.user.findUnique({
            where: { id }
        });

        return user;
    };

    static async getUserByEmail(email: string) {
        const user = await db.user.findUnique({
            where: { email }
        });

        return user;
    };

    static async createUser(data: any) {
        const hashedPassword = await hashPassword(data.password);

        const user = await db.user.create({
            data: { ...data, password: hashedPassword }
        });

        return user;
    };
};