'use server'

import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";

export async function handleUpload(_: any,formData: any) {
    try {
        const file = formData.get('fileUploader');

        const fileName = file?.name;
        const fileType = file?.type;

        const binaryFile = await file.arrayBuffer();
        const fileBuffer = Buffer.from(binaryFile);

        const accessKey: any = process.env.AWS_IAM_USER_ACCESS_KEY;
        const secretKey: any = process.env.AWS_IAM_USER_SECRET_KEY;

        const s3Client = new S3({
            region: 'sa-east-1',
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey
            }
        });

        const params = {
            Bucket: 'binsight',
            Key: fileName,
            Body: fileBuffer,
            ContentType: fileType
        };

        await s3Client.send(new PutObjectCommand(params));

        return {
            status: 'success', message: `File ${fileName} uploaded successfully`
        };

    } catch (err: any) {
        console.error(err.message);
    }
}