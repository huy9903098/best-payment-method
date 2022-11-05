import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import nfcManager, {NfcEvents} from 'react-native-nfc-manager';

export default function Game() {
  async function scanTag() {
    nfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.warn('tag found', tag);
    });
  }
  return (
    <View style={styles.wrapper}>
      <Text>NFC Game</Text>
      <TouchableOpacity style={styles.btn} onPress={scanTag}>
        <Text>START</Text>
      </TouchableOpacity>
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
