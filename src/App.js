import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';
import Game from './Game';

function App() {
  const [hasNfc, setHasNfc] = React.useState(null);

  React.useEffect(() => {
    async function checkNfc() {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
      }
      setHasNfc(supported);
    }

    checkNfc();
  });
  if (hasNfc === null) {
    return null;
  } else if (!hasNfc) {
    return (
      <View style={styles.wrapper}>
        <Text> This device doesnt support nfc</Text>
        <AndroidPrompt />
      </View>
    );
  }

  return <Game />;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
