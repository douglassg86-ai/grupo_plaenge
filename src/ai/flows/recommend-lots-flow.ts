'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { lots } from '@/lib/wave-data';

const RecommendLotsInputSchema = z.object({
  type: z.string().describe('The type of the currently selected lot (e.g., "Padrão", "Beira Lago")'),
  area: z.number().describe('The area in square meters of the currently selected lot'),
  price: z.number().describe('The price of the currently selected lot'),
});
export type RecommendLotsInput = z.infer<typeof RecommendLotsInputSchema>;

const LotRecommendationSchema = z.object({
  lotId: z.number().describe('The unique ID of the recommended lot'),
  lotNumber: z.string().describe('The number of the lot (e.g., "11", "5")'),
  block: z.string().describe('The block the lot belongs to (e.g., "A", "B1")'),
  area: z.number().describe('The area of the lot in square meters'),
  justification: z.string().describe('A brief, compelling reason why this lot is a good recommendation for the user. Highlight a key feature. (e.g. "Ótima localização", "Excelente custo-benefício")'),
});
export type LotRecommendation = z.infer<typeof LotRecommendationSchema>;

const RecommendLotsOutputSchema = z.object({
  recommendations: z.array(LotRecommendationSchema).length(3).describe('A list of exactly 3 recommended lots.'),
});
export type RecommendLotsOutput = z.infer<typeof RecommendLotsOutputSchema>;


export async function recommendSimilarLots(input: RecommendLotsInput): Promise<RecommendLotsOutput> {
  return recommendSimilarLotsFlow(input);
}

const recommendLotsPrompt = ai.definePrompt({
    name: 'recommendLotsPrompt',
    input: { schema: z.object({
        selectedLot: RecommendLotsInputSchema,
        availableLots: z.array(z.object({
            id: z.number(),
            number: z.string(),
            block: z.string(),
            type: z.string(),
            area: z.number(),
            price: z.number(),
            status: z.string(),
        }))
    })},
    output: { schema: RecommendLotsOutputSchema },
    prompt: `
        You are an expert real estate agent specializing in the Wave Home Resort.
        Your goal is to recommend three alternative lots to a client based on their current selection.

        The client has selected this lot:
        - Type: {{{selectedLot.type}}}
        - Area: {{{selectedLot.area}}}m²
        - Price: R${{ {selectedLot.price} }}

        Here is the list of all available lots:
        {{#each availableLots}}
        - ID: {{id}}, Lote: {{number}}, Quadra: {{block}}, Tipo: {{type}}, Área: {{area}}m², Preço: R${{ {price} }}, Status: {{status}}
        {{/each}}

        Please recommend exactly 3 OTHER available lots that are good alternatives.
        For each recommendation, provide a short, compelling justification in Portuguese. Focus on what makes it a great choice.
        Prioritize lots of the same type or similar area. Do not recommend the same lot the user selected.
        Provide a concise justification, like "Ótimo custo-benefício" or "Localização privilegiada".
    `,
});


const recommendSimilarLotsFlow = ai.defineFlow(
  {
    name: 'recommendSimilarLotsFlow',
    inputSchema: RecommendLotsInputSchema,
    outputSchema: RecommendLotsOutputSchema,
  },
  async (selectedLot) => {
    // Filter only available lots and exclude the one already selected
    const availableLots = lots.filter(lot => (lot.status === 'available' || lot.status === 'opportunity') && lot.price !== selectedLot.price);
    
    const response = await recommendLotsPrompt({
        selectedLot,
        availableLots,
    });
    
    return response.output!;
  }
);
