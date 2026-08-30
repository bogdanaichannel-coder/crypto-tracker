import { HistoryRow } from '../coinInfo.types'
import { ChangeBadge } from './ChangeBadge'

interface PriceHistoryTableProps {
	rows: HistoryRow[]
}

export function PriceHistoryTable({ rows }: PriceHistoryTableProps) {
	if (!rows.length) return null

	return (
		<div className='rounded-2xl border border-slate-200 bg-white p-6'>
			<h3 className='mb-4 text-sm font-semibold text-slate-900'>
				История цен (USD)
			</h3>
			<div className='flex items-center justify-between border-b border-slate-100 pb-2 text-xs uppercase tracking-wide text-slate-400'>
				<span>Период сравнения</span>
				<span>Изменение (%)</span>
			</div>
			<div className='flex flex-col'>
				{rows.map(row => (
					<div
						key={row.label}
						className='flex items-center justify-between border-b border-slate-50 py-2.5 text-sm last:border-none'
					>
						<span className='text-slate-600'>{row.label}</span>
						<ChangeBadge value={row.value} />
					</div>
				))}
			</div>
		</div>
	)
}
