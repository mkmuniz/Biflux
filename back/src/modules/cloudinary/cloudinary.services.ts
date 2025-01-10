import cloudinary from "../../config/cloudinaryConfig";

export interface ICloudStorageService {
    upload(file: string, folder: string): Promise<string>;
}

export class CloudStorageService implements ICloudStorageService {
    async upload(file: string, folder: string): Promise<string> {
        const uploadResponse = await cloudinary.uploader.upload(file, { folder });
        return uploadResponse.secure_url;
    }
}
