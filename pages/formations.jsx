/* eslint-disable react/no-unescaped-entities */
import { Nav } from '@/components/nav'
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import Loading from '@/components/loading'
import Head from 'next/head'

export default function FormationsPage(){

    var [ formations, setFormations ] = useState([])
    var [ loading, setLoading ] = useState(true)
    var [ prompt, setPrompt ] = useState("")

    useHead({
        meta: [
            { name:'description', content: 'Explorez toutes les formations proposées sur LUMINI School, la plateforme de formation en informatique. Accédez facilement aux informations et détails en ligne pour préparer votre parcours.' }
        ]
    })

    useSeoMeta({

        ogDescription: "Explorez toutes les formations proposées sur LUMINI School, la plateforme de formation en informatique. Accédez facilement aux informations et détails en ligne pour préparer votre parcours.",
        
        twitterDescription: "Explorez toutes les formations proposées sur LUMINI School, la plateforme de formation en informatique. Accédez facilement aux informations et détails en ligne pour préparer votre parcours."

    })

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get`, { withCredentials: true })
            .then((response)=>{
                setFormations(response.data.filter( f => f.published === true ))
            })
            .catch(()=>setFormations([]))
            .finally(()=>setLoading(false))
    }, [])

    useEffect(()=>{
        let timer = setTimeout(()=>{
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/formation/get?title=${prompt}`, { withCredentials: true })
            .then((response)=>{
                setFormations(response.data.filter( f => f.published === true ))
            })
            .catch(()=>setFormations([]))
        }, 400)
        return ()=>clearTimeout(timer)
    },[prompt])

    if(loading) return <Loading/>
    if(formations) return(
        <>
            <Head>
                <title>Formations | LUMINI School - Plateforme de formation en informatique</title>
                <link rel="canonical" href="https://luminischool.onrender.com/formations" />
            
                <meta property="og:title" content="Formations | LUMINI School - Plateforme de formation en informatique" />
                <meta property="og:url" content="https://luminischool.onrender.com/formations" />
            
                <meta name="twitter:title" content="Formations | LUMINI School - Plateforme de formation en informatique" />
            </Head>
            <Nav></Nav>
            <section className="formations-page">
                <div className="head">
                    <h2>Toute nos formations :</h2>
                    <p>Ci-dessous la liste de toute nos formations. Elles sont issues des branches existantes du secteur de l'informatique et ont été éléborées par nous-même afin de garantir leurs contenus ✨.</p>
                    <div className="actions">
                        <input type="text" name="formation" id="" value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Rehcrecher des formations"/>
                    </div>
                </div>
                <div className="body">
                    { formations && <>
                        { formations.map( formation => (
                            <div className="card-container" key={formation._id}>
                                <div className="card">
                                    <div className="formation-image">
                                        <img src={ (formation.image.includes('https') || formation.image.includes('http')) ? formation.image : `${import.meta.env.VITE_API_BASE_URL}/${formation.image}` } alt="" />
                                    </div>
                                    <div className="formation-infos">
                                        <h4>{formation.title}</h4>
                                        <p>{formation.description}</p>
                                        <Link to={`/registrations/formation/${formation._id}`}>
                                            <button>S'inscrire</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </> }
                </div>
            </section>
        </>
    )
}