import { ICoin } from '@/core/types/coin'
import { ReactElement, ReactNode } from 'react'

export interface CoinInfoProps {
	data?: ICoin
	isPending: boolean
	isError: boolean
	children?: (ReactElement | ReactNode)[]
}

export interface HistoryRow {
	label: string
	value: number
}
