import { Nav } from "@/components/nav"
import Link from "next/link"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { useState } from "react"
import { useHead, useSeoMeta } from "@unhead/react"

export function Login(){

    var { setUser, setLoading } = useAuth()

    var { reset, register, handleSubmit } = useForm()

    var [ loginLoading, setLoginLoading ] = useState(false)

    useHead({
        link: [
            { rel: 'canonical', href: 'https://luminischool.onrender.com/authentication/login' }
        ],
        meta: [
            { name: 'description', content: 'Accédez à votre espace personnel LUMINI School pour consulter les détails de votre inscription et effectuer le paiement de vos frais de formation en présentiel.' }
        ]
    })

    useSeoMeta({
        title: 'Connexion | LUMINI School - Plateforme de formation en informatique',

        ogTitle: "Connexion | LUMINI School - Plateforme de formation en informatique",
        ogDescription: "Accédez à votre espace personnel LUMINI School pour consulter les détails de votre inscription et effectuer le paiement de vos frais de formation en présentiel.",
        ogUrl: 'https://luminischool.onrender.com/authentication/login',

        twitterTitle: "Connexion | LUMINI School - Plateforme de formation en informatique",
        twitterDescription: "Accédez à votre espace personnel LUMINI School pour consulter les détails de votre inscription et effectuer le paiement de vos frais de formation en présentiel."
    })

    var _handleSubmit = async (data) => {
        try{

            setLoginLoading(true)

            const user = {
                email: data.email,
                password: data.password
            }

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/authentication/login`,
                user,
                { withCredentials: true }
            )
            .then( async ()=>{
                await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/informations`, {withCredentials: true})
                    .then((response)=> {
                        setUser(response.data)
                        reset()
                    })
                    .catch(()=>setUser(null))
                    .finally(()=> {setLoading(false); setLoginLoading(false)})
            })
        }
        catch(err){
            setLoading(false)
            setLoginLoading(false)
            if(err.status === 401){
                toast.error("Email ou mot de passe incorrecte.")
            }
            if(err.status === 500){
                toast.error("Erreur de connexion, veuillez réessayer plus tard.")
            }
        }
    }

    return(
        <>
            <Nav></Nav>
            <section className="login-form">
                <h2>Connexion</h2>
                <h5>à LUMINI School</h5>
                <form onSubmit={handleSubmit(_handleSubmit)}>
                    <img src="/images/fleur.png" alt="" className="laptop-mouse" />
                    <img src="/images/coffee-laptop.png" alt="" className="mouse" />
                    <div className="element">
                        <label htmlFor="user-email">Votre adresse email :</label>
                        <input type="email" id="user-email" placeholder="Ex: johndoe@example.com" { ...register('email', { required: true }) } required />
                    </div>
                    <div className="element">
                        <label htmlFor="user-password">Votre mot de passe :</label>
                        <input type="password" id="user-password" placeholder="Le mot de passe que vous avez choisi" { ...register('password', { required: true }) } required />
                    </div>
                    <div className="element">
                        <button disabled={loginLoading}>
                            Soumettre
                            { loginLoading && <img src="/images/spinner.png" alt="" />}
                        </button>
                    </div>
                </form>
                <span>
                    <p>Pas de compte? <Link to="/authentication/register">En créer un</Link>.</p>
                </span>
            </section>
        </>
    )
}