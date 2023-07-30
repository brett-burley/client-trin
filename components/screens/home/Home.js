import { useState, useEffect } from 'react';
import { useWindowDimensions, Platform, ScrollView, Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme, Icon, Divider, Button, Card, Image, Text } from "@rneui/themed";
import useLibrary from '../../../hooks/useLibrary';
import Screen from '../Screen';
import Header from '../../layout/Header';
import Upload from '../upload/Upload';

const sty = useStyles();

export default function Home()
{
  const navigation = useNavigation();

  return (
    <Screen>
      <View style={sty.library}>
        <Header title="Library">
          <Icon type="ionicon" name="library-outline" size={35} />
        </Header>
        <View style={sty.books}>
          <AllBooks />
        </View>
      </View>

      <UploadSection />
    </Screen>
  );
}

function AllBooks()
{
  const { titles } = useLibrary();
  const { theme } = useTheme(); 
  const bookCards = titles[0].books.map((t, i) => <BookCover key={i} title={t} />);

  const color = theme.colors.black;
  const backgroundColor = theme.colors.white;

  return (
    <Card containerStyle={[sty.booksCard, { backgroundColor }]}>
      <Text style={[sty.booksTitle, { color }]}>Books</Text>
      <ScrollView horizontal={true} contentContainerStyle={sty.booksScroll}>
        {bookCards}
      </ScrollView>
    </Card>
  );
}


function BookCover({ title })
{
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  const coverWidth = width > 500 ? 180 : (width / 30) * 10;

  return (
    <Pressable 
      onPress={() => navigate('Book', { book: title })}
      style={sty.pressable}
    >
      <Card 
        containerStyle={[sty.coverContainer, { width: coverWidth }]}
        wrapperStyle={sty.coverWrapper}
      >
        <Card.Title style={sty.cardTitle}>
          {title.title}
        </Card.Title>

        <Card.Divider style={sty.cardDivider} />
        <BookImage t={title} />
        <Card.Divider style={sty.cardDivider} />

        <Card.Title style={sty.cardText}>
          {title.author}
        </Card.Title>
      </Card>
    </Pressable>
  );

}


function BookImage({ t })
{

  let source;
  if(t.img)
   source = t.img; 
  else
    source = { uri: t.imgUri }

  return (
    <Image
      style={[sty.bookImg]}
      source={source}
      resizeMode='contain'
    />
  );
}

function UploadSection()
{
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme(); 
  
  return (
    <View style={sty.upload}>
      <Upload isVisible={isVisible} onClose={() => setIsVisible(false)} />
      <Divider color={theme.colors.black} style={{width: '98%', margin: 20}}/>
      <Button
        onPress={() => setIsVisible(true)}
        size="lg"
        titleStyle={sty.uploadBtn}
        radius="md"
      >
        Upload Text
      </Button>
    </View>
  );
}



function useStyles(theme)
{
  return StyleSheet.create({
    library: {
      flex: 1,
      flexGrow: 5,
      alignItems: 'center',
    },
    upload: {
      flex: 1,
      flexGrow: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    books: {
      flex: 1,
      width: '98%',
      alignItems: 'center',
      marginTop: 20,
    },
    booksCard: {
      width: '100%',
      backgroundColor: '#121212',
    },
    uploadBtn: {
      fontSize: 30,
      margin: 15,
    },
    booksTitle: {
      fontSize: 22,
      margin: 5,
    },
    booksScroll: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    pressable: {
      minWidth: 200,
      minHeight: 300,
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      backgroundColor: 'white',
      padding: 10,
      margin: 10,
    },
    coverContainer: {
      backgroundColor: '#fffef7',
      height: '100%',
      margin: 0,
    },
    bookImg: {
      height: 150,
    },
    cardTitle: {
      fontSize: 15,
      margin: 0,
      marginTop: 5,
      color: '#000',
    },
    cardText: {
      fontSize: 12,
      color: '#000',
    },
    cardDivider: {
      margin: 10,
      width: '90%',
    },
  });
}
