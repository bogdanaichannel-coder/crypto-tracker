export abstract class AbstractBaseApi {
	protected abstract baseUrl: string
	protected abstract apiKey: string

	protected abstract get(
		endpoint: string,
		params?: Record<string, any>,
	): Promise<Response>
	protected abstract post(
		endpoint: string,
		data?: Record<string, any>,
	): Promise<Response>
}
