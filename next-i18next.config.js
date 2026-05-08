const path = require('path');
const resourcesToBackend = require('i18next-resources-to-backend');
const LanguageDetector = require('i18next-browser-languagedetector');

const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'ar'],
  ns: ['common', 'auth', 'products', 'orders', 'dashboard', 'notifications'],
  defaultNS: 'common',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ar'],
  },
  localePath: path.resolve('./public/locales'),
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
    caches: ['localStorage'],
  },
};

module.exports = i18nConfig;
