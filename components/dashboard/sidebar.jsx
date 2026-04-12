import axios from "axios"
import { useRouter } from "next/router"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import Image from "next/image"

export default function Sidebar(){

    const router = useRouter()
    const { user, setUser } = useAuth()

    const handleClick = () => {
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/logout`, {}, {withCredentials: true})
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
                    <Link href="/">LUMINI School</Link>
                </li>
                <li>
                    <div className="border">
                        <div className="profile-container">
                            <Image src={ (user.profile.startsWith('https') || user.profile.startsWith('http')) ? user.profile : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${user.profile}` } alt={ user.name } width={100} height={100} priority />
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
                            <Link href="/dashboard" className={ router.pathname === "/dashboard" ? "dash-link active" : "dash-link"}>
                                <Image src="/images/formations.png" alt="icone formations" width={48} height={48} priority />
                                Formations
                            </Link>
                        </li> }
                        <li>
                            <Link href="/dashboard/inscriptions" className={ router.pathname === "/dashboard/inscriptions" ? "dash-link active" : "dash-link"}>
                                <Image src="/images/inscription.png" alt="icone inscription" width={50} height={50} priority />
                                Inscriptions
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/transactions" className={ router.pathname === "/dashboard/transactions" ? "dash-link active" : "dash-link"}>
                                <Image src="/images/inscription.png" alt="icone transactions" width={50} height={50} priority />
                                Transactions
                            </Link>
                        </li>
                        { user && (user.status === "superuser" || user.status === "admin") && <li>
                            <Link href="/dashboard/articles"  className={router.pathname === "/dashboard/articles" ? "dash-link active" : "dash-link"}>
                                <Image src="/images/article.png" alt="icone article" width={50} height={50} priority />
                                Articles
                            </Link>
                        </li> }
                        { user && user.status === "superuser" && <li>
                            <Link href="/dashboard/users" className={router.pathname === "/dashboard/users" ? "dash-link active" : "dash-link"}>
                                <Image src="/images/group.png" alt="icone groupe" width={30} height={30} priority />
                                Utilisateurs
                            </Link>
                        </li> }
                        <li>
                            <Link href="/dashboard/settings" className={router.pathname === "/dashboard/settings" ? "dash-link active" : "dash-link"}>
                                <Image src="/images/settings.png" alt="icone paramètres" width={50} height={50} priority />
                                Paramètres
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className="actions" onClick={handleClick}>
                <p>
                    <Image src="/images/logout.png" alt="icone de déconnexion" width={50} height={50} priority />
                    Se déconnecter
                </p>
            </div>
        </aside>
    )
}