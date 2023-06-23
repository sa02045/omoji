import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export function Tag({
  text,
  handleClick,
}: {
  text: string;
  handleClick?: () => void;
}) {
  const [selected, setSelectedTag] = useState<boolean>(false);

  return (
    <Pressable
      onPress={() => {
        setSelectedTag(!selected);
        handleClick && handleClick();
      }}>
      <View style={styles(selected).tagContainer}>
        <Text style={styles(selected).tagText}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = (selected: boolean) =>
  StyleSheet.create({
    tagContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 12,
      paddingRight: 12,
      borderWidth: 1,
      height: 36,
      borderStyle: 'solid',
      borderColor: selected ? '#C0C0C0' : '#555555',
      borderRadius: 8,
      backgroundColor: selected ? '#C0C0C0' : '#17171B',
    },
    tagText: {
      color: selected ? '#17171B' : '#fff',
      fontWeight: '700',
      fontSize: 14,
    },
  });
