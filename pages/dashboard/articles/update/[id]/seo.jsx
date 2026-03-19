/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Image from "next/image"

export default function SEOUpdate(){
    
    const router = useRouter()

    var [article, setArticle] = useState(null)
    var [seo, setSeo] = useState(null)
    const {id} = router.query
    var { register, handleSubmit, reset, formState: { isDirty } } = useForm()
    var [ isLoading, setIsLoading ] = useState(false)
    
    useEffect(()=>{
        if(id){
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get?_id=${id}`, { withCredentials: true })
                .then((response)=>{
                    setArticle(response.data)
                }).catch(()=>setArticle(null))
        }
    },[id])
    
    useEffect(()=>{
    if(id){
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seo/get?articleId=${id}`, { withCredentials: true })
            .then((response)=>{
                if(response.status === 200){
                    setSeo(response.data)
                    reset({
                        title: response.data.title,
                        canonicUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${response.data.canonicUrl}`,
                        image: (response.data.image.startsWith('http') || response.data.image.startsWith('https')) ? response.data.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${response.data.image}`,
                        description: response.data.description
                    })
                }
                if(response.status === 209){
                    setSeo(null)
                    toast.info("Cet article n'a pas encore de SEO.")
                }
            }).catch(()=>{
                setSeo(null)
                toast.error('Erreur de récupération du SEO de cet article')
            })
    }
    }, [article, id, reset])

    const isModified = isDirty

    const sumbmitForm = async (data)=>{
        setIsLoading(true)
        if(seo){
            try{
                let update = {
                    title: undefined,
                    description: undefined
                }
                if(data.title != seo.title){
                    update.title = data.title
                }
                if(data.description != seo.description){
                    update.description = data.description
                }
                let response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seo/update`, { seoId: seo._id, update }, {withCredentials: true})
                if(response.status === 200){
                    toast.success("Seo mis à jour avec succès.")
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seo/get?articleId=${id}`, { withCredentials: true })
                    .then((response)=>{
                        if(response.status === 200){
                            setSeo(response.data)
                            reset({
                                title: response.data.title,
                                canonicUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${response.data.canonicUrl}`,
                                image: (response.data.image.startsWith('http') || response.data.image.startsWith('https')) ? response.data.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${response.data.image}`,
                                description: response.data.description
                            })
                        }
                        if(response.status === 209){
                            setSeo(null)
                            toast.info("Cet article n'a pas encore de SEO.")
                        }
                    }).catch(()=>{
                        setSeo(null)
                        toast.error('Erreur de récupération du SEO de cet article')
                    })
                }
            }catch{
                toast.error("Erreur de mis à jour du SEO, veuillez reéssayer plus tard.")
            }finally{
                setIsLoading(false)
            }
        }else{
            let _data = {
                seo: {
                    title: data.title,
                    description: data.description
                },
                articleId: id
            }
            axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seo/create`, _data, { withCredentials: true })
            .then(()=>{
                axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seo/get?articleId=${id}`, { withCredentials: true })
                .then((response)=>{
                    if(response.status === 200){
                        setSeo(response.data)
                        reset({
                            title: response.data.title,
                            canonicUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}${response.data.canonicUrl}`,
                            image: (response.data.image.startsWith('http') || response.data.image.startsWith('https')) ? response.data.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${response.data.image}`,
                            description: response.data.description
                        })
                    }
                    if(response.status === 209){
                        setSeo(null)
                        toast.info("Cet article n'a pas encore de SEO.")
                    }
                }).catch(()=>{
                    setSeo(null)
                    toast.error('Erreur de récupération du SEO de cet article')
                })
            }).catch(()=>{ toast.error("Erreur de création de SEO pour cet article, veuillez réessayer plus tard.") })
            .finally(()=>setIsLoading(false))
        }
    }

    return(
        article &&
        <>
            <div className="update-article-seo">
                <h3>Modification du SEO de l'article <span>"{article.title}"</span></h3>
                <form onSubmit={handleSubmit(sumbmitForm)}>
                    <fieldset>
                        <div className="element">
                            <label htmlFor="page-title">Titre de page [ title, og:title, twitter:title ] :</label>
                            <input type="text" id="page-title" placeholder="Ajoutez un titre à la page d'article (ce sera également utilisé par og:title et twitter:title)" { ...register('title') } required/>
                        </div>
                        <div className="element">
                            <label htmlFor="page-url">Url de page [ lien canonique, og:url, twitter:url ] :</label>
                            <input type="url" id="page-url" placeholder="Url canonique à la page d'article pour link:canonical et og:url" { ...register('canonicUrl') } required disabled/>
                        </div>
                        <div className="element">
                            <label htmlFor="image">Image de mise en avant [ og:image, twitter:image ] :</label>
                            <input type="url" id="image" placeholder="Image pour og:image, twitter:image" { ...register('image') } required disabled/>
                        </div>
                        <div className="element">
                            <button disabled={!isModified || isLoading}>
                                Soumettre
                                { isLoading && <Image src="/images/spinner.png" alt="loader" width={50} height={50} priority />}
                            </button>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="element">
                            <label htmlFor="page-description">Description de page :</label>
                            <textarea id="page-description" placeholder="Rediger une description pour la page, ce sera utilisée par meta:description: , og:description et twitter:description" { ...register('description')} required></textarea>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    )
}