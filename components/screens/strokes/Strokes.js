import { useEffect, useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Card, Image, Text, ListItem } from '@rneui/themed';
import { strokes, order } from '../../../lib/strokes/strokes';
import Rules from './Rules';

const DISPLAY_LEN = 15000;

export default function Strokes()
{

  return (
    <View style={sty.strokes}>
      <Rules />
      <StrokeDisplay />
    </View>
  );
}


function Order()
{
  const listItems = order.map((item, i) => {
    const { name, mandarin, img } = item; 
    const index = i + 1;
    return (
      <ListItem key={name} bottomDivider>
        <ListItem.Content style={sty.listContent}>
            <ListItem.Title style={sty.orderNum}>{`#${index}`}</ListItem.Title>
            <View style={sty.orderTextContent}>
              <ListItem.Title style={sty.orderName}>{name}</ListItem.Title>
              <ListItem.Title style={sty.orderMandarin}>{mandarin}</ListItem.Title>
            </View>
            <Image source={{ uri: img}} style={sty.orderImg} resizeMode='contain' />
        </ListItem.Content>
      </ListItem>
    );
  });
   
  return (
    <View style={sty.order}>
      <Text style={sty.orderName}>Order Rules</Text>
      <Card containerStyle={sty.card}>
        {listItems}
      </Card>
    </View>
  );
}


function StrokeDisplay()
{
  const [arr, setArr] = useState();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if(!arr) {
      const value = strokes.sort(() => Math.random() - 0.5);
      setArr(value);
    } else {
      if(index >= (arr.length-1))
        setIndex(0);
      else
        setTimeout(() => setIndex(index+1), DISPLAY_LEN);
    }
  })

  if(!arr) return null;
  const { mandarin, pinyin, type, examples, img } = arr[index];

  return (
    <View style={sty.stroke}>
      <Image source={{ uri: img}} style={sty.strokeImg} resizeMode='contain' />

      <Card containerStyle={sty.card}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={sty.header}>Type:</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={sty.content}>{type}</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={sty.header}>Name:</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={sty.content}>{mandarin}</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={sty.header}>Pinyin:</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={sty.content}>{pinyin}</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={sty.header}>Examples:</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={sty.content}>{examples}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Card>
    </View>
  );
}


const sty = StyleSheet.create({
  strokes: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stroke: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  order: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: '80%',
    height: '80%',
    padding: 0,
  },
  strokeImg: {
    width: 200,
    height: 150,
  },
  listContent: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTextContent: {
    textAlign: 'center',
  },
  orderImg: {
    width: 100,
    height: 75,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
  },
  orderNum: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 20,
  },
  orderName: {
    fontSize: 15,
    fontWeight: '600',
  },
  orderMandarin: {
    fontSize: 13,
  },
});
