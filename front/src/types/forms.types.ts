export type LoginData = {
    email?: string;
    password?: string;
};

export type SignUpData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePicture: string;
    termsAccepted: boolean;
};

export type ProfileData = {
    id?: string;
    name?: string;
    email?: string;
    profilePicture?: string;
};