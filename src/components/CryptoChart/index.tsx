import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useEffect, useMemo, useState } from 'react'
import { BiLoader } from 'react-icons/bi'
import { SiBitcoin, SiDogecoin, SiEthereum, SiSolana } from 'react-icons/si'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAppDispatch, useAppSelector } from '../../store'
import { loadChartData } from '../../store/slices/binance'
import { priceFormatter } from '../../utils/formatter'
import { CustomTooltip } from './components/CustomTooltip'

const toggleGroupItemClasses =
  'flex items-center gap-1 text-xs sm:text-base bg-zinc-50 hover:bg-zinc-200 data-[state=on]:bg-zinc-400 h-[35px] flex items-center justify-center first:rounded-l last:rounded-r focus:z-10'

type CoinType = 'BTCUSDT' | 'ETHUSDT' | 'SOLUSDT' | 'DOGEUSDT'

const COLOR_CHART = {
  BTCUSDT: '#FEF08A',
  ETHUSDT: '#93C5FD',
  SOLUSDT: '#818CF8',
  DOGEUSDT: '#FACC15',
}

export function CryptoChart() {
  const dispatch = useAppDispatch()
  const [coinSelected, setCoinSelected] = useState<CoinType>('BTCUSDT')
  const chartData = useAppSelector((state) => state.binance.chartData)
  const isFetchingChartData = useAppSelector(
    (state) => state.binance.isFetchingChartData,
  )

  useEffect(() => {
    dispatch(loadChartData())
  }, [dispatch])

  function handleSelectedCoin(kind: CoinType) {
    setCoinSelected(kind)
  }

  const chartDataFiltered = useMemo(() => {
    return chartData
      .filter((coin) => coin.symbol === coinSelected)
      .map((coin) => coin.data)
      .flat()
  }, [coinSelected, chartData])

  return (
    <div className="h-fit bg-zinc-900 rounded-md pb-10 pt-3 px-4">
      {isFetchingChartData ? (
        <div className="flex h-[500px] items-center justify-center">
          <BiLoader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <>
          <header className="flex gap-4 items-center justify-center mb-4 sm:mt-2">
            <ToggleGroup.Root
              type="single"
              defaultValue="BTCUSDT"
              className="inline-flex bg-white rounded ml-0 sm:ml-7"
              aria-label="Select Coin"
              onValueChange={handleSelectedCoin}
            >
              <ToggleGroup.Item
                className={`${toggleGroupItemClasses} px-1 sm:px-5`}
                value="BTCUSDT"
                aria-label="Bitcoin"
              >
                <SiBitcoin size={16} />
                BTC
              </ToggleGroup.Item>
              <ToggleGroup.Item
                className={`${toggleGroupItemClasses} px-1 sm:px-5`}
                value="ETHUSDT"
                aria-label="Ethereum"
              >
                <SiEthereum size={16} />
                ETH
              </ToggleGroup.Item>
              <ToggleGroup.Item
                className={`${toggleGroupItemClasses} px-1 sm:px-5`}
                value="SOLUSDT"
                aria-label="Solana"
              >
                <SiSolana size={16} />
                SOL
              </ToggleGroup.Item>
              <ToggleGroup.Item
                className={`${toggleGroupItemClasses} px-5 sm:px-7`}
                value="DOGEUSDT"
                aria-label="Dogecoin"
              >
                <SiDogecoin size={16} />
                DOGE
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </header>

          <ResponsiveContainer width="100%" height={500}>
            <AreaChart
              width={500}
              height={300}
              data={chartDataFiltered}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="date"
                stroke="#888"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) => priceFormatter(value)}
              />

              <CartesianGrid vertical={false} className="stroke-muted" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                strokeWidth={3}
                stroke={COLOR_CHART[coinSelected]}
                fill={COLOR_CHART[coinSelected]}
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  )
}
