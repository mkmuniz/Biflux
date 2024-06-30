'use server'

import { APIGatewayProxyEventV2 } from "aws-lambda";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";

export async function handleUpload(_: APIGatewayProxyEventV2 | null, formData: FormData) {
    try {
        const file = formData.get('fileUploader') as File;

        if (!file) throw new Error("File not found in form data");

        const fileName = file.name;
        const fileType = file.type;

        const binaryFile = await file.arrayBuffer();
        const fileBuffer = Buffer.from(binaryFile);

        const accessKey = process.env.AWS_IAM_USER_ACCESS_KEY || '';
        const secretKey = process.env.AWS_IAM_USER_SECRET_KEY || '';

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
        
        return { status: 'error', message: err.message };
    }
}
