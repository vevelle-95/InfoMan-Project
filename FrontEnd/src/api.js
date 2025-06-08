import axios from 'axios';

const API_BASE = 'http://infomang11.ddns.net:5000'; // adjust if needed

export const api = axios.create({
  baseURL: API_BASE,
});