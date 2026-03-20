/* eslint-disable react/no-unescaped-entities */
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import Image from "next/image"

export default function UsersList(){

    var [users, setUsers] = useState([])
    var [activePopUp, setActivePopUp] = useState(null)
    const popUpRef = useRef(null)
    
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/get`, { withCredentials: true })
            .then((response)=>{
                setUsers(response.data)
            }).catch((err)=>{
                console.log(err)
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

    const togglePopUp = (userId) => {
        setActivePopUp((prev) => (prev === userId ? null : userId))
    }

    const changeUserStatus = async (user) => {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/change-status`, { userId: user._id , update: { status: user.status === "user" ? "admin" : "user" }}, { withCredentials: true })
        .then( async ()=>{
            toast.info(`${user.name} est désormais un ${user.status === "user" ? "administrateur" : "utilisateur simple"}`)
            await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/get`, { withCredentials: true })
            .then((response)=>{
                setUsers(response.data)
            }).catch((err)=>{
                console.log(err)
            })
        }).catch(()=>toast.error("Erreur de changement de statut d'utilisateur, veuillez réessayer plus tard."))
    }

    return(
        users && <>
            <div className="actions">
                <input type="text" name="" id="" placeholder="Recherche d'utilisateur"/>
            </div>
            <ul className="users" ref={popUpRef}>
                <li className="titles">
                    <ul>
                        <li className="title">Nom de l'utilisateur</li>
                        <li className="description">Email</li>
                        <li className="addDate">Numéro téléphone</li>
                        <li className="publicationDate">Compte créé le</li>
                        <li className="published">Statut</li>
                        <li className="formation-actions">Actions</li>
                    </ul>
                </li>
                    { users && <li>
                            { users.map( u => (
                                <ul className="user" key={u._id}>
                                    <li className="title">
                                        <h5>{u.name}</h5>
                                    </li>
                                    <li className="description">
                                        <p>{u.email}</p>
                                    </li>
                                    <li className="description">
                                        <p>{u.phoneNumber ? u.phoneNumber : "----------------------------"}</p>
                                    </li>
                                    <li  className="description">
                                        <p>{ new Date(u.registerDate).toLocaleString("fr-FR") }</p>
                                    </li>
                                    <li className="published">
                                        { u.status === "superuser" && <div className="badge superuser">
                                            <p>{u.status}</p>
                                        </div> }
                                        { u.status === "admin" && <div className="badge admin">
                                            <p>{u.status}</p>
                                        </div> }
                                        { u.status === "user" && <div className="badge _user">
                                            <p>{u.status}</p>
                                        </div> }
                                    </li>
                                    <li className="formation-actions">
                                        <ul className={ activePopUp === u._id ? 'pop-up show' : 'pop-up hide'}>
                                            <li onClick={ () => {
                                                togglePopUp(u._id);
                                                changeUserStatus(u);
                                            }}>{ u.status === "user" ? "Rendre 'Admin'" : "Rendre 'User'" }</li>
                                        </ul>
                                        <div className="custom-container" 
                                        onClick={ () => togglePopUp(u._id) }
                                        >
                                            <Image src="/images/kebab.png" width={32} height={32} alt="menu" priority/>
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