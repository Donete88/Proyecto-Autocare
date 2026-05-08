import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import VehicleCard from '../components/VehicleCard';
import Button from '../components/Button';
import { getVehicles } from '../services/vehicleService';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const VehiclesScreen = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data || []);
    } catch (e) {
      console.log('Error loading vehicles');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadVehicles();
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVehicles();
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

      <Button 
        title="[+] Añadir vehículo" 
        onPress={() => navigation.navigate('AddVehicle')} 
        type="secondary"
      />

      <View style={styles.listContainer}>
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <VehicleCard vehicle={item} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tienes vehículos registrados.</Text>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      <Button 
        title="Ver mantenimientos" 
        onPress={() => navigation.navigate('Maintenances')} 
        type="secondary"
        style={{ marginTop: 20 }}
      />
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
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#E8F0F8',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
    marginTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  }
});

export default VehiclesScreen;
