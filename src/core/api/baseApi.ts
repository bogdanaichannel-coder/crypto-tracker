import { AbstractBaseApi } from './abstractBaseApi'

class BaseApi extends AbstractBaseApi {
	constructor(baseUrl: string) {
		super()
		this.baseUrl = baseUrl
		this.apiKey = import.meta.env.VITE_CG_DEMO_API_KEY || ''
	}
	protected baseUrl: string
	protected apiKey: string

	async get(endpoint: string, params?: Record<string, any>): Promise<Response> {
		const url = new URL(this.baseUrl + endpoint)
		if (params) {
			const queryString = this.paramsToQueryString(params)
			url.search = queryString
		}

		const response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-cg-demo-api-key': this.apiKey,
			},
		})

		return response
	}
	async post(endpoint: string, data?: Record<string, any>): Promise<Response> {
		const url = new URL(this.baseUrl + endpoint)

		const response = await fetch(url.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-cg-demo-api-key': this.apiKey,
			},
			body: JSON.stringify(data),
		})

		return response
	}

	protected paramsToQueryString(params: Record<string, any>): string {
		const queryString = Object.entries(params)
			.map(([key, value]) => {
				if (value === undefined || value === null) return ''
				if (Array.isArray(value)) {
					return value
						.map(
							v =>
								`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`,
						)
						.join('&')
				} else {
					return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
				}
			})
			.filter(Boolean)
			.join('&')
		return queryString ? `?${queryString}` : ''
	}
}

export const baseApi = new BaseApi(
	import.meta.env.VITE_CG_DEMO_API_BASE_URL || '',
)
