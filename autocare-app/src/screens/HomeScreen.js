import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { getVehicles } from '../services/vehicleService';
import { getCitas } from '../services/maintenanceService';
import VehicleCard from '../components/VehicleCard';

const HomeScreen = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [citas, setCitas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const vData = await getVehicles();
      const cData = await getCitas();
      setVehicles(vData || []);
      setCitas(cData || []);
    } catch (e) {
      console.log('Error loading home data');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="car-sport" size={24} color="#fff" />
          </View>
          <Text style={styles.headerTitle}>AUTOCARE</Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.section}>
          <View style={styles.selectorContainer}>
            <Text style={styles.sectionTitle}>Selecciona tu vehículo</Text>
            {vehicles.length > 0 ? (
              <VehicleCard vehicle={vehicles[0]} />
            ) : (
              <Text style={styles.emptyText}>No tienes vehículos. Añade uno.</Text>
            )}
          </View>
        </View>

        <View style={styles.listContainer}>
          {citas.slice(0, 4).map((cita, index) => (
            <View key={index} style={styles.maintenanceItem}>
              <Ionicons name="build" size={24} color={colors.textSecondary} style={styles.mIcon} />
              <View style={styles.mTextContainer}>
                <Text style={styles.mTitle}>{cita.notas || 'Mantenimiento'}</Text>
                <Text style={styles.mSubtitle}>{new Date(cita.fecha_hora).toLocaleDateString()}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionsContainer}>
          <Button 
            title="[+] Añadir mantenimiento" 
            onPress={() => navigation.navigate('AddMaintenance')} 
            type="secondary"
          />
          <Button 
            title="Ver calendario" 
            onPress={() => navigation.navigate('Calendar')} 
            type="secondary"
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: colors.secondary,
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'Inter_700Bold',
  },
  section: {
    marginBottom: 20,
  },
  selectorContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: colors.text,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    marginBottom: 20,
    minHeight: 150,
  },
  maintenanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  mIcon: {
    marginRight: 15,
  },
  mTextContainer: {
    flex: 1,
  },
  mTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: colors.text,
  },
  mSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  actionsContainer: {
    gap: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
    marginVertical: 10,
  }
});

export default HomeScreen;
