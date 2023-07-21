import { View, StyleSheet } from 'react-native';
import { Card, Image, Text, ListItem } from '@rneui/themed';
import { order } from '../../../lib/strokes/strokes';


export default function Rules()
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
    <Card containerStyle={sty.card}>
      {listItems}
    </Card>
  );
}


const sty = StyleSheet.create({
  card: {
    padding: 0,
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
  }
});
