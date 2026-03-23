/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"

export function Footer(){

    const router = useRouter()

    return (
        <section className="footer-container">
            <footer>
                <section>
                    <ul>
                        <li className="logo">
                            <Link href="/">
                                LUMINI School
                            </Link>
                        </li>
                        <li>
                            <p><Link href="/">LUMINI School</Link> est une organisation  qui s'est engagée au devoir de former tout les citoyens. Elle transmet ses espoirs à ses apprenties à travers des environnements et cadre de formation convivial ✍ .</p>
                        </li>
                        <li className="actions">
                            <Link href="/authentication/login">
                                <button>Se connecter</button>
                            </Link>
                            <Link href="/authentication/register">
                                <button>Créer un compte</button>
                            </Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Menus</h3>
                    <ul>
                        <li>
                            <Link href="/" className={router.pathname === "/" ? "nav-link active" : "nav-link"}>
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link href="/formations" className={router.pathname === "/formations" ? "nav-link active" : "nav-link"}>
                                Formations
                            </Link>
                        </li>
                        <li>
                            <Link href="/articles" className={router.pathname === "/articles" ? "nav-link active" : "nav-link"}>
                                Articles
                            </Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Nos contacts</h3>
                    <ul>
                        <li>
                            <a href="#contact">
                                Ecrire un message à LUMINI
                            </a>
                        </li>
                        <li>
                            <Image src="/images/phone (1).png" alt="icone téléphone" width={50} height={50} priority />
                            +261 34 47 635 78
                        </li>
                        <li>
                            <a href="mailto:ialyfrancisco7@gmail.com">
                                <Image src="/images/envelope (1).png" alt="icone envelope" width={50} height={50} priority />
                                ialyfrancisco7@gmail.com
                            </a>
                        </li>
                        <li>
                            <Image src="/images/gps (1).png" alt="icone localisation" width={50} height={50} priority />
                            Mangarivotra, Parcelle 21/72, Lot 765, Toamasina 501
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Légales</h3>
                    <ul>
                        <li className="lg">
                            <Link href="/terms-and-conditions" className={router.pathname === "/terms-and-conditions" ? "nav-link active" : "nav-link"}>Conditions générales</Link>
                        </li>
                        <li className="lg">
                            <Link href="/privacy-policy" className={router.pathname === "/privacy-policy" ? "nav-link active" : "nav-link"}>Politique de confidentialité</Link>
                        </li>
                        <li className="lg">
                            <Link href="/legal-notice" className={router.pathname === "/legal-notice" ? "nav-link active" : "nav-link"}>Mentions légales</Link>
                        </li>
                    </ul>
                    <h3>Réseaux sociaux</h3>
                    <ul className="rs">
                        <li>
                            <Image src="/images/facebook.png" alt="icone facebook" width={50} height={50} priority />
                        </li>
                        <li>
                            <Image src="/images/linkedin.png" alt="icone linkedin" width={50} height={50} priority />
                        </li>
                    </ul>
                </section>
            </footer>
            <section className="info-page">
                <span className="left">
                    <p>&copy; 2025 <Link href="/">LUMINI School</Link>. Tout droit réservés.</p>
                </span>
                <span className="right">
                    <p>Fait avec 💖 par <a href="https://lumini.onrender.com" target="_blank" rel="noopener noreferrer">LUMINI</a></p>
                </span>
            </section>
        </section>
    )
}