import { upload } from "./request.config";

export async function handleUpload(formData: FormData) {
    return upload('billet', formData);
}
