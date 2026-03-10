/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_RELAY_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
