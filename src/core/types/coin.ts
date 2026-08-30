export interface ICoin {
	id: string
	symbol: string
	name: string
	web_slug: string
	asset_platform_id: any
	platforms: Platforms
	detail_platforms: DetailPlatforms
	block_time_in_minutes: number
	hashing_algorithm: string
	categories: string[]
	preview_listing: boolean
	public_notice: any
	additional_notices: any[]
	has_supply_breakdown: boolean
	description: Description
	links: Links
	image: Image
	country_origin: string
	genesis_date: string
	sentiment_votes_up_percentage: number
	sentiment_votes_down_percentage: number
	watchlist_portfolio_users: number
	market_cap_rank: number
	market_cap_rank_with_rehypothecated: number
	status_updates: any[]
	last_updated: string
	market_data: MarketData
	tickers: Ticker[]
}

export interface Platforms {
	'': string
}

export interface DetailPlatforms {
	'': GeneratedType
}

export interface GeneratedType {
	decimal_place: any
	contract_address: string
}

export interface Description {
	en: string
}

export interface Links {
	homepage: string[]
	whitepaper: string
	blockchain_site: string[]
	official_forum_url: string[]
	chat_url: string[]
	announcement_url: string[]
	snapshot_url: any
	twitter_screen_name: string
	facebook_username: string
	bitcointalk_thread_identifier: any
	telegram_channel_identifier: string
	subreddit_url: string
	repos_url: ReposUrl
}

export interface ReposUrl {
	github: string[]
	bitbucket: any[]
}

export interface Image {
	thumb: string
	small: string
	large: string
}

export interface MarketData {
	current_price: CurrentPrice
	total_value_locked: any
	mcap_to_tvl_ratio: any
	fdv_to_tvl_ratio: any
	roi: any
	ath: Ath
	ath_change_percentage: AthChangePercentage
	ath_date: AthDate
	atl: Atl
	atl_change_percentage: AtlChangePercentage
	atl_date: AtlDate
	market_cap: MarketCap
	fully_diluted_valuation: FullyDilutedValuation
	market_cap_fdv_ratio: number
	market_cap_rank: number
	outstanding_token_value_usd: any
	market_cap_rank_with_rehypothecated: number
	total_volume: TotalVolume
	high_24h: High24h
	low_24h: Low24h
	price_change_24h: number
	price_change_percentage_24h: number
	price_change_percentage_7d: number
	price_change_percentage_14d: number
	price_change_percentage_30d: number
	price_change_percentage_60d: number
	price_change_percentage_200d: number
	price_change_percentage_1y: number
	market_cap_change_24h: number
	market_cap_change_percentage_24h: number
	price_change_24h_in_currency: PriceChange24hInCurrency
	price_change_percentage_1h_in_currency: PriceChangePercentage1hInCurrency
	price_change_percentage_24h_in_currency: PriceChangePercentage24hInCurrency
	price_change_percentage_7d_in_currency: PriceChangePercentage7dInCurrency
	price_change_percentage_14d_in_currency: PriceChangePercentage14dInCurrency
	price_change_percentage_30d_in_currency: PriceChangePercentage30dInCurrency
	price_change_percentage_60d_in_currency: PriceChangePercentage60dInCurrency
	price_change_percentage_200d_in_currency: PriceChangePercentage200dInCurrency
	price_change_percentage_1y_in_currency: PriceChangePercentage1yInCurrency
	market_cap_change_24h_in_currency: MarketCapChange24hInCurrency
	market_cap_change_percentage_24h_in_currency: MarketCapChangePercentage24hInCurrency
	total_supply: number
	max_supply: number
	max_supply_infinite: boolean
	circulating_supply: number
	outstanding_supply: any
	last_updated: string
}

export interface CurrentPrice {
	btc: number
	eur: number
	usd: number
}

export interface Ath {
	btc: number
	eur: number
	usd: number
}

export interface AthChangePercentage {
	btc: number
	eur: number
	usd: number
}

export interface AthDate {
	btc: string
	eur: string
	usd: string
}

export interface Atl {
	btc: number
	eur: number
	usd: number
}

export interface AtlChangePercentage {
	btc: number
	eur: number
	usd: number
}

export interface AtlDate {
	btc: string
	eur: string
	usd: string
}

export interface MarketCap {
	btc: number
	eur: number
	usd: number
}

export interface FullyDilutedValuation {
	btc: number
	eur: number
	usd: number
}

export interface TotalVolume {
	btc: number
	eur: number
	usd: number
}

export interface High24h {
	btc: number
	eur: number
	usd: number
}

export interface Low24h {
	btc: number
	eur: number
	usd: number
}

export interface PriceChange24hInCurrency {
	btc: number
	eur: number
	usd: number
}

export interface PriceChangePercentage1hInCurrency {
	btc: number
	eur: number
	usd: number
}

export interface PriceChangePercentage24hInCurrency {
	btc: number
	eur: number
	usd: number
}

export interface PriceChangePercentage7dInCurrency {
	btc: number
	eur: number
	usd: number
}

export interface PriceChangePercentage14dInCurrency {
	btc: number
	eur: number
	usd: number
}

export interface PriceChangePercentage30dInCurrency {
	btc: number
	eur: number
	usd: number
}

export interface PriceChangePercentage60dInCurrency {
	btc: number
	eur: number
	usd: number
}

export interface PriceChangePercentage200dInCurrency {
	btc: number
	eur: number
	usd: number
}

export interface PriceChangePercentage1yInCurrency {
	btc: number
	eur: number
	usd: number
}

export interface MarketCapChange24hInCurrency {
	btc: number
	eur: number
	usd: number
}

export interface MarketCapChangePercentage24hInCurrency {
	btc: number
	eur: number
	usd: number
}

export interface Ticker {
	base: string
	target: string
	market: Market
	last: number
	volume: number
	converted_last: ConvertedLast
	converted_volume: ConvertedVolume
	trust_score: any
	bid_ask_spread_percentage: number
	timestamp: string
	last_traded_at: string
	last_fetch_at: string
	is_anomaly: boolean
	is_stale: boolean
	trade_url: string
	token_info_url: any
	coin_id: string
	target_coin_id: string
	coin_mcap_usd: number
}

export interface Market {
	name: string
	identifier: string
	has_trading_incentive: boolean
}

export interface ConvertedLast {
	btc: number
	eth: number
	usd: number
}

export interface ConvertedVolume {
	btc: number
	eth: number
	usd: number
}
