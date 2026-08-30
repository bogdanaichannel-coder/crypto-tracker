import { ChartPoint } from '@/core/lib/chart-utils'
import { ReactNode } from 'react'
const currencyFormatter = new Intl.NumberFormat('ru-RU', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
})

const compactFormatter = new Intl.NumberFormat('en-US', {
	notation: 'compact',
	maximumFractionDigits: 2,
})

function formatFullDate(timestamp: number) {
	const d = new Date(timestamp)
	const pad = (n: number) => String(n).padStart(2, '0')
	return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`
}

interface ChartTooltipProps {
	active?: boolean
	payload?: Array<{ payload: ChartPoint }>
}
const Tooltip = ({ children }: { children: ReactNode[] }) => {
	return <div className='flex justify-between w-full gap-4'>{children}</div>
}
export function ChartTooltip({ active, payload }: ChartTooltipProps) {
	if (!active || !payload?.length) return null

	const point = payload[0].payload

	return (
		<div className='rounded-md border  bg-white px-3 py-2 shadow-md'>
			<div className='flex-col gap-x-4 gap-y-1 text-sm'>
				<Tooltip>
					<span className='text-muted-foreground'>Цена:</span>
					<span className='text-right font-medium'>
						{currencyFormatter.format(point.price)}
					</span>
				</Tooltip>
				<Tooltip>
					<span className='text-muted-foreground'>Объём, 24Ч:</span>
					<span className='text-right font-medium'>
						{compactFormatter.format(point.volume)}$
					</span>
				</Tooltip>

				<Tooltip>
					<span className='text-muted-foreground'>Дата:</span>
					<span className='text-right font-medium'>
						{formatFullDate(point.timestamp)}
					</span>
				</Tooltip>
			</div>
		</div>
	)
}
