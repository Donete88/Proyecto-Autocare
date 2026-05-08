import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors } from '../theme/colors';
import { addCita } from '../services/maintenanceService';
import { Ionicons } from '@expo/vector-icons';

const AddMaintenanceScreen = ({ navigation }) => {
  const [notas, setNotas] = useState('');
  const [fecha, setFecha] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!notas || !fecha) {
      Alert.alert('Error', 'Notas y Fecha son obligatorios');
      return;
    }
    setLoading(true);
    try {
      // Basic validation for YYYY-MM-DD format
      await addCita({ 
        vehiculo_id: 1, // Should be selected dynamically
        servicio_id: 1, // Should be selected dynamically
        fecha_hora: `${fecha} 10:00:00`,
        estado: 'pendiente',
        notas: `${notas} - Frecuencia: ${frecuencia}`
      });
      Alert.alert('Éxito', 'Recordatorio añadido', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      Alert.alert('Error', 'No se pudo añadir el recordatorio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Añade el recordatorio</Text>
        <View style={{width: 28}} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Input 
            label="Nombre del mantenimiento" 
            value={notas} 
            onChangeText={setNotas} 
            placeholder="Ej: Cambio de aceite" 
          />
          <Input 
            label="Frecuencia" 
            value={frecuencia} 
            onChangeText={setFrecuencia} 
            placeholder="Ej: Cada 6 meses" 
          />
          <Input 
            label="Fecha" 
            value={fecha} 
            onChangeText={setFecha} 
            placeholder="YYYY-MM-DD" 
          />
          <Input 
            label="Notas adicionales" 
            value={undefined} 
            onChangeText={() => {}} 
            placeholder="Opcional" 
          />
        </View>

        <Button title="Añadir recordatorio" onPress={handleAdd} loading={loading} />
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

export default AddMaintenanceScreen;
