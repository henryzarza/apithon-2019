import api from '../config/api';

const nearest = data => api.get(`/clouds/nearest?latitude=${data?.lat}&longitude=${data?.lng}`);

const measurements = () => api.get('/clouds/measurements');

export default {
  nearest,
  measurements
};
