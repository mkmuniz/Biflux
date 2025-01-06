import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "../../db";
import { extractPdfData } from '../../services/pdfExtractor';

const accessKeyId = String(process.env.AWS_ACCESS_KEY_ID);
const secretAccessKey = String(process.env.AWS_SECRET_ACCESS_KEY);
const region = String(process.env.S3_REGION);
const Bucket = String(process.env.S3_BUCKET);

export class BilletServices {
    static async getAllBilletsByUserId(userId: string) {
        const billets = await db.billet.findMany({
            where: {
                userId: userId
            },
            include: {
                consumes: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return billets;
    };

    static async uploadBillet(file: Express.Multer.File, userId: string) {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const uniqueFileName = `${userId}_${Date.now()}.${fileExtension}`;

            const s3 = new S3Client({
                region,
                credentials: {
                    accessKeyId,
                    secretAccessKey
                }
            });

            const params = {
                Bucket,
                Key: uniqueFileName,
                Body: file.buffer,
                ContentType: file.mimetype
            };

            const command = new PutObjectCommand(params);
            await s3.send(command);

            const filePath = `https://${Bucket}.s3.${region}.amazonaws.com/${uniqueFileName}`;

            const extractedData = await extractPdfData(file.buffer);

            const billet = await db.billet.create({
                data: {
                    fileName: file.originalname,
                    filePath: filePath,
                    userId: userId,
                    clientNumber: extractedData.clientNumber,
                    month: extractedData.month,
                    consumes: {
                        create: extractedData.consumes
                    }
                },
                include: {
                    consumes: true
                }
            });

            return { 
                status: 'success',
                message: 'PDF processado com sucesso',
                data: billet
            };
        } catch (error: any) {
            console.error('Error details:', error);
            throw new Error('Failed to process PDF');
        }
    };

    static async getSignedDownloadUrl(fileName: string) {
        try {
            const s3 = new S3Client({
                region,
                credentials: {
                    accessKeyId,
                    secretAccessKey
                }
            });

            const command = new GetObjectCommand({
                Bucket,
                Key: fileName,
            });

            const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
            return signedUrl;
        } catch (error) {
            console.error('Error generating signed URL:', error);
            throw new Error('Failed to generate download URL');
        }
    }
}