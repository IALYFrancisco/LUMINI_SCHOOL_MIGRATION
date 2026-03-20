/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import Head from 'next/head'
import Image from 'next/image'
import Dashboard from "@/components/layouts/dashboardLayout"

export default function Settings(){
    
    var { user, setUser } = useAuth()

    const { 
        register: registerInfo,
        handleSubmit: handleSubmitInfo,
        reset: resetInfo,
        formState: { dirtyFields: dirtyFieldsInfo },
        watch: watchInfos
    } = useForm({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            profile: (user?.profile.includes('https') || user?.profile.includes('http')) ? user?.profile : `${process.env.NEXT_PUBLIC_API_BASE_URL}${user?.profile}`,
            phoneNumber: user?.phoneNumber
        }
    })

    const {
        register: registerChangePassword,
        handleSubmit: handleSubmitChangePassword,
        reset: resetChangePassword,
        watch: watchChangePassword
    } = useForm()

    const {
        register: registerDeleteAccount,
        handleSubmit: handleSubmitDeleteAccount,
        reset: resetDeleteAccount,
        watch: watchDeleteAccount
    } = useForm()

    var watchAllInfo = watchInfos()
    var watchAllChangePassword = watchChangePassword()
    var watchAllDeleteAccount = watchDeleteAccount()
    
    var [ infoFormActive, setInfoFormActive ] = useState(false)
    var [ imageIsDefined, setImageIsDefined ] = useState(false)
    var [ urlIsDefined, setUrlIsDefined ] = useState(false)
    var [ image, setImage ] = useState(null)
    var [ toggleInfosOverlay, setToggleInfosOverlay ] = useState(false)
    var [ togglePasswordOverlay, setTogglePasswordOverlay ] = useState(false)
    var [ userIsSure, setUserIsSure ] = useState(false) 

    var toggleInfoForm = ()=>{
        infoFormActive ? setInfoFormActive(false) : setInfoFormActive(true)
        if(infoFormActive){
            resetInfo({
                name: user.name,
                email: user.email,
                profile: (user.profile.includes('https') || user.profile.includes('http')) ? user.profile : `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profile}`,
                phoneNumber: user.phoneNumber
            })
        }
    }

    const deleteAccount = (data)=>{

        let _user = {
            _id: user._id,
            password: data.deleteAccountPassword
        }

        if(watchAllDeleteAccount.deleteAccountPassword){
            axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/delete`, { data: _user, withCredentials: true })
            .then(()=>{
                setUser(null)
                toast.info("Votre compte et vos données sur LUMINI School a été bien supprimé par vous même.")
            }).catch((err)=>{
                if(err.status === 401){
                    toast.error("Mot de passe incorrect.")
                }else{
                    toast.error("Erreur de suppression de compte, veuillez réessayer plus tard.")
                }
            })
        }
    }

    const changePassword = (_data) => {
        if( watchAllChangePassword.newChangePassword !== watchAllChangePassword.confirmNewChangePassword ){
            toast.warning("Le mot de passe confirmé ne correspond pas au nouveau mot de passe.")
        }else{
            let data = {
                _id: user._id,
                currentPassword: _data.currentChangePassword,
                newPassword: _data.newChangePassword
            }
            axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/change-password`, data, { withCredentials: true })
            .then(()=>{
                setUser(null)
                toast.success("Votre mot de passe a été bien changé.")
            }).catch((err)=>{
                if(err.status === 400 || err.status === 401){
                    toast.error("Mot de passe incorrect.")
                }
                if(err.status === 500){
                    toast.error("Erreur de changement de mot de passe, veuillez réessayer plus tard.")
                }
            })
        }
    }

    const updateUser = (data) => {
        if(!isInfoModified){ return; }
        else{
            let __user = new FormData()

            if(watchAllInfo.name !== user.name && watchAllInfo.name !== ""){
                __user.append("name", data.name)
            }
            if(watchAllInfo.email !== user.email && watchAllInfo.email !== ""){
                __user.append("email", data.email)
            }
            if(watchAllInfo.profile !== ((user.profile.startsWith('https') || user.profile.startsWith('http')) ? user.profile : `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profile}`) && watchAllInfo.profile !== ""){
                __user.append("profile", data.profile)
            }
            if(image){
                __user.append("profile", image)
            }
            if(watchAllInfo.phoneNumber !== user.phoneNumber && watchAllInfo.phoneNumber !== ""){
                __user.append("phoneNumber", data.phoneNumber)
            }

            axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update?_id=${user._id}`, __user, { headers: image ? {"Content-Type": "multipart/form-data"} : {"Content-Type": "application/json"}, withCredentials: true })
            .then(()=>{
                setImage(null)
                resetInfo()
                axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/informations`, {withCredentials: true})
                .then((response)=>{
                    setUser(response.data)
                    resetInfo({
                        name: response.data.name,
                        email: response.data.email,
                        profile: (response.data.profile.startsWith('https') || response.data.profile.startsWith('http')) ? response.data.profile : `${process.env.NEXT_PUBLIC_API_BASE_URL}${response.data.profile}`,
                        phoneNumber: response.data.phoneNumber
                    })
                    setInfoFormActive(false)
                })
            })

        }
    }

    useEffect(()=>{

        if(watchAllInfo.profile){setUrlIsDefined(true)}
        else{setUrlIsDefined(false)}

        if(image){setImageIsDefined(true)}
        else{setImageIsDefined(false)}
        
    }, [image, watchAllInfo.profile])

    var isInfoModified = Object.keys(dirtyFieldsInfo).length > 0 || image

    return(
        <Dashboard>
            <Head>
                <title>Paramètres - Dashboard | LUMINI School</title>
            </Head>
            <h2>Paramètres</h2>
            <section className="info-perso-container">
                <div className="head">
                    <p>Vous pouvez apporter des modifications sur les infromations suivantes :</p>
                </div>
                <div className="forms-container">
                    <div className="left">
                        <form onSubmit={handleSubmitInfo(updateUser)}>
                            <fieldset disabled={!infoFormActive}>
                                <div className="form-title">
                                    <h3>Informations personnelles :</h3>
                                    <span className={ infoFormActive ? "action-badge active" : "action-badge" } onClick={toggleInfoForm}> { infoFormActive ? "Annuler" : "Modifier mon infromation"}</span>
                                </div>
                                <div className="element">
                                    <label>Nom d'utilisateur :</label>
                                    <input type="text" id="name" placeholder="Votre nom complet" { ...registerInfo("name") }/>
                                </div>
                                <div className="element">
                                    <label>Votre email :</label>
                                    <input type="email" id="email" placeholder="Ex: johndoe@example.com" { ...registerInfo("email") }/>
                                </div>
                                <div className="element">
                                    <label>Votre image de profile :</label>
                                    <input disabled={imageIsDefined} type="url" id="profile_url" placeholder="Utilisez cet champ pour une image déjà en ligne" { ...registerInfo("profile") }/>
                                    <input disabled={urlIsDefined} type="file" id="profile_file" accept="image/jpeg, image/png" onChange={ (e)=>setImage(e.target.files[0]) }/>
                                </div>
                                <div className="element">
                                    <label>Votre numéro téléphone :</label>
                                    <input type="tel" id="telephone" placeholder='Ex: 030 00 000 00' { ...registerInfo("phoneNumber") }/>
                                </div>
                                <div className="element">
                                    <button disabled={!isInfoModified}>Soumettre</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div className="right">
                        <form>
                            <fieldset disabled>
                                <div className="form-title">
                                    <h3>Mot de passe :</h3>
                                    <span className="action-badge" onClick={()=>setTogglePasswordOverlay(true)}>Changer de mot de passe</span>
                                </div>
                                <div className="element">
                                    <label>Votre mot de passe :</label>
                                    <input placeholder='********************************' type="password" />
                                </div>
                            </fieldset>
                        </form>
                        <form>
                            <fieldset>
                                <h3>Zone dangereuse :</h3>
                                <button type='button' onClick={() => toggleInfosOverlay ? setToggleInfosOverlay(false) : setToggleInfosOverlay(true)}>Supprimer mon compte</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
            
            {/* overlay et modal pour le formulaire de suppression de compte */}
            <div onClick={ () => { toggleInfosOverlay ? setToggleInfosOverlay(false) : setToggleInfosOverlay(true); resetInfo(); setUserIsSure(false)} } className={ toggleInfosOverlay ? "infos-overlay active" : "infos-overlay" }>
            </div>
            <form className={ toggleInfosOverlay ? "infos-modal active" : "infos-modal" } onSubmit={handleSubmitDeleteAccount(deleteAccount)}>
                <span className='close-infos-overlay' onClick={()=>{setToggleInfosOverlay(false);setUserIsSure(false)}}>
                    <Image src="/images/close.png" width={50} height={50} alt="close" priority />
                </span>
                <h3>Suppression de compte</h3>
                <div className="message">
                    <p>Attention ! Cette action est irréversible. <br/> <span className="red">Etes-vous sûr de vouloir supprimer votre compte ?</span> Cela entraînera la suppression totale de vos données sur LUMINI School, y compris votre compte, vos inscriptions, etc</p>
                </div>
                { userIsSure && <div className="element">
                    <label>Votre mot de passe :</label>
                    <input type="password" id="" placeholder='Saisissez votre mot de passe' { ...registerDeleteAccount('deleteAccountPassword') } required/>
                </div> }
                <div className="infos-modal-actions">
                    <button type='button' onClick={()=> {setToggleInfosOverlay(false); setUserIsSure(false); resetDeleteAccount({ password: null })}}>Non, annuler</button>
                    <button type={ userIsSure ? "submit" : "button"} onClick={()=>setUserIsSure(true)}>{ userIsSure ? "Soumettre" : "Oui, j'en suis sûr" }</button>
                </div>
            </form>
            
            {/* overlay et modal pour le formulaire de changement de mot de passe */}
            <div onClick={ () => { togglePasswordOverlay ? setTogglePasswordOverlay(false) : setTogglePasswordOverlay(true); resetChangePassword(); setUserIsSure(false)} } className={ togglePasswordOverlay ? "password-overlay active" : "password-overlay" }>
            </div>
            <form className={ togglePasswordOverlay ? "password-modal active" : "password-modal" } onSubmit={handleSubmitChangePassword(changePassword)}>
                <span className='close-password-overlay' onClick={()=>setTogglePasswordOverlay(false)}>
                    <Image src="/images/close.png" width={50} height={50} alt="close" priority />
                </span>
                <h3>Changement de mot de passe :</h3>
                <div className="message">
                    <p>Choisissez un <span className="red">mot de passe fort (combiné de majuscule, miniscule, caractères spéciaux et nombres).</span> <br /> Vous seriez déconnecté quand votre mot de passe sera changé.</p>
                </div>
                <div className="element">
                    <label>Votre mot de passe actuel :</label>
                    <input type="password" id="currentPassword" placeholder='Mot de passe actuel' { ...registerChangePassword('currentChangePassword') } required/>
                </div>
                <div className="element">
                    <label>Votre nouveau mot de passe :</label>
                    <input type="password" id="newChangePassword" placeholder='Nouveau mot de passe' { ...registerChangePassword('newChangePassword') } required/>
                </div>
                <div className="element">
                    <label>Confirmer le nouveau mot de passe :</label>
                    <input type="password" id="confirmNewChangePassword" placeholder='Confirmation nouveau mot de passe' { ...registerChangePassword('confirmNewChangePassword') } required/>
                </div>
                <div className="password-modal-actions">
                    <button type='button' onClick={()=> {setTogglePasswordOverlay(false); resetChangePassword({currentChangePassword: null, newChangePassword: null, confirmNewChangePassword: null});}}>Annuler</button>
                    <button>Soumettre</button>
                </div>
            </form>
        </Dashboard>
    )
}