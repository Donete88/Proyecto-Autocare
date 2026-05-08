import api from './api';

export const getCitas = async () => {
  const response = await api.get('/api/citas');
  return response.data.data || response.data;
};

export const addCita = async (citaData) => {
  const response = await api.post('/api/citas', citaData);
  return response.data.data || response.data;
};

// Also for services if needed
export const getServicios = async () => {
  const response = await api.get('/api/servicios');
  return response.data.data || response.data;
};
