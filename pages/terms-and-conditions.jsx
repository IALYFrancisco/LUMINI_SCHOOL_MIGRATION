import Head from "next/head"
import { Nav } from "@/components/nav"

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
                
            </section>
        </>
    )
}