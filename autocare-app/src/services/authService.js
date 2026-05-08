import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, contraseña: password });
  const responseData = response.data.data || response.data;
  if (responseData.token) {
    await AsyncStorage.setItem('userToken', responseData.token);
  }
  return responseData;
};

export const register = async (userData) => {
  const payload = {
    ...userData,
    contraseña: userData.password,
    rol: userData.rol === 'user' ? 'cliente' : userData.rol
  };
  delete payload.password;
  const response = await api.post('/api/auth/register', payload);
  return response.data.data || response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('userToken');
};
