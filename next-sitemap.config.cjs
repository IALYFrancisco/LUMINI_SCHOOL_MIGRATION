const axios = require('axios')

/** @type { import('next-sitemap').IConfig } */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
    generateRobotsTxt: true,
    additionalPaths: async ()=>{
        try{
            let articles = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get`)
            return articles.data.map( a => ({
                loc: `/article/${a.slug}/`,
                changefreq: "weekly",
                priority: 0.8,
                lastmod: a.updatedAt
            }))
        }catch(err){
            console.log(err)
            return []
        }
    },
    generateIndexSitemap: false,
    outDir: "./dist",
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 0.7,
    autoLastmod: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: ["/dashboard"]
            }
        ]
    },
    exclude: [ '/dashboard', '/dashboard/*' ]
}