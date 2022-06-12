/** @type {import('next').NextConfig} */

const withImages = require("next-images");
const { i18n } = require("./next-i18next.config");

module.exports = withImages({
  reactStrictMode: true,
  i18n,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
