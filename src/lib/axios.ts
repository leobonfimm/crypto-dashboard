import axios from 'axios'
import { env } from '../env'

export const api = axios.create({
  baseURL: env.VITE_BINANCE_API_BASE_URL,
})
