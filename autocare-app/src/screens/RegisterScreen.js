import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors } from '../theme/colors';
import { register } from '../services/authService';

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nombre || !email || !password) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }
    setLoading(true);
    try {
      await register({ nombre, email, password, rol: 'user' });
      Alert.alert('Éxito', 'Cuenta creada correctamente', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <View style={styles.formContainer}>
        <Input 
          label="Nombre" 
          value={nombre} 
          onChangeText={setNombre} 
          placeholder="Tu nombre completo"
        />
        <Input 
          label="Correo Electrónico" 
          value={email} 
          onChangeText={setEmail} 
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
        />
        <Input 
          label="Contraseña" 
          value={password} 
          onChangeText={setPassword} 
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
        />
      </View>
      
      <Button title="Registrarse" onPress={handleRegister} loading={loading} />
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Volver al Login</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'Inter_700Bold',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  backButton: {
    marginTop: 20,
  },
  backText: {
    color: colors.textSecondary,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  }
});

export default RegisterScreen;
