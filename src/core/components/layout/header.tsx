import { NAVIGATION_ROUTES } from '@/core/constantns/route/navigation'
import { cn } from '@/core/lib/utils'
import {
	IconArrowBackUp,
	IconChevronDown,
	IconMenu2,
	IconSearch,
	IconX,
} from '@tabler/icons-react'
import { Link, useRouter, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Input } from '../ui'

const NAV_ITEMS = Object.values(NAVIGATION_ROUTES)
const ROOT_PAGES = new Set(['/', ...NAV_ITEMS.map(e => e.to)])

export function Header() {
	const {
		history: { back, canGoBack },
	} = useRouter()

	const pathname = useRouterState({
		select: state => state.location.pathname,
	})

	const isRootPage = ROOT_PAGES.has(pathname)

	const canBack = useRouterState({
		select: () => !isRootPage && canGoBack(),
	})

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

	return (
		<header className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
			<div className='flex h-16  items-center px-4 md:px-6'>
				<Button
					onClick={() => back()}
					variant='outline'
					tabIndex={canBack ? 0 : -1}
					className={cn(
						'group flex items-center gap-0 overflow-hidden border px-2.5 mr-2',
						'transition-[max-width,opacity,transform,padding] duration-300 ease-out',
						canBack
							? 'max-w-[112px] opacity-100 translate-x-0'
							: 'max-w-0 opacity-0 -translate-x-1 pointer-events-none border-transparent px-0',
					)}
				>
					<IconArrowBackUp className='shrink-0' />
					<span
						className='
              max-w-0 overflow-hidden whitespace-nowrap opacity-0
              -translate-x-1
              transition-[max-width,opacity,transform,margin] duration-300 ease-out
              md:group-hover:max-w-[80px] md:group-hover:opacity-100
              md:group-hover:translate-x-0 md:group-hover:ml-1.5
            '
					>
						Назад
					</span>
				</Button>
				<div className='flex gap-6'>
					<Link to='/' className='flex items-center gap-2 shrink-0'>
						<span className='font-bold text-lg tracking-tight'>
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
				</div>

				<div className='hidden lg:flex flex-1 max-w-xs ml-auto'>
					<div className='relative w-full'>
						<IconSearch className='absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
						<Input
							placeholder='Поиск монеты...'
							className='pl-8 h-9 bg-muted/50'
						/>
					</div>
				</div>

				<div className='flex items-center gap-1 ml-auto lg:ml-0'>
					<Button
						variant='ghost'
						size='icon'
						className='lg:hidden'
						onClick={() => setMobileSearchOpen(prev => !prev)}
					>
						{mobileSearchOpen ? <IconX /> : <IconSearch />}
					</Button>

					<Button
						variant='ghost'
						size='icon'
						className='md:hidden'
						onClick={() => setMobileMenuOpen(prev => !prev)}
					>
						{mobileMenuOpen ? <IconX /> : <IconMenu2 />}
					</Button>
				</div>
			</div>

			{mobileSearchOpen && (
				<div className='lg:hidden px-4 pb-3'>
					<div className='relative w-full'>
						<IconSearch className='absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
						<Input
							placeholder='Поиск монеты...'
							autoFocus
							className='pl-8 h-9 bg-muted/50'
						/>
					</div>
				</div>
			)}

			{mobileMenuOpen && (
				<nav className='md:hidden flex flex-col gap-1 border-t border-border px-4 py-3'>
					{NAV_ITEMS.map(item => (
						<Link
							key={item.to}
							to={item.to}
							onClick={() => setMobileMenuOpen(false)}
							className='px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-accent transition-colors'
							activeProps={{
								className: 'text-foreground bg-accent',
							}}
						>
							{item.label}
						</Link>
					))}
				</nav>
			)}
		</header>
	)
}
