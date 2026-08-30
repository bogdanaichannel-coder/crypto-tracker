import { ReactNode } from 'react'

interface StatCardProps {
	label: string
	value: ReactNode
	hint?: ReactNode
}

export function StatCard({ label, value, hint }: StatCardProps) {
	return (
		<div className='grid grid-rows-3 rounded-xl border border-slate-200 bg-white p-4'>
			<span className='block text-xs uppercase tracking-wide text-slate-400'>
				{label}
			</span>
			<span className='mt-1 block font-mono text-lg font-semibold tabular-nums text-slate-900'>
				{value}
			</span>
			{hint && (
				<span className='mt-0.5 block text-xs text-slate-400'>{hint}</span>
			)}
		</div>
	)
}
