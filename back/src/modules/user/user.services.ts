import { PrismaClient, User } from "@prisma/client";
import { hashPassword } from "../../utils/hashPassword";

const db = new PrismaClient();

interface UserData {
    name: string;
    email: string;
    password: string;
}

export class UserServices {
    static async getAllUsers() {
        const users: User[] = await db.user.findMany();

        return users;
    };

    static async getUserById(id: string) {
        const user = await db.user.findUnique({
            where: {
                id
            }
        });

        return user;
    };

    static async getUserByEmail(email: string) {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });

        return user;
    };

    static async createUser(userData: UserData) {
        const { name, email, password } = userData;

        const hashedPassword = await hashPassword(password);

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return user;
    };
};