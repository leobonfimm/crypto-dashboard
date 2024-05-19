import { useEffect } from 'react'
import { CryptoChart } from '../components/CryptoChart'
import { Header } from '../components/Header'
import { Summary } from '../components/Summary'
import { env } from '../env'
import { useAppDispatch } from '../store'
import { setPrice } from '../store/slices/binance'

export function Dashboard() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const symbols = ['btcusdt', 'ethusdt', 'solusdt', 'dogeusdt']
    const sockets = symbols.map(
      (symbol) =>
        new WebSocket(
          `${env.VITE_BINANCE_WEB_SOCKET_BASE_URL}/ws/${symbol}@trade`,
        ),
    )

    sockets.forEach((ws) => {
      ws.onopen = () => {
        console.log('WebSocket connection established: ' + ws.url)
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        const symbol = String(data.s).toLowerCase().replace('usdt', '')
        dispatch(setPrice({ symbol, price: data.p }))
      }

      ws.onerror = (error) => {
        console.error('WebSocket Error:', error)
      }

      ws.onclose = () => {
        console.log('WebSocket connection closed')
      }
    })

    return () => {
      sockets.forEach((ws) => {
        if (ws.readyState === 1) {
          ws.close()
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
