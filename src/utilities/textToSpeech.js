import { openai } from '../services/openai';

export const textToSpeech = async (play, content, duration) => {
  try {
    const response = await openai.audio.speech.create({
      input: content,
      model: 'tts-1',
      voice: 'echo'
    });
    const arrayBuffer = await response.arrayBuffer();
    const audioBlob = new Blob([arrayBuffer], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioElement = new Audio(audioUrl);
    play && audioElement.play();
    return audioElement;
  } catch (error) {
    console.log(error);
  };
};
