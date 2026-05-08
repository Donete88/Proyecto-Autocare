import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const VehicleCard = ({ vehicle }) => {
  return (
    <View style={styles.card}>
      <Ionicons name="car" size={40} color={colors.primary} style={styles.icon} />
      <View style={styles.info}>
        <Text style={styles.title}>{vehicle.marca} {vehicle.modelo}</Text>
        <Text style={styles.subtitle}>{vehicle.anio} • {vehicle.matricula}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  }
});

export default VehicleCard;
