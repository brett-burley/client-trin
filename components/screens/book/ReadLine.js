import { useEffect } from 'react';
import { Pressable, View, StyleSheet, Text, PixelRatio } from 'react-native';
import { useTheme, Divider, Card, Button, Icon } from '@rneui/themed';
import useMode from '../../../hooks/useMode';
import useBook from '../../../hooks/useBook';
import Sound from '../../audio/Sound';

const fontScale = PixelRatio.getFontScale()


export default function ReadLine({ navigation })
{
  const { current, setScreen } = useBook();
  console.log(current);

  useEffect(() => {
    navigation.addListener('tabPress', e => setScreen('line'))
  }, []);

  return (
    <View style={sty.readLine}>
      <View style={sty.content}>
        <Line line={current.l} />
        <Divider style={sty.midDivider} width={2} />
        <View style={sty.characters}>
          <Characters characters={current.c} />
        </View>
      </View>
    </View>
  );
}


function Line({ line })
{
  const { mode } = useMode();
  const styles = lineStyles(line.m.length);

  if(mode === 'read') {
    return ( 
      <View style={sty.line}>
        <Text style={styles.mandarin}>{line.m}</Text>
        <Text style={styles.english}>{line.e}</Text>
      </View>
    );
  } else {
    return (
      <View style={sty.line}>
        <Text style={styles.english}>{line.e}</Text>
        <View style={sty.lineChinese}>
          <LineSound mandarin={line.m} />
          <Text style={styles.mandarin}>{line.m}</Text>
        </View>
      </View>
    );
  }

  function lineStyles(length)
  {
    const sizeDeduction = Math.floor(length / 10) * 3;
    console.log(sizeDeduction);
    const fontSize = 40 / fontScale - sizeDeduction;
    return StyleSheet.create({
      mandarin: {
        letterSpacing: 10,
        textAlign: 'center',
        fontSize,
        fontWeight: '500',
      },
      english: {
        fontSize,
        marginBottom: 0,
      }
    });
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
  return characters.map((c, i) => <CharContent c={c} key={i} />);
}


function CharContent({ c })
{
  const { m: mandarin, p: pinyin, e: english } = c;

  return (
    <View style={sty.charContent}>
      <Text style={sty.together}>{pinyin.g}</Text>
      <View style={sty.charContentText}>
        <View style={sty.charContentEntry}>
          <Text style={sty.mandarin}>
            {mandarin}
          </Text>
          <PinyinText pinyin={pinyin.s} english={english} />
        </View> 
      </View>
      <View style={sty.charContentBottom}>
        <Divider style={sty.divider} width={3}/>
        <PlayCharIcon mandarin={mandarin} />
      </View>
    </View>
  );
}


function PinyinText({ pinyin, english })
{
  const { g, s } = english;
  return (
    <View style={sty.pinyinText}>
      <PinyinContent />
    </View>
  );


  function PinyinContent() {
    if(s.length) {
      return pinyin.map((p, i) => {
        const eng = s[i] ? s[i] : '';

        return (
          <View key={i} style={sty.pinyinTextContent}>
            <Text style={sty.pinyin}>{p}</Text>
            <Text style={sty.englishChar}>{eng}</Text>
          </View>
        ); 
      })
    } else {
      return (
        <View style={sty.pinyinTextContent}>
          <Text style={sty.pinyin}>{pinyin[0]}</Text>
          <Text style={sty.englishChar}>{g}</Text>
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

function PlayCharIcon({ mandarin })
{
  const { mode } = useMode();
  if(mode !== 'listen') return null;

  return <Sound text={mandarin} shouldPlay={false} />
}

const sty = StyleSheet.create({
  readLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  mandarin: {
    letterSpacing: 10,
    textAlign: 'center',
    fontSize: 50 / fontScale,
    fontWeight: '500',
  },
  english: {
    fontSize: 40 / fontScale,
    marginBottom: 0,
  },
  pinyin: {
    fontSize: 25 / fontScale,
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
    padding: 10,
    gap: 20,
  },
  charsContainer: {
    alignItems: 'center',
  },
  line: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  lineChinese: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  midDivider: {
    width: '90%',
    margin: 20,
  },
  divider: {
    width: '100%',
    margin: 10
  },
  playIcon: {
    fontSize: 20,
    textAlign: 'center',
  },
  charContent: {
    alignItems: 'center',
  },
  charContentText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  charContentEntry: {
    alignItems: 'center',
  },
  charContentBottom: {
    width: '100%',
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
    fontWeight: '600',
  }
});
