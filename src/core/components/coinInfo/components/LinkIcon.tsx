import { ReactNode } from 'react'

interface LinkIconProps {
	href?: string
	label: string
	icon: ReactNode
}

export function LinkIcon({ href, label, icon }: LinkIconProps) {
	if (!href) return null

	return (
		<a
			href={href}
			target='_blank'
			rel='noreferrer'
			aria-label={label}
			className='flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground'
		>
			{icon}
		</a>
	)
}
