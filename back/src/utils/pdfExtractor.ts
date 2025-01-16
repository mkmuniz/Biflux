import pdf from 'pdf-parse';
import { Consume } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ExtractedData {
    clientNumber: string;
    month: string;
    consumes: Omit<Consume, 'id' | 'billetId' | 'createdAt' | 'updatedAt'>[];
}

interface ConsumeData {
    type: string;
    quantity: number | null;
    value: number;
}

const VALID_CONSUME_TYPES = [
    'Energia Elétrica',
    'Energia SCEE s/ ICMS',
    'Energia Compensada GD I',
    'Contrib Ilum Publica Municipal'
] as const;

export class PdfDataExtractor {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        this.genAI = new GoogleGenerativeAI(String(process.env.GEMINI_AI_API_KEY));
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    }

    private cleanJsonResponse(text: string): string {
        try {
            text = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();

            text = text.replace(/([{,]\s*)([a-zA-ZÀ-ÿ\u00f1\u00d1][a-zA-ZÀ-ÿ\u00f1\u00d1\s]*?):/g, '$1"$2":');

            text = text.replace(/'([^']*?)'/g, '"$1"');

            text = text.replace(/:\s*(-?\d+),(\d+)/g, ': $1.$2');

            text = text.replace(/\s+/g, ' ');

            const parsed = JSON.parse(text);
            return JSON.stringify(parsed, null, 2);
        } catch (error) {
            console.error('Erro ao limpar resposta JSON:', error);
            console.error('Texto que causou o erro:', text);
            throw new Error('Falha ao processar resposta do modelo. Por favor, tente novamente.');
        }
    }

    private normalizeConsumes(consumes: ConsumeData[]): ConsumeData[] {
        return consumes.map(consume => {
            const validType = VALID_CONSUME_TYPES.find(type =>
                consume.type.toLowerCase().includes(type.toLowerCase())
            ) || consume.type;

            return {
                type: validType,
                quantity: consume.type.includes('Ilum Publica') ? null : consume.quantity,
                value: Number(consume.value.toFixed(2))
            };
        });
    }

    async extractData(buffer: Buffer): Promise<ExtractedData> {
        try {
            const data = await pdf(buffer);
            const text = data.text;

            const prompt = `Você é um assistente especializado em extrair dados de boletos de energia elétrica.
Extraia as seguintes informações deste boleto e retorne APENAS o JSON, sem nenhum texto adicional ou formatação markdown:

1. Número do Cliente (10 dígitos)
2. Mês de referência (formato: MÊS/ANO)
3. Consumos (use exatamente estes nomes):
   - Energia Elétrica: quantidade em kWh e valor em R$
   - Energia SCEE s/ ICMS: quantidade em kWh e valor em R$
   - Energia Compensada GD I: quantidade em kWh e valor em R$
   - Contrib Ilum Publica Municipal: apenas valor em R$

Se alguma das informações não for encontrada, como o quantity e value, retorne o valor 0.

Texto do boleto:
${text}

Use exatamente este formato de resposta, sem adicionar nada mais:
{
    "clientNumber": "string",
    "month": "string",
    "consumes": [
        {
            "type": "string",
            "quantity": number,
            "value": number
        }
    ]
}`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const cleanedResponse = this.cleanJsonResponse(response.text());

            const extractedData = JSON.parse(cleanedResponse);

            const normalizedConsumes = this.normalizeConsumes(extractedData.consumes);

            return {
                clientNumber: extractedData.clientNumber,
                month: extractedData.month,
                consumes: normalizedConsumes
            };
        } catch (error) {
            console.error('Erro ao processar o PDF:', error);
            throw new Error('Falha ao extrair dados do PDF. Por favor, tente novamente.');
        }
    }
}
