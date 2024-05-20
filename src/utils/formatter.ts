export const priceFormatter = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 5,
  }).format(number)

export const dateFormatter = (date: Date): string =>
  new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date)
