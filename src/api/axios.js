// import axios from 'axios';

// const api = axios.create({ baseURL: 'http://localhost:5000/api' });

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;


import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

api.interceptors.request.use(cfg => {
  const t = localStorage.getItem('token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default api;
