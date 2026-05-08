import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí", onPress: () => logout(), style: 'destructive' }
      ]
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Ajustes</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
          <View>
            <Text style={styles.name}>Usuario Activo</Text>
            <Text style={styles.email}>Gestiona tu cuenta</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Button 
          title="Cerrar Sesión" 
          onPress={handleLogout} 
          style={styles.logoutButton}
        />
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>AutoCare App v1.0.0</Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: colors.text,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: colors.text,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  logoutButton: {
    backgroundColor: colors.danger,
  },
  infoSection: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  infoText: {
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  }
});

export default SettingsScreen;
