import net from '../net/net.js';

export async function createWebAudio(filename) {
  try {
    const response = await net.get(`/static/audio/${filename}`);
    const audioBlob = await response.blob();
    const audio = new Audio(URL.createObjectURL(audioBlob));
    return audio;
  } catch (error) {
    console.error(error);
    return null;
  }
}
