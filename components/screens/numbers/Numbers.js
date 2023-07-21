import { useEffect, useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Card, Text, Button, Icon } from '@rneui/themed';
import NumberSound from '../../audio/NumberSound';
import TimedPopup from '../../extras/TimedPopup';
import getNumber from '../../../lib/numbers/numbers';

const rightMsg = "Good job! You're right."
const wrongMsg = "Sorry! Try again."

export default function Numbers()
{
  const [number, setNumber] = useState();
  console.log(number);

  useEffect(() => {
    setNumber(getNumber());  
  }, []);

  if(!number) return null;
  const { answer, questions } = number;
  return (
    <View style={sty.numbers}>
      <Header answer={answer} />
      <Questions number={number} changeNumber={changeNumber} />
    </View>
  );


  function changeNumber(value)
  {
    setTimeout(() => setNumber(getNumber()), 2000);
  }
}


function Header({ answer })
{
  const { value, mandarin, pinyin, audio } = answer;
  console.log('audio: ', audio);

  return (
    <View style={sty.answer}>
      <Card containerStyle={sty.card}>
        <View style={sty.cardContent}>
          <Text style={sty.cardText}>{mandarin}</Text>
          <NumberSound source={answer.audio} />
        </View>
      </Card>
    </View>
  );
}


function Questions({ number, changeNumber })
{
  const { answer, questions } = number;
  const [pinyin, setPinyin] = useState();

  const correct = pinyin === answer.pinyin ? true : false;

  function btnPressed(v, p)
  {
    setPinyin(p)
    if(v === answer.value)
      changeNumber();
  }

  return (
    <View style={sty.questions}>
      <Popup pinyin={pinyin} correct={correct} />
      {questions.map((q, i) => (
        <View style={sty.single} key={i}>
          <QuestionBtn question={q} />
        </View>
      ))}
    </View>
  );

  function QuestionBtn({ question })
  {
    const { value, mandarin, pinyin } = question;

    return (
      <Button
        onPress={() => btnPressed(value, pinyin)}
        size="lg"
        radius="md"
        raised={true}
        containerStyle={sty.btnContainer}
      >
          <Text style={sty.btnText}>{value}</Text>
      </Button>
    );
  }
}


function Popup({ pinyin, correct })
{
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(!visible && pinyin) {
      setVisible(true)
      setTimeout(() => setVisible(false), 1500);
    }
  }, [pinyin]);  

  const msg = correct ? rightMsg : wrongMsg;
  return (
    <TimedPopup visible={visible}>
      <Text style={sty.pinyin}>{pinyin}</Text>
      <Text style={sty.popupText}>{msg}</Text>
      <PopupIcon />
    </TimedPopup>
  );

  function PopupIcon()
  {
    return correct ?
      <Icon size={40} type="ionicon" name="happy-outline" />
    :
      <Icon size={40} type="ionicon" name="sad-outline" />
  }
}




const sty = StyleSheet.create({
  numbers: {
    flex: 1,
    alignItems: 'center',
  },
  answer: {
    width: '100%',
    flex: 1,
    flexGrow: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    minWidth: '40%',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 60,
    marginLeft: 10,
    marginRight: 10,
  },
  questions: {
    width: Platform.OS === 'web' ? '75%' : '50%',
    flex: 1,
    flexGrow: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  single: {
    width: '45%',
    alignItems: 'center',
  },
  btnContainer: {
    width: '50%',
  },
  btnText: {
    color: '#fff',
    fontSize: 40,
    margin: 20,
    textAlign: 'center',
  },
  chineseText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popupText: {
    fontSize: 25,
    fontWeight: 500,
    margin: 15,
  },
  pinyin: {
    fontSize: 60,
    fontWeight: 500,
    margin: 15,
  }

});
