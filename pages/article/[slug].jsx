// import { useRouter } from "next/router"
// import { Nav } from "@/components/nav"
// import { useEffect, useState } from "react"
// import axios from "axios"
// import Loading from "@/components/loading"
// import DOMPurify from 'isomorphic-dompurify'
// import Head from "next/head"

// export default function ArticleView(){
    
//     const router = useRouter()
//     const { slug } = router.query
//     var [ article, setArticle ] = useState(null)
//     var [ loading, setLoading ] = useState(true)
//     var [ seo, setSeo ] = useState(null)
    
//     useEffect(()=>{
//         if(slug){
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get?slug=${slug}`)
//             .then((response)=>{
//                 setArticle(response.data)
//                 axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seo/get?articleId=${response.data._id}`, {withCredentials: true})
//                     .then((response)=>{
//                         setSeo(response.data)
//                     })
//             }).finally(()=>setLoading(false))
//         }
//     }, [slug])

//     if (loading) return <Loading/>
//     return (
//         <>
//             <Head>
//                     <title>{seo?.title}</title>
//                     <link rel="canonical" href={(seo && `${process.env.NEXT_PUBLIC_APP_BASE_URL}${seo.canonicUrl}`) || undefined} />
//                     <meta name="description" content={ seo?.description }/>

//                     <meta property="og:title" content={ seo?.title } />
//                     <meta property="og:type" content="article" key="og:type"/>
//                     <meta property="og:description" content={ seo?.description }/>
//                     <meta property="og:url" content={ (seo && `${process.env.NEXT_PUBLIC_APP_BASE_URL}${seo.canonicUrl}`) || undefined } />
//                     <meta property="og:image" content={ seo && ( (seo.image.startsWith('http') || seo.image.startsWith('http')) ? seo.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${seo.image}` ) } key="og:image" />

//                     <meta name="twitter:title" content={ seo?.title } />
//                     <meta name="twitter:description" content={ seo?.description } />
//                     <meta name="twitter:image" content={ seo && ( (seo.image.startsWith('http') || seo.image.startsWith('http')) ? seo.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${seo.image}` ) } key="twitter:image" />
//                     <meta property="article:author" content="LUMINI School" />
//                     <meta property="article:published_time" content={ article?.publishedAt } />
//             </Head>
//             <Nav></Nav>
//             <div className="article-container">
//                 <article>
//                 { article &&
//                     <>
//                         <h1>{article.title}</h1>
//                         <div className="article-contents ql-container ql-snow">
//                             <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.contents)}} className="contents ql-editor">
//                             </div>
//                         </div>
//                     </>
//                 }
//                 </article>
//             </div>            
//         </>
//     )
// }

import { useRouter } from "next/router"
import { Nav } from "@/components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "@/components/loading"
import DOMPurify from 'isomorphic-dompurify'
import Head from "next/head"

export async function getStaticPaths() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get`)
    const articles = res.data

    const paths = articles.map(article => ({
        params: { slug: article.slug }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params

    const resArticle = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get?slug=${slug}`)
    const article = resArticle.data

    const resSeo = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seo/get?articleId=${article._id}`)
    const seo = resSeo.data

    return {
        props: {
            article,
            seo
        }
    }
}

export default function ArticleView({ article: initialArticle, seo: initialSeo }) {
    
    const router = useRouter()
    const { slug } = router.query
    var [ article, setArticle ] = useState(initialArticle)
    var [ loading, setLoading ] = useState(!initialArticle)
    var [ seo, setSeo ] = useState(initialSeo)
    
    useEffect(()=>{
        if(slug && !article){
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get?slug=${slug}`)
            .then((response)=>{
                setArticle(response.data)
                axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seo/get?articleId=${response.data._id}`, {withCredentials: true})
                    .then((response)=>{
                        setSeo(response.data)
                    })
            }).finally(()=>setLoading(false))
        }
    }, [slug, article])

    if (loading) return <Loading/>
    return (
        <>
            <Head>
                    <title>{seo?.title}</title>
                    <link rel="canonical" href={(seo && `${process.env.NEXT_PUBLIC_APP_BASE_URL}${seo.canonicUrl}`) || undefined} />
                    <meta name="description" content={ seo?.description }/>

                    <meta property="og:title" content={ seo?.title } />
                    <meta property="og:type" content="article" key="og:type"/>
                    <meta property="og:description" content={ seo?.description }/>
                    <meta property="og:url" content={ (seo && `${process.env.NEXT_PUBLIC_APP_BASE_URL}${seo.canonicUrl}`) || undefined } />
                    <meta property="og:image" content={ seo && ( (seo.image.startsWith('https') || seo.image.startsWith('http')) ? seo.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${seo.image}` ) } key="og:image" />

                    <meta name="twitter:title" content={ seo?.title } />
                    <meta name="twitter:description" content={ seo?.description } />
                    <meta name="twitter:image" content={ seo && ( (seo.image.startsWith('https') || seo.image.startsWith('http')) ? seo.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${seo.image}` ) } key="twitter:image" />
                    <meta property="article:author" content="LUMINI School" />
                    <meta property="article:published_time" content={ article?.publishedAt } />
            </Head>
            <Nav></Nav>
            <div className="article-container">
                <article>
                { article &&
                    <>
                        <h1>{article.title}</h1>
                        <div className="article-contents ql-container ql-snow">
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.contents)}} className="contents ql-editor">
                            </div>
                        </div>
                    </>
                }
                </article>
            </div>            
        </>
    )
}