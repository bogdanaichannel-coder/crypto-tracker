import { IChart } from '@/core/types/chart'
import { ICoin } from '@/core/types/coin'
import { useQuery } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'
import { baseApi } from '../baseApi'

type Props = {
	coin: string
	date?: DateRange
}
const to = new Date()
const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

export const useCoinQuery = ({ coin, date }: Props) => {
	const coinChart = useQuery<IChart>({
		queryKey: ['coinChart', coin, date],
		retry: 2,

		retryDelay: 6 * 10 * 1000,
		queryFn: async () => {
			await new Promise(resolve => setTimeout(resolve, 1000))
			const res = await baseApi.get(
				`coins/${coin}/market_chart/range?vs_currency=usd&from=${date?.from?.getTime() ?? from.getTime()}&to=${date?.to?.getTime() ?? to.getTime()}`,
			)
			if (res.ok) {
				return await res.json()
			}
			throw new Error(`Ошибка сети: ${res.status}`)
		},
	})
	const coinInfo = useQuery<ICoin>({
		queryKey: ['coinChart', coin],
		retry: 2,

		retryDelay: 6 * 10 * 1000,
		queryFn: async () => {
			await new Promise(resolve => setTimeout(resolve, 1000))
			const res = await baseApi.get(`coins/${coin}`)
			if (res.ok) {
				return await res.json()
			}
			throw new Error(`Ошибка сети: ${res.status}`)
		},
	})
	return { coinChart, coinInfo }
}
