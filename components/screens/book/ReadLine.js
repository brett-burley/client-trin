import { useEffect } from 'react';
import { Pressable, View, StyleSheet, Text, PixelRatio } from 'react-native';
import { useTheme, Divider, Card, Button, Icon } from '@rneui/themed';
import useMode from '../../../hooks/useMode';
import useBook from '../../../hooks/useBook';
import Sound from '../../audio/Sound';


const fontScale = PixelRatio.getFontScale()


export default function ReadLine()
{
  const { current } = useBook();
  const { line, characters } = current;

  return (
    <View style={sty.readLine}>
      <View style={sty.content}>
        <Line line={line} />
        <Divider style={sty.midDivider} width={2} />
        <View style={sty.characters}>
          <Characters characters={characters} />
        </View>
      </View>
    </View>
  );
}


function Line({ line })
{
  const { mode } = useMode();
  const { mandarin, english } = line;

  if(mode === 'read') {
    return ( 
      <View style={sty.line}>
        <Text style={sty.mandarin}>{mandarin}</Text>
        <Text style={sty.english}>{english}</Text>
      </View>
    );
  } else {
    return (
      <View style={sty.line}>
        <LineSound mandarin={mandarin} />
        <Text style={sty.mandarin}>{mandarin}</Text>
        <Text style={sty.english}>{english}</Text>
      </View>
    );
  }
}

function LineSound({ mandarin })
{
  return (
      <Sound text={mandarin} shouldPlay={true}>
        <Icon type='antdesign' name='sound' size={40} />
      </Sound>
  );
}


function Characters({ characters })
{
  return characters.map((c, i) => <CharacterContent c={c} key={i} />);
}


function CharacterContent({ c })
{
  const { mode } = useMode();
  const { mandarin, pinyin, english } = c;
  const { together, seperate } = english;

  const content = (
    <View style={sty.characterContent}>
      <Text style={sty.together}>{together}</Text>
      <Text style={sty.mandarin}>{mandarin}</Text>
      <PinyinText pinyin={pinyin} english={english} />
      <Divider style={sty.divider} width={3}/>
      <PlayCharIcon mode={mode} />
    </View>
  );

  if(mode === 'read')
    return content;
  else
    return (
      <Sound text={mandarin}>
        { content }
      </Sound>
    );
}


function PinyinText({ pinyin, english })
{
  const { together, seperate } = english;
  return (
    <View style={sty.pinyinText}>
      <PinyinContent />
    </View>
  );


  function PinyinContent() {
    if(seperate.length) {
      return pinyin.map((p, i) => {
        const eng = seperate[i] ? seperate[i] : '';

        return (
          <View key={i} style={sty.pinyinTextContent}>
            <Text style={sty.pinyin}>{p}</Text>
            <Text style={sty.pinyin}>{eng}</Text>
          </View>
        ); 
      })
    } else {
      return (
        <View style={sty.pinyinTextContent}>
          <Text style={sty.pinyin}>{pinyin[0]}</Text>
          <Text style={sty.pinyin}>{together}</Text>
        </View>
      ); 
    }
  }
}


function EnglishText({ english })
{
  const { together, seperate } = english;
  return (
    <View>
      <Text style={sty.charEnglish}>
        {together}
      </Text>
      <View style={sty.seperate}>
        {seperate.map((s, i) => <Text key={i} style={sty.charEnglish}>{s}</Text>)}
      </View>
    </View>
  );
}

function PlayCharIcon({ mode })
{
  if(mode !== 'listen') return null;

  const { theme } = useTheme();
  return (
    <Icon type='antdesign' name='playcircleo' size={35} color={theme.colors.primary} />
  );
}

const sty = StyleSheet.create({
  readLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  mandarin: {
    letterSpacing: 10,
    textAlign: 'center',
    fontSize: 40 / fontScale,
    fontWeight: '500',
  },
  english: {
    fontSize: 40 / fontScale,
  },
  pinyin: {
    fontSize: 15 / fontScale,
  },
  charEnglish: {
    fontSize: 20 / fontScale,
  },
  cardDivider: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  characters: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 20,
  },
  charsContainer: {
    alignItems: 'center',
  },
  line: {
    width: '100%',
    alignItems: 'center',
  },
  midDivider: {
    width: '90%',
    marginTop: 10,
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    margin: 10
  },
  playIcon: {
    fontSize: 20,
    textAlign: 'center',
  },
  characterContent: {
    alignItems: 'center',
  },
  pinyinText: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    columnGap: 1,
  },
  pinyinTextContent: {
    flex: 1,
    alignItems: 'center',
  },
  together: {
    fontSize: 20 / fontScale,
  }
});
