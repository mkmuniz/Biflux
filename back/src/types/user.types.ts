export interface UserDTO {
    name?: string;
    email?: string;
    profilePicture?: string;
    password?: string;
}

export interface UserEntity {
    name?: string;
    email?: string;
    profilePicture?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
