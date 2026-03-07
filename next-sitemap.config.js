/** @type { import('next-sitemap').IConfig } */
modules.exports = {
    siteUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: [ '/dashboard/*' ]
}