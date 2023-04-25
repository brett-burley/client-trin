import { useEffect, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import common from '../../lib/storage/commonChars';
import net from '../../lib/net/net';
import { textToFilename } from '../../lib/text/text';
import { getWebAudio } from '../../lib/webAudio/webAudio';


export default function Sound({ text, shouldPlay, children })
{
  const [audio, setAudio] = useState();
  const filename = textToFilename(text);
  const uri = net.audioUrl.concat(filename);
  let webAudio;

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
    source = await fromNetwork();
    /*
    if(text.length === 1)
      source = await fromCommon();
    else
      source = await fromLocal();
    if(!source)
    */
  }


  async function fromNetwork()
  {
    const saved = await net.post('/audio/create', { text });
    if(!saved) {
      setAudio(null);
      return;
    }
    
    if(Platform.OS === 'web') {
      webAudio = await getWebAudio(filename);
      webAudio.play();
    } else {
      console.log('use FileSystem to get and store audio')
      await createAsync();
    }
  }


  async function createAsync()
  {
    const source = { uri };
    const options = { shouldPlay };
    const soundObj = await Audio.Sound.createAsync(source, options);
    
    setAudio(soundObj.sound);
    return soundObj;
  }


  async function playSound() { 
    if(Platform.OS === 'web') {
      webAudio.play()
    } else {
      await audio.playFromPositionAsync(0);
    }
  }
}


  /*
  async function fromLocal()
  {
    const local = await getData(text);
    if(!local) return false;
    console.log('local: ', local);

    webAudio.src = URL.createObjectURL(local.sound);
    setAudio();
    return true;
  }

  async function fromCommon()
  {
    console.log('creating from common');
    return common.isCommon(text);
  }



  async function assetFromMetadata(text, url)
  {
    const name = text.toWellFormed();
    const required = {
      name,
      hash: null,
      type: 'mp3',
      scales: [],
      httpServerLocation: url
    };

    const meta = {
      height: null,
      width: null,
      ...required
    };
    const asset = await Asset.fromMetadata(meta).downloadAsync();
    return asset;
  }
*/
