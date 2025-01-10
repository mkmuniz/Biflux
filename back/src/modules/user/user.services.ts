import { IUserRepository } from "./user.repository";
import { ICloudStorageService } from "../cloudinary/cloudinary.services";
import { UserDTO, UserEntity } from "../../types/user.types";
import { PasswordUtils } from "../../utils/passwordUtils";

export class UserServices {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly cloudStorageService: ICloudStorageService
    ) {}

    async getAllUsers() {
        return this.userRepository.getAll();
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findById(id);
        return user;
    }

    async createUser(userData: UserDTO) {
        const { name, email, password, profilePicture }: UserEntity = userData;

        const existingUser = await this.userRepository.findByEmail(email);
        
        if (existingUser) throw new Error("User already exists");

        const hashedPassword = await PasswordUtils.hashPassword(password);
        const profilePictureUrl = profilePicture
            ? await this.cloudStorageService.upload(profilePicture, "profile_pictures")
            : "";

        const newUser: UserEntity = {
            name,
            email,
            password: hashedPassword,
            profilePicture: profilePictureUrl,
        };

        return this.userRepository.create(newUser);
    }

    async updateUserProfile(id: string, data: Partial<UserDTO>) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) throw new Error("User profile not found");

        const updateData: Partial<UserEntity> = {};

        if (data.name) updateData.name = data.name;
        if (data.email) updateData.email = data.email;
        if (data.password) updateData.password = await PasswordUtils.hashPassword(data.password);
        if (data.profilePicture) {
            updateData.profilePicture = await this.cloudStorageService.upload(
                data.profilePicture,
                "profile_pictures"
            );
        }

        return this.userRepository.update(id, updateData);
    }
}
