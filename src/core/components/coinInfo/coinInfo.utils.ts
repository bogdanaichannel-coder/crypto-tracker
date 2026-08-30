import { ICoin } from '@/core/types/coin'
import { HistoryRow } from './coinInfo.types'

export const currencyFormatter = (value: number) => {
	if (value === undefined || value === null || Number.isNaN(value)) return '—'
	const maximumFractionDigits = Math.abs(value) < 1 ? 6 : 2
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits,
	}).format(value)
}

export const compactFormatter = (value: number) => {
	if (value === undefined || value === null || Number.isNaN(value)) return '—'
	return new Intl.NumberFormat('en-US', {
		notation: 'compact',
		maximumFractionDigits: 2,
	}).format(value)
}

export const plainNumberFormatter = (value: number) => {
	if (value === undefined || value === null || Number.isNaN(value)) return '—'
	return new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 2,
	}).format(value)
}

export const percentFormatter = (value: number) => {
	if (value === undefined || value === null || Number.isNaN(value)) return '—'
	const sign = value > 0 ? '+' : ''
	return `${sign}${value.toFixed(2)}%`
}

export const dateFormatter = (value: string) => {
	if (!value) return '—'
	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	}).format(new Date(value))
}

export const stripHtml = (value?: string) =>
	value?.replace(/<[^>]*>/g, '').trim()

export const buildHistoryRows = (data: ICoin): HistoryRow[] => {
	const md = data.market_data
	return [
		{ label: 'Сегодня', value: md.price_change_percentage_24h },
		{ label: '7 дн.', value: md.price_change_percentage_7d },
		{ label: '14 дн.', value: md.price_change_percentage_14d },
		{ label: '30 дн.', value: md.price_change_percentage_30d },
		{ label: '60 дн.', value: md.price_change_percentage_60d },
		{ label: '200 дн.', value: md.price_change_percentage_200d },
		{ label: '1 год', value: md.price_change_percentage_1y },
	].filter(row => row.value !== undefined && row.value !== null)
}

export const buildOverviewText = (data: ICoin) => {
	const md = data.market_data
	const changeWord = md.price_change_percentage_24h >= 0 ? 'рост' : 'падение'

	return (
		`По состоянию на ${dateFormatter(md.last_updated)} общая рыночная капитализация ` +
		`${data.symbol.toUpperCase()} составляет ${compactFormatter(md.market_cap?.usd)}, что означает ${changeWord} ` +
		`на ${Math.abs(md.price_change_percentage_24h).toFixed(2)}% за последние 24 часа. Текущая цена составляет ` +
		`${currencyFormatter(md.current_price?.usd)}, а торговый объём за 24 часа — ${compactFormatter(md.total_volume?.usd)}. ` +
		`В обороте находится ${compactFormatter(md.circulating_supply)} ${data.symbol.toUpperCase()}` +
		`${md.max_supply ? ` при максимальной эмиссии ${compactFormatter(md.max_supply)}` : ''}. ` +
		`По рыночной капитализации ${data.symbol.toUpperCase()} занимает ${md.market_cap_rank} место среди всех криптовалют.`
	)
}
