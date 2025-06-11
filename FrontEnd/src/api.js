import axios from 'axios';

const API_BASE = 'localhost:5000'; // adjsuted for local development

export const api = axios.create({
  baseURL: API_BASE,
});