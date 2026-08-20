import { baseApi } from '@/core/api/baseApi'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: HomePage,
})

function HomePage() {
	const { isSuccess, error, isLoading } = useQuery({
		queryKey: ['test'],
		queryFn: async () => baseApi.get('/ping'),
	})
	if (isLoading) return <h1>Loading...</h1>
	if (error)
		return (
			<h1>Error: {error instanceof Error ? error.message : 'Unknown error'}</h1>
		)
	return <h1>Hello {isSuccess && 'success'}</h1>
}
