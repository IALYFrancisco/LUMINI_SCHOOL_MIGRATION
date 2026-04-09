const axios = require('axios')

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

  // 🔥 Ajout dynamique des articles
  additionalPaths: async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get`
      )

      return res.data.map((a) => ({
        loc: `/article/${a.slug}`, // ✅ pas de "/" à la fin
        changefreq: "weekly",
        priority: 0.8,
        lastmod: a.updatedAt,
      }))
    } catch (err) {
      console.log("Erreur sitemap articles:", err.message)
      return []
    }
  },

  // 🔥 Gestion fine des priorités
  transform: async (config, path) => {
    // Homepage
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Pages importantes
    if (
      path === '/articles' ||
      path === '/formations'
    ) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    // Pages légales
    if (
      path === '/legal-notice' ||
      path === '/privacy-policy' ||
      path === '/terms-and-conditions'
    ) {
      return {
        loc: path,
        changefreq: 'yearly',
        priority: 0.4,
        lastmod: new Date().toISOString(),
      }
    }

    // Par défaut
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },

  // 🔥 Exclusions importantes (SEO + doublons)
  exclude: [
    '/dashboard',
    '/dashboard/*',

    '/article/*',           // ❌ évite doublons avec additionalPaths
    '/authentication/*',    // ❌ login/register
    '/registrations/*',     // ❌ pages dynamiques inutiles
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/dashboard",
          "/authentication",
          "/registrations",
        ],
      },
    ],
  },
}