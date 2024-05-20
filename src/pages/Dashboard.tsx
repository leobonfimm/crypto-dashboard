import { useEffect, useRef } from 'react'
import { CryptoChart } from '../components/CryptoChart'
import { Header } from '../components/Header'
import { Summary } from '../components/Summary'
import { env } from '../env'
import { useAppDispatch } from '../store'
import {
  CryptoType,
  setIsConnectionEstablished,
  setPrice,
} from '../store/slices/binance'

type SymbolType = 'btcusdt' | 'ethusdt' | 'solusdt' | 'dogeusdt'

export function Dashboard() {
  const dispatch = useAppDispatch()
  const webSocketRef = useRef<Record<SymbolType, WebSocket | null>>(null)

  useEffect(() => {
    const symbols = [
      'btcusdt',
      'ethusdt',
      'solusdt',
      'dogeusdt',
    ] as SymbolType[]
    let timeout = 0
    const ref = webSocketRef

    function connectWebSocket(symbol: SymbolType, attempt = 0) {
      if (attempt >= env.VITE_MAX_RECONNECT_ATTEMPTS) {
        dispatch(setIsConnectionEstablished(false))
        console.log(`Max reconnection attempts reached for ${symbol}`)
        return
      }

      const ws = new WebSocket(
        `${env.VITE_BINANCE_WEB_SOCKET_BASE_URL}/ws/${symbol}@trade`,
      )

      ws.onopen = () => {
        dispatch(setIsConnectionEstablished(true))
        console.log('WebSocket connection established: ' + ws.url)
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        const symbol = String(data.s)
          .toLowerCase()
          .replace('usdt', '') as CryptoType
        dispatch(setPrice({ symbol, price: data.p }))
      }

      ws.onerror = (error) => {
        dispatch(setIsConnectionEstablished(false))
        console.error('WebSocket Error:', error)
      }

      ws.onclose = () => {
        dispatch(setIsConnectionEstablished(false))
        console.log('WebSocket connection closed, tying reconnect!')

        timeout = setTimeout(() => {
          connectWebSocket(symbol, attempt + 1)
        }, env.VITE_RECONNECT_INTERVAL)
      }

      if (webSocketRef.current) {
        webSocketRef.current[symbol] = ws
      }
    }

    symbols.forEach((symbol) => connectWebSocket(symbol))

    return () => {
      clearTimeout(timeout)

      symbols.forEach((symbol) => {
        if (
          ref.current?.[symbol] &&
          ref.current?.[symbol]?.readyState === WebSocket.OPEN
        ) {
          ref.current?.[symbol]?.close()
        }
      })
    }
  }, [dispatch])

  return (
    <div className="h-screen w-screen bg-zinc-800 flex flex-col">
      <Header />

      <div className="w-full max-w-screen-2xl mx-auto">
        <Summary />

        <div className="w-full mt-4">
          <CryptoChart />
        </div>
      </div>
    </div>
  )
}
