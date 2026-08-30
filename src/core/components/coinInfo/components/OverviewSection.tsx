import { Children } from '@/core/types'
import { ICoin } from '@/core/types/coin'
import { currencyFormatter, dateFormatter } from '../coinInfo.utils'

interface OverviewSectionProps {
	data: ICoin
	overviewText: string
}
const Row = ({ children }: { children: Children[] }) => (
	<div className='text-sm grid grid-cols-2 gap-x-4 text-start'>
		{...children}
	</div>
)

export function OverviewSection({ data, overviewText }: OverviewSectionProps) {
	const md = data.market_data

	return (
		<div className='rounded-2xl border border-slate-200 bg-white p-6'>
			<h3 className='mb-3 text-base font-semibold text-slate-900'>
				Обзор актуальной цены {data.symbol.toUpperCase()}
			</h3>
			<p className='text-sm leading-relaxed text-slate-600'>{overviewText}</p>

			<div className='mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2'>
				<Row>
					<span className='text-slate-500'>Максимальная цена</span>
					<span className='font-mono font-medium tabular-nums text-slate-900'>
						{currencyFormatter(md.ath?.usd)}
					</span>
					<span className='text-slate-500'>Дата:</span>
					<span className='font-mono font-medium tabular-nums text-slate-900'>
						{dateFormatter(md.ath_date?.usd)}
					</span>
				</Row>
				<Row>
					<span className='text-slate-500'>Минимальная цена</span>
					<span className='font-mono font-medium tabular-nums text-slate-900'>
						{currencyFormatter(md.atl?.usd)}
					</span>
					<span className='text-slate-500'>Дата:</span>
					<span className='font-mono font-medium tabular-nums text-slate-900'>
						{dateFormatter(md.atl_date?.usd)}
					</span>
				</Row>
			</div>
		</div>
	)
}
