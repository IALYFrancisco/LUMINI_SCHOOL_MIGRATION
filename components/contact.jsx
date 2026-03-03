/* eslint-disable react/no-unescaped-entities */
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Image from 'next/image'

export function Contact(){

    const { reset, register, handleSubmit } = useForm()

    var [ sendClientMessageLoading, setSendClientMessageLoading ] = useState(false)

    const _handleSubmit = async (data)=> {

        setSendClientMessageLoading(true)

        let clientMessage = {
            name: data.name,
            object: data.object,
            email: data.email,
            telephone: data.telephone,
            message: data.message
        }

        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/email/send`, clientMessage)
            .then(()=>{
                reset()
                toast.success("Votre message a été bien envoyé, vous auriez une réponse le plutôt possible.")
            }).catch(()=>{
                toast.error("Erreur d'envoie de votre message, veuillez reéssayer plus tard.")
            }).finally(()=>setSendClientMessageLoading(false))

    }

    return(
        <div className="contact-container" id="contact">
            <section className="contact">
                <div className="left">
                    <h2>Laissez-nous un message :</h2>
                    <p>Laissez-nous un message et on vous répondra après 🤞. Tout type de message est permit alors n'hésitez pas à écrire.</p>
                    <form onSubmit={handleSubmit(_handleSubmit)}>
                        <div className="element">
                            <label htmlFor="user-name">Entrez votre nom complet :</label>
                            <input type="text" id="user-name" placeholder="Ex: John Doe" { ...register("name") } required/>
                        </div>
                        <div className="element">
                            <label htmlFor="contact-object">Objet de votre contact :</label>
                            <input type="text" id="contact-object" placeholder="Ex: Demande de partenariat avec LUMINI School" required { ...register("object") } />
                        </div>
                        <div className="element">
                            <label htmlFor="user-email">Votre email :</label>
                            <input type="email" id="user-email" placeholder="Ex: johndoe@example.com" required { ...register("email") } />
                        </div>
                        <div className="element">
                            <label htmlFor="user-phone-number">Votre numéro téléphone :</label>
                            <input type="tel" id="user-phone-number" placeholder="Ex: +261 30 00 000 00" required { ...register("telephone") } />
                        </div>
                        <div className="element">
                            <label htmlFor="user-message">Saisissez vos messages :</label>
                            <textarea id="user-message" placeholder="J'ai l'honneur de vous écrire ..." required { ...register("message") } ></textarea>
                        </div>
                        <div className="element">
                            <button disabled={sendClientMessageLoading}>
                                Envoyer le message
                                { sendClientMessageLoading && <Image src="/images/spinner (2).png" alt="icone spinner" className='loader' width={50} height={50} priority /> }
                                { !sendClientMessageLoading && <Image src="/images/send.png" alt="icone fusée en papier" width={50} height={50} priority />}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="right">
                    <h2>Avez-vous une urgence ?</h2>
                    <p>Si vous avez une urgence, utilisez l'un des contacts suivants pour contacter directement LUMINI School.</p>
                    <div className="cards-container">
                        <div className="card">
                            <div className="icon-container">
                                <Image src="/images/phone.png" alt="icone téléphone" width={50} height={50} priority />
                            </div>
                            <div className="contact-info">
                                <h3>Téléphone</h3>
                                <p>+261 34 47 635 78</p>
                            </div>
                        </div>
                        <a href="mailto:ialyfrancisco7@gmail.com">
                            <div className="card">
                                <div className="icon-container">
                                    <Image src="/images/envelope.png" alt="icone envelope" width={50} height={50} priority />
                                </div>
                                <div className="contact-info">
                                    <h3>Email</h3>
                                    <p>ialyfrancisco7@gmail.com</p>
                                </div>
                            </div>
                        </a>
                        <div className="card">
                            <div className="icon-container">
                                <Image src="/images/gps.png" alt="icone localisation" width={50} height={50} priority />
                            </div>
                            <div className="contact-info">
                                <h3>Adresse</h3>
                                <p>Mangarivotra, Parcelle 21/72, Lot 765, Toamasina 501</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}