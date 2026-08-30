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

export const stripHtml = (value?: string) => value?.replace(/<[^>]*>/g, '').trim()
