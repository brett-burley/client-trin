import net from '../net/net.js';
import db from '../dbIndexed/dbIndexed.js';
import { isCommon } from '../common/common';
import { strToCode } from '../text/text';

export async function getWebAudio(text)
{
  try {
    const code = strToCode(text);
    const common = isCommon(text);
    if(common) return new Audio(common);

    const audioBlob = await getAudioBlob(code);
    return new Audio(URL.createObjectURL(audioBlob));
  } catch (error) {
    console.error(error);
    return null;
  }
}


async function getAudioBlob(code)
{
  const audio = await db.getData(code);
  if(audio) {
    console.log('DB audio: ', code);
    return audio.data
  }
  
  return await fromNetwork(code);
}



async function fromNetwork(code)
{
  console.log('network audio: ', code);
  const path = `/static/audio/${code}`
  const res = await net.get(path);
  const blob = await res.blob();
  await db.saveData(code, blob);
  return blob;
}
