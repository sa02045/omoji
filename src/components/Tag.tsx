import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function Tag({text}: {text: string}) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tag}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    height: 24,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    padding: 3,
    paddingLeft: 8,
    marginRight: 8,
  },
});
