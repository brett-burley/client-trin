import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge, Overlay, Text, Card } from '@rneui/themed';



export default function Upload({ isVisible, onClose })
{
  useEffect(() => {
    if(isVisible)
      setTimeout(() => onClose(), 4000);
  }, [isVisible])

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={sty.overlay}
    >
      <UnavailableMsg />
    </Overlay>
  );
}


function UnavailableMsg()
{
  return (
    <View style={sty.cardContainer}>
      <Card containerStyle={sty.card}>
        <Badge
          value="Sorry"
          status="error"
          badgeStyle={sty.badge}
          textStyle={sty.badgeText}
        />
        <Text style={sty.message}>Uploading text is temporarily disabled</Text>
      </Card>
    </View>
  );
}

const sty = StyleSheet.create({
  overlay: {
    backgroundColor: '#303337',
    width: '50%',
    height: '50%',
    padding: 0,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    border: 0,
    padding: 0,
    backgroundColor: '#242424',
  },
  card: {
    width: '90%',
    height: '80%',
    elevation: 5,
    justifyContent: 'center',
  },
  badge: {
    margin: 'auto',
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  badgeText: {
    fontSize: 25,
  },
  message: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
  },
});




/*
import { useState, useRef, useEffect } from 'react';
import { Platform, Pressable, View, StyleSheet } from 'react-native';
import { Badge, Overlay, Divider, Dialog, Text, Card, Button, Input, Icon } from '@rneui/themed';
//import useLibrary from '../../hooks/useLibrary';
//import Constants from 'expo-constants'
//import * as DocumentPicker from 'expo-document-picker';
//import * as FileSystem from 'expo-file-system';
//import { formatMandarin } from '../../lib/text/text';
//import * as Clipboard from 'expo-clipboard';

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
      <Text style={sty.title}>Upload Book</Text>

      <View style={sty.content}>
        <Input
          placeholder="Title"
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        <Input
          placeholder="Text"
          value={text}
          onChangeText={(value) => setText(value)}
          multiline={true}
          numberOfLines={4}
        />
        <Button title="Upload" onPress={handleUpload} />
      </View>

  return (
    <View style={sty.container}>
      <View style={sty.body}>
        <UploadBody />
      </View>
    </View>
  );



  function UploadBody()
  {
    const [text, setText] = useState();
    const web = Platform.OS === 'web';

    return (
      <UploadContent />
    );


    function UploadContent()
    {
      const textRef = useRef('');
      const hasText = text && text.length > 0;
      if(hasText) {
        return (
          <View>
            <SaveText isVisible={hasText} clearText={() => setText(false)}/>
            <Text>{text}</Text>
          </View>
        );
      } else {
        return (
          <View style={sty.uploadContent}>
            <Button
              title="Press to Upload File"
              onPress={uploadPressed}
              titleStyle={sty.uploadBtn}
              size="lg"
              raised={true}
            />

            <Text style={sty.uploadText}>Or</Text>

            <Button 
              onPress={pastePressed}
              type="outline"
              size="lg"
              radius={"sm"}
              raised={true}
              titleStyle={sty.uploadBtn}
            >
              Paste from Clipboard
              <Icon type="font-awesome" name="paste" />
            </Button>
            {/*
            <Input
              label='Paste your Text here'
              labelStyle={sty.pasteLabel}
              placeholder='Paste Text'
              style={sty.pasteText}
              onChangeText={value => setText(value)}
            />
          </View>
        );
      }
    }


    async function pastePressed()
    {
      try {
        const text = await Clipboard.getStringAsync();
        setText(text);
      } catch(e) {
        console.error(e);
        setText(null);
      } 
    }

    async function uploadPressed()
    {
      try {
        await getLocalFile();
      } catch(e) {
        console.error(e);
        setText(null);
      }
    }


    async function getLocalFile()
    {
      try {
        let text;
        const doc = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: true,
          type: 'text/*'
        });

        if(web)
          text = await doc.file.text();
        else
          text = await FileSystem.readAsStringAsync(doc.uri);

        setText(text);
      } catch(e) {
        console.log(e);
        setText(null);
      }
    }

    function SaveText({ isVisible, clearText })
    {
      const [title, setTitle] = useState('');
      const titleRef = useRef('');
      const authorRef = useRef('');
      const { saveBook } = useLibrary();

      console.log(title);

      return (
        <Dialog isVisible={isVisible} overlayStyle={sty.dialog}>
          <Dialog.Title title="Does this look right?" />
          <Dialog.Title title="Add some more info" />
          <Divider />
          <TitleInput />       
          <AuthorInput />
          <Dialog.Actions>
            <Dialog.Button 
              onPress={saveToBooks}
              title="Save to Books"
              type="solid"
              size="lg"
              disabled={!title}
            />

            <Dialog.Button
              onPress={cancelSave}
              title="Cancel"
              size="lg"
            />
          </Dialog.Actions>
        </Dialog>
      );


      function cancelSave()
      {
        setText(null);
      }


      async function saveToBooks()
      {
        if(!title || title.length < 1) {
          titleRef.current.shake();
        } else {
          await saveBook(title, text, authorRef.current);
          clearText();
          navigation.navigate('Books');
        }
      }


      function TitleInput()
      {
        useEffect(() => {
          if(title.length)
            titleRef.current.focus();
        },[title]);
        return (
          <Input
            ref={titleRef}
            value={titleRef.current}
            placeholder="Enter a Title"
            rightIcon={<Icon type="material" name="my-library-books" />}
            onChangeText={value => {
              titleRef.current = value;
              setTitle(value);
            }}
            errorMessage="Required"
            containerStyle={sty.nameInput}
            errorStyle={sty.error}
          />
        );
      }


      function AuthorInput()
      {
        return (
         <Input
            ref={authorRef}
            placeholder="Enter a Author"
            rightIcon={<Icon type="font-awesome" name="address-book" />}
            onChangeText={value => authorRef.current = value}
            errorMessage="Optional"
            containerStyle={sty.nameInput}
            errorStyle={sty.nonError}
          />
        );

      }
    }
  }

const sty = StyleSheet.create({
  overlay: {
    backgroundColor: '#fff',
    width: '50%',
    height: '50%',
  },
  title: {
    color: '#000',
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    margin: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    height: '50%',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  badge: {
    margin: 30,
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  badgeText: {
    fontSize: 25,
  },
  message: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderColor: 'rgba(32,139,220,0.7)',
    borderWidth: 1,
    boxShadow: '3px 5px 7px 2px rgba(0,0,0,0.2)',
  },
  body: {
    height: '90%',
    width: '90%',
    flex: 1,
  },
  uploadContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  uploadBtn: {
    fontSize: 20,
    margin: 10,
  },
  uploadText: {
    fontSize: 20,
    fontWeight: '600',
  },
  pasteLabel: {
    fontSize: 20,
    textAlign: 'center',
  },
  pasteText: {
    height: 100,
    alignText: 'center',
  },
  saveBtn: {
    marginTop: 10,
  },
  dialog: {
    width: '25%',
    textAlign: 'center',
  },
  nameInput: {
    marginTop: 10,
    marginBottom: 10,
  },
  error: {
    fontSize: 15,
  },
  nonError: {
    color: '#439946',
    fontSize: 15,
  },
});
  */




