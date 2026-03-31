/* eslint-disable react/no-unescaped-entities */
import { Nav } from "@/components/nav"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "@/contexts/AuthContext"
import { useForm } from "react-hook-form"
import Loading from "@/components/loading"
import { useRouter } from "next/router"
import Image from "next/image"
import IsAuthenticated from "@/components/isAuthenticated"

// 🔹 Génération des routes statiques
export async function getStaticPaths() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/get`)
    const formations = res.data.filter( f => f.published === true )

    const paths = formations.map(f => ({
        params: { id: f._id }
    }))

    return {
        paths,
        fallback: false // routes inconnues → 404
    }
}

// 🔹 Préchargement des données au build
export async function getStaticProps({ params }) {
    const { id } = params

    const resFormation = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/get?_id=${id}`)
    const formation = resFormation.data

    return {
        props: { formation }
    }
}

// 🔹 Composant principal (ton code source inchangé)
export default function Registrations({ formation: initialFormation }) {

    const router = useRouter()
    const { reset, register, handleSubmit } = useForm()
    const { user, setUser } = useAuth()
    const [formation, setFormation] = useState(initialFormation)
    const [loading, setLoading] = useState(!initialFormation)
    const [registrationLoading, setRegistrationLoading] = useState(false)
    const { id } = router.query

    const _formation = { _id: id }

    const _handleSubmit = async (data) => {
        try{
            setRegistrationLoading(true)
            const dataToSend = { formation: _formation, userPhoneNumber: data.phoneNumber }

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/registration/create`,
                dataToSend,
                { withCredentials: true }
            ).then(async () => {
                await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/informations`, {withCredentials: true})
                    .then((response)=> {
                        setUser(response.data)
                        reset()
                        router.push('/formations')
                    })
                    .catch(()=>setUser(null))
            })
        }catch(err){
            console.log(err)
        }finally{
            setRegistrationLoading(false)
        }
    }

    useEffect(()=>{
        if(!initialFormation && id){
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/get?_id=${id}`)
                .then((response)=>setFormation(response.data))
                .catch(()=>setFormation(null))
                .finally(()=>setLoading(false))
        }
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/informations`, {withCredentials: true})
            .then((response)=> setUser(response.data))
            .catch(()=>setUser(null))
    }, [id, setUser, initialFormation])

    if(loading) return(<Loading/>)
    if(!loading) return(
        <IsAuthenticated>
            <>
                <Nav></Nav>
                { formation &&
                    <section className="registrations-container">
                        { formation.map(f =>
                            <span key={f._id}>
                                <h2>Inscription à la formation <span className="title">"{f.title}"</span></h2>
                                <p>Veuillez <a href="#submition" className="colored" style={{ textDecoration: "underline" }}>soumettre votre inscription</a> pour que vous soyez inscrit à cette formation 📖 .</p>
                                <form onSubmit={handleSubmit(_handleSubmit)}>
                                    <div>
                                        <fieldset disabled="disabled">
                                            <legend><h3>A propos de la formation</h3></legend>
                                            <div className="element">
                                                <label htmlFor="">Titre de la formation :</label>
                                                <input type="text" id="" value={f.title} readOnly />
                                            </div>
                                            <div className="element">
                                                <label htmlFor="">Les prérequis de la formation :</label>
                                                <input type="text" id="" value={f.prerequisites} readOnly />
                                            </div>
                                            <div className="element">
                                                <label htmlFor="">Déscription de la formation :</label>
                                                <textarea id="" value={f.description} readOnly ></textarea>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend><h3>Vos informations personnelles</h3></legend>
                                            <div className="element">
                                                <label htmlFor="">Votre nom :</label>
                                                <input type="text" id="" value={user?.name || ""} disabled readOnly />
                                            </div>
                                            <div className="element">
                                                <label htmlFor="">Votre email :</label>
                                                <input type="email" id="" value={user?.email || ""} disabled readOnly />
                                            </div>
                                            <div className="element">
                                                <label htmlFor="">Votre numéro téléphone <span className="colored">*</span> :</label>
                                                <input type="tel" id="" placeholder="ex: 030 00 000 00" { ...register('phoneNumber', { required:true, value: user?.phoneNumber || "" }) } required />
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="element">
                                        <button id="submition" disabled={registrationLoading}>
                                            Soumettre l'inscription
                                            { registrationLoading && <Image src="/images/spinner.png" alt="loader spinner" className='loader' width={50} height={50} priority /> }
                                            { !registrationLoading && <Image src="/images/send (2).png" alt="icone fusé en papier" width={64} height={64} priority />}
                                        </button>
                                    </div>
                                </form>
                            </span>
                        ) }
                    </section>
                }
            </>
        </IsAuthenticated>
    )
}