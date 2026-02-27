/* eslint-disable react/no-unescaped-entities */
import { Nav } from "./nav";
import Link from "next/link";
import Image from "next/image";

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
                                <button>En savoir plus <Image width={32} height={32} priority src='/images/arrow.png' alt="flèche pointant  à droite"/></button>
                            </a>
                            <Link href="/formations">
                                <button>Voir toutes les formations</button>
                            </Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="img-container">
                            <Image src="/images/laptop3.png" className="femme" width={430} height={581} priority alt="jeune femme tenant un laptop"/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}