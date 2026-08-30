import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { type DateRange } from 'react-day-picker'

import { Button } from './button'
import { Calendar } from './calendar'
import { Field, FieldLabel } from './field'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
type Props = {
	title?: string
	setDateRange: (date: DateRange | undefined) => void
}
const to = new Date()
const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
const mock = {
	to,
	from,
}
export function DatePickerWithRange({ setDateRange, title }: Props) {
	const [date, setDate] = React.useState<DateRange | undefined>()
	React.useEffect(() => {
		setDate(mock)
		setDateRange(mock)
	}, [])

	return (
		<Field className='w-60'>
			{title && title.length > 0 && (
				<FieldLabel htmlFor='date-picker-range'>{title}</FieldLabel>
			)}
			<Popover>
				<PopoverTrigger>
					<Button
						variant='outline'
						id='date-picker-range'
						className='justify-start px-2.5 font-normal'
					>
						<CalendarIcon />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'LLL dd, y')} -{' '}
									{format(date.to, 'LLL dd, y')}
								</>
							) : (
								format(date.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start'>
					<Calendar
						mode='range'
						lang='ru'
						defaultMonth={date?.from}
						selected={date}
						onSelect={date => {
							setDate(date)
							setDateRange(date)
						}}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</Field>
	)
}
