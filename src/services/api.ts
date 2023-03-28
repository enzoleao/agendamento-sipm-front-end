import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()
const api = axios.create({
  baseURL: 'https://web-production-8e74.up.railway.app',
  headers: {
    'x-access-token': `${cookies['auth-token']}`,
    'Content-Type': 'application/json',
  },
})

export default api
