/* eslint-disable react/no-unescaped-entities */
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "sonner"
import Image from "next/image"

export default function FormationsList(){

    const router = useRouter()

    var [formations, setFormations] = useState([])
    var [activePopUp, setActivePopUp] = useState(null)
    const popUpRef = useRef(null)
    var [ prompt, setPrompt ] = useState("")
    
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/get`, { withCredentials: true })
            .then((response)=>{
                setFormations(response.data)
            })
    }, [])

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

    useEffect(()=>{
        let timer = setTimeout(()=>{
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/get?title=${prompt}`, { withCredentials: true })
            .then((response)=>{
                setFormations(response.data.filter( f => f.published === true ))
            })
            .catch(()=>setFormations([]))
        }, 400)
        return ()=>clearTimeout(timer)
    },[prompt])

    const togglePopUp = (formationId) => {
        setActivePopUp((prev) => (prev === formationId ? null : formationId))
    }

    const deleteFormation = (_f) => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/delete`, { data: { _id: _f._id }, withCredentials: true })
            .then(()=>{ setFormations( (prev) => prev.filter( f => f._id !== _f._id ) ); toast.info(`La formation intitulée ${_f.title} est supprimée.`) })
            .catch(()=>toast.error("Erreur de suppression de formation, veuillez réessayer plus tard."))
    }

    const publishFormation = async (formation) => {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/publication`, { formationId: formation._id , update: { published: !formation.published }}, { withCredentials: true })
        .then( async ()=>{
            await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/get`, { withCredentials: true })
            .then((response)=>{
                setFormations(response.data)
                if(!formation.published){
                    toast.info(`La formation ${formation.title} est désormais public.`)
                }
                if(formation.published){
                    toast.info(`Vous avez dépublié la formation ${formation.title}.`)
                }
            })
        }).catch(()=>{ toast.error('Erreur de publication du formation, veuillez réessayer plus tard.') })
    }

    return(
        <>
            <div className="actions">
                <input type="text" name="" id="" value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Recherche de formation"/>
                    <Link href="/dashboard/formation/create">
                        <button>
                            Ajouter une formation
                        </button>
                    </Link>
            </div>
            <ul className="formations" ref={popUpRef}>
                <li className="titles">
                    <ul>
                        <li className="title">Titres</li>
                        <li className="description">Descriptions</li>
                        <li className="addDate">Date d'ajout</li>
                        <li className="publicationDate">Date de publication</li>
                        <li className="published">Publiée</li>
                        <li className="formation-actions">Actions</li>
                    </ul>
                </li>
                    { formations && <li>
                            { formations.map( formation => (
                                <ul className="formation" key={formation._id}>
                                    <li className="title">
                                        <h5>{formation.title}</h5>
                                    </li>
                                    <li  className="description">
                                        <p>{formation.description}</p>
                                    </li>
                                    <li  className="addDate">
                                        <p>{ new Date(formation.createdAt).toLocaleString("fr-FR") }</p>
                                    </li>
                                    <li className="publicationDate">
                                        { formation.published ? <p>{ new Date(formation.publishDate).toLocaleString("fr-FR") }</p> : <p>------------</p>}
                                    </li>
                                    <li className="published">
                                        { formation.published && <div className="badge yes">
                                            <p>oui</p>
                                        </div> }
                                        { !formation.published && <div className="badge no">
                                            <p>non</p>
                                        </div> }
                                    </li>
                                    <li className="formation-actions">
                                        <ul className={ activePopUp === formation._id ? 'pop-up show' : 'pop-up hide'}>
                                            <li onClick={ () => {
                                                togglePopUp(formation._id);
                                                deleteFormation(formation);
                                            }} >Supprimer</li>
                                            <li onClick={ () => {
                                                togglePopUp(formation._id);
                                                publishFormation(formation);
                                            }}>{ formation.published ? "Dépublier" : "Publier" }</li>
                                            <li onClick={ () => {
                                                togglePopUp(formation._id);
                                                router.push(`/dashboard/formation/update/${formation._id}`);
                                            } }>Modifier</li>
                                        </ul>
                                        <div className="custom-container" onClick={ () => togglePopUp(formation._id) }>
                                            <Image src="/images/kebab.png" alt="icone kebab" width={32} height={32} priority/>
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