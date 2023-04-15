import { useEffect, useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import common from '../../lib/storage/commonChars';
import storage from '../../lib/storage/storage';
import net from '../../lib/net/net';


export default function Sound({ text, shouldPlay, children }) {
  const [audio, setAudio] = useState();

  useEffect(() => {
    const load = async () => await loadSound();
    load();
  }, [text]);


  return (
    <Pressable onPress={playSound}>
      { children }
    </Pressable>
  );


  async function loadSound()
  {
    try {
      if(audio)
        await audio.unloadAsync();
      await createSound()
    } catch(e) {
      console.error(e);
      setAudio(null);
    }
  }


  async function createSound()
  {
    let source;
    /*
    if(text.length === 1)
      source = await fromCommon();
    else
      source = await fromLocal();
    if(!source)
    */
      source = await fromNetwork();
    
    await createAsync(source);
  }


  async function fromNetwork()
  {
    console.log('creating from network');
    const saved = await net.post('/audio/create', { text });
    const audioUrl = `${net.apiUrl}/static/audio/${text}.mp3`
    if(saved) {
      const [ asset ] = await Asset.loadAsync(audioUrl);
      await storage.setData(`${text}URI`, asset.localUri);
      return asset;
    }
  }

  async function fromLocal()
  {
    const localUri = await storage.getData(`${text}URI`);
    if(!localUri) return false;
    
    console.log('creating from local');
    const [ asset ] = await Asset.loadAsync(localUri);
    return asset;
  }


  async function fromCommon()
  {
    console.log('creating from common');
    return common.isCommon(text);
  }



  async function createAsync(source)
  {
    if(!source) return;
    const { sound } = await Audio.Sound.createAsync(source, { shouldPlay });
    setAudio(sound);
  }


  async function playSound() {
    await audio.playFromPositionAsync(0);

  }

}

const styles = StyleSheet.create({
});
