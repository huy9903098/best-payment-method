import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import NFC, {
  NfcDataType,
  NdefRecordType,
} from '@smartractechnology/react-native-rfid-nfc';
import AndroidPrompt from './AndroidPrompt';

export default function Game(props) {
  const [start, setStart] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const androidPromptRef = React.useRef(); // call React.useRef() to obtain a ref object

  React.useEffect(() => {
    NFC.addListener(payload => {
      console.log('payload', payload);
      switch (payload.type) {
        case NfcDataType.NDEF:
          let messages = payload.data;
          for (let i in messages) {
            let records = messages[i];
            for (let j in records) {
              let r = records[j];
              if (r.type === NdefRecordType.TEXT) {
                // do something with the text data
              } else {
                console.warn(
                  `Non-TEXT tag of type ${r.type} with data ${r.data}`,
                );
              }
            }
          }
          break;

        case NfcDataType.TAG:
          console.log('hello');
          break;
      }
    });

    // NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
    //   count--;

    //   if (Platform.OS === 'android') {
    //     // set hint text for AndroidPrompt
    //     androidPromptRef.current.setHintText(`${count}...`);
    //   } else {
    //     NfcManager.setAlertMessageIOS(`${count}...`);
    //   }

    //   if (count <= 0) {
    //     NfcManager.unregisterTagEvent().catch(() => 0);
    //     setDuration(new Date().getTime() - start.getTime());

    //     if (Platform.OS === 'android') {
    //       // hide AndroidPrompt
    //       androidPromptRef.current.setVisible(false);
    //     }
    //   }
    // });

    // return () => {
    //   NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    // };
  }, [start]);

  async function scanTag() {
    // await NfcManager.registerTagEvent();
    if (Platform.OS === 'android') {
      // show AndroidPrompt
      androidPromptRef.current.setVisible(true);
    }
    setStart(new Date());
    setDuration(0);
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>NFC Game</Text>

      <View style={styles.content}>
        {(duration > 0 && (
          <Text style={styles.minLabel}>{duration} ms</Text>
        )) || <Text style={styles.minLabel}>Let's go!</Text>}
      </View>

      <TouchableOpacity onPress={scanTag}>
        <View style={styles.btn}>
          <Text style={styles.playLabel}>PLAY!</Text>
        </View>
      </TouchableOpacity>

      <AndroidPrompt ref={androidPromptRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
});
