import { ChangeEvent, useState } from 'react'

interface ConvertCalculatorProps {
	price: number
	symbol: string
}

export function ConvertCalculator({ price, symbol }: ConvertCalculatorProps) {
	const [coinAmount, setCoinAmount] = useState('1')
	const [usdAmount, setUsdAmount] = useState(price ? price.toFixed(2) : '')

	const handleCoinChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setCoinAmount(value)
		const parsed = parseFloat(value)
		setUsdAmount(!Number.isNaN(parsed) && price ? (parsed * price).toFixed(2) : '')
	}

	const handleUsdChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setUsdAmount(value)
		const parsed = parseFloat(value)
		setCoinAmount(!Number.isNaN(parsed) && price ? (parsed / price).toFixed(8) : '')
	}

	return (
		<div className='rounded-2xl border border-slate-200 bg-white p-6'>
			<h3 className='mb-4 text-sm font-semibold text-slate-900'>Конвертер</h3>

			<label className='mb-1 block text-xs uppercase tracking-wide text-slate-400'>
				{symbol.toUpperCase()}
			</label>
			<input
				value={coinAmount}
				onChange={handleCoinChange}
				type='number'
				min='0'
				className='mb-3 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm tabular-nums text-slate-900 outline-none focus:border-amber-400'
			/>

			<label className='mb-1 block text-xs uppercase tracking-wide text-slate-400'>
				USD
			</label>
			<input
				value={usdAmount}
				onChange={handleUsdChange}
				type='number'
				min='0'
				className='w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm tabular-nums text-slate-900 outline-none focus:border-amber-400'
			/>

			<p className='mt-3 text-xs text-slate-400'>
				1 {symbol.toUpperCase()} ≈ {price ? price.toLocaleString('en-US') : '—'} USD
			</p>
		</div>
	)
}
