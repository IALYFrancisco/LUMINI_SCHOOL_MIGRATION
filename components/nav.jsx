import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import menu from '@/public/images/menu.png'
import Image from "next/image";

export function Nav(){

    const { user } = useAuth()

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
                                <Link href="/" end className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Accueil</Link>
                            </li>
                            <li>
                                <Link href="/formations" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Formations</Link>
                            </li>
                            <li>
                                <Link href="/articles" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Articles</Link>
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
                        <Link  onClick={handleClick} href="/" end className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Accueil</Link>
                    </li>
                    <li onClick={handleClick}>
                        <Link  onClick={handleClick} href="/formations" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Formations</Link>
                    </li>
                    <li onClick={handleClick}>
                        <Link href="/articles" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Articles</Link>
                    </li>
                    { !user && <>
                        <li onClick={handleClick}>
                            <Link  onClick={handleClick} href="/authentication/login" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Se connecter</Link>
                        </li>
                        <li onClick={handleClick}>
                            <Link  onClick={handleClick} href="/authentication/register" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Créer un compte</Link>
                        </li>
                    </> }
                    { user && <>
                        <li onClick={handleClick}>
                            <Link  onClick={handleClick} href="/dashboard" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Dashboard</Link>
                        </li>
                    </> }
                </ul>
            </div>
        </div>
    )
}