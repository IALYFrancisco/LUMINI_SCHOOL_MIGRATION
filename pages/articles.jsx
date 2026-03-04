import Nav from "../components/nav"
import '../../public/styles/formationsPage.css'
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../components/loading"
import DOMPurify from "dompurify"
import { Link } from "react-router-dom"
import { useHead, useSeoMeta } from "@unhead/react"

export function ArticlesPage(){

    useHead({
        link: [
            { rel: 'canonical', href: 'https://luminischool.onrender.com/articles' }
        ]
    })

    useSeoMeta({

        ogUrl: 'https://luminischool.onrender.com/articles'

    })

    var [ articles, setArticles ] = useState([])
    var [ loading, setLoading ] = useState(true)
    var [ prompt, setPrompt ] = useState("")

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/article/get`, { withCredentials: true })
            .then((response)=>{
                setArticles(response.data.filter( article => article.published === true ))
            })
            .catch(()=>setArticles([]))
            .finally(()=>setLoading(false))
    }, [])

    useEffect(()=>{
        let timer = axios.get(`${import.meta.env.VITE_API_BASE_URL}/article/get?title=${prompt}`, { withCredentials: true })
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
                                        <img src={ (article.image.includes('https') || article.image.includes('http')) ? article.image : `${import.meta.env.VITE_API_BASE_URL}/${article.image}` } alt="" />
                                    </div>
                                    <div className="formation-infos">
                                        <h4>{article.title}</h4>
                                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.contents) }}></p>
                                        <Link to={`/article/${article.slug}`}>
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