import { createRef, useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { ButtonGroup, Card, ListItem, useTheme, FAB, Divider, Text, Icon, Button, Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import useMode from '../../../hooks/useMode';
import useBook from '../../../hooks/useBook';
import Popup from '../../extras/Popup';
import { uppercaseFirst } from '../../../lib/text/text';

export default function Settings({ close })
{
  return (
    <View style={sty.settings}>
      <Header />
      <View style={sty.row}>
        <ModesItem close={close} />
        <JumpTo />
      </View>
      <Divider style={sty.divider} width={3} />
    </View>
  );
}


function ModesItem({ close })
{
  const { mode, setMode } = useMode();
  const [expanded, setExpanded] = useState(true);
  const buttons = ['Read', 'Listen'];
  

  function onPress(index)
  {
    const newMode = buttons[index].toLowerCase();
    setMode(newMode);
    close();
  }

  return (
    <View style={sty.rowEntry}>
      <Card wrapperStyle={sty.card}>
        <Card.Title>Change Mode</Card.Title>
        <ButtonGroup
          buttons={buttons}         
          selectedIndex={buttons.indexOf(uppercaseFirst(mode))}
          onPress={value => onPress(value)}
        />
      </Card>
    </View>
  );
}


function JumpTo({ close })
{
  const input = createRef();
  const { bookLength, setSection, section } = useBook();
  const [num, setNum] = useState(0);
  
  const disabled = num < 1 || num >= bookLength;
  const range = `1-${bookLength}`
  const errorMsg = `range: ${range}`;


  return (
    <View style={sty.rowEntry}>
      <Card wrapperStyle={sty.card}>
        <Card.Title>Change Location</Card.Title>
        <View style={sty.jumpTo}>
          <View style={sty.jumpToInput}>
            <Input
              containerStyle={sty.input}
              inputStyle={sty.input}
              placeholder={`(${range})`}
              onChangeText={v => onChange(v)}
              ref={input}
            />

            <Button
              onPress={onPress}
              disabled={disabled}
              size="lg"
            >
              {`Jump to: ${num ? num : '-'}`}
            </Button>
          </View>
        </View>
      </Card>
    </View>
  );


  function onChange(v)
  {
    const value = parseInt(v);
    if(value < 1 || value >= bookLength) {
      input.current.shake();
      input.current.clear();
      setNum(0);
      return;
    }

    setNum(value);
  }


  function onPress()
  {
    close();
    setSection(num-1);
  }
}



function SectionInput({ close })
{
  const input = createRef();
  const { bookLength, setSection } = useBook();
  const [num, setNum] = useState(0);
  
  const disabled = num < 1 || num >= bookLength;
  const range = `1-${bookLength}`
  const errorMsg = `range: ${range}`;


  return (
    <View style={sty.gotoContent}>
      <Input
        containerStyle={sty.input}
        placeholder={`Enter location (${range})`}
        onChangeText={v => onChange(v)}
        errorMessage={errorMsg}
        ref={input}
      />

      <Button
        containerStyle={sty.gotoBtnContainer}
        onPress={onPress}
        disabled={disabled}
        size="lg"
      >
        {`Jump to location: ${num ? num : '-'}`}
      </Button>
    </View>
  );


  function onChange(v)
  {
    const value = parseInt(v);
    if(value < 1 || value >= bookLength) {
      input.current.shake();
      input.current.clear();
      setNum(0);
      return;
    }

    setNum(value);
  }


  function onPress()
  {
    //close();
    setSection(num-1);
  }
}


function Header()
{
  return (
    <View style={sty.header}>
      <View style={sty.headerContent}>
        <Icon size={35} type='material' name='app-settings-alt' />
        <ListItem.Title style={sty.title}>Settings</ListItem.Title>
      </View>
      <Divider style={sty.divider} width={3} />
    </View>
  );
}


const sty = StyleSheet.create({
  settings: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
    marginRight: 30,
    marginLeft: 30,
  },
  row: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  rowEntry: {
    flex: 1,
  },
  card: {
    padding: 20,  
    height: 150,
  },
  settingsContent: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    flex: 1,
  },
  listItemContent: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    margin: 10,
  },
  divider: {
    width: '90%',
  },
  listItemTitle: {
    fontSize: 20,
    margin: 10,
  },
  sliderBtn: {
    marginTop: 15,
    textAlign: 'center',
  },
  gotoContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modeBtnContainer: {
    width: 200,
    height: 80,
  },
  gotoBtnContainer: {
    margin: 15,
  },
});
