import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors } from '../theme/colors';
import { addVehicle } from '../services/vehicleService';
import { Ionicons } from '@expo/vector-icons';

const AddVehicleScreen = ({ navigation }) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!marca || !modelo || !anio || !matricula) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    setLoading(true);
    try {
      await addVehicle({ 
        marca, 
        modelo, 
        anio: parseInt(anio), 
        matricula, 
        usuario_id: 1 // Needs to be dynamic or handled by backend from token
      });
      Alert.alert('Éxito', 'Vehículo añadido', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      Alert.alert('Error', 'No se pudo añadir el vehículo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Añadir Vehículo</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Input label="Marca" value={marca} onChangeText={setMarca} placeholder="Ej: Toyota" />
          <Input label="Modelo" value={modelo} onChangeText={setModelo} placeholder="Ej: RAV4" />
          <Input label="Año" value={anio} onChangeText={setAnio} placeholder="Ej: 2020" keyboardType="numeric" />
          <Input label="Matrícula" value={matricula} onChangeText={setMatricula} placeholder="Ej: 1234 ABC" />
        </View>

        <Button title="Añadir vehículo" onPress={handleAdd} loading={loading} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: colors.text,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  }
});

export default AddVehicleScreen;
