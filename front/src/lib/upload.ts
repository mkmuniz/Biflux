'use server'

import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";

export async function handleUpload(userId: string, formData: FormData) {
    try {
        const response = await fetch('http://localhost:4000/billet', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: `HTTP error! status: ${response.status}`
            }));
            throw new Error(errorData.message || 'Error uploading file');
        }

        const data = await response.json();

        return {
            status: 'success',
            message: 'File uploaded successfully',
            data: data
        };
    } catch (error: any) {
        console.error('Upload error:', error);
        return {
            status: 'error',
            message: error.message || 'Failed to upload file'
        };
    }
}
