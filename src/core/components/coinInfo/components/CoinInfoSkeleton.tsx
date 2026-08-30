function Block({ className }: { className: string }) {
	return <div className={`animate-pulse rounded-xl bg-slate-100 ${className}`} />
}

export function CoinInfoSkeleton() {
	return (
		<div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
			<div className='flex flex-col gap-4 lg:col-span-2'>
				<div className='rounded-2xl border border-slate-200 bg-white p-6'>
					<div className='flex items-center gap-3'>
						<Block className='h-12 w-12 rounded-full' />
						<div className='flex flex-col gap-2'>
							<Block className='h-5 w-32' />
							<Block className='h-3 w-16' />
						</div>
					</div>
					<Block className='mt-6 h-10 w-48' />
				</div>
				<div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
					{Array.from({ length: 4 }).map((_, i) => (
						<Block key={i} className='h-20 w-full' />
					))}
				</div>
				<Block className='h-40 w-full' />
			</div>
			<div className='flex flex-col gap-4'>
				<Block className='h-56 w-full' />
				<Block className='h-32 w-full' />
				<Block className='h-48 w-full' />
			</div>
		</div>
	)
}
