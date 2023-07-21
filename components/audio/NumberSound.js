import { useEffect, useState } from 'react';
import { StyleSheet, Platform, Pressable, Text, View } from 'react-native';
import { Icon, useTheme, Button } from '@rneui/themed';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import net from '../../lib/net/net';
import { strToCode } from '../../lib/text/text';
import { getWebAudio } from '../../lib/webAudio/webAudio';


export default function NumberSound({ source })
{
  const [audio, setAudio] = useState();

  useEffect(() => {
    const load = async () => {
      console.log('source: ', source);
      await loadSound()
    }
    load();
  }, [source]);


  return (
    <View style={sty.sound}>
      <Button onPress={playOnce} type='clear'>
        <Icon size={50} type="antdesign" name="sound" />
      </Button>
    </View>
  );

  async function loadSound()
  {
    try {
      await createSound()
    } catch(e) {
      console.error(e);
      setAudio(null);
    }
  }


  async function createSound()
  {
    if(audio) {
      await audio.unloadAsync();
    }
    await createAsync();
  }


  async function createAsync()
  {
    const options = { shouldPlay: true };
    const { sound }= await Audio.Sound.createAsync(source, options);
    setAudio(sound);
    return true;
  }


  async function playSound() { 
    //if(Platform.OS === 'web') {
      //webAudio.play()
    //} else {
      await audio.playFromPositionAsync(0);
    //}
  }

  async function playOnce()
  {
    await playSound();
  }

}


const sty = StyleSheet.create({
  sound: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});


/*
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
*/

