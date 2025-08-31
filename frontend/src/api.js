import axios from 'axios';

// In dev: vite proxy -> /api goes to backend
// In prod (nginx + ingress): /api will route to backend via Ingress
export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});
