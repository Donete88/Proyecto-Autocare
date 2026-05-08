import api from './api';

export const getVehicles = async () => {
  const response = await api.get('/api/vehiculos');
  return response.data.data || response.data;
};

export const addVehicle = async (vehicleData) => {
  const response = await api.post('/api/vehiculos', vehicleData);
  return response.data.data || response.data;
};
