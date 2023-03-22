import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()
const api = axios.create({
  baseURL: 'https://api-agendamento-pmpa.herokuapp.com',
  headers: {
    'x-access-token': `${cookies['auth-token']}`,
    'Content-Type': 'application/json',
  },
})

export default api
