import { PiChartLineDown, PiChartLineUpLight } from 'react-icons/pi'
import { SiBitcoin, SiDogecoin, SiEthereum, SiSolana } from 'react-icons/si'
import { CryptoType } from '../store/slices/binance'
import { priceFormatter } from '../utils/formatter'

interface SummaryCardProps {
  coin: CryptoType
  price: number
  firstPrice: number
}

export function SummaryCard({ coin, price, firstPrice }: SummaryCardProps) {
  const priceFormatted = priceFormatter(price)
  const variant =
    firstPrice === 0 ? 0 : ((firstPrice - price) / firstPrice) * 100

  return (
    <div className="min-w-[360px] sm:w-full">
      <div className="bg-zinc-700 rounded-md p-8">
        <header className="flex items-center justify-between text-zinc-300">
          {coin === 'btc' && (
            <>
              <span>Bitcoin (BTC)</span>
              <SiBitcoin size={32} className="text-yellow-200" />
            </>
          )}

          {coin === 'eth' && (
            <>
              <span>Ethereum (ETH)</span>
              <SiEthereum size={32} className="text-blue-300" />
            </>
          )}

          {coin === 'sol' && (
            <>
              <span>Solana (SOL)</span>
              <SiSolana size={32} className="text-indigo-400" />
            </>
          )}

          {coin === 'doge' && (
            <>
              <span>Dogecoin (DOGE)</span>
              <SiDogecoin size={32} className="text-yellow-400" />
            </>
          )}
        </header>

        <div className="flex items-center justify-between mt-8">
          <strong className="block text-3xl text-zinc-100">
            {priceFormatted}
          </strong>
          {variant >= 0 ? (
            <div className="flex items-center gap-1 text-emerald-500">
              <PiChartLineUpLight size={20} />
              <span className="font-mono">{variant.toFixed(3)}%</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-400">
              <PiChartLineDown size={20} />
              <span className="font-mono">{variant.toFixed(3)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
