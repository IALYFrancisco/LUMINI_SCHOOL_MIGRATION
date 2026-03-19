import axios from "axios"
import { useEffect, useState, useRef } from "react"
import '../../../../public/styles/dashboard/inscription.css'
import { useAuth } from "../../../contexts/AuthContext"
import { Link } from "react-router-dom"
import { useHead } from "@unhead/react"

export default function Inscriptions(){

    useHead({
        title: 'Inscriptions - Dashboard | LUMINI School'
    })

    var [registrations, setRegistrations] = useState([])
    var [activePopUp, setActivePopUp] = useState(null)
    const popUpRef = useRef(null)
    const { user } = useAuth()

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/registration/get`, { withCredentials: true })
        .then((response)=>setRegistrations(response.data))
    }, [])

    const togglePopUp = (formationId) => {
        setActivePopUp((prev) => (prev === formationId ? null : formationId))
    }

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

    return(
        <>
            <h2>Inscriptions</h2>
            <div className="actions">
                <input type="text" name="" id="" placeholder="Recherche d'une inscription"/>
            </div>
            {/* List for admin or superuser */}
            { (user.status === "superuser"||user.status === "admin") && <ul className="inscriptions">
                <li className="titles">
                    <ul>
                        <li className="title">Titres du formation</li>
                        <li className="description">Clients inscrits</li>
                        <li className="addDate">Date de l'inscription</li>
                        <li className="addDate">Téléphone du client</li>
                        <li className="addDate">Actions</li>
                    </ul>
                </li>
                { registrations && <li>
                            { registrations.map( registration => (
                                <ul className="formation" key={registration._id}>
                                    <li className="title">
                                        <h5>{registration.formation.title}</h5>
                                    </li>
                                    <li  className="description">
                                        <p>{registration.user.name}</p>
                                    </li>
                                    <li  className="addDate">
                                        <p>{ new Date(registration.registrationDate).toLocaleString("fr-FR") }</p>
                                    </li>
                                    <li  className="addDate">
                                        <p>{ registration.user.phoneNumber }</p>
                                    </li>
                                    <li className="formation-actions">
                                        <div className="custom-container">
                                            <img src="/images/kebab.png" alt=""/>
                                        </div>
                                    </li>
                                </ul>
                                )
                            )
                        }
                </li>}
            </ul> }
            {/* List for user, simple user */}
            { user.status === "user" && <ul className="registrations">
                <li className="titles">
                    <ul>
                        <li className="formation-title">Formations</li>
                        <li className="course-place">Lieu du formation</li>
                        <li className="course-price-payed">Droit déjà payé ?</li>
                        <li className="begin-date">Date de début</li>
                        <li className="end-date">Date de fin</li>
                        <li className="course-price">Droit à payer</li>
                        <li className="registration-actions">Actions</li>
                    </ul>
                </li>
                { registrations && <li ref={popUpRef}>
                            { registrations.map( registration => (
                                <ul className="registration" key={registration._id}>
                                    <li className="formation-title">
                                        <h5>{registration.formation.title}</h5>
                                    </li>
                                    <li  className="course-place">
                                        <p>{registration.formation.coursePlace}</p>
                                    </li>
                                    <li  className="course-price-payed">
                                        { registration.coursePricePayed && <div className="badge yes">
                                            <p>oui</p>
                                        </div> }
                                        { !registration.coursePricePayed && <div className="badge no">
                                            <p>non</p>
                                        </div> }
                                    </li>
                                    <li  className="begin-date">
                                        <p>{ new Date(registration.formation.beginDate).toLocaleString("fr-FR") }</p>
                                    </li>
                                    <li  className="end-date">
                                        <p>{ new Date(registration.formation.endDate).toLocaleString("fr-FR") }</p>
                                    </li>
                                    <li  className="course-price">
                                        <p>{ registration.formation.coursePrice } Ar</p>
                                    </li>
                                    <li className="registration-actions">
                                        <ul className={ activePopUp === registration._id ? 'pop-up show' : 'pop-up hide'}>
                                            <li onClick={ () => {
                                                togglePopUp(registration._id);
                                            }} >Télécharger les détails</li>
                                            <li onClick={ () => {
                                                togglePopUp(registration._id);
                                            }} >Reçevoir par email les détails</li>
                                            <Link to={`/dashboard/payments/${user._id}/${registration.formation._id}?registration=${registration._id}`}>
                                                <li onClick={ () => {
                                                    togglePopUp(registration._id);
                                                } }>Payer le droit</li>
                                            </Link>
                                        </ul>
                                        <div className="custom-container" onClick={ () => togglePopUp(registration._id) }>
                                            <img src="/images/kebab.png" alt=""/>
                                        </div>
                                    </li>
                                </ul>
                                )
                            )
                        }
                </li>}
            </ul> }
        </>
    )
}