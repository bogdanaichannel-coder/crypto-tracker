import { useCoinQuery } from '@/core/api/query/useCoinQuery'
import { CoinInfo } from '@/core/components/coinInfo/coinInfo'
import { PriceChart } from '@/core/components/priceChart/priceChart'
import { Button, DatePickerWithRange, Skeleton } from '@/core/components/ui'
import { IconArrowBackUp } from '@tabler/icons-react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export const Route = createFileRoute('/crypto/$coin')({
	component: RouteComponent,
})

function RouteComponent() {
	const { coin } = Route.useParams()
	const [date, setDate] = useState<DateRange | undefined>()
	const [acceptDate, setaccept] = useState<DateRange | undefined>()
	const {
		history: { back },
	} = useRouter()
	const {
		coinChart: { data: chartData, error: chartError, isPending: chartPending },
		coinInfo: { data, isPending, isError },
	} = useCoinQuery({
		coin,
		date: acceptDate,
	})

	return (
		<div>
			<div className='flex mb-4 '>
				<Button onClick={() => back()} variant={'outline'}>
					<IconArrowBackUp />
					Назад
				</Button>
			</div>
			<CoinInfo data={data} isPending={isPending} isError={isError} />

			<div className='flex p-4 gap-4 align-middle justify-end'>
				<DatePickerWithRange setDateRange={setDate} />
				<Button
					className='bg-amber-400 text-black hover:bg-amber-300'
					onClick={() => setaccept(date)}
				>
					Обновить
				</Button>
			</div>

			{chartPending && <Skeleton className='w-full h-100 border-white/70' />}
			{chartData && <PriceChart data={chartData} />}
		</div>
	)
}
