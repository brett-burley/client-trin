import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Button, Dialog } from '@rneui/themed';

export default function TimedPopup({ visible, children })
{
  if(!visible) return null;
  return (
    <Dialog
      isVisible={visible}
      overlayStyle={{ padding: 0 }}
    >
      <View style={sty.dialogContent}>
        { children }
      </View>
    </Dialog>
  );
}


const sty = StyleSheet.create({
  dialogContent: {
    flex: 1,
    alignItems: 'center',
    margin: 30,
  },
});
