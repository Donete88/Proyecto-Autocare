import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import ScreenContainer from '../components/ScreenContainer';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { getCitas } from '../services/maintenanceService';

LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sept.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const CalendarScreen = ({ navigation }) => {
  const [markedDates, setMarkedDates] = useState({});
  const [citasList, setCitasList] = useState([]);

  useEffect(() => {
    loadCitas();
  }, []);

  const loadCitas = async () => {
    try {
      const data = await getCitas();
      setCitasList(data || []);
      
      const marks = {};
      data?.forEach(cita => {
        const dateStr = cita.fecha_hora.split('T')[0];
        marks[dateStr] = { marked: true, dotColor: colors.secondary };
      });
      setMarkedDates(marks);
    } catch (e) {
      console.log('Error', e);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Calendario</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddMaintenance')}>
          <Ionicons name="add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: '#ffffff',
            todayTextColor: colors.primary,
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: colors.secondary,
            selectedDotColor: '#ffffff',
            arrowColor: colors.primary,
            monthTextColor: colors.text,
            indicatorColor: colors.primary,
            textDayFontFamily: 'Inter_400Regular',
            textMonthFontFamily: 'Inter_700Bold',
            textDayHeaderFontFamily: 'Inter_600SemiBold',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14
          }}
          markedDates={markedDates}
        />
        
        <View style={styles.eventsContainer}>
          {citasList.map((cita, i) => (
             <View key={i} style={styles.eventItem}>
               <View style={styles.dot} />
               <Text style={styles.eventText}>{cita.notas || 'Mantenimiento'} - {new Date(cita.fecha_hora).toLocaleDateString()}</Text>
             </View>
          ))}
        </View>
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
  addButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: colors.text,
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  eventsContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 10,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    marginRight: 10,
  },
  eventText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: colors.text,
  }
});

export default CalendarScreen;
