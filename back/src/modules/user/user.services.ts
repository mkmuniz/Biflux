import { PrismaClient, User } from "@prisma/client";
import { hashPassword } from "../../utils/hashPassword";

const db = new PrismaClient();

interface UserData {
    name: string;
    email: string;
    password: string;
    profilePicture: string;
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

    static async updateUserProfile(id: string, userData: Partial<UserData>) {
        const updateData: any = {...userData};

        updateData.updatedAt = new Date();
        
        if (userData.password) updateData.password = await hashPassword(userData.password);

        const user = await db.user.update({
            where: {
                id
            },
            data: updateData
        });

        return user;
    };
};