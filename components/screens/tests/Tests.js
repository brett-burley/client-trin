import { useEffect } from 'react';
import { View, Text } from 'react-native';
import textToBook from '../../../lib/translate/parse';

export default function Tests()
{
  useEffect(() => {
    async function load()
    {
      /*
      const book = await textToBook();
      console.log(book);
      console.log(JSON.stringify(book));
      */
    }
    
    load();
  }, []);

  return (
    <View>
      <Text>Tests</Text>
    </View>
  ); 
}
