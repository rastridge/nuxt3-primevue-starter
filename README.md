# Nuxt 3 + PrimeVue Starter

- https://github.com/sfxcode/nuxt3-primevue-starter

## Before using this app with original buffalorugby database some modifications to the DB are needed

# All Game Dates Times must be changed

# Using

UPDATE `inbrc_stats_games` SET `date` = DATE_SUB(date, INTERVAL 4 HOUR) WHERE 1;

# Some fields must be added but I dont remember which ones

# get latest iamges / docs

~/buffalorugby.org/public > cp -r \_all_imgs /home/rastridge/media.my-test-site.net/public
~/buffalorugby.org/public > cp -r \_img /home/rastridge/media.my-test-site.net/public
~/buffalorugby.org/public > cp -r imgs /home/rastridge/media.my-test-site.net/public
~/buffalorugby.org/public > cp -r xoda /home/rastridge/media.my-test-site.net/public

# query database to replace img url references from https://buffalorugby.org to https://media.my-test-site.net

UPDATE inbrc_news SET news_article = REPLACE(news_article,'https://buffalorugby.org/_img', 'https://media.my-test-site.net/_img') WHERE `news_id` = 1022

## Project setup and usage

Install node:

**Latest node LTS version required (19)**
Use node manager like **nvm** to install.
nvm use stable

Install dependencies:

```
yarn install
```

Run development server:

```
yarn dev
```

Build:

```
yarn build
```

Use VSCode github commit to send to Netlify for build

```

```
