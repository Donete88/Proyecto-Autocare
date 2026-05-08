import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry = false, keyboardType, style }) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
    fontFamily: 'Inter_600SemiBold',
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Inter_400Regular',
  }
});

export default Input;
