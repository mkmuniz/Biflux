'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export async function handleUpload(userId: string, formData: FormData) {
    try {
        const response = await fetch(`${baseUrl}billet`, {
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
