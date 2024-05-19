export const priceFormatter = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 5,
  }).format(number)

export const dateFormatter = (date: Date) =>
  new Intl.DateTimeFormat('pt-BR').format(date)
