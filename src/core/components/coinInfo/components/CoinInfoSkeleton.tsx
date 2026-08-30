import { Card, Skeleton } from '@/core/components/ui'

export function CoinInfoSkeleton() {
	return (
		<Card className='flex flex-col gap-6 border-white/70 bg-yellow-50 p-6'>
			<div className='flex items-center gap-3'>
				<Skeleton className='bg-amber-200 h-12 w-12 rounded-full' />
				<div className='flex flex-col gap-2'>
					<Skeleton className='bg-amber-200 h-5 w-32' />
					<Skeleton className='bg-amber-200 h-3 w-16' />
				</div>
			</div>
			<Skeleton className='bg-amber-200 h-10 w-48' />
			<div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
				{Array.from({ length: 4 }).map((_, i) => (
					<Skeleton key={i} className='h-16 bg-amber-200 w-full' />
				))}
			</div>
			<Skeleton className='bg-amber-200 h-20 w-full' />
		</Card>
	)
}
