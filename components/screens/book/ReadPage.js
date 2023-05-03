import { useEffect, useState } from 'react';
import { Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Divider, Text } from '@rneui/themed';
import useBook from '../../../hooks/useBook';
import translate from '../../../lib/translate/translate';


export default function ReadPage({ navigation })
{
  const [lines, setLines] = useState();
  const { getPage, setScreen, section } = useBook();

  useEffect(() => {
    navigation.addListener('tabPress', e => setScreen('page'))
  }, []);

  useEffect(() => {
    const load = async () => {
      const page = getPage();
      setLines(page);
    }
    load();
  }, [section])

  return (
    <ScrollView contentContainerStyle={sty.scrollView}>
      <Page lines={lines} />
    </ScrollView>
  );

}


function Page({ lines })
{
  if(!lines || !lines.length)
    return <Text>Could not load</Text>
  return lines.map((entry, i) => <Line entry={entry} key={i} />);
}


function Line({ entry })
{
  const { line, characters } = entry;

  return (
    <View style={sty.line}>
      <Text style={sty.english}>
        {line.english}
      </Text>

      <View style={sty.characters}>
        {characters.map((c, i) => <ReadCharacters c={c} key={i} />)}
      </View>
      <Divider style={sty.divider} />
    </View>
  );
}


function ReadCharacters({ c })
{
  const { mandarin, pinyin, english } = c;
  const { together, seperate } = english;

  return (
    <View style={sty.characterEntry}>
      <Text style={sty.mandarin}>{mandarin}</Text>
      
      <CharactersPinyin arr={pinyin} />
      
      <CharactersEnglish english={english} />

      <Text style={sty.together}>{together}</Text>
    </View>
  );
}

function CharactersPinyin({ arr })
{
  return (
    <View style={sty.charArr}>
      {arr.map((p, i) => (
        <Text style={sty.pinyin} key={i}>
          {p}
        </Text>
      ))}
    </View>
  );
}

function CharactersEnglish({ english })
{
  const { together, seperate } = english;
  if(!seperate.length)
    return <Text style={sty.charEnglish}>{together}</Text>

  return (
    <View style={sty.charArr}>
      {seperate.map((e, i) => <Text style={sty.charEnglish} key={i}>{e}</Text>)}
    </View>
  );
}

const sty = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  line: {
    alignItems: 'center',
    marginBottom: 40,
    marginRight: 20,
    marginLeft: 20,
  },
  characters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  characterEntry: {
    alignItems: 'center',
    marginLeft: 5
  },
  english: {
    fontSize: 25,
    fontWeight: '700',
  },
  mandarin: {
    fontSize: 40,
    fontWeight: '500',
    letterSpacing: 3,
  },
  pinyin: {
    fontSize: 15,
    letterSpacing: 1,
    marginBottom: 5,
    textAlign: 'center',
  },
  charEnglish: {
    fontSize: 11,
    textAlign: 'center',
  },
  together: {
    fontSize: 17,
  },
  charArr: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

});
