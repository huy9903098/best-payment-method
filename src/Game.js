import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';
import {CardIOModule} from 'react-native-awesome-card-io';
import NfcCardReader from 'react-native-nfc-card-reader';

export default function Game(props) {
  const [start, setStart] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const androidPromptRef = React.useRef(); // call React.useRef() to obtain a ref object

  React.useEffect(() => {
    NfcCardReader.startNfc(function (cardDetails) {
      // Card details contain the callback data below, see the options.
      console.log('scan card');
    });
    // let count = 5;

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
    await NfcManager.registerTagEvent();
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
