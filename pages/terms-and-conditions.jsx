import Head from "next/head"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function TermsAndConditions(){
    return (
        <>
            <Head>
                <title>Conditions générales d’utilisation et de vente | LUMINI School - Plateforme de formation en informatique</title>
                <link rel="canonical" href="https://luminischool.onrender.com/terms-and-conditions" />
                <meta name="description" content="Consultez les conditions générales d’utilisation et de vente de LUMINI School : inscription, paiement, accès aux formations en présentiel et responsabilités."/>

                <meta property="og:title" content="Conditions générales d’utilisation et de vente | LUMINI School - Plateforme de formation en informatique" />
                <meta property="og:description" content="Consultez les conditions générales d’utilisation et de vente de LUMINI School : inscription, paiement, accès aux formations en présentiel et responsabilités." key="og:description"/>
                <meta property="og:url" content="https://luminischool.onrender.com/terms-and-conditions" />

                <meta name="twitter:title" content="Conditions générales d’utilisation et de vente | LUMINI School - Plateforme de formation en informatique" />
                <meta name="twitter:description" content="Consultez les conditions générales d’utilisation et de vente de LUMINI School : inscription, paiement, accès aux formations en présentiel et responsabilités." />       
            </Head>

            <Nav/>

            <section className="legaux-container">
                <h1>Conditions générales d’utilisation et de vente</h1>
                
                <div className="legaux-element">
                    <h2>1. Objet</h2>
                    <p>Les présentes conditions générales régissent l’utilisation de la plateforme LUMINI School ainsi que les modalités d’inscription et de participation aux formations proposées.</p>
                </div>

                <div className="legaux-element">
                    <h2>2. Présentation du service</h2>
                    <ul>
                        <li>
                            <p>LUMINI School est une plateforme permettant aux utilisateurs de consulter librement des formations en informatique.</p>
                        </li>
                        <li>
                            <p>La création d’un compte est requise pour s’inscrire aux formations, effectuer un paiement et accéder aux informations personnelles liées aux inscriptions.</p>
                        </li>
                        <li>
                            <p>Les formations sont dispensées exclusivement en présentiel.</p>
                        </li>
                    </ul>
                </div>

                <div className="legaux-element">
                    <h2>3. Création de compte</h2>
                    <ul>
                        <li>
                            <p>La consultation des formations est accessible librement sans création de compte.</p>
                        </li>
                        <li>
                            <p>Toutefois, l’utilisateur doit créer un compte pour s’inscrire à une formation, effectuer un paiement et accéder aux informations relatives à ses inscriptions.</p>
                        </li>
                        <li>
                            <p>L’utilisateur s’engage à fournir des informations exactes et à les maintenir à jour.</p>
                        </li>
                    </ul>
                </div>

                <div className="legaux-element">
                    <h2>4. Accès à la plateforme</h2>
                    <ul>
                        <li>
                            <p>La plateforme LUMINI School est accessible librement pour la consultation des formations.</p>
                        </li>
                        <li>
                            <p>Certaines fonctionnalités, telles que l’inscription aux formations, le paiement des frais et l’accès aux informations personnelles, nécessitent la création d’un compte utilisateur et une authentification préalable.</p>
                        </li>
                        <li>
                            <p>L’utilisateur est responsable de la confidentialité de ses identifiants de connexion.</p>
                        </li>
                        <li>
                            <p>L’utilisateur peut supprimer son compte à tout moment depuis son espace personnel, sous réserve d’être authentifié.</p>
                        </li>
                        <li>
                            <p>LUMINI School se réserve la possibilité d’attribuer des droits spécifiques à certains utilisateurs, notamment des rôles administrateurs, afin d’assurer la gestion de la plateforme.</p>
                        </li>
                    </ul>
                </div>

                <div className="legaux-element">
                    <h2>5. Inscription aux formations</h2>
                    <p>L’utilisateur peut s’inscrire à une ou plusieurs formations via la plateforme. Les informations relatives aux dates, lieux et frais sont indiquées pour chaque formation.</p>
                </div>

                <div className="legaux-element">
                    <h2>6. Prix</h2>
                    <p>Les prix des formations sont indiqués sur la plateforme et peuvent être modifiés à tout moment.</p>
                </div>

                <div className="legaux-element">
                    <h2>7. Paiement</h2>
                    <p>Le paiement des formations peut être effectué via les moyens disponibles sur la plateforme, notamment PayPal et MVola.</p>
                </div>

                <div className="legaux-element">
                    <h2>8. Confirmation et justificatifs</h2>
                    <p>Après paiement, l’utilisateur peut consulter et télécharger les détails de son paiement depuis son compte.</p>
                </div>

                <div className="legaux-element">
                    <h2>9. Politique de remboursement</h2>
                    <p>Les demandes de remboursement doivent être effectuées avant le début de la formation. Aucun remboursement ne sera effectué après le démarrage sauf cas exceptionnel.</p>
                </div>

                <div className="legaux-element">
                    <h2>10. Responsabilités</h2>
                    <p>LUMINI School ne saurait être tenu responsable en cas de mauvaise utilisation de la plateforme ou de problèmes indépendants de sa volonté.</p>
                </div>

                <div className="legaux-element">
                    <h2>11. Propriété intellectuelle</h2>
                    <p>Les contenus présents sur la plateforme sont protégés et ne peuvent être utilisés sans autorisation.</p>
                </div>

                <div className="legaux-element">
                    <h2>12. Modification des conditions</h2>
                    <p>LUMINI School se réserve le droit de modifier les présentes conditions à tout moment.</p>
                </div>

                <div className="legaux-element">
                    <h2>13. Contact</h2>
                    <p>Pour toute question, veuillez contacter : <a href="mailto:ialyfrancisco7@gmail.com">ialyfrancisco7@gmail.com</a></p>
                </div>
            </section>

            <Footer/>
        </>
    )
}