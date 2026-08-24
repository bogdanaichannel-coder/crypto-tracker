import { useCoinsQuery } from '@/core/api/query/useCoinsQuery'
import { ICoin } from '@/core/types/coins'
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shadcnUI'
import {
	ColumnDef,
	createColumnHelper,
	tableFeatures,
	useTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import clsx from 'clsx'
import { debounce } from 'lodash'
import { useEffect, useMemo, useRef } from 'react'
import { Skeleton } from '../ui/skeleton'

const PER_PAGE = 25
const ROW_HEIGHT = 44

// Ширины колонок вручную — фича column-sizing не подключена в tableFeatures({})
const GRID_ROW_CLASS = 'grid grid-cols-[1fr_1fr_1fr_160px] w-full'

type Props = {}

const features = tableFeatures({})
const columnHelper = createColumnHelper<typeof features, ICoin>()

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
	const {
		data,
		isLoading,
		isFetching,
		isError,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isBlocked,
	} = useCoinsQuery({ per_page: PER_PAGE })

	const columns: ColumnDef<typeof features, ICoin, any>[] = useMemo(
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
			columnHelper.accessor('ath_date', {
				header: () => 'Дата максимума',
				cell: info => (
					<span className='text-muted-foreground'>
						{new Date(info.getValue<string>()).toLocaleDateString('ru-RU')}
					</span>
				),
			}),
		],
		[],
	)

	const flatData = useMemo(
		() => data?.pages.flatMap(page => page) ?? [],
		[data],
	)

	const table = useTable({
		key: 'coins-table',
		features,
		columns,
		data: flatData,
	})

	const { rows } = table.getRowModel()

	const scrollContainerRef = useRef<HTMLDivElement | null>(null)

	const virtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => scrollContainerRef.current,
		estimateSize: () => ROW_HEIGHT,
		overscan: 6,
		measureElement:
			typeof window !== 'undefined' &&
			navigator.userAgent.indexOf('Firefox') === -1
				? element => element?.getBoundingClientRect().height
				: undefined,
	})

	const virtualRows = virtualizer.getVirtualItems()

	useEffect(() => {
		const element = scrollContainerRef.current
		if (!element) return

		const handleScroll = debounce(() => {
			const nearBottom =
				element.scrollTop + element.clientHeight >= element.scrollHeight - 200

			if (!nearBottom) return
			if (
				isFetching ||
				isFetchingNextPage ||
				isError ||
				!hasNextPage ||
				isBlocked
			)
				return

			fetchNextPage()
		}, 300)

		element.addEventListener('scroll', handleScroll)
		return () => {
			element.removeEventListener('scroll', handleScroll)
			handleScroll.cancel()
		}
	}, [
		isFetching,
		isFetchingNextPage,
		isError,
		hasNextPage,
		isBlocked,
		fetchNextPage,
	])

	const showEmptyState = !isLoading && !isError && flatData.length === 0

	return (
		<div className='flex flex-col gap-3'>
			<div
				ref={scrollContainerRef}
				className='relative overflow-y-auto max-h-[80dvh] rounded-xl border border-border bg-background shadow-sm'
			>
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
					<TableBody
						className='grid relative'
						style={{ height: `${virtualizer.getTotalSize()}px` }}
					>
						{isLoading &&
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

						{!isLoading &&
							virtualRows.map(virtualRow => {
								const row = rows[virtualRow.index]
								return (
									<TableRow
										key={row.id}
										data-index={virtualRow.index}
										ref={node => virtualizer.measureElement(node)}
										className={clsx(
											GRID_ROW_CLASS,
											'absolute top-0 left-0 border-b border-border/60 hover:bg-muted/50 transition-colors',
										)}
										style={{
											transform: `translateY(${virtualRow.start}px)`,
										}}
									>
										{row.getAllCells().map(cell => (
											<TableCell key={cell.id} className='py-3'>
												<table.FlexRender cell={cell} />
											</TableCell>
										))}
									</TableRow>
								)
							})}
					</TableBody>
				</Table>

				{showEmptyState && (
					<div className='flex items-center justify-center py-16 text-sm text-muted-foreground'>
						Монеты не найдены
					</div>
				)}

				{/* Индикатор дозагрузки — вынесен из виртуализированного тела,
				    чтобы не накладываться на строки и всегда быть виден внизу списка */}
				{isFetchingNextPage && (
					<div className='sticky bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-3 bg-background/95 backdrop-blur-sm border-t border-border text-sm text-muted-foreground'>
						<Spinner />
						Загружаем ещё монеты…
					</div>
				)}
			</div>

			{isError && (
				<div className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600'>
					Ошибка загрузки: {String(error)}
				</div>
			)}

			{hasNextPage && !isLoading && (
				<Button
					variant='outline'
					className='self-center'
					disabled={
						isBlocked ||
						isFetching ||
						isFetchingNextPage ||
						!hasNextPage ||
						isError
					}
					onClick={() => {
						if (
							isBlocked ||
							isFetching ||
							isFetchingNextPage ||
							!hasNextPage ||
							isError
						)
							return
						fetchNextPage()
					}}
				>
					{isFetchingNextPage ? (
						<>
							<Spinner className='mr-2' />
							Загрузка…
						</>
					) : (
						'Показать ещё'
					)}
				</Button>
			)}
		</div>
	)
}
