import { useAppSelector } from '../store'
import { SummaryCard } from './SummaryCard'

export function Summary() {
  const price = useAppSelector((state) => state.binance.price)
  const firstPrice = useAppSelector((state) => state.binance.firstPrice)

  return (
    <div className="flex px-3 sm:px-0 overflow-x-auto max-sm:overflow-x-hidden gap-6 w-full mt-[-5rem] scrollbar-thin scrollbar-track-zinc-700 scrollbar-thumb-zinc-400">
      <SummaryCard
        coin="btc"
        price={price[0] ? price[0] : 0}
        firstPrice={firstPrice[0] ? firstPrice[0] : 0}
      />
      <SummaryCard
        coin="etc"
        price={price[1] ? price[1] : 0}
        firstPrice={firstPrice[1] ? firstPrice[1] : 0}
      />
      <SummaryCard
        coin="sol"
        price={price[2] ? price[2] : 0}
        firstPrice={firstPrice[2] ? firstPrice[2] : 0}
      />
      <SummaryCard
        coin="doge"
        price={price[3] ? price[3] : 0}
        firstPrice={firstPrice[3] ? firstPrice[3] : 0}
      />
    </div>
  )
}
