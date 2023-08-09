# Nuxt 3 + PrimeVue Starter

## Before using this app with original buffalorugby database some modifications to the DB are needed

- All Game Dates Times must be changed
- Using UPDATE `inbrc_stats_games` SET `date` = DATE_SUB(date, INTERVAL 4 HOUR) WHERE 1;
- Some fields must be added but I dont remember which ones

B

## Project setup and usage

Install node:

**Latest node LTS version required (18)**
Use node manager like **nvm** to install.

Install dependencies:

```
yarn install
```

Run development server:

```
yarn dev
```

Vitest test runner:

```
yarn test:unit
```

Build:

```
yarn build
```

Use VSCode github commit to send to Netlify for build

```

```
