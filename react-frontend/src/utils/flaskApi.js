import axios from 'axios';

const flaskApi = axios.create({
    baseURL: 'http://localhost:5001'
  });
  
  export default flaskApi;