import { TrendingDown, TrendingUp } from 'lucide-react'
import { percentFormatter } from '../coinInfo.utils'

interface ChangeBadgeProps {
	value: number
	size?: 'sm' | 'lg'
}

export function ChangeBadge({ value, size = 'sm' }: ChangeBadgeProps) {
	const isPositive = value >= 0
	const sizeClasses = size === 'lg' ? 'px-3 py-1 text-base' : 'px-2 py-0.5 text-xs'

	return (
		<span
			className={`inline-flex items-center gap-1 rounded-md font-mono font-semibold tabular-nums ${sizeClasses} ${
				isPositive
					? 'bg-emerald-50 text-emerald-600'
					: 'bg-rose-50 text-rose-600'
			}`}
		>
			{isPositive ? (
				<TrendingUp className={size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'} />
			) : (
				<TrendingDown className={size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'} />
			)}
			{percentFormatter(value)}
		</span>
	)
}
