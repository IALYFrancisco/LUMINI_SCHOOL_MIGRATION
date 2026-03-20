/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import Loading from "@/components/loading";
import { useForm } from 'react-hook-form'
import DateRefactoring from '@/contexts/DateRefactoring'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import Head from 'next/head';
import Image from 'next/image';

export default function Payments(){

    const router = useRouter()
    
    const { formationId } = router.query
    const [ searchParams ] = useSearchParams()
    let [ formation, setFormation ] = useState(null)
    
    var [ mvolaIsSelected, setMvolaIsSelected ] = useState(false)
    var [ paypalIsSelected, setPayPalIsSelected ] = useState(false)

    const { user } = useAuth()

    const { reset, register, handleSubmit } = useForm()

    const SelectMvolaModeToggle = ()=>{
        mvolaIsSelected ? setMvolaIsSelected(false) : setMvolaIsSelected(true);setPayPalIsSelected(false)
    }
    
    const SelectPayPalModeToggle = ()=>{
        paypalIsSelected ? setPayPalIsSelected(false) : setPayPalIsSelected(true);setMvolaIsSelected(false)
    }

    useEffect(()=>{
        if(formationId && user){
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/get?_id=${formationId}`)
            .then((response)=>{
                setFormation(response.data[0])
                reset({
                    title: response.data[0].title,
                    prerequisites: response.data[0].prerequisites,
                    beginDate: DateRefactoring(response.data[0].beginDate),
                    endDate: DateRefactoring(response.data[0].endDate),
                    coursePlace: response.data[0].coursePlace,
                    coursePrice: response.data[0].coursePrice,
                    description: response.data[0].description,
                    phoneNumber: user.phoneNumber
                })
            })
        }
    }, [formationId, reset, user])

    const MvolaInitiateTransaction = (d)=>{
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/mvola/initiate`, d, { withCredentials: true })
        .then(()=>{
            toast.success("La transaction s'est bien initiée, il faut la valider pour terminer l'étape.")
        })
        .catch(()=>{
            toast.error("Erreur lors du transaction, veuillez réessayer plus tard.")
        })
    }

    const _handleSubmit = (data) =>{
        if(mvolaIsSelected){

            let _data = {
                clientMsisdn: data.phoneNumber,
                registration: searchParams.get('registration'),
            }

            MvolaInitiateTransaction(_data)
        }
        if(paypalIsSelected){
            console.log("Mode paiement: paypal")
        }
    } 
    
    if(!formation) return <Loading/>
    return(
        <> { formation && user && <>
            <Head>
                <title>Paiement - Dashboard | LUMINI School</title>
            </Head>
            <h2>Paiement de droit du formation <span className='title-for-payment'>"{formation.title}"</span></h2>
            <section className="payment-container">
                <div className="head">
                    <p>Veuillez vérifier la formation auquel vous allez payer le droit 💳.</p>
                </div>
                <div className="forms-container">
                    <form onSubmit={handleSubmit(_handleSubmit)}>
                        <fieldset>
                            <h3>Informations sur la formation :</h3>
                            <fieldset className="payment-sections-container">
                                <section className="left">
                                    <div className="element">
                                        <label htmlFor="title">Nom du formation :</label>
                                        <input type="text" id="title" disabled readOnly { ...register('title') }/>
                                    </div>
                                    <div className="element">
                                        <label htmlFor="prerequisites">Les prérequis du formation :</label>
                                        <input type="text" id="prerequisites" disabled readOnly { ...register('prerequisites') }/>
                                    </div>
                                    <div className="element">
                                        <label htmlFor="beginDate">Date et heure de début du formation :</label>
                                        <input type="datetime-local" id="beginDate" disabled readOnly { ...register('beginDate') }/>
                                    </div>
                                    <div className="element">
                                        <label htmlFor="endDate">Date et heure de fin du formation :</label>
                                        <input type="datetime-local" id="endDate" disabled readOnly { ...register('endDate') }/>
                                    </div>
                                </section>
                                <section className="right">
                                    <div className="element">
                                        <label htmlFor="coursePlace">Lieu du formation :</label>
                                        <input type="text" id="coursePlace" disabled readOnly { ...register('coursePlace') }/>
                                    </div>
                                    <div className="element">
                                        <label htmlFor="coursePrice">Coût de la formation (en Ar) :</label>
                                        <input type="text" id="coursePrice" disabled readOnly { ...register('coursePrice') }/>
                                    </div>
                                    <div className="element">
                                        <label htmlFor="description">Description la formation :</label>
                                        <textarea id="description" disabled readOnly { ...register('description') }/>
                                    </div>
                                </section>
                            </fieldset>
                            <fieldset className='payment-details-container'>
                                <h3>Informations sur le paiement :</h3>
                                <div className="section-container">
                                    <div className="left">
                                        <div className="element">
                                            <label htmlFor="">Mode de paiement :</label>
                                            <section className="payment-mode-container">
                                                <div className={ mvolaIsSelected ? "mode mvola selected" : "mode mvola"} title='Paiment par mvola.' onClick={SelectMvolaModeToggle}>
                                                    <Image src="/images/logo-de-mvola.png" width={200} height={200} alt="paiement mvola" priority />
                                                </div>
                                                <div className={paypalIsSelected ? "mode paypal selected":"mode paypal"} title='Paiment par PayPal' onClick={SelectPayPalModeToggle}>
                                                    <Image src="/images/logo-de-paypal.webp" width={200} height={200} priority alt="paiement paypal" />    
                                                </div>
                                            </section>
                                        </div>
                                        { mvolaIsSelected && <div className="element">
                                            <label htmlFor="">Numéro téléphone de paiement :</label>
                                            <input type="tel" id="" { ...register('phoneNumber', {required: true}) } required />
                                        </div> }
                                        <div className="element">
                                            <button>Faire la transaction</button>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="element">
                                            <label htmlFor="">Montant totale à payer (en Ar) :</label>
                                            <input type="number" id="" readOnly disabled { ...register("coursePrice") } required/>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </fieldset>
                    </form>
                </div>
            </section>
        </> }
        </>
    )
}