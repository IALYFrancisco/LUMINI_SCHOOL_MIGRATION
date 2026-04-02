/* eslint-disable react/no-unescaped-entities */
import Head from "next/head"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function TermsAndConditions(){
    return (
        <>
            <Head>
                <title>Mentions légales | LUMINI School - Plateforme de formation en informatique</title>
                <link rel="canonical" href="https://luminischool.onrender.com/terms-and-conditions" />
                <meta name="description" content="Informations légales concernant LUMINI School : éditeur du site, contact, hébergement et responsabilité."/>

                <meta property="og:title" content="Mentions légales | LUMINI School - Plateforme de formation en informatique" />
                <meta property="og:description" content="Informations légales concernant LUMINI School : éditeur du site, contact, hébergement et responsabilité." key="og:description"/>
                <meta property="og:url" content="https://luminischool.onrender.com/terms-and-conditions" />

                <meta name="twitter:title" content="Mentions légales | LUMINI School - Plateforme de formation en informatique" />
                <meta name="twitter:description" content="Informations légales concernant LUMINI School : éditeur du site, contact, hébergement et responsabilité." />       
            </Head>

            <Nav/>

            <section className="legaux-container">
                <h1>Mentions légales</h1>
                
                <div className="legaux-element">
                    <h2>1. Éditeur du site</h2>
                    <p>Le site LUMINI School est édité et géré par LUMINI School.</p>
                    <p>Responsable de la publication : IALY Francisco Raymond</p>
                    <p>Email : <a href="mailto:ialyfrancisco7@gmail.com">ialyfrancisco7@gmail.com</a></p>
                </div>

	            <div className="legaux-element">
                    <h2>2. Développement</h2>
                    <p>Le site a été développé par <a href="https://lumini.onrender.com" target="_blank" rel="noopener noreferrer">LUMINI</a>, agence spécialisée dans le développement de sites web et d’applications web. LUMINI intervient uniquement en tant que prestataire technique pour la création initiale du site et n’a aucune responsabilité sur son contenu ou son fonctionnement.</p>
	            </div>

                <div className="legaux-element">
                    <h2>3. Maintenance</h2>
                    <p>La maintenance et la gestion quotidienne du site sont assurées par l’équipe de LUMINI School.</p>
                </div>

                <div className="legaux-element">
                    <h2>4. Hébergement</h2>
                    <p>Le site est hébergé par : <a href="http://render.com" target="_blank" rel="noopener noreferrer">Render</a></p>
                </div>

                <div className="legaux-element">
                    <h2>5. Accès au site</h2>
                    <p>Le site est accessible à tout moment sauf interruption pour maintenance ou raisons indépendantes de notre volonté.</p>
                </div>

                <div className="legaux-element">
                    <h2>6. Responsabilité</h2>
                    <p>L’éditeur, LUMINI School, ne peut être tenu responsable des erreurs, interruptions, ou dysfonctionnements du site.</p>
                </div>

                <div className="legaux-element">
                    <h2>7. Propriété intellectuelle</h2>
                    <p>Tous les contenus présents sur le site (textes, images, logos, etc.) sont protégés par le droit d’auteur et ne peuvent être utilisés sans autorisation.</p>
                </div>

                <div className="legaux-element">
                    <h2>8. Contact</h2>
                    <p>Pour toute demande ou question : <a href="mailto:ialyfrancisco7@gmail.com">ialyfrancisco7@gmail.com</a></p>
                </div>
            </section>

            <Footer/>
        </>
    )
}