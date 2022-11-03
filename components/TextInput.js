import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { FONTS, COLORS, SIZES, icons } from "../constants";

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={COLORS.primary}
        underlineColor= {COLORS.white}
        underlineColorAndroid= {COLORS.white}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 10,
  },
  input: {
    borderRadius:5,
    backgroundColor: COLORS.white,
  },
  description: {
    fontSize: 10,
    color: COLORS.gray,
    paddingTop: 5,
  },
  error: {
    fontSize: 13,
    color: COLORS.lightRed,
    paddingTop: 8,
  },
})