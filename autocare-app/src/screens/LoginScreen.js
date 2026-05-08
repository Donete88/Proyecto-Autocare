import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors } from '../theme/colors';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa correo y contraseña');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      // Navigation is handled in AppNavigator when token changes
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas o error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.iconBackground}>
          <Ionicons name="car-sport" size={60} color="#fff" />
        </View>
        <Text style={styles.title}>AUTOCARE</Text>
      </View>

      <View style={styles.formContainer}>
        <Input 
          label="Usuario / Correo" 
          value={email} 
          onChangeText={setEmail} 
          placeholder="Ej: bruno@correo.com"
          keyboardType="email-address"
        />
        <Input 
          label="Contraseña" 
          value={password} 
          onChangeText={setPassword} 
          placeholder="********"
          secureTextEntry
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}> Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Button title="Entrar" onPress={handleLogin} loading={loading} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 50,
  },
  iconBackground: {
    backgroundColor: colors.secondary,
    width: 100,
    height: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  link: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontFamily: 'Inter_600SemiBold',
  }
});

export default LoginScreen;
