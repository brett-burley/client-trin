import { useEffect, useState } from 'react';
import { Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Divider, Text } from '@rneui/themed';
import useBook from '../../../hooks/useBook';
import translate from '../../../lib/translate/translate';


export default function ReadPage()
{
  const [text, setText] = useState();
  const { getPage } = useBook();

  useEffect(() => {
    const load = async () => {
      const page = getPage();
      setText(page);
    }
    load();
  }, [])

  return (
    <ScrollView contentContainerStyle={sty.scrollView}>
      <View style={sty.scrollViewWrapper}>
        <PageContent page={text} />
      </View>
    </ScrollView>
  );

}


function PageContent({ page })
{
  if(!page || !page.length)
    return <Text>Could not load</Text>
  return page.map((section, i) => <ReadLine key={i} section={section} />);
}


function ReadLine({ section })
{
  const { line, characters } = section;


  return (
    <View style={sty.section}>
      <View style={sty.sectionContent}>
        <Text style={sty.english}>
          {line.english}
        </Text>

        <View style={sty.characters}>
          {characters.map((c, i) => <ReadCharacters key={i} c={c} />)}
        </View>
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
      <Text style={sty.together}>{together}</Text>

      <Text style={sty.mandarin}>{mandarin}</Text>
      
      <CharactersPinyin arr={pinyin} />
      
      <CharactersEnglish arr={seperate} />
    </View>
  );
}

function CharactersPinyin({ arr })
{
  return (
    <View style={sty.charArr}>
      {arr.map((p, i) => (
        <Text key={i} style={sty.pinyin}>
          {p}
        </Text>
      ))}
    </View>
  );
}

function CharactersEnglish({ arr })
{
  if(!arr.length) return null;
  return (
    <View style={sty.charArr}>
      {arr.map((e, i) => (
        <Text key={i} style={sty.charEnglish}>
          {e}
        </Text>
      ))}
    </View>
  );
}

const sty = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  section: {
    flexGrow: 1,
    gap: 20,
    marginBottom: 40,
  },
  sectionContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 20,
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
  },
  charEnglish: {
    fontSize: 11,
    textAlign: 'center',
  },
  together: {
    fontSize: 20,
  },
  charArr: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },

});
