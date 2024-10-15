import axios from 'axios'

// axios.defaults.withCredentials = true,
axios.defaults.baseURL = 'https://fakestoreapi.com/';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}