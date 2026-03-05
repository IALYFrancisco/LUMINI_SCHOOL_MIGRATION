import { useRouter } from "next/router"
import { Nav } from "@/components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "@/components/loading"
import '../../public/styles/articleView.css'
import DOMPurify from 'dompurify'
import { useHead, useSeoMeta } from "@unhead/react"

export default function ArticleView(){
    
    const { slug } = useParams()
    var [ article, setArticle ] = useState(null)
    var [ loading, setLoading ] = useState(true)
    var [ seo, setSeo ] = useState(null)
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/article/get?slug=${slug}`)
        .then((response)=>{
            setArticle(response.data)
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/seo/get?articleId=${response.data._id}`, {withCredentials: true})
                .then((response)=>{
                    setSeo(response.data)
                })
        }).finally(()=>setLoading(false))
    }, [slug])

    useHead({
        link: [
            { rel: 'canonical', href: (seo && `${import.meta.env.VITE_APP_BASE_URL}${seo.canonicUrl}`) || undefined }
        ],
        meta: [
            { name: 'description', content: (seo && seo.description) || undefined }
        ]
    })
    
    useSeoMeta({

        title: (seo && seo.title) || undefined,
        
        ogTitle: (seo && seo.title) || undefined,
        ogType: 'article',
        ogDescription: (seo && seo.description) || undefined,
        ogUrl: (seo && `${import.meta.env.VITE_APP_BASE_URL}${seo.canonicUrl}`) || undefined,
        ogImage: seo && ( (seo.image.startsWith('http') || seo.image.startsWith('http')) ? seo.image : `${import.meta.env.VITE_API_BASE_URL}/${seo.image}` ),
        
        twitterTitle: (seo && seo.title) || undefined,
        twitterDescription: (seo && seo.description) || undefined,
        twitterImage: seo && ( (seo.image.startsWith('http') || seo.image.startsWith('http')) ? seo.image : `${import.meta.env.VITE_API_BASE_URL}/${seo.image}` ),
        
        articleAuthor: 'LUMINI School',
        articlePublishedTime: (article && `${article.publishedAt}`) || undefined
    
    })

    if (loading) return <Loading/>
    return (
        <>
            <Nav></Nav>
            <div className="article-container">
                <article>
                {
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