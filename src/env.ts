import { z } from 'zod'

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  VITE_BINANCE_WEB_SOCKET_BASE_URL: z.string(),
  VITE_BINANCE_API_BASE_URL: z.string(),
  VITE_RECONNECT_INTERVAL: z.string().transform((value) => Number(value)),
  VITE_MAX_RECONNECT_ATTEMPTS: z.string().transform((value) => Number(value)),
})

export const env = envSchema.parse(import.meta.env)
