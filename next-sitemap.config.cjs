/** @type { import('next-sitemap').IConfig } */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    outDir: "./dist",
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 0.7,
    autoLastmod: true,
    exclude: [ '/dashboard/*' ]
}