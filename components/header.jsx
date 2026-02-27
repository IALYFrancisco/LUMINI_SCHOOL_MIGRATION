/* eslint-disable react/no-unescaped-entities */
import { Nav } from "./nav";
import Link from "next/link";
import Image from "next/image";
import arrow from '@/public/images/arrow.png'
import femme from '@/public/images/laptop3.png'

export function Header(){
    return(
        <>
            <Nav></Nav>
            <header>
                <div>
                    <div className="left">
                        <h1>L'informatique vous intéresse ? Voulez-vous y former ?</h1>
                        <p>Vous êtes donc au bon endroit 👍. Plusieurs modules de nos formations sont faites pour vous.</p>
                        <div className="actions">
                            <a href="#demo-formations">
                                <button>En savoir plus <Image src={arrow} alt="flèche pointant  à droite"/></button>
                            </a>
                            <Link href="/formations">
                                <button>Voir toutes les formations</button>
                            </Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="img-container">
                            <Image src={femme} className="femme" alt="jeune femme tenant un laptop"/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}