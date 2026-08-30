import { ICoin } from '@/core/types/coin'

export interface CoinInfoProps {
	data?: ICoin
	isPending: boolean
	isError: boolean
}
