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

    const transactions = [
        {
            _id: "3857828",
            transactionTime: "2025-12-12T06:36:05.770Z",
            transactionState: "pending",
            paymentMode: "mvola",
            transactionAmount: "50.000",
            formation: {
                _id: "123",
                title: "I'm fine and you sir?"
            }
        }
    ]

    const togglePopUp = (transactionId) => {
        setActivePopUp((prev) => (prev === transactionId ? null : transactionId))
    }

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
                    { transactions && <li ref={popUpRef}>
                    { transactions.map( transaction => (
                    <ul className="registration" key={transaction._id}>
                        <li className="formation-title">
                            <h5>{transaction.formation.title}</h5>
                        </li>
                        <li  className="course-place">
                            <p>{transaction.paymentMode}</p>
                        </li>
                        <li  className="course-price-payed">
                            { transaction.transactionState && <div className="badge yes">
                                <p>oui</p>
                            </div> }
                            { !transaction.transactionState && <div className="badge no">
                                <p>non</p>
                            </div> }
                        </li>
                        <li  className="begin-date">
                            <p>{ new Date(transaction.transactionTime).toLocaleString("fr-FR") }</p>
                        </li>
                        <li  className="end-date">
                            <p>{ new Date(transaction.transactionTime).toLocaleString("fr-FR") }</p>
                        </li>
                        <li  className="course-price">
                            <p>{ transaction.transactionAmount } Ar</p>
                        </li>
                        <li className="registration-actions">
                            <ul className={ activePopUp === transaction._id ? 'pop-up show' : 'pop-up hide'}>
                                <li onClick={ () => {
                                    togglePopUp(transaction._id);
                                }} >Valider la transaction</li>
                                <li onClick={ () => {
                                    togglePopUp(transaction._id);
                                }} >Annuler la transaction</li>
                            </ul>
                            <div className="custom-container" onClick={ () => togglePopUp(transaction._id) }>
                                <Image src="/images/kebab.png" width={32} height={32} alt="menu" priority/>
                            </div>
                        </li>
                    </ul>
                ))}
            </li>}
        </ul> }
    </Dashboard>)

}