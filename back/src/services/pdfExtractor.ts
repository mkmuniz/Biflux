import pdf from 'pdf-parse';
import { Consume } from '@prisma/client';

interface ExtractedData {
    clientNumber: string;
    month: string;
    consumes: Omit<Consume, 'id' | 'billetId' | 'createdAt' | 'updatedAt'>[];
}

export async function extractPdfData(buffer: Buffer): Promise<ExtractedData> {
    const data = await pdf(buffer);
    const text = data.text;
    
    const clientNumberMatch = text.match(/No DO CLIENTE[:\s]+(\d+)/i);
    const clientNumber = clientNumberMatch ? clientNumberMatch[1] : '';

    const monthMatch = text.match(/Referente a[:\s]+([^\n]+)/i);
    const month = monthMatch ? monthMatch[1].trim() : '';

    const consumes: Omit<Consume, 'id' | 'billetId' | 'createdAt' | 'updatedAt'>[] = [];

    const energiaEletricaMatch = text.match(/Energia Elétrica[:\s]+(\d+(?:\.\d+)?)\s*kWh\s*R\$\s*(\d+(?:\.\d+)?)/i);
    if (energiaEletricaMatch) {
        consumes.push({
            type: 'Energia Elétrica',
            quantity: parseFloat(energiaEletricaMatch[1]),
            value: parseFloat(energiaEletricaMatch[2])
        });
    }

    const sceeeMatch = text.match(/Energia SCEEE s\/ICMS[:\s]+(\d+(?:\.\d+)?)\s*kWh\s*R\$\s*(\d+(?:\.\d+)?)/i);
    if (sceeeMatch) {
        consumes.push({
            type: 'Energia SCEEE s/ICMS',
            quantity: parseFloat(sceeeMatch[1]),
            value: parseFloat(sceeeMatch[2])
        });
    }

    const gdMatch = text.match(/Energia Compensada GD I[:\s]+(\d+(?:\.\d+)?)\s*kWh\s*R\$\s*(\d+(?:\.\d+)?)/i);
    if (gdMatch) {
        consumes.push({
            type: 'Energia Compensada GD I',
            quantity: parseFloat(gdMatch[1]),
            value: parseFloat(gdMatch[2])
        });
    }

    const iluminacaoMatch = text.match(/Contrib Ilum Publica Municipal[:\s]+R\$\s*(\d+(?:\.\d+)?)/i);
    if (iluminacaoMatch) {
        consumes.push({
            type: 'Contrib Ilum Publica Municipal',
            quantity: 0,
            value: parseFloat(iluminacaoMatch[1])
        });
    }

    return {
        clientNumber,
        month,
        consumes
    };
} 