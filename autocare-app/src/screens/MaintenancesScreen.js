import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { getCitas } from '../services/maintenanceService';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const MaintenancesScreen = ({ navigation }) => {
  const [citas, setCitas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const data = await getCitas();
      setCitas(data || []);
    } catch (e) {
      console.log('Error loading maintenances');
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

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="build" size={30} color={colors.secondary} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{item.notas || 'Mantenimiento'}</Text>
          <Text style={styles.subtitle}>{new Date(item.fecha_hora).toLocaleDateString()}</Text>
          <Text style={styles.status}>{item.estado}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mantenimientos</Text>
        <View style={{width: 24}} />
      </View>

      <Button 
        title="[+] Añadir recordatorio" 
        onPress={() => navigation.navigate('AddMaintenance')} 
        type="primary"
        style={{ marginBottom: 20 }}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={citas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay mantenimientos programados.</Text>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'Inter_700Bold',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: '#E8F0F8',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconContainer: {
    marginRight: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  status: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 2,
    textTransform: 'capitalize',
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

export default MaintenancesScreen;
