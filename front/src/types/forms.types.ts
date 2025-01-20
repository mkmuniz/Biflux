export type LoginDataForm = {
    email?: string;
    password?: string;
};

export type SignUpDataForm = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePicture: string;
    termsAccepted: boolean;
};

export type ProfileDataForm = {
    id?: string;
    name?: string;
    email?: string;
    profilePicture?: string;
};

export type PasswordStrength = {
    score: number;
    feedback: string;
}

export type FormFieldProps = {
    label: string;
    name: "name" | "email";
    register: any;
    errors: any;
    required?: boolean;
}

export type ProfilePictureProps = {
    preview: string;
    fileInputRef: React.RefObject<HTMLInputElement>;
    register: any;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type SubmitButtonProps = {
    isPending: boolean,
    isDisabled?: boolean,
    children: React.ReactNode
}

export type CloseButtonProps = {
    handleOpen: VoidFunction
}