import net from '../net/net.js';
import db from '../dbIndexed/dbIndexed.js';
import common from '../common/common';

async function getAudioBlob(text) {
  const audio = await db.getData(text);
  if(audio) {
    console.log('web audio from DB');
    return audio.data
  }

  const response = await net.get(`/static/audio/${text}`);
  const audioBlob = await response.blob();
  await db.saveData(text, audioBlob);
  return audioBlob;
}


export async function getWebAudio(text) {
  try {
    let audio;
    if(text.length === 1) {
      const charAudio = commont.isCommon(text);
      audio = new Audio(charAudio);
    } else {
      const audioBlob = await getAudioBlob(text);
      audio = new Audio(URL.createObjectURL(audioBlob));
    }
    return audio;
  } catch (error) {
    console.error(error);
    return null;
  }
}
