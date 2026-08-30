import { useCoinsQuery } from '@/core/api/query/useCoinsQuery'
import { ICoinListItem } from '@/core/types/coins'
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shadcnUI'
import { Link } from '@tanstack/react-router'
import {
	ColumnDef,
	createColumnHelper,
	tableFeatures,
	useTable,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { Skeleton } from '../ui/skeleton'

const PER_PAGE = 40

const GRID_ROW_CLASS =
	'grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1fr_160px_1fr] w-full'

type Props = {}

const features = tableFeatures({})
const columnHelper = createColumnHelper<typeof features, ICoinListItem>()

const Spinner = ({ className = '' }: { className?: string }) => (
	<svg
		className={`animate-spin ${className}`}
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
	>
		<circle
			cx='12'
			cy='12'
			r='10'
			stroke='currentColor'
			strokeWidth='3'
			opacity='0.25'
		/>
		<path
			d='M22 12a10 10 0 0 0-10-10'
			stroke='currentColor'
			strokeWidth='3'
			strokeLinecap='round'
		/>
	</svg>
)

export const CoinsTable = ({}: Props) => {
	const [page, setPage] = useState<number>(1)
	const [coins, setCoins] = useState<ICoinListItem[]>([])
	const { data, isFetching, isError, error, isBlocked } = useCoinsQuery({
		per_page: PER_PAGE,
		page,
	})

	useEffect(() => {
		if (!data) return
		setCoins(prev => (page === 1 ? data : [...prev, ...data]))
	}, [data, page])

	const nextPage = () => setPage(v => v + 1)

	const columns: ColumnDef<typeof features, ICoinListItem, any>[] = useMemo(
		() => [
			columnHelper.accessor(
				row => ({ image: row.image, name: row.symbol.toUpperCase() }),
				{
					id: 'coin',
					header: 'Монета',
					cell: info => (
						<span className='flex items-center gap-2 w-fit font-medium'>
							<img
								src={info.getValue().image}
								alt='coin'
								width={22}
								height={22}
								className='rounded-full shrink-0'
							/>
							{info.getValue().name}
						</span>
					),
				},
			),
			columnHelper.accessor('current_price', {
				header: () => 'Последняя цена',
				cell: info => {
					const value = info.getValue<number>()
					return <span className='font-medium'>${value?.toLocaleString()}</span>
				},
			}),
			columnHelper.accessor('price_change_24h', {
				header: () => '24ч изм.',
				cell: info => {
					const value = info.getValue<number>()
					const isPositive = value >= 0
					return (
						<span
							className={
								isPositive
									? 'text-emerald-600 font-medium'
									: 'text-red-600 font-medium'
							}
						>
							{isPositive ? '+' : ''}
							{value?.toFixed(2)}
						</span>
					)
				},
			}),
			columnHelper.accessor('high_24h', {
				header: () => '24ч максимум',
				cell: info => (
					<span className='text-muted-foreground'>
						${info.getValue<number>()?.toLocaleString()}
					</span>
				),
			}),
			columnHelper.accessor('low_24h', {
				header: () => '24ч минимум',
				cell: info => (
					<span className='text-muted-foreground'>
						${info.getValue<number>()?.toLocaleString()}
					</span>
				),
			}),
			columnHelper.accessor('market_cap_change_24h', {
				header: () => 'Объём за 24 ч.',
				cell: info => (
					<span className='text-muted-foreground'>
						${info.getValue<number>()?.toLocaleString()}
					</span>
				),
			}),
			columnHelper.accessor('ath_date', {
				header: () => 'Дата максимума',
				cell: info => (
					<span className='text-muted-foreground'>
						{new Date(info.getValue<string>()).toLocaleDateString('ru-RU')}
					</span>
				),
			}),
			columnHelper.accessor('id', {
				header: () => '',
				cell: info => (
					<Link
						to='/crypto/$coin/'
						params={{ coin: info.getValue().toLowerCase() }}
					>
						<Button variant={'link'} className=' text-amber-500'>
							Детали
						</Button>
					</Link>
				),
			}),
		],
		[],
	)

	const table = useTable({
		key: 'coins-table',
		features,
		columns,
		data: coins,
	})

	const { rows } = table.getRowModel()
	const isEmpty = !isFetching && coins.length === 0

	return (
		<div className='flex  flex-col gap-3'>
			<div className='relative overflow-y-auto h-full max-h-[80dvh] border border-border bg-background shadow-sm'>
				{table.getHeaderGroups().map(headerGroup => (
					<TableHeader
						key={headerGroup.id}
						className='bg-muted/95 backdrop-blur-sm border-b border-border shadow-[0_1px_0_0_rgba(0,0,0,0.04)] sticky top-0 grid z-10'
					>
						<TableRow className={clsx(GRID_ROW_CLASS, 'hover:bg-transparent')}>
							{headerGroup.headers.map((header, i) => (
								<TableHead
									key={header.id}
									className={clsx(
										i > 0 ? 'text-center' : 'text-left',
										'font-semibold text-xs uppercase tracking-wide text-muted-foreground py-3',
									)}
								>
									{header.isPlaceholder ? null : (
										<table.FlexRender header={header} />
									)}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
				))}

				<Table className='static grid'>
					<TableBody className='grid h-full'>
						{rows.map(row => (
							<TableRow
								key={row.id}
								className={clsx(
									GRID_ROW_CLASS,
									'border-b border-border/60 hover:bg-muted/50 transition-colors',
								)}
							>
								{row.getAllCells().map(cell => (
									<TableCell key={cell.id} className='py-3'>
										<table.FlexRender cell={cell} />
									</TableCell>
								))}
							</TableRow>
						))}

						{isFetching &&
							Array.from({ length: PER_PAGE }).map((_, rowIndex) => (
								<TableRow
									key={`skeleton-${rowIndex}`}
									className={GRID_ROW_CLASS}
								>
									{columns.map((_, colIndex) => (
										<TableCell
											key={`skeleton-cell-${colIndex}`}
											className='py-3'
										>
											<Skeleton className='w-full h-5 rounded-md' />
										</TableCell>
									))}
								</TableRow>
							))}
						<Button
							variant='ghost'
							className='p-6 rounded-none'
							disabled={isBlocked || isFetching}
							onClick={nextPage}
						>
							{isFetching ? (
								<>
									<Spinner className='mr-2' />
									Загрузка…
								</>
							) : (
								'Показать ещё'
							)}
						</Button>
					</TableBody>
				</Table>

				{isEmpty && (
					<div className='flex items-center justify-center py-16 text-sm text-muted-foreground'>
						Монеты не найдены
					</div>
				)}
			</div>

			{isError && (
				<div className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600'>
					Ошибка загрузки: {String(error)}
				</div>
			)}
		</div>
	)
}
