import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../lib/axios'
import { dateFormatter } from '../../utils/formatter'

export type CryptoType = 'btc' | 'eth' | 'sol' | 'doge'
export type SymbolsType = 'BTCUSDT' | 'ETHUSDT' | 'SOLUSDT' | 'DOGEUSDT'
const symbols: SymbolsType[] = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT']

interface ChartData {
  symbol: SymbolsType
  data: Array<{
    date: string
    price: number
  }>
}

export interface BinanceState {
  price: Array<number | null>
  firstPrice: Array<number | null>
  chartData: ChartData[]
  isFetchingChartData: boolean
  isConnectionEstablished: boolean
}

const initialState: BinanceState = {
  price: new Array(4).fill(null),
  firstPrice: new Array(4).fill(null),
  chartData: [],
  isFetchingChartData: false,
  isConnectionEstablished: false,
}

export const loadChartData = createAsyncThunk('load', async () => {
  try {
    const chartData: ChartData[] = await Promise.all(
      symbols.map(async (symbol) => {
        const response = await api.get<Array<Array<number | string>>>(
          '/klines',
          {
            params: {
              symbol,
              interval: '1d',
            },
          },
        )

        return {
          symbol,
          data: response.data.map((item) => ({
            date: dateFormatter(new Date(item[0])),
            price: Number(item[4]),
          })),
        }
      }),
    )

    return chartData
  } catch (error) {}
})

export const binanceSlice = createSlice({
  name: 'binance',
  initialState,
  reducers: {
    setPrice(
      state,
      action: PayloadAction<{
        symbol: CryptoType
        price: number
      }>,
    ) {
      if (!state.isConnectionEstablished) return

      const symbol = action.payload.symbol
      const price = action.payload.price
      switch (symbol) {
        case 'btc':
          if (state.firstPrice[0] === null) state.firstPrice[0] = price
          state.price[0] = price
          break
        case 'eth':
          if (state.firstPrice[1] === null) state.firstPrice[1] = price
          state.price[1] = price
          break
        case 'sol':
          if (state.firstPrice[2] === null) state.firstPrice[2] = price
          state.price[2] = price
          break
        case 'doge':
          if (state.firstPrice[3] === null) state.firstPrice[3] = price
          state.price[3] = price
          break
      }
    },

    setIsConnectionEstablished(state, action: PayloadAction<boolean>) {
      state.isConnectionEstablished = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(loadChartData.pending, (state) => {
      state.isFetchingChartData = true
    })

    builder.addCase(loadChartData.fulfilled, (state, action) => {
      state.chartData = action.payload!
      state.isFetchingChartData = false
    })
  },
})

export const binance = binanceSlice.reducer
export const { setPrice, setIsConnectionEstablished } = binanceSlice.actions
