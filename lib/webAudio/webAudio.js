import net from '../net/net.js';
import { saveAudio, getData } from '../dbIndexed/dbIndexed.js';

async function getAudioBlob(filename) {
  const { sound }= await getData(filename);
  if (sound) {
    return sound;
  }

  const response = await net.get(`/static/audio/${filename}`);
  const audioBlob = await response.blob();
  await saveAudio(filename, audioBlob);
  return audioBlob;
}

export async function createWebAudio(filename) {
  try {
    const audioBlob = await getAudioBlob(filename);
    const audio = new Audio(URL.createObjectURL(audioBlob));
    return audio;
  } catch (error) {
    console.error(error);
    return null;
  }
}
    
