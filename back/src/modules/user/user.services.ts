import { PrismaClient, User } from "@prisma/client";
import { hashPassword } from "../../utils/hashPassword";
import cloudinary from "../../config/cloudinaryConfig";
import { UserDTO, UserEntity } from "../../types/user.types";

const db = new PrismaClient();

interface UserData {
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
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
        const { name, email, password, profilePicture } = userData;

        const hashedPassword = await hashPassword(password);

        let profilePictureUrl = '';

        if (profilePicture) {
            const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
                folder: 'profile_pictures'
            });
            profilePictureUrl = uploadResponse.secure_url;
        }

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                profilePicture: profilePictureUrl
            }
        });

        return user;
    };

    static async updateUserProfile(id: string, data: Partial<UserDTO>) {
        const updateData: Partial<UserEntity> = {
            name: data.name,
            email: data.email
        };

        if (data.password) {
            updateData.password = await hashPassword(data.password);
        }

        if (data.profilePicture) {
            const uploadResponse = await cloudinary.uploader.upload(data.profilePicture, {
                folder: 'profile_pictures'
            });
            updateData.profilePicture = uploadResponse.secure_url;
        }

        const user = await db.user.update({
            where: { id },
            data: updateData
        });

        return user;
    };
};