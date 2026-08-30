import { Badge, Card, Separator } from '@/core/components/ui'
import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react'
import { Globe, MessageCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { CoinInfoProps } from './coinInfo.types'
import {
	compactFormatter,
	currencyFormatter,
	dateFormatter,
	stripHtml,
} from './coinInfo.utils'
import { ChangeBadge } from './components/ChangeBadge'
import { CoinInfoSkeleton } from './components/CoinInfoSkeleton'
import { LinkIcon } from './components/LinkIcon'
import { SupplyGauge } from './components/SupplyGauge'

export function CoinInfo({ data, isPending, isError }: CoinInfoProps) {
	const [descExpanded, setDescExpanded] = useState(false)

	if (isPending) return <CoinInfoSkeleton />

	if (isError || !data) {
		return (
			<Card className='border-white/70 p-6 text-sm text-rose-400'>
				Не удалось загрузить данные по монете
			</Card>
		)
	}

	const md = data.market_data
	const priceChange24h = md.price_change_percentage_24h
	const description = stripHtml(data.description?.en)
	const shortDescription = description?.slice(0, 260)

	return (
		<Card className='flex flex-col gap-6 border-white/70 bg-yellow-50 p-6'>
			<div className='flex flex-wrap items-center justify-between gap-4'>
				<div className='flex items-center gap-3'>
					<img
						src={data.image?.large}
						alt={data.name}
						className='h-12 w-12 rounded-full bg-white/5'
					/>
					<div className='flex flex-col'>
						<div className='flex items-center gap-2'>
							<h2 className='text-lg font-semibold text-foreground'>
								{data.name}
							</h2>
							<span className='text-sm uppercase text-muted-foreground'>
								{data.symbol}
							</span>
						</div>
						{data.market_cap_rank && (
							<Badge className='w-fit bg-amber-400/10 text-amber-400 hover:bg-amber-400/10'>
								Rank #{data.market_cap_rank}
							</Badge>
						)}
					</div>
				</div>

				<div className='flex items-center gap-1'>
					<LinkIcon
						href={data.links?.homepage?.[0]}
						label='Website'
						icon={<Globe className='h-4 w-4' />}
					/>
					<LinkIcon
						href={
							data.links?.twitter_screen_name
								? `https://x.com/${data.links.twitter_screen_name}`
								: undefined
						}
						label='Twitter'
						icon={<IconBrandTwitter className='h-4 w-4' />}
					/>
					<LinkIcon
						href={data.links?.repos_url?.github?.[0]}
						label='GitHub'
						icon={<IconBrandGithub className='h-4 w-4' />}
					/>
					<LinkIcon
						href={
							data.links?.telegram_channel_identifier
								? `https://t.me/${data.links.telegram_channel_identifier}`
								: undefined
						}
						label='Telegram'
						icon={<Send className='h-4 w-4' />}
					/>
					<LinkIcon
						href={data.links?.subreddit_url}
						label='Reddit'
						icon={<MessageCircle className='h-4 w-4' />}
					/>
				</div>
			</div>

			<Separator className='bg-white/5' />

			<div className='flex flex-wrap items-end justify-between gap-4'>
				<div className='flex flex-col gap-1'>
					<span className='text-xs uppercase tracking-wide text-muted-foreground'>
						Текущая цена
					</span>
					<div className='flex items-baseline gap-3'>
						<span className='font-mono text-3xl font-semibold tabular-nums text-foreground'>
							{currencyFormatter(md.current_price?.usd)}
						</span>
						<ChangeBadge value={priceChange24h} />
					</div>
				</div>

				<div className='flex gap-6 text-right'>
					<div className='flex flex-col gap-1'>
						<span className='text-xs uppercase tracking-wide text-muted-foreground'>
							ATH
						</span>
						<span className='font-mono text-sm tabular-nums'>
							{currencyFormatter(md.ath?.usd)}
						</span>
						<span className='text-[11px] text-muted-foreground'>
							{dateFormatter(md.ath_date?.usd)}
						</span>
					</div>
					<div className='flex flex-col gap-1'>
						<span className='text-xs uppercase tracking-wide text-muted-foreground'>
							ATL
						</span>
						<span className='font-mono text-sm tabular-nums'>
							{currencyFormatter(md.atl?.usd)}
						</span>
						<span className='text-[11px] text-muted-foreground'>
							{dateFormatter(md.atl_date?.usd)}
						</span>
					</div>
				</div>
			</div>

			<Separator className='bg-white/5' />

			<div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
				<div className='flex flex-col gap-1'>
					<span className='text-xs uppercase tracking-wide text-muted-foreground'>
						Market Cap
					</span>
					<span className='font-mono text-sm font-medium tabular-nums'>
						{compactFormatter(md.market_cap?.usd)}
					</span>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='text-xs uppercase tracking-wide text-muted-foreground'>
						FDV
					</span>
					<span className='font-mono text-sm font-medium tabular-nums'>
						{compactFormatter(md.fully_diluted_valuation?.usd)}
					</span>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='text-xs uppercase tracking-wide text-muted-foreground'>
						Volume 24h
					</span>
					<span className='font-mono text-sm font-medium tabular-nums'>
						{compactFormatter(md.total_volume?.usd)}
					</span>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='text-xs uppercase tracking-wide text-muted-foreground'>
						24h High / Low
					</span>
					<span className='font-mono text-sm font-medium tabular-nums'>
						{currencyFormatter(md.high_24h?.usd)} /{' '}
						{currencyFormatter(md.low_24h?.usd)}
					</span>
				</div>
			</div>

			<SupplyGauge
				circulating={md.circulating_supply}
				max={md.max_supply}
				total={md.total_supply}
			/>

			{description && (
				<>
					<Separator className='bg-white/5' />
					<div className='flex flex-col gap-2'>
						<p className='text-sm leading-relaxed text-muted-foreground'>
							{descExpanded ? description : shortDescription}
							{description.length > 260 && !descExpanded && '…'}
						</p>
						{description.length > 260 && (
							<button
								onClick={() => setDescExpanded(prev => !prev)}
								className='w-fit text-xs font-medium text-amber-400 hover:underline'
							>
								{descExpanded ? 'Свернуть' : 'Читать далее'}
							</button>
						)}
					</div>
				</>
			)}
		</Card>
	)
}
