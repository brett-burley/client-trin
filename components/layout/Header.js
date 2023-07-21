import { View } from 'react-native';
import { Text, Card } from '@rneui/themed';

export default function Header({ title, children })
{
  const sty = {
    card: {
      width: 'fit-content',
      borderRadius: 10 
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },
    headerText: {
      fontSize: 30,
    },
  }

  return (
    <Card containerStyle={sty.card}>
      <View style={sty.header}>
        {children}
        <Text style={sty.headerText}>{title}</Text>
      </View>
    </Card>
  );
}
