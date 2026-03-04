import { Nav } from "@/components/nav"
import { useNavigate } from "next/router"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

export function Register(){

    useHead({
        link: [
            { rel: 'canonical', href: 'https://luminischool.onrender.com/authentication/register' }
        ],
        meta: [
            { name: 'description', content: "Créez votre compte LUMINI School et bénéficiez d'un espace personnel complet pour gérer vos inscriptions, paiements et toutes vos activités sur la plateforme en toute simplicité." }
        ]
    })

    useSeoMeta({

        title: 'Création de compte | LUMINI School - Plateforme de formation en informatique',

        ogTitle: "Création de compte | LUMINI School - Plateforme de formation en informatique",
        ogDescription: "Créez votre compte LUMINI School et bénéficiez d'un espace personnel complet pour gérer vos inscriptions, paiements et toutes vos activités sur la plateforme en toute simplicité.",
        ogUrl: 'https://luminischool.onrender.com/authentication/register',

        twitterTitle: "Création de compte | LUMINI School - Plateforme de formation en informatique",
        twitterDescription: "Créez votre compte LUMINI School et bénéficiez d'un espace personnel complet pour gérer vos inscriptions, paiements et toutes vos activités sur la plateforme en toute simplicité."
    })

    var { reset, register, handleSubmit } = useForm()
    const navigate = useNavigate()

    var [ registerLoading, setRegisterLoading ] = useState(false)

    const _handleSubmit = async (data) => {
        try{

            setRegisterLoading(true)

            const user = {
                name: data.name,
                email: data.email,
                password: data.password
            }

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/authentication/register`, user )
                .then(()=>{
                    toast.success("Félicitation ✨, votre compte a été bien créé.")
                    navigate('/authentication/login')
                    reset()
                }).finally(()=>{setRegisterLoading(false)})
        }
        catch(err){
            if(err.status === 409){
                toast.warning("Un utilisateur avec cet email existe déjà.")
            }
            if(err.status === 500){
                toast.error("Erreur de création de votre compte, veuillez réessayer plus tard.")
            }
        }
    }

    return(
        <>
            <Nav></Nav>
            <section className="login-form">
                <h2>Création de compte</h2>
                <h5>à LUMINI School</h5>
                <form onSubmit={handleSubmit(_handleSubmit)}>
                    <img src="/images/note.png" alt="" className="laptop-mouse" />
                    <img src="/images/clavier (2).png" alt="" className="mouse" />
                    <div className="element">
                        <label htmlFor="user-name">Votre nom complet :</label>
                        <input type="text" id="user-name" placeholder="Ex: John Doe" { ...register('name', { required: true }) } required />
                    </div>
                    <div className="element">
                        <label htmlFor="user-email">Votre adresse email :</label>
                        <input type="email" id="user-email" placeholder="Ex: johndoe@example.com" { ...register('email', { required: true }) } required />
                    </div>
                    <div className="element">
                        <label htmlFor="user-password">Votre mot de passe :</label>
                        <input type="password" id="user-password" placeholder="Choisissez un mot de passe sécurisé" { ...register('password', { required: true }) } required />
                    </div>
                    <div className="element">
                        <button disabled={registerLoading}>
                            Soumettre
                            { registerLoading && <img src="/images/spinner.png" alt="" />}
                        </button>
                    </div>
                </form>
                <span>
                    <p>Vous avez déjà un compte? <Link to="/authentication/login">Se connecter</Link>.</p>
                </span>
            </section>
        </>
    )
}