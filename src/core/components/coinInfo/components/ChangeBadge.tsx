import { TrendingDown, TrendingUp } from 'lucide-react'
import { percentFormatter } from '../coinInfo.utils'

interface ChangeBadgeProps {
	value: number
}

export function ChangeBadge({ value }: ChangeBadgeProps) {
	const isPositive = value >= 0

	return (
		<span
			className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-mono font-medium tabular-nums ${
				isPositive
					? 'bg-emerald-500/10 text-emerald-400'
					: 'bg-rose-500/10 text-rose-500'
			}`}
		>
			{isPositive ? (
				<TrendingUp className='h-3 w-3' />
			) : (
				<TrendingDown className='h-3 w-3' />
			)}
			{percentFormatter(value)}
		</span>
	)
}
