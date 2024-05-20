import configureMockStore from 'redux-mock-store'
import { setIsConnectionEstablished, setPrice } from './binance'

const mockStore = configureMockStore()

describe('binance slice', () => {
  it('should set price', () => {
    const store = mockStore({})

    store.dispatch(setPrice({ symbol: 'btc', price: 50000 }))

    const actionsDispatched = store.getActions()

    expect(actionsDispatched[0]).toStrictEqual({
      type: 'binance/setPrice',
      payload: { symbol: 'btc', price: 50000 },
    })
  })

  it('should set the connection status', () => {
    const store = mockStore({})
    const actionsDispatched = store.getActions()

    store.dispatch(setIsConnectionEstablished(true))

    expect(actionsDispatched[0]).toStrictEqual({
      type: 'binance/setIsConnectionEstablished',
      payload: true,
    })
  })
})
