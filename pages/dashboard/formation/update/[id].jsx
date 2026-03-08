/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/router"
import DateRefactoring from "@/contexts/DateRefactoring"

export default function UpdateFormation(){
    const router = useRouter()

    var { register, handleSubmit, reset, formState: { errors, isDirty }, watch } = useForm()
    var [formation, setFormation] = useState(null)
    var [ image, setImage ] = useState('')
    var [ urlIsDefined, setUrlIsDefined ] = useState(false)
    var [ imageIsDefined, setImageIsDefined ] = useState(false)
    const { id } = router.query

    const descriptionValue = watch("description") || ""
    const wordCount = descriptionValue.trim().split(/\s+/).filter(Boolean).length

    var watchAll = watch()

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/get?_id=${id}`)
        .then((response)=>{
            response.data[0].coursePrice = JSON.stringify(response.data[0].coursePrice)
            setFormation(response.data[0])
            reset({
                title: response.data[0].title,
                prerequisites: response.data[0].prerequisites[0],
                description: response.data[0].description,
                url: (response.data[0].image.startsWith("https") || response.data[0].image.startsWith("http")) ? response.data[0].image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${response.data[0].image}`,
                beginDate: DateRefactoring(response.data[0].beginDate),
                endDate: DateRefactoring(response.data[0].endDate),
                coursePlace: response.data[0].coursePlace,
                coursePrice: response.data[0].coursePrice,
            })
        })
    },[id, reset])

    useEffect(()=>{
        
        if(watchAll.url) setUrlIsDefined(true)
        else setUrlIsDefined(false)

        if(image) setImageIsDefined(true)
        else setImageIsDefined(false)

    }, [image, watchAll])

    const isModified = isDirty || image

    const onSubmit = async (data) => {
        
        if(!isModified) return;
        else {
            try {

                let _formation = new FormData()
                    
                if(formation.title !== watchAll.title && data.title !== ""){
                    _formation.append("title", data.title)
                }
                if(formation.prerequisites[0] !== watchAll.prerequisites && data.prerequisites !== ""){
                    _formation.append("prerequisites", data.prerequisites)
                }
                if(formation.description !== watchAll.description && data.description !== ""){
                    _formation.append("description", data.description)
                }
                if(image){
                    _formation.append("poster", image)
                }
                if(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${formation.image}` !== data.url && data.url !== ""){
                    _formation.append("image", data.url)
                }
                if(DateRefactoring(formation.beginDate) !== DateRefactoring(watchAll.beginDate)){
                    _formation.append("beginDate", data.beginDate)
                }
                if(DateRefactoring(formation.endDate) !== DateRefactoring(watchAll.endDate)){
                    _formation.append("endDate", data.endDate)
                }
                if(formation.coursePlace !== watchAll.coursePlace && data.coursePlace !== ""){
                    _formation.append("coursePlace", data.coursePlace)
                }
                if(formation.coursePrice !== watchAll.coursePrice){
                    _formation.append("coursePrice", data.coursePrice)
                }

                await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/update?_id=${id}`, _formation,
                    { 
                        headers: image ? {"Content-Type": "multipart/form-data"} : {"Content-Type": "application/json"},
                        withCredentials: true
                    }
                ).then(()=>{
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/get?_id=${id}`)
                    .then((response)=>{
                        response.data[0].coursePrice = JSON.stringify(response.data[0].coursePrice)
                        setFormation(response.data[0])
                        reset({
                            title: response.data[0].title,
                            prerequisites: response.data[0].prerequisites[0],
                            description: response.data[0].description,
                            url: (response.data[0].image.startsWith("https") || response.data[0].image.startsWith("http")) ? response.data[0].image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${response.data[0].image}`,
                            beginDate: DateRefactoring(response.data[0].beginDate),
                            endDate: DateRefactoring(response.data[0].endDate),
                            coursePlace: response.data[0].coursePlace,
                            coursePrice: response.data[0].coursePrice,
                        })
                    })
                    setImage(null)
                })
                .catch((err)=> console.log(err))
                
            }catch(err){
                console.log(err)
            }
            
        }

    }

    return(
        <>
            <section className="add-formation-form">
                <h3>Modification d'une formation :</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="fieldsets-top">
                        <fieldset>
                            <div className="element">
                                <label>Titre de la formation :</label>
                                <input type="text" required placeholder="Ajoutez un titre pour la formation" { ...register("title", { required: true })}/>
                            </div>
                            <div className="element">
                                <label>Image de mis en avant pour la formation :</label>
                                <input disabled={ urlIsDefined } type="file" id="" accept="image/jpeg, image/png" onChange={(e) => {setImage(e.target.files[0])}}/>
                                <input disabled={ imageIsDefined } type="url" id="" { ...register("url") } />
                            </div>
                            <div className="element">
                                <label>Les prérequis du formation :</label>
                                <input type="text" id="" placeholder="Doivent être séparés par un point-virgule" { ...register("prerequisites", {required: true }) } required />
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
                            <div className="element update-actions">
                                <button disabled={!isModified}>Soumettre</button>
                            </div>
                        </fieldset>
                    </div>
                </form>
            </section>
        </>
    )
}