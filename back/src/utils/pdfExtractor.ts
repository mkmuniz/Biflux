import pdf from 'pdf-parse';
import { Consume } from '@prisma/client';

interface ExtractedData {
    clientNumber: string;
    month: string;
    consumes: Omit<Consume, 'id' | 'billetId' | 'createdAt' | 'updatedAt'>[];
}

export class PdfDataExtractor {
    private text: string = '';

    async extractData(buffer: Buffer): Promise<ExtractedData> {
        const data = await pdf(buffer);
        this.text = data.text;

        return {
            clientNumber: this.extractClientNumber(),
            month: this.extractMonth(),
            consumes: this.extractConsumes(),
        };
    }

    private extractClientNumber(): string {
        const clientNumberRegex = /Nº DA INSTALAÇÃO\s*(\d{10})/;
        const match = this.text.match(clientNumberRegex);
        return match ? match[1] : '';
    }

    private extractMonth(): string {
        const monthRegex = /(\w*\/\d{4})/;
        const match = this.text.match(monthRegex);
        return match ? match[1].trim() : '';
    }

    private extractConsumes(): Omit<Consume, 'id' | 'billetId' | 'createdAt' | 'updatedAt'>[] {
        const consumes: Omit<Consume, 'id' | 'billetId' | 'createdAt' | 'updatedAt'>[] = [];

        this.addConsume(consumes, /Energia Elétrica\s*kWh\s+(\d+)\s+[\d,]+\s+([\d,]+)/, 'Energia Elétrica');
        this.addConsume(consumes, /Energia SCEE s\/ ICMSkWh\s+(\d+)\s+[\d,]+\s+([\d,]+)/, 'Energia SCEEE s/ICMS');
        this.addConsume(consumes, /Energia compensada GD IkWh\s+(\d+)\s+[\d,]+\s+(-[\d,]+)/, 'Energia Compensada GD I');
        this.addConsume(consumes, /Contrib Ilum Publica Municipal\s+([\d,]+)/, 'Contrib Ilum Publica Municipal', true);

        return consumes;
    }

    private addConsume(
        consumes: Omit<Consume, 'id' | 'billetId' | 'createdAt' | 'updatedAt'>[],
        pattern: RegExp,
        type: string,
        isValueOnly: boolean = false
    ) {
        const match = this.text.match(pattern);

        if (match) {
            consumes.push({
                type,
                quantity: isValueOnly ? 0 : parseInt(match[1]),
                value: parseFloat(match[isValueOnly ? 1 : 2].replace(',', '.')),
            });
        }
    }
}
