import axios from 'axios';

const API_BASE = 'http://localhost:5000'; // adjusted for local development

export const api = axios.create({
   baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});
