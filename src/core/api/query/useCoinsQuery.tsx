import { CoinsType } from '@/core/types/coins'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { baseApi } from '../baseApi'

interface IParams {
	vs_currency?: string
	order?: string
	per_page?: number
	page?: number
}

const mockParams: IParams = {
	order: 'market_cap_desc',
	vs_currency: 'usd',
	per_page: 10,
} as const

export const useCoinsQuery = (props: IParams) => {
	const [blockedUntil, setBlockedUntil] = useState<number>(0)

	const perPage = props.per_page ?? mockParams.per_page ?? 10
	const currentPage = props.page ?? 1

	const queryKey = useMemo(
		() => [
			'coins',
			props.vs_currency ?? mockParams.vs_currency,
			props.order ?? mockParams.order,
			perPage,
			currentPage,
		],
		[props.vs_currency, props.order, perPage, currentPage],
	)

	const isBlocked = blockedUntil > Date.now()

	useEffect(() => {
		if (blockedUntil <= Date.now()) return

		const timeLeft = blockedUntil - Date.now()
		const timer = setTimeout(() => {
			setBlockedUntil(0)
		}, timeLeft)

		return () => clearTimeout(timer)
	}, [blockedUntil])

	const coins = useQuery<CoinsType, Error>({
		queryKey,
		retry: 0,
		refetchOnWindowFocus: false,
		enabled: !isBlocked,
		staleTime: isBlocked ? Infinity : 0,

		queryFn: async () => {
			await new Promise(resolve => setTimeout(resolve, 1000))

			const params = {
				...mockParams,
				...props,
				page: currentPage,
				per_page: perPage,
			}

			const res = await baseApi.get('/coins/markets', params)

			if (!res.ok) {
				setBlockedUntil(Date.now() + 30_000)
				throw new Error(`Ошибка сети: ${res.status}`)
			}

			return (await res.json()) as CoinsType
		},
	})

	return { ...coins, isBlocked }
}
