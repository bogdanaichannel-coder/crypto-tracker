import { useCoinsQuery } from '@/core/api/query/useCoinsQuery'
import { ICoin } from '@/core/types/coins'
import { Button, Table, TableBody, TableCell, TableRow } from '@/shadcnUI'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import {
	ColumnDef,
	createColumnHelper,
	tableFeatures,
	useTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

type Props = {}

const features = tableFeatures({})

const columnHelper = createColumnHelper<typeof features, ICoin>()

export const CoinsTable = ({}: Props) => {
	const [page, setpage] = useState(1)
	const { data, isPending, isError, error, mutate } = useCoinsQuery()
	useEffect(() => {
		mutate({ page })
	}, [page])
	const columns: ColumnDef<typeof features, ICoin, any>[] = [
		columnHelper.accessor(
			row => ({ image: row.image, name: row.symbol.toUpperCase() }),
			{
				id: 'coin',
				header: 'Монета',

				cell: info => (
					<span className='flex items-center gap-2 w-fit'>
						<img
							src={info.getValue().image}
							alt='coin'
							width={20}
							height={20}
						/>
						{info.getValue().name}
					</span>
				),
			},
		),

		columnHelper.accessor('price_change_24h', {
			header: () => '24h',
			cell: info => (
				<span className='flex items-center gap-2'>{info.getValue()}</span>
			),
		}),
		columnHelper.accessor('high_24h', {
			header: () => '24h High',
			cell: info => (
				<span className='flex items-center gap-2'>{info.getValue()}</span>
			),
		}),
		columnHelper.accessor('ath_date', {
			header: () => '24h High Date',
			cell: info => (
				<span className='flex items-center gap-2'>
					{new Date(info.getValue()).toLocaleDateString()}
				</span>
			),
		}),
	]

	const table = useTable({
		key: 'coins-table',
		features,
		columns,
		data: data ?? [],
	})

	return (
		<Table>
			{table.getHeaderGroups().map(headerGroup => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map(header => (
						<TableCell className='text-left' key={header.id}>
							{header.isPlaceholder ? null : (
								<table.FlexRender header={header} />
							)}
						</TableCell>
					))}
				</TableRow>
			))}
			<TableBody>
				{table.getRowModel().rows.map(row => (
					<TableRow key={row.id}>
						{row.getAllCells().map(cell => (
							<TableCell className='text-left' key={cell.id}>
								<table.FlexRender cell={cell} />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
			<div className='flex gap-4 mt-4'>
				<Button
					disabled={page <= 1}
					onClick={() => {
						setpage(prev => prev - 1)
					}}
				>
					<IconArrowLeft />
				</Button>
				<Button
					disabled={isError && page > 0}
					onClick={() => {
						setpage(prev => prev + 1)
					}}
				>
					<IconArrowRight />
				</Button>
			</div>
		</Table>
	)
}
