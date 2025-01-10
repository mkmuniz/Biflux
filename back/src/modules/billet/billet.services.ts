import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { db } from '../../db';
import { PdfDataExtractor } from '../../utils/pdfExtractor';

const accessKeyId = String(process.env.AWS_ACCESS_KEY_ID);
const secretAccessKey = String(process.env.AWS_SECRET_ACCESS_KEY);
const region = String(process.env.S3_REGION);
const Bucket = String(process.env.S3_BUCKET);

export class BilletServices {
    static async getAllBilletsByUserId(userId: string) {
        const existingUser = await db.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) throw new Error('User not found.');

        return db.billet.findMany({
            where: { userId },
            include: { consumes: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    static async uploadBillet(file: Express.Multer.File, userId: string) {
        const existingUser = await db.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) throw new Error('User not found.');

        const fileExtension = file.originalname.split('.').pop();
        const uniqueFileName = `${userId}_${Date.now()}.${fileExtension}`;

        const s3 = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });

        const params = {
            Bucket,
            Key: uniqueFileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        const filePath = `https://${Bucket}.s3.${region}.amazonaws.com/${uniqueFileName}`;

        const pdfExtractor = new PdfDataExtractor();
        const extractedData = await pdfExtractor.extractData(file.buffer);

        return db.billet.create({
            data: {
                fileName: file.originalname,
                filePath,
                userId,
                clientNumber: extractedData.clientNumber,
                month: extractedData.month,
                consumes: {
                    create: extractedData.consumes,
                },
            },
            include: {
                consumes: true,
            },
        });
    }

    static async getSignedDownloadUrl(fileName: string) {
        const s3 = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });

        const command = new GetObjectCommand({
            Bucket,
            Key: fileName,
        });

        return getSignedUrl(s3, command, { expiresIn: 3600 });
    }
}
