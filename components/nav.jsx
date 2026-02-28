import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import menu from '@/public/images/menu.png'
import Image from "next/image";
import { useRouter } from 'next/router'

export function Nav(){

    const { user } = useAuth()
    const router = useRouter()

    const handleClick = () => {
        const element = document.querySelector('.mobile-menu')
        element.classList.toggle('opened')
    }

    return(
        <div className="nav-container">
            <nav>
                <ul>
                    <li className="logo">
                        <Link href="/">LUMINI School</Link>
                    </li>
                    <li>
                        <ul>
                            <li>
                                <Link href="/" className={router.pathname === "/" ? "nav-link active" : "nav-link"}>Accueil</Link>
                            </li>
                            <li>
                                <Link href="/formations" className={router.pathname === "/formations" ? "nav-link active" : "nav-link"}>Formations</Link>
                            </li>
                            <li>
                                <Link href="/articles" className={router.pathname === "/articles" ? "nav-link active" : "nav-link"}>Articles</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        { !user &&
                            <ul>
                                <li>
                                    <Link href="/authentication/login">
                                        <button>Se connecter</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/authentication/register">
                                        <button>Créer un compte</button>
                                    </Link>
                                </li> 
                            </ul>
                        }{
                            user &&
                            <ul>
                                <li>
                                    <Link href="/dashboard">
                                        <button>Dashboard</button>
                                    </Link>
                                </li> 
                            </ul>
                        }
                    </li>
                    <li className="menu" onClick={handleClick}>
                        <Image width={96} height={96} src={menu} alt="menu" priority/>
                    </li>
                </ul>
            </nav>
            <div className="mobile-menu" onClick={handleClick}>
                <ul>
                    <li onClick={handleClick}>
                        <Link  onClick={handleClick} href="/" end className={router.pathname === "/" ? "nav-link active" : "nav-link"}>Accueil</Link>
                    </li>
                    <li onClick={handleClick}>
                        <Link  onClick={handleClick} href="/formations" className={router.pathname === "/formations" ? "nav-link active" : "nav-link"}>Formations</Link>
                    </li>
                    <li onClick={handleClick}>
                        <Link href="/articles" className={router.pathname === "/articles" ? "nav-link active" : "nav-link"}>Articles</Link>
                    </li>
                    { !user && <>
                        <li onClick={handleClick}>
                            <Link  onClick={handleClick} href="/authentication/login" className={router.pathname === "/authentication/login" ? "nav-link active" : "nav-link"}>Se connecter</Link>
                        </li>
                        <li onClick={handleClick}>
                            <Link  onClick={handleClick} href="/authentication/register" className={router.pathname === "/authentication/register" ? "nav-link active" : "nav-link"}>Créer un compte</Link>
                        </li>
                    </> }
                    { user && <>
                        <li onClick={handleClick}>
                            <Link  onClick={handleClick} href="/dashboard" className={router.pathname === "/dashboard" ? "nav-link active" : "nav-link"}>Dashboard</Link>
                        </li>
                    </> }
                </ul>
            </div>
        </div>
    )
}