import axios from "axios"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "sonner"

export default function Sidebar(){

    const { user, setUser } = useAuth()

    const handleClick = () => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/authentication/logout`, {}, {withCredentials: true})
        .then(()=>{
            setUser(null)
        }).catch(()=>{
            toast.error("Erreur de déconnexion, veuillez réessayer plus tard.")
        })
    }

    return(
        <aside>
            <ul>
                <li className="logo">
                    <Link to="/">LUMINI School</Link>
                </li>
                <li>
                    <div className="border">
                        <div className="profile-container">
                            <img src={ (user.profile.includes('https') || user.profile.includes('http')) ? user.profile : `${import.meta.env.VITE_API_BASE_URL}/${user.profile}` } alt="" />
                        </div>
                    </div>
                    <div className="user-infos">
                        <h5 title={user.name}>{user.name}</h5>
                        <p title={user.email}>{user.email}</p>
                    </div>
                </li>
                <li>
                    <ul>
                        { user && (user.status === "superuser" || user.status === "admin") && <li>
                            <NavLink to="/dashboard" end className={({ isActive })=> isActive ? "dash-link active" : "dash-link"}>
                                <img src="/images/formations.png" alt="" />
                                Formations
                            </NavLink>
                        </li> }
                        <li>
                            <NavLink to="/dashboard/inscriptions" className={({ isActive })=> isActive ? "dash-link active" : "dash-link"}>
                                <img src="/images/inscription.png" alt="" />
                                Inscriptions
                            </NavLink>
                        </li>
                        { user && (user.status === "superuser" || user.status === "admin") && <li>
                            <NavLink to="/dashboard/articles"  className={({ isActive })=> isActive ? "dash-link active" : "dash-link"}>
                                <img src="/images/article.png" alt="" />
                                Articles
                            </NavLink>
                        </li> }
                        { user && user.status === "superuser" && <li>
                            <NavLink to="/dashboard/users" className={({ isActive })=> isActive ? "dash-link active" : "dash-link"}>
                                <img src="/images/group.png" alt="" />
                                Utilisateurs
                            </NavLink>
                        </li> }
                        <li>
                            <NavLink to="/dashboard/settings" className={({ isActive })=> isActive ? "dash-link active" : "dash-link"}>
                                <img src="/images/settings.png" alt="" />
                                Paramètres
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className="actions" onClick={handleClick}>
                <p>
                    <img src="/images/logout.png" alt="" />
                    Se déconnecter
                </p>
            </div>
        </aside>
    )
}