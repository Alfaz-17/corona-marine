import axios from 'axios';




const api = axios.create({
  baseURL: `https://corona-marine.onrender.com/api`,
  withCredentials: true // Important for cookies
});



export default api;