import { Header } from "@/components/header"
import { Formations } from "@/components/formations"
import { useHead, useSeoMeta } from "@unhead/react"

export function Home(){

    useHead({
        link: [
            { rel: 'canonical', href: 'https://luminischool.onrender.com' }
        ]
    })

    useSeoMeta({

        title: 'Accueil | LUMINI School - Plateforme de formation en informatique',

        ogTitle: 'Accueil | LUMINI School - Plateforme de formation en informatique',
        ogUrl: 'https://luminischool.onrender.com',

        twitterTitle: 'Accueil | LUMINI School - Plateforme de formation en informatique'

    })

    return (
        <>
            <Header></Header>
            <Formations></Formations>
        </>
    )
}