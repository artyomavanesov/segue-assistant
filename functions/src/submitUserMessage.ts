import { getFirestore } from 'firebase-admin/firestore';
import { defineSecret } from 'firebase-functions/params';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import OpenAI from 'openai';

const database = getFirestore();

export const submitUserMessage = onDocumentCreated({ document: 'sessions/{session}' }, async (event) => {
  const apiKey = defineSecret('OPENAI_API_KEY').value();
  const openai = new OpenAI({ apiKey });

  try {
    const configurationReference = database.doc('configuration/openai_generate_segway');
    const configurationDocument = await configurationReference.get();
    const configurationDetails = configurationDocument.data();
    const eventDetails = event.data.data();
    const systemMessage = `${configurationDetails.mandate} ${configurationDetails.instructions}`;
    const chatCompletion = await openai.chat.completions.create({
      max_tokens: configurationDetails.maxTokens,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: eventDetails.userMessage }
      ],
      model: configurationDetails.model,
      n: configurationDetails.choices,
      temperature: configurationDetails.temperature
    });
    const { content } = chatCompletion.choices[0].message;
    event.data.ref.update({ assistantMessage: content });
  } catch (error) {
    console.error(error);
    return error;
  };
});
