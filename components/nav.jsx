import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

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
                        <img src="/images/menu.png" alt="" />
                    </li>
                </ul>
            </nav>
            <div className="mobile-menu" onClick={handleClick}>
                <ul>
                    <li onClick={handleClick}>
                        <NavLink  onClick={handleClick} to="/" end className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Accueil</NavLink>
                    </li>
                    <li onClick={handleClick}>
                        <NavLink  onClick={handleClick} to="/formations" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Formations</NavLink>
                    </li>
                    <li onClick={handleClick}>
                        <NavLink to="/articles" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Articles</NavLink>
                    </li>
                    { !user && <>
                        <li onClick={handleClick}>
                            <NavLink  onClick={handleClick} to="/authentication/login" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Se connecter</NavLink>
                        </li>
                        <li onClick={handleClick}>
                            <NavLink  onClick={handleClick} to="/authentication/register" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Créer un compte</NavLink>
                        </li>
                    </> }
                    { user && <>
                        <li onClick={handleClick}>
                            <NavLink  onClick={handleClick} to="/dashboard" className={({ isActive })=> isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
                        </li>
                    </> }
                </ul>
            </div>
        </div>
    )
}