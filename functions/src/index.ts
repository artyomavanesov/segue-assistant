import { initializeApp } from 'firebase-admin/app';
import { setGlobalOptions } from 'firebase-functions/v2';

initializeApp();

setGlobalOptions({ maxInstances: 10, region: 'europe-west1', secrets: ['OPENAI_API_KEY'] });

export { submitUserMessage } from './submitUserMessage';
