/* eslint-disable react/no-unescaped-entities */
import Dashboard from "@/components/layouts/dashboardLayout"
import Head from "next/head"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "sonner"

export default function Transactions(){

    const { user } = useAuth()

    const popUpRef = useRef(null)

    var [ activePopUp, setActivePopUp ] = useState(null)

    var [ transactions, setTransactions ] = useState([])
    
    useEffect(()=>{
        try{
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/mvola/transactions/get`, { withCredentials: true })
            .then((res)=>{
                setTransactions(res.data)
            })
        }catch(err){
            console.log(err)
        }
    }, [])

    const togglePopUp = (transactionId) => {
        setActivePopUp((prev) => (prev === transactionId ? null : transactionId))
    }

    const ValidateMvolaTransaction = async function(scId){
        axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/mvola/transactions/validate?scId=${scId}`, {}, { withCredentials: true })
            .then(()=>{
                toast.success("Votre transaction est désormais validée ✅✅.")
                try{
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/mvola/transactions/get`, { withCredentials: true })
                    .then((res)=>{
                        setTransactions(res.data)
                    })
                }catch(err){
                    console.log(err)
                }
            })
            .catch(()=>{
                toast.error("Erreur de validation de transaction, veuillez réessayer plus tard.")
            })
    }

    return (
        <Dashboard>
            <Head>
                <title>Transactions - Dashboard | LUMINI School</title>
            </Head>
            { user && (user.status === "superuser"||user.status === "admin") && <h2>Toutes les transactions de paiements</h2> }
            { user && user.status === "user" && <h2>Vos transactions de paiements</h2> }
            <div className="actions">
                <input type="text" name="" id="" placeholder="Recherche de transactions"/>
            </div>
            {/* List for admin or superuser */}
            { user && (user.status === "superuser"||user.status === "admin") && <ul className="registrations">
                <li className="titles">
                    <ul>
                        <li className="formation-title">ID de transaction</li>
                        <li className="course-place">Mode</li>
                        <li className="course-price-payed">Etat</li>
                        <li className="begin-date">Date et heure</li>
                        <li className="end-date">Inscription</li>
                        <li className="course-price">Montant</li>
                        <li className="registration-actions">Actions</li>
                    </ul>
                </li>
                    { transactions && <li ref={popUpRef}>
                    { transactions.map( transaction => (
                    <ul className="registration" key={transaction._id}>
                        <li className="formation-title">
                            <h5>{transaction._id}</h5>
                        </li>
                        <li  className="course-place">
                            <p>{transaction.paymentMode}</p>
                        </li>
                        <li  className="course-price-payed">
                            { transaction.mvolamodetransaction.status === "success" && <div className="badge yes">
                                <p>validée</p>
                            </div> }
                            { transaction.mvolamodetransaction.status === "pending" && <div className="badge pending">
                                <p>en attente</p>
                            </div> }
                            { transaction.mvolamodetransaction.status === "failed" && <div className="badge no">
                                <p>annulée</p>
                            </div> }
                        </li>
                        <li  className="begin-date">
                            <p>{ new Date(transaction.mvolamodetransaction.transactionDate).toLocaleString("fr-FR") }</p>
                        </li>
                        <li  className="end-date">
                            <p>{ transaction.registration_id }</p>
                        </li>
                        <li  className="course-price">
                            <p>{ transaction.formation.coursePrice } Ar</p>
                        </li>
                        <li className="registration-actions">
                            <ul className={ activePopUp === transaction._id ? 'pop-up show' : 'pop-up hide'}>
                                <li onClick={ () => {
                                    togglePopUp(transaction._id);
                                    transaction.paymentMode === "mvola" ? ValidateMvolaTransaction(transaction.mvolamodetransaction.serverCorrelationId) : ()=>{return}
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
            { !transactions &&
                <div className="no-transaction">
                    <h5>Il n'y a pas de transaction pour le moment</h5>
                </div>
            }
        </ul> }
            {/* List for user, simple user */}
            { user && user.status === "user" && <ul className="registrations">
                <li className="titles">
                    <ul>
                        <li className="formation-title">Formations</li>
                        <li className="course-place">Mode</li>
                        <li className="course-price-payed">Etat</li>
                        <li className="begin-date">Date et heure</li>
                        <li className="end-date">Inscription</li>
                        <li className="course-price">Montant</li>
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
                            { transaction.mvolamodetransaction.status === "success" && <div className="badge yes">
                                <p>validée</p>
                            </div> }
                            { transaction.mvolamodetransaction.status === "pending" && <div className="badge pending">
                                <p>en attente</p>
                            </div> }
                            { transaction.mvolamodetransaction.status === "failed" && <div className="badge no">
                                <p>annulée</p>
                            </div> }
                        </li>
                        <li  className="begin-date">
                            <p>{ new Date(transaction.mvolamodetransaction.transactionDate).toLocaleString("fr-FR") }</p>
                        </li>
                        <li  className="end-date">
                            <p>{ transaction.registration_id }</p>
                        </li>
                        <li  className="course-price">
                            <p>{ transaction.formation.coursePrice } Ar</p>
                        </li>
                        <li className="registration-actions">
                            <ul className={ activePopUp === transaction._id ? 'pop-up show' : 'pop-up hide'}>
                                <li onClick={ () => {
                                    togglePopUp(transaction._id);
                                    transaction
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
            { !transactions &&
                <div className="no-transaction">
                    <h5>Vous n'avez aucune transaction pour le moment</h5>
                </div>
            }
        </ul> }
    </Dashboard>)

}