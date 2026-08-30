import { Badge } from '@/core/components/ui'
import { CoinInfoProps } from './coinInfo.types'
import {
	buildHistoryRows,
	buildOverviewText,
	compactFormatter,
	currencyFormatter,
} from './coinInfo.utils'
import { ChangeBadge } from './components/ChangeBadge'
import { CoinInfoSkeleton } from './components/CoinInfoSkeleton'
import { ConvertCalculator } from './components/ConvertCalculator'
import { LinksCard } from './components/LinksCard'
import { OverviewSection } from './components/OverviewSection'
import { PriceHistoryTable } from './components/PriceHistoryTable'
import { SentimentBar } from './components/SentimentBar'
import { StatCard } from './components/StatCard'

export function CoinInfo({
	data,
	isPending,
	isError,
	children = [],
}: CoinInfoProps) {
	if (isPending) return <CoinInfoSkeleton />

	if (isError || !data) {
		return (
			<div className='rounded-2xl border border-slate-200 bg-white p-6 text-sm text-rose-600'>
				Не удалось загрузить данные по монете
			</div>
		)
	}

	const md = data.market_data
	const historyRows = buildHistoryRows(data)
	const overviewText = buildOverviewText(data)

	return (
		<div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
			<div className='flex flex-col gap-4 lg:col-span-2'>
				<div className='rounded-2xl border border-slate-200 bg-white p-6'>
					<div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
						<div className='flex items-center gap-3'>
							<img
								src={data.image?.large}
								alt={data.name}
								className='h-10 w-10 rounded-full'
							/>
							<div className='flex items-center gap-2'>
								<h2 className='text-lg font-semibold text-slate-900'>
									{data.name}
								</h2>
								<span className='text-sm uppercase text-slate-400'>
									{data.symbol}
								</span>
							</div>
						</div>
						{data.market_cap_rank && (
							<Badge className='bg-amber-50 text-amber-600 hover:bg-amber-50'>
								Rank #{data.market_cap_rank}
							</Badge>
						)}
					</div>

					<div className='flex flex-wrap items-baseline gap-3'>
						<span className='font-mono text-4xl font-bold tabular-nums text-slate-900'>
							{currencyFormatter(md.current_price?.usd)}
						</span>
						<ChangeBadge value={md.price_change_percentage_24h} size='lg' />
					</div>
				</div>

				<div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
					<StatCard
						label='Рын. капитализация'
						value={compactFormatter(md.market_cap?.usd)}
					/>
					<StatCard
						label='Объём, 24ч'
						value={compactFormatter(md.total_volume?.usd)}
					/>
					<StatCard
						label='Исторический максимум'
						value={currencyFormatter(md.ath?.usd)}
					/>
					<StatCard
						label='Предложение в обращении'
						value={compactFormatter(md.circulating_supply)}
						hint={data.symbol.toUpperCase()}
					/>
				</div>

				<OverviewSection data={data} overviewText={overviewText} />
				{...children}
			</div>

			<div className='flex flex-col gap-4'>
				<PriceHistoryTable rows={historyRows} />
				<SentimentBar
					upPercentage={data.sentiment_votes_up_percentage}
					downPercentage={data.sentiment_votes_down_percentage}
				/>
				<ConvertCalculator price={md.current_price?.usd} symbol={data.symbol} />
				<LinksCard links={data.links} />
			</div>
		</div>
	)
}
