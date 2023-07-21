import { useEffect, useState } from 'react';
import { StyleSheet, Platform, Pressable, Text, View } from 'react-native';
import { Icon, useTheme, Button } from '@rneui/themed';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import net from '../../lib/net/net';
import { strToCode } from '../../lib/text/text';
import { getWebAudio } from '../../lib/webAudio/webAudio';


export default function Sound({ text, shouldPlay, children })
{
  const [audio, setAudio] = useState();
  const filename = strToCode(text);
  const uri = net.audioUrl.concat(filename);
  const { theme } = useTheme();
  let webAudio;

  useEffect(() => {
    const load = async () => await loadSound();
    load();
  }, [text]);


  return (
    <View style={sty.sound}>
      <Button onPress={playOnce} type='clear'>
        <Icon type='ionicon' name='play-circle-outline' size={35} />
      </Button>
      <Button onPress={() => playMany(text.length)} type='clear'>
        <Icon type='ionicon' name='play-forward-circle-outline' size={35} />
      </Button>
    </View>
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
    const saved = await net.post('/audio/create', { text });
    if(!saved) {
      setAudio(null);
      return;
    }
    
    if(Platform.OS === 'web') {
      webAudio = await getWebAudio(text);
      if(shouldPlay)
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

  async function playOnce()
  {
    await playSound();
  }


  function playMany(len)
  {
    const time = getTime()
    console.log(len, ' - ', time);
    for(let i = 0; i < time.count; i++) {
      const interval = i * time.ms;
      setTimeout(() => playSound(), interval);
    }

    function getTime()
    {
      switch(true) {
        case(len < 4):
          return { count: 4, ms: 2000 };
        case(len < 9):
          return { count: 3, ms: 3000 };
        case(len < 12):
          return { count: 2, ms: 3500 };
        default:
          return { count: 2, ms: Math.floor(len / 3) * 1000 }
      }
    }
  }

}




const sty = StyleSheet.create({
  sound: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
