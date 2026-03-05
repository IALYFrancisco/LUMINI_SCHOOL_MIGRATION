import { useRouter } from "next/router"
import { Nav } from "@/components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "@/components/loading"
import DOMPurify from 'dompurify'
import Head from "next/head"

export default function ArticleView(){
    
    const router = useRouter()
    const { slug } = router.query
    var [ article, setArticle ] = useState(null)
    var [ loading, setLoading ] = useState(true)
    var [ seo, setSeo ] = useState(null)
    
    useEffect(()=>{
        if(slug){
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get?slug=${slug}`)
            .then((response)=>{
                setArticle(response.data)
                axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seo/get?articleId=${response.data._id}`, {withCredentials: true})
                    .then((response)=>{
                        setSeo(response.data)
                    })
            }).finally(()=>setLoading(false))
        }
    }, [slug])

    if (loading) return <Loading/>
    return (
        <>
            <Head>
                    <title>{(seo && seo.title) || undefined}</title>
                    <link rel="canonical" href={(seo && `${process.env.NEXT_PUBLIC_APP_BASE_URL}${seo.canonicUrl}`) || undefined} />
                    <meta name="description" content={ (seo && seo.description) || undefined }/>

                    <meta property="og:title" content={ (seo && seo.title) || undefined } />
                    <meta property="og:type" content="article"/>
                    <meta property="og:description" content={ (seo && seo.description) || undefined }/>
                    <meta property="og:url" content={ (seo && `${process.env.NEXT_PUBLIC_APP_BASE_URL}${seo.canonicUrl}`) || undefined } />
                    <meta property="og:image" content={ seo && ( (seo.image.startsWith('http') || seo.image.startsWith('http')) ? seo.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${seo.image}` ) } />

                    <meta name="twitter:title" content={ (seo && seo.title) || undefined } />
                    <meta name="twitter:description" content={ (seo && seo.description) || undefined } />
                    <meta name="twitter:image" content={ seo && ( (seo.image.startsWith('http') || seo.image.startsWith('http')) ? seo.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${seo.image}` ) } />
                    <meta property="article:author" content="LUMINI School" />
                    <meta property="article:published_time" content={ (article && `${article.publishedAt}`) || undefined } />
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