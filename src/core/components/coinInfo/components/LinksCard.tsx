import { ICoin } from '@/core/types/coin'
import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react'
import { Globe, MessageCircle, Send } from 'lucide-react'
import { ReactNode } from 'react'

interface LinksCardProps {
	links: ICoin['links']
}

interface LinkRow {
	href?: string
	label: string
	icon: ReactNode
}

export function LinksCard({ links }: LinksCardProps) {
	const rows: LinkRow[] = [
		{
			href: links?.homepage?.[0],
			label: 'Официальный сайт',
			icon: <Globe className='h-4 w-4' />,
		},
		{
			href: links?.twitter_screen_name
				? `https://x.com/${links.twitter_screen_name}`
				: undefined,
			label: 'Twitter / X',
			icon: <IconBrandTwitter className='h-4 w-4' />,
		},
		{
			href: links?.repos_url?.github?.[0],
			label: 'GitHub',
			icon: <IconBrandGithub className='h-4 w-4' />,
		},
		{
			href: links?.telegram_channel_identifier
				? `https://t.me/${links.telegram_channel_identifier}`
				: undefined,
			label: 'Telegram',
			icon: <Send className='h-4 w-4' />,
		},
		{
			href: links?.subreddit_url,
			label: 'Reddit',
			icon: <MessageCircle className='h-4 w-4' />,
		},
	].filter(row => !!row.href)

	if (!rows.length) return null

	return (
		<div className='rounded-2xl border border-slate-200 bg-white p-6'>
			<h3 className='mb-3 text-sm font-semibold text-slate-900'>Ссылки</h3>
			<div className='flex flex-col gap-1'>
				{rows.map(row => (
					<a
						key={row.label}
						href={row.href}
						target='_blank'
						rel='noreferrer'
						className='flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900'
					>
						{row.icon}
						{row.label}
					</a>
				))}
			</div>
		</div>
	)
}
