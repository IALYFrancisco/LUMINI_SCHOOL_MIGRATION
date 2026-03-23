import Head from "next/head"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function TermsAndConditions(){
    return (
        <>
            <Head>
                <title>Politique de confidentialité | LUMINI School - Plateforme de formation en informatique</title>
                <link rel="canonical" href="https://luminischool.onrender.com/privacy-policy" />
                <meta name="description" content="Découvrez comment LUMINI School collecte, utilise et protège vos données personnelles, ainsi que la gestion des cookies et des paiements."/>

                <meta property="og:title" content="Politique de confidentialité | LUMINI School - Plateforme de formation en informatique" />
                <meta property="og:description" content="Découvrez comment LUMINI School collecte, utilise et protège vos données personnelles, ainsi que la gestion des cookies et des paiements." key="og:description"/>
                <meta property="og:url" content="https://luminischool.onrender.com/privacy-policy" />

                <meta name="twitter:title" content="Politique de confidentialité | LUMINI School - Plateforme de formation en informatique" />
                <meta name="twitter:description" content="Découvrez comment LUMINI School collecte, utilise et protège vos données personnelles, ainsi que la gestion des cookies et des paiements." />       
            </Head>

            <Nav/>

            <section className="legaux-container">
                <h1>Politique de confidentialité</h1>
                
                <div className="legaux-element">
                    <h2>1. Collecte des données</h2>
                    <p>Nous collectons des informations telles que le nom, l’adresse email et les données liées aux inscriptions et paiements.</p>
                </div>

                <div className="legaux-element">
                    <h2>2. Utilisation des données</h2>
                    <p>Les données sont utilisées pour :</p>
                    <ul className="lg-pp">
                        <li>Gérer les comptes utilisateurs</li>
                        <li>Traiter les inscriptions aux formations</li>
                        <li>Gérer les paiements</li>
                        <li>Améliorer nos services</li>
                    </ul>
                </div>

                <div className="legaux-element">
                    <h2>3. Paiements</h2>
                    <p>Les paiements sont traités via des services tiers sécurisés tels que PayPal et MVola. Nous ne stockons pas les informations bancaires.</p>
                </div>

                <div className="legaux-element">
                    <h2>4. Partage des données</h2>
                    <p>Les données peuvent être partagées uniquement avec les services nécessaires au fonctionnement de la plateforme.</p>
                </div>

                <div className="legaux-element">
                    <h2>5. Sécurité</h2>
                    <p>Nous mettons en œuvre des mesures de sécurité pour protéger les données personnelles.</p>
                </div>

                <div className="legaux-element">
                    <h2>6. Durée de conservation</h2>
                    <p>Les données sont conservées aussi longtemps que nécessaire pour fournir les services.</p>
                </div>

                <div className="legaux-element">
                    <h2>7. Droits des utilisateurs</h2>
                    <p>L’utilisateur peut demander l’accès, la modification ou la suppression de ses données en contactant le support.</p>
                </div>

                <div className="legaux-element">
                    <h2>8. Cookies</h2>
                    <p>La plateforme utilise des cookies pour :</p>
                    <ul className="lg-pp">
                        <li>Maintenir la session utilisateur</li>
                        <li>Améliorer l’expérience utilisateur</li>
                    </ul>
                </div>

                <div className="legaux-element">
                    <h2>9. Gestion des cookies</h2>
                    <p>L’utilisateur peut configurer son navigateur pour refuser les cookies.</p>
                </div>

                <div className="legaux-element">
                    <h2>10. Contact</h2>
                    <p>Pour toute question : <a href="mailto:ialyfrancisco7@gmail.com">ialyfrancisco7@gmail.com</a></p>
                </div>

            </section>

            <Footer/>
        </>
    )
}