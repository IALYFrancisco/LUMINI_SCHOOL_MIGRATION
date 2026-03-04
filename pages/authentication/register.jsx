import { Nav } from "@/components/nav"
import { useRouter } from "next/router"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import IsNotAuthenticated from "@/components/isNotAuthenticated"

export default function Register(){

    var { reset, register, handleSubmit } = useForm()
    const router = useRouter()

    var [ registerLoading, setRegisterLoading ] = useState(false)

    const _handleSubmit = async (data) => {
        try{

            setRegisterLoading(true)

            const user = {
                name: data.name,
                email: data.email,
                password: data.password
            }

            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/register`, user )
                .then(()=>{
                    toast.success("Félicitation ✨, votre compte a été bien créé.")
                    router.push('/authentication/login')
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
        <IsNotAuthenticated>
            <>
                <Head>
                    <title>Création de compte | LUMINI School - Plateforme de formation en informatique</title>
                    <link rel="canonical" href="https://luminischool.onrender.com/authentication/register" />
                    <meta name="description" content="Créez votre compte LUMINI School et bénéficiez d'un espace personnel complet pour gérer vos inscriptions, paiements et toutes vos activités sur la plateforme en toute simplicité."/>
                    
                    <meta property="og:title" content="Création de compte | LUMINI School - Plateforme de formation en informatique" />
                    <meta property="og:description" content="Créez votre compte LUMINI School et bénéficiez d'un espace personnel complet pour gérer vos inscriptions, paiements et toutes vos activités sur la plateforme en toute simplicité."/>
                    <meta property="og:url" content="https://luminischool.onrender.com/authentication/register" />

                    <meta name="twitter:title" content="Création de compte | LUMINI School - Plateforme de formation en informatique" />
                    <meta name="twitter:description" content="Créez votre compte LUMINI School et bénéficiez d'un espace personnel complet pour gérer vos inscriptions, paiements et toutes vos activités sur la plateforme en toute simplicité." />
                </Head>
                <Nav></Nav>
                <section className="login-form">
                    <h2>Création de compte</h2>
                    <h5>à LUMINI School</h5>
                    <form onSubmit={handleSubmit(_handleSubmit)}>
                        <Image src="/images/note.png" alt="note" className="laptop-mouse" width={400} height={400} priority />
                        <Image src="/images/clavier (2).png" alt="clavier" className="mouse" width={375} height={375} priority />
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
                                { registerLoading && <Image src="/images/spinner.png" alt="loading spinner" width={50} height={50} priority />}
                            </button>
                        </div>
                    </form>
                    <span>
                        <p>Vous avez déjà un compte? <Link href="/authentication/login">Se connecter</Link>.</p>
                    </span>
                </section>
            </>
        </IsNotAuthenticated>
    )
}