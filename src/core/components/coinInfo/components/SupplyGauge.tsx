import { compactFormatter } from '../coinInfo.utils'

interface SupplyGaugeProps {
	circulating: number
	max: number
	total: number
}

export function SupplyGauge({ circulating, max, total }: SupplyGaugeProps) {
	const hasMax = !!max && max > 0
	const percent = hasMax ? Math.min((circulating / max) * 100, 100) : null

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center justify-between text-xs text-muted-foreground'>
				<span className='uppercase tracking-wide'>Supply</span>
				<span className='font-mono tabular-nums'>
					{compactFormatter(circulating)}
					{hasMax ? ` / ${compactFormatter(max)}` : ` / ${compactFormatter(total)}`}
				</span>
			</div>
			<div className='h-1.5 w-full overflow-hidden rounded-full bg-white/5'>
				<div
					className='h-full rounded-full bg-amber-400/80 transition-all'
					style={{ width: hasMax ? `${percent}%` : '100%' }}
				/>
			</div>
			{!hasMax && (
				<span className='text-[11px] text-muted-foreground'>
					Максимальное предложение не ограничено
				</span>
			)}
		</div>
	)
}
