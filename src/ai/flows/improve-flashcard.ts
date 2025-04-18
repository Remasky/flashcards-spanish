// src/ai/flows/improve-flashcard.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting improvements to flashcards.
 *
 * The flow takes a flashcard as input and returns suggestions for improving it, such as
 * rephrasing the question or providing a more concise answer.
 *
 * @interface ImproveFlashcardInput - The input schema for the improveFlashcard flow.
 * @interface ImproveFlashcardOutput - The output schema for the improveFlashcard flow.
 * @function improveFlashcard - A function that calls the improveFlashcardFlow with the input and returns the output.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ImproveFlashcardInputSchema = z.object({
  front: z.string().describe('The front side of the flashcard (the question).'),
  back: z.string().describe('The back side of the flashcard (the answer).'),
});
export type ImproveFlashcardInput = z.infer<typeof ImproveFlashcardInputSchema>;

const ImproveFlashcardOutputSchema = z.object({
  improvedFront: z.string().describe('The improved front side of the flashcard (the question).'),
  improvedBack: z.string().describe('The improved back side of the flashcard (the answer).'),
  explanation: z.string().describe('An explanation of why the flashcard was improved.'),
});
export type ImproveFlashcardOutput = z.infer<typeof ImproveFlashcardOutputSchema>;

export async function improveFlashcard(input: ImproveFlashcardInput): Promise<ImproveFlashcardOutput> {
  return improveFlashcardFlow(input);
}

const improveFlashcardPrompt = ai.definePrompt({
  name: 'improveFlashcardPrompt',
  input: {
    schema: z.object({
      front: z.string().describe('The front side of the flashcard (the question).'),
      back: z.string().describe('The back side of the flashcard (the answer).'),
    }),
  },
  output: {
    schema: z.object({
      improvedFront: z.string().describe('The improved front side of the flashcard (the question).'),
      improvedBack: z.string().describe('The improved back side of the flashcard (the answer).'),
      explanation: z.string().describe('An explanation of why the flashcard was improved.'),
    }),
  },
  prompt: `You are an AI assistant that helps users improve their flashcards for better learning and retention.

  Given the following flashcard, suggest improvements to both the front (question) and back (answer) sides.
  Explain why you made the suggested changes. Focus on making the question clearer and more effective for recall, and the answer more concise and accurate.

  Original Flashcard:
  Front: {{{front}}}
  Back: {{{back}}}

  Improved Flashcard:
`,
});

const improveFlashcardFlow = ai.defineFlow<
  typeof ImproveFlashcardInputSchema,
  typeof ImproveFlashcardOutputSchema
>(
  {
    name: 'improveFlashcardFlow',
    inputSchema: ImproveFlashcardInputSchema,
    outputSchema: ImproveFlashcardOutputSchema,
  },
  async input => {
    const {output} = await improveFlashcardPrompt(input);
    return output!;
  }
);
