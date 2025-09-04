import axios from 'axios';




const api = axios.create({
  baseURL:`${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true // Important for cookies
});



export default api;