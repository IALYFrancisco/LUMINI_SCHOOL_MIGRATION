/* eslint-disable react/no-unescaped-entities */
import { Nav } from "@/components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "@/components/loading"
import DOMPurify from "isomorphic-dompurify"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"

export default function ArticlesPage(){

    var [ articles, setArticles ] = useState([])
    var [ loading, setLoading ] = useState(true)
    var [ prompt, setPrompt ] = useState("")

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get`, { withCredentials: true })
            .then((response)=>{
                setArticles(response.data.filter( article => article.published === true ))
            })
            .catch(()=>setArticles([]))
            .finally(()=>setLoading(false))
    }, [])

    useEffect(()=>{
        let timer = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get?title=${prompt}`, { withCredentials: true })
            .then((response)=>{
                setArticles(response.data.filter( article => article.published === true ))
            })
            .catch(()=>setArticles([]))
            .finally(()=>setLoading(false))
        return ()=>clearTimeout(timer)
    },[prompt])

    if(loading) return <Loading/>
    if(articles) return(
        <>
            <Head>
                <title>Articles et conseils | LUMINI School - Plateforme de formation en informatique</title>
                <link rel="canonical" href="https://luminischool.onrender.com/articles" />
                <meta name="description" content="Découvrez tous les articles de LUMINI School : conseils, astuces et actualités sur les métiers de l'informatique, le développement web et les formations disponibles." />

                <meta property="og:title" content="Articles et conseils | LUMINI School - Plateforme de formation en informatique" />
                <meta property="og:url" content="https://luminischool.onrender.com/articles" />
                <meta property="og:description" content="Découvrez tous les articles de LUMINI School : conseils, astuces et actualités sur les métiers de l'informatique, le développement web et les formations disponibles."/>

                <meta name="twitter:title" content="Articles et conseils | LUMINI School - Plateforme de formation en informatique" />
                <meta name="twitter:description" content="Découvrez tous les articles de LUMINI School : conseils, astuces et actualités sur les métiers de l'informatique, le développement web et les formations disponibles." />
            </Head>
            <Nav></Nav>
            <section className="formations-page">
                <div className="head">
                    <h2>Tout nos articles :</h2>
                    <p>Former et informer les gens est une occupation de haut niveau. Non seulement un dévoir sacré mais aussi une manière d'éduquer. Ceci dit, nos pensées sont à la portée de tous à travers nos articles  📜.</p>
                    <div className="actions">
                        <input type="text" name="formation" id="" value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Rehcreche d'article"/>
                    </div>
                </div>
                <div className="body">
                    { articles && <>
                        { articles.map( article => (
                            <article className="card-container" key={article._id}>
                                <div className="card">
                                    <div className="formation-image">
                                        <Image src={ (article.image.startsWith('https') || article.image.startsWith('http')) ? article.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${article.image}` } alt={article.title} width={500} height={500} unoptimized={ process.env.NEXT_PUBLIC_NODE_ENV === "development" } priority />
                                    </div>
                                    <div className="formation-infos">
                                        <h4>{article.title}</h4>
                                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.contents) }}></p>
                                        <Link href={`/article/${article.slug}`}>
                                            <button>Lire plus</button>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </> }
                </div>
            </section>
        </>
    )
}