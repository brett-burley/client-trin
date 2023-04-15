import { useEffect, useState } from 'react';
import { Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Divider, Text } from '@rneui/themed';
import useBook from '../../hooks/useBook';
import translate from '../../lib/translate/translate';


export default function ReadPage()
{
  const [text, setText] = useState();
  const { section, getPage } = useBook();

  console.log('ReadPage section', section);

  useEffect(() => {
    const load = async () => {
      const page = getPage();
      const payload = await translate.translatePage(page); 
      setText(payload);
    }
    load();
  }, [section])

  if(!text) return null;
  const content = text.map((section, i) => <ReadLine key={i} section={section} />);
   
   return (
    <ScrollView contentContainerStyle={sty.scrollView}>
      <View style={sty.scrollViewWrapper}>
        {content}
      </View>
    </ScrollView>
  );
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
          {characters.map((c, i) => {
            return (
              <View key={i} style={sty.characterEntry}>
                <Text style={sty.mandarin}>
                  {c.mandarin}
                </Text>
                <Text style={sty.pinyin}>
                  {c.pinyin}
                </Text>
                <Text style={sty.charEnglish}>
                  {c.english}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      <Divider style={sty.divider} />
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
  },
});
