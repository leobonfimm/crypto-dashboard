import { dateFormatter, priceFormatter } from './formatter'

describe('formatter', () => {
  it('should format number to USD currency', () => {
    expect(priceFormatter(1000)).toBe('$1,000.00')
  })

  it('should format date to pt-BR locale', () => {
    const date = new Date('2023-05-20')

    expect(dateFormatter(date)).toBe('20/05/2023')
  })
})
