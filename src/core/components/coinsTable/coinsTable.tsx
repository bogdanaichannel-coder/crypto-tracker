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
import { useEffect, useMemo, useRef, useState } from 'react'
import { Skeleton } from '../ui/skeleton'

const PER_PAGE = 40

type HideBelow = 'md' | 'lg' | undefined

// Порядок и ширины должны совпадать с количеством ВИДИМЫХ колонок на каждом брейкпоинте.
// mobile: coin, price, change, actions -> 4 колонки
// md:     + high, low                  -> 6 колонок
// lg:     + volume, ath_date           -> 8 колонок (полный набор)
const GRID_ROW_CLASS = clsx(
	'grid w-full',
	'grid-cols-[1.5fr_1fr_1fr_90px]',
	'md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr_120px]',
	'lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1fr_1fr_160px]',
)

const hideBelowClass = (hideBelow: HideBelow) => {
	if (hideBelow === 'md') return 'hidden md:flex'
	if (hideBelow === 'lg') return 'hidden lg:flex'
	return ''
}

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

export const CoinsTable = () => {
	const [page, setPage] = useState<number>(1)
	const [coins, setCoins] = useState<ICoinListItem[]>([])
	const [hasMore, setHasMore] = useState<boolean>(true)
	const tableRef = useRef<HTMLTableElement>(null)
	const { data, isFetching, isError, error, isBlocked, isSuccess } =
		useCoinsQuery({
			per_page: PER_PAGE,
			page,
		})

	useEffect(() => {
		if (!data) return

		setHasMore(data.length === PER_PAGE)

		setCoins(prev => {
			if (page === 1) return data
			const existingIds = new Set(prev.map(c => c.id))
			const uniqueNew = data.filter(c => !existingIds.has(c.id))
			return [...prev, ...uniqueNew]
		})
		setTimeout(
			() =>
				tableRef.current &&
				page > 1 &&
				tableRef.current.scrollTo({
					top: tableRef.current.scrollHeight,
					behavior: 'smooth',
				}),
			0,
		)
	}, [data, page])

	const nextPage = () => {
		if (!hasMore) return
		setPage(v => v + 1)
	}

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
								loading='lazy'
								className='rounded-full shrink-0'
							/>
							<span className='truncate'>{info.getValue().name}</span>
						</span>
					),
				},
			),
			columnHelper.accessor('current_price', {
				header: () => 'Цена',
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
							{value?.toFixed(2)}%
						</span>
					)
				},
			}),
			columnHelper.accessor('high_24h', {
				id: 'high_24h',
				header: () => '24ч макс.',
				meta: { hideBelow: 'md' as HideBelow },
				cell: info => (
					<span className='text-muted-foreground'>
						${info.getValue<number>()?.toLocaleString()}
					</span>
				),
			}),
			columnHelper.accessor('low_24h', {
				id: 'low_24h',
				header: () => '24ч мин.',
				meta: { hideBelow: 'md' as HideBelow },
				cell: info => (
					<span className='text-muted-foreground'>
						${info.getValue<number>()?.toLocaleString()}
					</span>
				),
			}),
			columnHelper.accessor('market_cap_change_24h', {
				id: 'market_cap_change_24h',
				header: () => 'Изм. капит. 24ч',
				meta: { hideBelow: 'lg' as HideBelow },
				cell: info => {
					const value = info.getValue<number>()
					const isPositive = value >= 0
					return (
						<span className={isPositive ? 'text-emerald-600' : 'text-red-600'}>
							{isPositive ? '+' : ''}${value?.toLocaleString()}
						</span>
					)
				},
			}),
			columnHelper.accessor('ath_date', {
				id: 'ath_date',
				header: () => 'Дата максимума',
				meta: { hideBelow: 'lg' as HideBelow },
				cell: info => {
					const value = info.getValue<string>()
					return (
						<span className='text-muted-foreground'>
							{value ? new Date(value).toLocaleDateString('ru-RU') : '—'}
						</span>
					)
				},
			}),
			columnHelper.accessor('id', {
				header: () => '',
				cell: info => (
					<Link
						to='/crypto/$coin/'
						params={{ coin: info.getValue().toLowerCase() }}
					>
						<Button variant={'link'} className='text-amber-500 px-0'>
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
		<div className='flex flex-col gap-3'>
			<Table
				ref={tableRef}
				className='overscroll-y-auto relative  h-full max-h-[80dvh] border border-border bg-background shadow-sm  grid overflow-y-auto'
			>
				{table.getHeaderGroups().map(headerGroup => (
					<TableHeader
						key={headerGroup.id}
						className='bg-muted/95 backdrop-blur-sm border-b border-border shadow-[0_1px_0_0_rgba(0,0,0,0.04)] sticky top-0 grid z-10'
					>
						<TableRow className={clsx(GRID_ROW_CLASS, 'hover:bg-transparent')}>
							{headerGroup.headers.map((header, i) => {
								const hideBelow = (
									header.column.columnDef.meta as
										{ hideBelow?: HideBelow } | undefined
								)?.hideBelow

								return (
									<TableHead
										key={header.id}
										className={clsx(
											i > 0 ? 'text-center' : 'text-left',
											'items-center font-semibold text-xs uppercase tracking-wide text-muted-foreground py-3',
											hideBelowClass(hideBelow),
										)}
									>
										{header.isPlaceholder ? null : (
											<table.FlexRender header={header} />
										)}
									</TableHead>
								)
							})}
						</TableRow>
					</TableHeader>
				))}

				<TableBody className='grid h-full'>
					{rows.map(row => (
						<TableRow
							key={row.id}
							className={clsx(
								GRID_ROW_CLASS,
								'border-b border-border/60 hover:bg-muted/50 transition-colors',
							)}
						>
							{row.getAllCells().map(cell => {
								const hideBelow = (
									cell.column.columnDef.meta as
										{ hideBelow?: HideBelow } | undefined
								)?.hideBelow

								return (
									<TableCell
										key={cell.id}
										className={clsx(
											'py-3 items-center',
											hideBelowClass(hideBelow),
										)}
									>
										<table.FlexRender cell={cell} />
									</TableCell>
								)
							})}
						</TableRow>
					))}

					{isFetching &&
						Array.from({ length: PER_PAGE }).map((_, rowIndex) => (
							<TableRow key={`skeleton-${rowIndex}`} className={GRID_ROW_CLASS}>
								{columns.map((col, colIndex) => {
									const hideBelow = (
										col.meta as { hideBelow?: HideBelow } | undefined
									)?.hideBelow

									return (
										<TableCell
											key={`skeleton-cell-${colIndex}`}
											className={clsx(
												'py-3 items-center',
												hideBelowClass(hideBelow),
											)}
										>
											<Skeleton className='w-full h-5 rounded-md' />
										</TableCell>
									)
								})}
							</TableRow>
						))}
				</TableBody>
			</Table>

			{isEmpty && (
				<div className='flex items-center justify-center py-16 text-sm text-muted-foreground'>
					Монеты не найдены
				</div>
			)}

			{hasMore && (
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
			)}

			{isError && (
				<div className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600'>
					Ошибка загрузки: {String(error)}
				</div>
			)}
		</div>
	)
}
