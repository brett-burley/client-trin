import { useEffect, useState } from 'react';
import { Platform, View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text, Icon, Button } from '@rneui/themed';
import DownloadDialog from '../../layout/DownloadDialog';


export default function Landing({ navigation })
{
  return (
    <View style={sty.homepage}>
      <View style={sty.main}>
        <View style={sty.mainText}>
          <Text style={sty.title}>Trin</Text>
          <Text style={sty.subtitle}>
            Learn by reading what you want
          </Text>
        </View>

        <GotoBtn onPress={() => navigation.navigate('Library')} />

        <MobileBtns />
      </View>

      <View style={sty.footer}>
        <Text style={sty.footerText}>
          Thank you for trying out us out!
        </Text>
        <Text style={sty.footerEmail}>Questions / Problems?</Text>
        <Text style={sty.footerEmail}>email us at The.Trin.App@gmail.com</Text>
      </View>
    </View>
  );
}


function GotoBtn({ onPress })
{
  const styles = getStyles();

  return (
    <Button
      onPress={onPress}
      type="solid"
      color="#5eead4"
      size="lg"
      titleStyle={styles.btnTitle}
    >
      Go to the Web App
      <Icon 
        type="font-awesome-5"
        name="hand-point-right"
        color='#fff'
        iconStyle={styles.icon} 
      />
    </Button>
  );

  function getStyles()
  {
    const { width } = useWindowDimensions();
    const fontScale = width / 15;
    const fontSize = fontScale > 40 ? 40 : fontScale;

    return {
      btnTitle: {
        fontSize,
        color: '#fff',
        textShadow: '2px 2px 5px rgba(1, 19, 3, 0.9)',
        margin: 20,
      },
      icon: {
        textShadow: '2px 2px 2px rgba(1, 19, 3, 0.7)',
        fontSize: fontSize,
      },
    }
  }
}



function MobileBtns()
{
  const [show, setShow] = useState(false);

  useEffect(() => {
    if(show)
      setTimeout(() => setShow(false), 5000);
  }, [show])
  
  return (
    <View style={sty.mobileBtns}>
      <Button
        type="outline"
        size="lg"
        onPress={() => setShow(true)}
        containerStyle={sty.mobileBtn}
      >
        <Text style={sty.mobileText}>Download for Android</Text>
        <Icon type="antdesign" name="android" color="#fff" size={30} />
      </Button>

      <Button
        type="outline"
        size="lg"
        onPress={() => setShow(true)}
        containerStyle={sty.mobileBtn}
      >
        <Text style={sty.mobileText}>Download for Apple</Text>
        <Icon type="antdesign" name="apple-o" color="#fff" size={30} />
      </Button>

      <DownloadDialog show={show}>
        <Text style={sty.dialogTitle}>Sorry! Mobile App coming soon!</Text>
        <Text style={sty.dialogText}>We are working hard so you can take Trin with you everywhere.</Text>
      </DownloadDialog>
      
    </View>
  );
}


const sty = StyleSheet.create({
  homepage: {
    flex: 1,
  },
  main: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexGrow: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 30,
    backgroundImage: 'linear-gradient(to right, rgba(15,32,39,0.8), rgba(32,58,67,0.8), rgba(44,83,100,0.8)), url("https://images.unsplash.com/photo-1525352265139-caa4490ea6d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80")',
  },
  mainText: {
    textAlign: 'center',
  },
  title: {
    fontSize: 90,
    fontWeight: '700',
    color: '#5eead4',
    textShadow: '3px 3px 10px rgba(1, 19, 3, 0.75)',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    textShadow: '2px 2px 5px rgba(1, 19, 3, 0.75)',
  },
  mobileBtns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 20,
    flexWrap: 'wrap',
  },
  mobileBtn: {
    flexGrow: 1,
    maxWidth: 300,
  },
  mobileText: {
    fontSize: 20,
    color: '#fff',
    margin: 15,
  },
  footer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1c1f',
  },
  footerText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 10,
  },
  footerEmail: {
    color: '#fff',
    fontSize: 12,
  },
  dialogTitle: {
    fontSize: 25,
    fontWight: '500',
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  dialogText: {
    fontSize: 20,
  },
});
