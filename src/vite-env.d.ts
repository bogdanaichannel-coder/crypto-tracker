/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOW_DEVTOOLS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
