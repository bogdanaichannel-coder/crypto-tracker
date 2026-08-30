import { CoinsTable } from '@/core/components/coinsTable/coinsTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/crypto/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<CoinsTable />
		</div>
	)
}
