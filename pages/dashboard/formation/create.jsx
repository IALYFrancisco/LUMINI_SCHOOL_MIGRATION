/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "sonner"
import Image from "next/image"

export default function AddFormation(){
    
    var { register, handleSubmit, reset, formState: { errors }, watch } = useForm()
    const watchAll = watch()
    var [ image, setImage ] = useState('')
    var [ urlIsDefined, setUrlIsDefined ] = useState(false)  
    var [ imageIsDefined, setImageIsDefined ] = useState(false)
    var [ addFormationLoading, setAddFormationLoading ] = useState(false)
    const descriptionValue = watchAll.description || ""
    const wordCount = descriptionValue.trim().split(/\s+/).filter(Boolean).length

    useEffect(()=>{

        if (watchAll.url) setUrlIsDefined(true)
        else setUrlIsDefined(false)
        
        if (image) setImageIsDefined(true)
        else setImageIsDefined(false)

    }, [image, watchAll])

    const onSubmit = async (data) => {
        try{
            setAddFormationLoading(true)
            const formation = new FormData()
            formation.append("title", data.title)
            formation.append("prerequisites", data.prerequisites)
            formation.append("description", data.description)
            formation.append("beginDate", data.beginDate)
            formation.append("endDate", data.endDate)
            formation.append("coursePlace", data.coursePlace)
            formation.append("coursePrice", data.coursePrice)
            if(image){
                formation.append("poster", image)
            }
            if(watchAll.url){
                formation.append("image", data.url)
            }
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/add`, formation,
                { headers: image ? {"Content-Type": "multipart/form-data"} : {"Content-Type": "application/json"}, withCredentials: true }
            ).then(()=>{
                setImage(null)
                reset()
                toast.info(`La formation ${data.title} vient d'être ajoutée.`)
            })
            .catch(()=> toast.error(`Erreur d'ajout du formation ${data.title}, veuillez réessayer plus tard.`))
            .finally(()=>setAddFormationLoading(false))
        }
        catch{toast.error(`Erreur d'ajout du formation ${data.title}, veuillez réessayer plus tard.`)}
    }

    return(
        <>
            <section className="add-formation-form">
                <h3>Ajout d'une formation :</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="fieldsets-top">
                        <fieldset>
                            <div className="element">
                                <label>Titre de la formation :</label>
                                <input type="text" required placeholder="Ajoutez un titre pour la formation" { ...register("title", { required: true })}/>
                            </div>
                            <div className="element">
                                <label>Image de mis en avant pour la formation :</label>
                                <input disabled={ urlIsDefined } type="file" id="" required accept="image/jpeg, image/png" onChange={(e) => setImage(e.target.files[0])}/>
                                <input disabled={ imageIsDefined } type="url" id="" { ...register("url") } placeholder="Utilisez cet champ pour une image en ligne" />
                            </div>
                            <div className="element">
                                <label>Les prérequis du formation :</label>
                                <input type="text" id="" placeholder="Doivent être séparés par un point-virgule" { ...register("prerequisites", {required: true}) } required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="element">
                                <label>Descriptions de la formation : <p>nombre de mots : {wordCount} / 150</p></label>
                                <textarea cols="30" rows="10" required placeholder="Redigez ici les descriptions ..." { ...register("description", { required: "La description est obligatoire.", validate: {
                                    minWords: (value) => 
                                        value.trim().split(/\s+/).length >= 50 ||
                                    "La description doit contenir au moins 50 mots.",
                                    maxWords: (value) =>
                                        value.trim().split(/\s+/).length <= 150 ||
                                    "La description ne doit pas dépasser 150 mots."
                                } }) } ></textarea>
                            </div>
                            { errors.description && (
                                <p className="message">{errors.description.message}</p>
                            ) }
                        </fieldset>
                    </div>
                    <div className="fieldsets-bottom">
                        <fieldset>
                            <div className="element">
                                <label>Date et heure de début du formation :</label>
                                <input type="datetime-local" required { ...register("beginDate", { required: true })}/>
                            </div>
                            <div className="element">
                                <label>Date et heure de fin du formation :</label>
                                <input type="datetime-local" required { ...register("endDate", { required: true }) }/>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="element">
                                <label>Lieu du formation :</label>
                                <input type="text" required { ...register("coursePlace", { required: true })} placeholder="L'endroit où se déroule la formation"/>
                            </div>
                            <div className="element">
                                <label>Coût de la formation (en Ar) :</label>
                                <input type="number" min="1" required { ...register("coursePrice", { required: true }) } placeholder="Entrez un montant en ariary"/>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="element">
                                <button disabled={addFormationLoading}>
                                    Soumettre
                                    { addFormationLoading && <Image src="/images/spinner.png" alt="loader spiner" width={50} height={50} priority />}    
                                </button>
                            </div>
                        </fieldset>
                    </div>
                </form>
            </section>
        </>
    )
}