import { PiWifiHighBold, PiWifiXBold } from 'react-icons/pi'
import { useAppSelector } from '../store'

export function Header() {
  const isConnectionEstablished = useAppSelector(
    (state) => state.binance.isConnectionEstablished,
  )

  return (
    <div className="w-full bg-zinc-950 px-0 pt-10 pb-28">
      <div className="flex justify-end w-full pr-3 max-w-screen-2xl mx-auto sm:px-0">
        {isConnectionEstablished ? (
          <PiWifiHighBold size={35} className="text-lime-700" />
        ) : (
          <PiWifiXBold size={35} className="text-red-500" />
        )}
      </div>
    </div>
  )
}
