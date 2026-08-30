import { IChart } from '../types/chart'

export interface ChartPoint {
	timestamp: number
	date: string
	price: number
	marketCap: number
	volume: number
}

export function mergeChartData(chart: IChart): ChartPoint[] {
	const { prices, market_caps, total_volumes } = chart

	return prices.map(([timestamp, price], index) => ({
		timestamp,
		date: new Date(timestamp).toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: 'short',
		}),
		price,
		marketCap: market_caps[index]?.[1] ?? 0,
		volume: total_volumes[index]?.[1] ?? 0,
	}))
}
