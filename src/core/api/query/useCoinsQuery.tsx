import { CoinsType } from '@/core/types/coins'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo, useRef, useState } from 'react'
import { baseApi } from '../baseApi'
interface IParams {
	vs_currency?: string
	order?: string
	per_page?: number
}
const mockParams: IParams = {
	order: 'market_cap_desc',
	vs_currency: 'usd',
	per_page: 10,
} as const
export const useCoinsQuery = (props: IParams) => {
	const [blockedUntil, setBlockedUntil] = useState<number>(0)
	const timerRef = useRef<number | null>(null)

	const perPage = props.per_page ?? mockParams.per_page ?? 10

	const queryKey = useMemo(
		() => [
			'coins',
			props.vs_currency ?? mockParams.vs_currency,
			props.order ?? mockParams.order,
			perPage,
		],
		[props.vs_currency, props.order, perPage],
	)

	const isBlocked = blockedUntil > Date.now()

	const coins = useInfiniteQuery<CoinsType, Error>({
		queryKey,
		retry: 0,
		refetchOnWindowFocus: false,
		enabled: !isBlocked,
		initialPageParam: 1,
		getNextPageParam: (lastPage: CoinsType, allPages) => {
			// если последняя страница пустая или короче per_page — данных больше нет
			if (!lastPage || lastPage.length === 0) return undefined

			if (lastPage.length < perPage) return undefined

			return allPages.length + 1
		},
		queryFn: async ({ pageParam = 1 }) => {
			await new Promise(resolve => setTimeout(resolve, 1000))
			const params = {
				...mockParams,
				...props,
				page: pageParam,
				per_page: perPage,
			}
			try {
				const res = await baseApi.get('/coins/markets', params)
				if (!res.ok) {
					throw new Error(`Ошибка сети: ${res.status}`)
				}
				const data = await res.json()
				return data as CoinsType
			} catch (e) {
				const cooldown = 30_000
				setBlockedUntil(Date.now() + cooldown)
				if (timerRef.current) {
					window.clearTimeout(timerRef.current)
				}
				timerRef.current = window.setTimeout(() => {
					setBlockedUntil(0)
					timerRef.current = null
				}, cooldown) as unknown as number
				throw e
			}
		},
	})

	return { ...coins, isBlocked }
}
