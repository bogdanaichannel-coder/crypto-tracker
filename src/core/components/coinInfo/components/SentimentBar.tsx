interface SentimentBarProps {
	upPercentage: number
	downPercentage: number
}

export function SentimentBar({ upPercentage, downPercentage }: SentimentBarProps) {
	const hasVotes = (upPercentage || 0) + (downPercentage || 0) > 0

	return (
		<div className='rounded-2xl border border-slate-200 bg-white p-6'>
			<h3 className='mb-1 text-sm font-semibold text-slate-900'>
				Настроение сообщества
			</h3>
			{!hasVotes ? (
				<p className='mt-3 text-sm text-slate-400'>Недостаточно данных для оценки</p>
			) : (
				<>
					<p className='mb-4 text-xs text-slate-400'>По данным голосований CoinGecko</p>
					<div className='flex h-2 w-full overflow-hidden rounded-full bg-slate-100'>
						<div
							className='h-full bg-emerald-500'
							style={{ width: `${upPercentage}%` }}
						/>
						<div
							className='h-full bg-rose-500'
							style={{ width: `${downPercentage}%` }}
						/>
					</div>
					<div className='mt-2 flex items-center justify-between text-sm font-mono font-semibold tabular-nums'>
						<span className='text-emerald-600'>{upPercentage.toFixed(0)}%</span>
						<span className='text-rose-600'>{downPercentage.toFixed(0)}%</span>
					</div>
					<div className='mt-1 flex items-center justify-between text-xs text-slate-400'>
						<span>Позитивно</span>
						<span>Негативно</span>
					</div>
				</>
			)}
		</div>
	)
}
