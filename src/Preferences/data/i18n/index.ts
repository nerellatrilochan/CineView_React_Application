import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enAuth from './locales/en/auth.json'
import enCollection from './locales/en/collection.json'
import enCommon from './locales/en/common.json'
import enMovies from './locales/en/movies.json'
import enPreferences from './locales/en/preferences.json'
import enSearch from './locales/en/search.json'
import enTvShows from './locales/en/tvShows.json'

import esAuth from './locales/es/auth.json'
import esCollection from './locales/es/collection.json'
import esCommon from './locales/es/common.json'
import esMovies from './locales/es/movies.json'
import esPreferences from './locales/es/preferences.json'
import esSearch from './locales/es/search.json'
import esTvShows from './locales/es/tvShows.json'

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      auth: enAuth,
      movies: enMovies,
      tvShows: enTvShows,
      search: enSearch,
      collection: enCollection,
      preferences: enPreferences,
    },
    es: {
      common: esCommon,
      auth: esAuth,
      movies: esMovies,
      tvShows: esTvShows,
      search: esSearch,
      collection: esCollection,
      preferences: esPreferences,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

export default i18n