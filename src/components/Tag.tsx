import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function Tag({text}: {text: string}) {
  return (
    <View style={styles.tagContainer}>
      <Text style={styles.tag}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: '#C0C0C0',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    padding: 3,
    paddingLeft: 8,
    paddingRight: 8,
  },
  tag: {
    color: '#17171B',
    fontSize: 12,
  },
});
