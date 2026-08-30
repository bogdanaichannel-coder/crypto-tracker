import { NAVIGATION_ROUTES } from '@/core/constantns/route/navigation'

import {
	IconChevronDown,
	IconEyeBitcoin,
	IconSearch,
} from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { Input } from '../ui'

const NAV_ITEMS = Object.values(NAVIGATION_ROUTES)

export function Header() {
	return (
		<>
			<header className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
				<div className='flex h-16 items-center gap-6 px-4 md:px-6'>
					{/* Лого */}
					<Link to='/' className='flex items-center gap-2 shrink-0'>
						<div className='flex size-8 items-center justify-center rounded-md bg-yellow-400 text-black font-black text-lg'>
							<IconEyeBitcoin />
						</div>
						<span className='hidden sm:block font-bold text-lg tracking-tight'>
							CryptoTracker
						</span>
					</Link>
					<nav className='hidden md:flex items-center gap-1'>
						{NAV_ITEMS.map(item => (
							<Link
								key={item.to}
								to={item.to}
								className='px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-accent transition-colors'
								activeProps={{
									className: 'text-foreground bg-accent',
								}}
							>
								{item.label}
							</Link>
						))}

						<button className='flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-accent transition-colors'>
							Ещё
							<IconChevronDown className='size-3.5' />
						</button>
					</nav>

					<div className='hidden lg:flex flex-1 max-w-xs ml-auto'>
						<div className='relative w-full'>
							<IconSearch className='absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
							<Input
								placeholder='Поиск монеты...'
								className='pl-8 h-9 bg-muted/50'
							/>
						</div>
					</div>

					{/* <div className={cn('flex items-center gap-2', 'lg:ml-0 ml-auto')}>
						<Button variant='ghost' size='icon' className='hidden sm:flex'>
							<IconBell className='size-4' />
						</Button>

						<Button variant='ghost' size='sm' className='hidden sm:flex'>
							Войти
						</Button>
						<Button
							size='sm'
							className='bg-yellow-400 text-black hover:bg-yellow-300 font-semibold'
						>
							Регистрация
						</Button>

						<Button variant='ghost' size='icon' className='md:hidden'>
							<IconMenu className='size-5' />
						</Button>
					</div> */}
				</div>
			</header>
		</>
	)
}
