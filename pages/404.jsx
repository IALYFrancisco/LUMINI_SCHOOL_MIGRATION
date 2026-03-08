/* eslint-disable react/no-unescaped-entities */
import { Nav } from "@/components/nav"
import Link from "next/router"
import Image from "next/image"

export default function NotFound(){
    return(<>
        <Nav/>
        <section className="not-found-container">
            <div>
                <h1>404</h1>
                <h2>Page introuvable</h2>
                <Link href="/">
                    <button>Retour à l'accueil</button>
                </Link>
                <Image src="/images/fleur.png" alt="fleur" className="laptop-mouse" width={400} height={400} priority />
                <Image src="/images/coffee-laptop.png" alt="café et ordinateur" className="mouse" width={400} height={400} priority />
            </div>
        </section>
    </>)
}