import { openai } from '../services/openai';

export const textToSpeech = async (assistantMessage) => {
  try {
    const response = await openai.audio.speech.create({
      input: assistantMessage,
      model: 'tts-1',
      voice: 'echo'
    });
    const arrayBuffer = await response.arrayBuffer();
    const audioBlob = new Blob([arrayBuffer], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioElement = new Audio(audioUrl);
    audioElement.play();
  } catch (error) {
    console.log(error);
  };
};
