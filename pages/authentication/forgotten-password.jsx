/* eslint-disable react/no-unescaped-entities */
import Head from "next/head"
import { Nav } from "@/components/nav"
import Image from "next/image"
import { useForm } from "react-hook-form"
import IsNotAuthenticated from "@/components/isNotAuthenticated"

export default function ForgottenPassword(){

    const { register } = useForm()

    return(
        <IsNotAuthenticated>
            <Head>
                <title>Mot de passe oublié | LUMINI School - Plateforme de formation en informatique</title>
            </Head>
            <Nav/>
            <section className="forgotten-password-form">
                <h2>Mot de passe oublié</h2>
                <p>Veuillez fournir l'email associé à votre compte LUMINI School. Nous vous y enverrons un lien vous permettant de réinitialiser votre mot de passe.</p>
                <form>
                    <Image src="/images/fleur.png" alt="fleur" className="laptop-mouse" width={400} height={400} priority />
                    <Image src="/images/coffee-laptop.png" alt="café et laptop" className="mouse" width={400} height={400} priority />
                    <div className="element">
                        <label htmlFor="user-email">Votre adresse email :</label>
                        <input type="email" id="user-email" placeholder="Ex: johndoe@example.com" { ...register('email', { required: true }) } required />
                    </div>
                    <div className="element">
                        <button>Envoyer le lien</button>
                    </div>
                </form>
            </section>
        </IsNotAuthenticated>
    )
}