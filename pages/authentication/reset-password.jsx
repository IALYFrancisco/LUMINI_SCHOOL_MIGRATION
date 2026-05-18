import Head from "next/head"
import Image from "next/image"
import { Nav } from "@/components/nav"
import { useForm } from "react-hook-form"
import IsNotAuthenticated from "@/components/isNotAuthenticated"

export default function ResetPassword(){

    const { register } = useForm()

    return(
        <IsNotAuthenticated>
            <Head>
                <title>Réinitialisation de mot de passe | LUMINI School - Plateforme de formation en informatique</title>
            </Head>
            <Nav/>
            <section className="reset-password-form">
                <h2>Réinitialisation de mot de passe</h2>
                <p>Ceci est la page de rénitialisation de mot de passe, veulliez fournir un nouveau mot de passe puis confirmez-le ensuite.</p>
                <form>
                    <Image src="/images/fleur.png" alt="fleur" className="laptop-mouse" width={400} height={400} priority />
                    <Image src="/images/coffee-laptop.png" alt="café et laptop" className="mouse" width={400} height={400} priority />
                    <div className="element">
                        <label htmlFor="newPassword">Nouveau mot de passe :</label>
                        <input type="password" id="newPassword" placeholder="Choisissez un mot de passe fort" { ...register('newPassword', { required: true }) } required />
                    </div>
                    <div className="element">
                        <label htmlFor="confirmPassword">Confirmez le nouveau mot de passe :</label>
                        <input type="password" id="confirmPassword" placeholder="Le même mot de passe que dessus" { ...register('confirmPassword', { required: true }) } required />
                    </div>
                    <div className="element">
                        <button>Soumettre</button>
                    </div>
                </form>
            </section>
        </IsNotAuthenticated>
    )
}