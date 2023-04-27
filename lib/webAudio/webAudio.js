import net from '../net/net.js';
import db from '../dbIndexed/dbIndexed.js';

async function getAudioBlob(filename) {
  const audio = await db.getData(filename);
  if(audio) {
    console.log('web audio from DB');
    return audio.data
  }

  const response = await net.get(`/static/audio/${filename}`);
  const audioBlob = await response.blob();
  await db.saveData(filename, audioBlob);
  return audioBlob;
}

export async function getWebAudio(filename) {
  try {
    const audioBlob = await getAudioBlob(filename);
    const audio = new Audio(URL.createObjectURL(audioBlob));
    return audio;
  } catch (error) {
    console.error(error);
    return null;
  }
}
