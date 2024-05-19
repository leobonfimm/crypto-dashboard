import { TooltipProps } from 'recharts'
import { priceFormatter } from '../../../utils/formatter'

interface CustomTooltipProps extends TooltipProps<number, string> {}

export function CustomTooltip({ active, label, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-100 p-4 rounded-md">
        <p>{`Date: ${label}`}</p>
        <p className="mt-2">{`Price: ${priceFormatter(Number(payload[0].value))}`}</p>
      </div>
    )
  }

  return null
}
