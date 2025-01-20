import React from "react";

export const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setError: (message: string) => void,
    setSelectedFile: (file: string | null) => void,
    setPreview: (preview: string) => void
) => {
    const file = e.target.files?.[0];

    if (file) {
        if (file.size > 5000 * 1024) {
            setError('O tamanho da imagem não deve passar de 5mb');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setSelectedFile(base64String);
            setPreview(base64String);
        };
        reader.readAsDataURL(file);
    }
};
