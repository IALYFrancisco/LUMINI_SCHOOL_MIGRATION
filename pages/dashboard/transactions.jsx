import Dashboard from "@/components/layouts/dashboardLayout"
import Head from "next/head"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"

export default function Transactions(){

    const { user } = useAuth()

    const popUpRef = useRef(null)

    var [ activePopUp, setActivePopUp ] = useState(null)

    const registrations = [
        { 
            _id: "123456",
            formation: { title: "How are you sir??", coursePlace: "Toamasina", beginDate: "", endDate: "", coursePrice: "50.0000" },
            coursePricePayed: false,
        }
    ]

    return (
        <Dashboard>
            <Head>
                <title>Transactions - Dashboard | LUMINI School</title>
            </Head>
            <h2>Vos transactions de paiements</h2>
            <div className="actions">
                <input type="text" name="" id="" placeholder="Recherche de transactions"/>
            </div>
            {/* List for user, simple user */}
            { user && user.status === "user" && <ul className="registrations">
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
                                <Link href={`/dashboard/payments/${user._id}/${registration.formation._id}?registration=${registration._id}`}>
                                <li onClick={ () => {
                                    togglePopUp(registration._id);
                                } }>Payer le droit</li>
                                </Link>
                            </ul>
                            <div className="custom-container" onClick={ () => togglePopUp(registration._id) }>
                                <Image src="/images/kebab.png" width={32} height={32} alt="menu" priority/>
                            </div>
                        </li>
                    </ul>
                ))}
            </li>}
        </ul> }
    </Dashboard>)

}