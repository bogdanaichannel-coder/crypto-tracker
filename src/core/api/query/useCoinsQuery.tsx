import { CoinsType } from '@/core/types/coins'
import { useMutation } from '@tanstack/react-query'
import { baseApi } from '../baseApi'
interface IParams {
	vs_currency?: string
	page?: number
	order?: string
	per_page?: number
}
const mockParams: IParams = {
	order: 'market_cap_desc',
	vs_currency: 'usd',
	page: 1,
	per_page: 10,
} as const
export const useCoinsQuery = () => {
	const coins = useMutation<CoinsType, Error, IParams>({
		mutationKey: ['coins'],

		mutationFn: async params => {
			const res = await baseApi.get('/coins/markets', {
				...mockParams,
				...params,
			})
			if (!res.ok) {
				throw new Error(`Ошибка сети: ${res.status}`)
			}
			const data = await res.json()
			return data as CoinsType
		},
	})

	return coins
}
