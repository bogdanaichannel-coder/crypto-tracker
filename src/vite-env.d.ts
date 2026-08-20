/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SHOW_DEVTOOLS: string
	readonly VITE_CG_DEMO_API_KEY: string
	readonly VITE_CG_DEMO_API_BASE_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
