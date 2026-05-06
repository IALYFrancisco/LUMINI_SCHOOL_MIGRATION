/* eslint-disable react/no-unescaped-entities */
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import DOMPurify from "isomorphic-dompurify"
import Image from "next/image"
import { toast } from "sonner"
import { FormatDateAndHourMG } from "@/contexts/DateRefactoring"

export default function ArticlesList(){

    const router = useRouter()

    var [articles, setArticles] = useState([])
    var [activePopUp, setActivePopUp] = useState(null)
    const popUpRef = useRef(null)
    var [ prompt, setPrompt ] = useState("")
    
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get`, { withCredentials: true })
            .then((response)=>{
                setArticles(response.data)
            }).catch(()=>setArticles([]))
    }, [])
    
    useEffect(()=>{
        let timer = setTimeout(()=>{
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get?title=${prompt}`, { withCredentials: true })
            .then((response)=>{
                setArticles(response.data)
            }).catch(()=>setArticles([]))
        }, 400)
        return ()=> clearTimeout(timer)
    }, [prompt])

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if(popUpRef.current && !popUpRef.current.contains(event.target)) {
                setActivePopUp(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const togglePopUp = (articleId) => {
        setActivePopUp((prev) => (prev === articleId ? null : articleId))
    }

    const deleteArticle = (articleId) => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/delete`, { data: { _id: articleId }, withCredentials: true })
            .then(()=>{ setArticles( (prev) => prev.filter( article => article._id !== articleId ) ) })
            .catch(()=>{
                toast.error("Erreur de suppression de l'article, veuillez réessayer plus tard.")
            }
        )
    }

    const publishArticle = async (article) => {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/publication`, { articleId: article._id , update: { published: !article.published }}, { withCredentials: true })
        .then( async ()=>{
            await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get`, { withCredentials: true })
            .then((response)=>{
                setArticles(response.data)
            })
        }).catch(()=>{ toast.error("Erreur de publication de l'article, veuillez réessayer plus tard.") })
    }

    return(
        <>
            <div className="actions">
                <input type="text" name="" id="" value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Recherche d'un article"/>
                    <Link href="/dashboard/articles/create">
                        <button>
                            Créer un article
                        </button>
                    </Link>
            </div>
            <ul className="formations" ref={popUpRef}>
                <li className="titles">
                    <ul>
                        <li className="title">Titres</li>
                        <li className="description">Contenus de l'article</li>
                        <li className="addDate">Date d'ajout</li>
                        <li className="publicationDate">Date de publication</li>
                        <li className="published">Publiée</li>
                        <li className="formation-actions">Actions</li>
                    </ul>
                </li>
                    { articles && <li>
                            { articles.map( article => (
                                <ul className="formation" key={article._id}>
                                    <li className="title">
                                        <h5>{article.title}</h5>
                                    </li>
                                    <li className="description">
                                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.contents) }}></p>
                                    </li>
                                    <li className="addDate">
                                        <p>{ FormatDateAndHourMG(article.createdAt) }</p>
                                    </li>
                                    <li className="publicationDate">
                                        { article.published ? <p>{ FormatDateAndHourMG(article.publishedAt) }</p> : <p>------------</p>}
                                    </li>
                                    <li className="published">
                                        { article.published && <div className="badge yes">
                                            <p>oui</p>
                                        </div> }
                                        { !article.published && <div className="badge no">
                                            <p>non</p>
                                        </div> }
                                    </li>
                                    <li className="formation-actions">
                                        <ul className={ activePopUp === article._id ? 'pop-up show' : 'pop-up hide'}>
                                            <li onClick={ () => {
                                                togglePopUp(article._id);
                                                deleteArticle(article._id);
                                            }} >Supprimer</li>
                                            <li onClick={ () => {
                                                togglePopUp(article._id);
                                                publishArticle(article);
                                            }}>{ article.published ? "Dépublier" : "Publier" }</li>
                                            <li onClick={ () => {
                                                togglePopUp(article._id);
                                                router.push(`/dashboard/articles/update/${article._id}`);
                                            } }>Modifier</li>
                                        </ul>
                                        <div className="custom-container" onClick={ () => togglePopUp(article._id) }>
                                            <Image src="/images/kebab.png" alt="menu kebab" width={32} height={32} priority/>
                                        </div>
                                    </li>
                                </ul>
                                )
                            )
                        }
                </li>}
            </ul>
        </>
    )
}