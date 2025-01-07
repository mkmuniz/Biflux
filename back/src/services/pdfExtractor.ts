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

    const clientNumberRegex = /Nº DA INSTALAÇÃO\s*(\d{10})/;
    const clientNumberMatch = text.match(clientNumberRegex);
    const clientNumber = clientNumberMatch ? clientNumberMatch[1] : '';

    const monthRegex = /(\w*\/\d{4})/;
    const monthMatch = text.match(monthRegex);
    const month = monthMatch ? monthMatch[1].trim() : '';

    const consumes: Omit<Consume, 'id' | 'billetId' | 'createdAt' | 'updatedAt'>[] = [];

    const energiaPattern = /Energia Elétrica\s*kWh\s+(\d+)\s+[\d,]+\s+([\d,]+)/;
    const energiaMatch = text.match(energiaPattern);

    if (energiaMatch) {
        consumes.push({
            type: 'Energia Elétrica',
            quantity: parseInt(energiaMatch[1]),
            value: parseFloat(energiaMatch[2].replace(',', '.'))
        });
    }

    const sceeePattern = /Energia SCEE s\/ ICMSkWh\s+(\d+)\s+[\d,]+\s+([\d,]+)/;
    const sceeeMatch = text.match(sceeePattern);
    
    if (sceeeMatch) {
        consumes.push({
            type: 'Energia SCEEE s/ICMS',
            quantity: parseInt(sceeeMatch[1]),
            value: parseFloat(sceeeMatch[2].replace(',', '.'))
        });
    }

    const gdPattern = /Energia compensada GD IkWh\s+(\d+)\s+[\d,]+\s+(-[\d,]+)/;
    const gdMatch = text.match(gdPattern);

    if (gdMatch) {
        consumes.push({
            type: 'Energia Compensada GD I',
            quantity: parseInt(gdMatch[1]),
            value: parseFloat(gdMatch[2].replace(',', '.'))
        });
    }

    const iluminacaoPattern = /Contrib Ilum Publica Municipal\s+([\d,]+)/;
    const iluminacaoMatch = text.match(iluminacaoPattern);

    if (iluminacaoMatch) {
        consumes.push({
            type: 'Contrib Ilum Publica Municipal',
            quantity: 0,
            value: parseFloat(iluminacaoMatch[1].replace(',', '.'))
        });
    }
    
    return {
        clientNumber,
        month,
        consumes
    };
} 