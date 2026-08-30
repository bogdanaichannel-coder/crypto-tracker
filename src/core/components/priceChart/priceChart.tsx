import { mergeChartData } from '@/core/lib/chart-utils'
import { IChart } from '@/core/types/chart'
import { useEffect, useMemo, useState } from 'react'
import {
	Area,
	AreaChart,
	CartesianGrid,
	ReferenceDot,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { ChartTooltip } from './chartTooltip'

const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
})

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	notation: 'compact',
	maximumFractionDigits: 1,
})

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
	day: '2-digit',
	month: 'short',
})

const useIsMobile = (breakpoint = 640) => {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
		const onChange = () => setIsMobile(mql.matches)

		onChange()
		mql.addEventListener('change', onChange)
		return () => mql.removeEventListener('change', onChange)
	}, [breakpoint])

	return isMobile
}

interface PriceChartProps {
	data: IChart
}

export function PriceChart({ data }: PriceChartProps) {
	const isMobile = useIsMobile()

	const chartData = useMemo(() => mergeChartData(data), [data])

	const { minPoint, maxPoint, lastPoint } = useMemo(() => {
		if (!chartData.length) {
			return { minPoint: null, maxPoint: null, lastPoint: null }
		}

		let min = chartData[0]
		let max = chartData[0]

		for (const point of chartData) {
			if (point.price < min.price) min = point
			if (point.price > max.price) max = point
		}

		return {
			minPoint: min,
			maxPoint: max,
			lastPoint: chartData[chartData.length - 1],
		}
	}, [chartData])

	if (!lastPoint) return null

	const yAxisFormatter = isMobile ? compactCurrencyFormatter : currencyFormatter
	const yAxisWidth = isMobile ? 44 : 70
	const chartMargin = isMobile
		? { left: 4, right: 8, top: 16, bottom: 0 }
		: { left: 60, right: 20, top: 20, bottom: 0 }

	return (
		<div className='relative w-full'>
			<div className='mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm'>
				<span className='flex items-center gap-1 text-red-500'>
					<span className='h-1.5 w-1.5 rounded-full bg-red-500 shrink-0' />
					Мин.{' '}
					<span className='font-medium'>
						{currencyFormatter.format(minPoint!.price)}
					</span>
				</span>
				<span className='flex items-center gap-1 text-emerald-500'>
					<span className='h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0' />
					Макс.{' '}
					<span className='font-medium'>
						{currencyFormatter.format(maxPoint!.price)}
					</span>
				</span>
			</div>

			<ResponsiveContainer width='100%' height={isMobile ? 220 : 320}>
				<AreaChart data={chartData} margin={chartMargin}>
					<defs>
						<linearGradient id='fillPriceGreen' x1='0' y1='0' x2='0' y2='1'>
							<stop
								offset='5%'
								stopColor='hsl(142 71% 45%)'
								stopOpacity={0.25}
							/>
							<stop offset='95%' stopColor='hsl(142 71% 45%)' stopOpacity={0} />
						</linearGradient>
					</defs>

					<CartesianGrid
						vertical={false}
						strokeDasharray='3 3'
						stroke='hsl(0 0% 90%)'
					/>

					<XAxis
						dataKey='timestamp'
						type='number'
						domain={['dataMin', 'dataMax']}
						scale='time'
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						minTickGap={isMobile ? 24 : 40}
						fontSize={isMobile ? 10 : 12}
						tickFormatter={value => dateFormatter.format(new Date(value))}
					/>

					<YAxis
						tickLine={false}
						axisLine={false}
						tickMargin={isMobile ? 4 : 8}
						domain={['dataMin - 100', 'dataMax + 100']}
						tickFormatter={value => yAxisFormatter.format(value)}
						fontSize={isMobile ? 10 : 12}
						width={yAxisWidth}
					/>

					<Tooltip
						content={<ChartTooltip />}
						cursor={{ stroke: 'hsl(142 71% 45%)', strokeDasharray: '3 3' }}
						labelFormatter={value => dateFormatter.format(new Date(value))}
					/>

					<ReferenceLine
						y={lastPoint.price}
						stroke='hsl(142 71% 35%)'
						strokeDasharray='3 3'
						label={{
							value: yAxisFormatter.format(lastPoint.price),
							position: 'insideLeft',
							fill: '#fff',
							fontSize: isMobile ? 9 : 11,
							style: {
								backgroundColor: 'hsl(142 71% 35%)',
							},
						}}
					/>

					<Area
						dataKey='price'
						type='monotone'
						stroke='hsl(142 71% 45%)'
						strokeWidth={1.5}
						fill='url(#fillPriceGreen)'
					/>

					<ReferenceDot
						x={minPoint!.timestamp}
						y={minPoint!.price}
						r={isMobile ? 2.5 : 3}
						fill='hsl(0 84% 60%)'
						stroke='none'
					/>

					<ReferenceDot
						x={maxPoint!.timestamp}
						y={maxPoint!.price}
						r={isMobile ? 2.5 : 3}
						fill='hsl(142 71% 35%)'
						stroke='none'
						label={
							isMobile
								? undefined
								: {
										value: 'Макс.',
										position: 'top',
										fontSize: 11,
										fill: 'hsl(0 0% 40%)',
									}
						}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}
