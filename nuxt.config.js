import pkg from './package.json'

export default defineNuxtConfig({
	devtools: false,
	ssr: false,
	runtimeConfig: {
		API_SECRET: process.env.API_SECRET,
		DB_HOST: process.env.DB_HOST,
		DB_USER: process.env.DB_USER,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_DATABASE: process.env.DB_DATABASE,
		DATABASE_URL: process.env.DATABASE_URL,
		SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
		ONSERVER: process.server,
		ONCLIENT: process.client,
		TO: process.env.TO,
		FROM: process.env.FROM,
		FROM_NAME: process.env.FROM_NAME,
		apiSecret: process.env.API_SECRET,
		EE_API_KEY: process.env.EE_API_KEY,
		TWILIO_NUMBER: process.env.TWILIO_NUMBER,
		TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
		TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
		CLOUD_NAME: process.env.CLOUD_NAME,
		CLOUD_API_KEY: process.env.CLOUD_API_KEY,
		CLOUD_API: process.env.CLOUD_API,
		CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
		CLOUD_UPLOAD_PRESET: process.env.CLOUD_UPLOAD_PRESET,
		MY_MEDIA_API: process.env.MY_MEDIA_API,
		// Keys within public, will be also be
		// exposed to the client-side
		public: {
			APP_VERSION: pkg.version,
			APP_NAME: pkg.name,
		},
	},
	modules: [
		'@formkit/nuxt',
		'@sfxcode/nuxt-primevue',
		'@unocss/nuxt',
		'@pinia/nuxt',
		'@nuxtjs/i18n',
		'@nuxt/content',
		'@vueuse/nuxt',
	],
	buildModules: ['@nuxtjs/google-fonts'],
	components: ['~/components/forms', '~/components'],

	dayjs: {
		locales: ['en'],
		defaultLocale: 'en',
		defaultTimeZone: 'America/New_York',
	},
	content: {
		highlight: {
			theme: 'one-dark-pro',
			preload: ['json', 'js', 'ts', 'html', 'css', 'vue'],
		},
		// Options
	},
	i18n: {
		lazy: true,
		langDir: 'locales',
		defaultLocale: 'en',
		strategy: 'no_prefix',
		locales: [
			{ code: 'en', file: 'en.json', name: 'English' },
			{ code: 'de', file: 'de.json', name: 'German' },
		],

		vueI18n: './vue-i18n.options.ts',
	},
	unocss: {
		uno: true,
		attributify: true,
		preflight: false,
		icons: {
			scale: 1.2,
		},
		shortcuts: [
			[
				'btn',
				'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
			],
		],
	},
	primevue: {
		config: {
			ripple: true,
		},
	},
	css: [
		'primevue/resources/primevue.css',
		'primeicons/primeicons.css',
		'@sfxcode/formkit-primevue/dist/sass/formkit-prime-inputs.scss',
		'@sfxcode/formkit-primevue/dist/sass/formkit-primevue.scss',
	],
	/* 	googleFonts: {
		prefetch: true,
		families: {
			Roboto: true,
			'Josefin+Sans': true,
			Lato: [100, 300],
			Raleway: {
				wght: [100, 400],
				ital: [100],
			},
		},
	}, */
	googleFonts: {
		prefetch: true,
		families: {
			Lora: true,
		},
	},
	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			'defineStore', // import { defineStore } from 'pinia'
		],
	},
	build: {
		transpile: ['nuxt', 'primevue'],
	},
	sourcemap: {
		client: false,
		server: true,
	},
})
