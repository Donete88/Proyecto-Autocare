import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

const Button = ({ title, onPress, type = 'primary', loading = false, style }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        type === 'primary' ? styles.primary : styles.secondary,
        style
      ]} 
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={type === 'primary' ? '#fff' : colors.text} />
      ) : (
        <Text style={[
          styles.text, 
          type === 'primary' ? styles.textPrimary : styles.textSecondary
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: '#E8F0F8', // Lighter background for secondary buttons
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter_600SemiBold',
  },
  textPrimary: {
    color: '#fff',
  },
  textSecondary: {
    color: colors.text,
  }
});

export default Button;
