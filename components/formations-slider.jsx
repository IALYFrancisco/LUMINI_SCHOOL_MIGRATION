/* eslint-disable react/no-unescaped-entities */
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import Link from "next/link";
import Image from "next/image"

export function FormationsSlider() {
    const swiperRef = useRef()

    var [ formations, setFormations ] = useState([])
    var [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formation/get`, { withCredentials: true })
            .then((response)=>setFormations(response.data.filter( f => f.published === true )))
            .catch(()=>setFormations([]))
            .finally(()=>setLoading(false))
    }, [])

    if(loading) return <p>Chargement ...</p>
    if(formations) return(
        <>
            <div className="prev" onClick={()=> swiperRef.current?.slideNext()}>
                <Image src="/images/chevron.png" alt="flèche" width={30} height={30} priority/>
            </div>
            <div className="next" onClick={()=> swiperRef.current?.slidePrev()}>
                <Image src="/images/chevron.png" alt="flèche" width={30} height={30} priority/>
            </div>
            <Swiper
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={5}
                onSwiper={(swiper)=> (swiperRef.current = swiper)}
                modules={[Navigation, Autoplay]}
                breakpoints={{
                    0 : { slidesPerView: 1 },
                    460 : { slidesPerView: 2 },
                    644 : { slidesPerView: 3 },
                    1024 : { slidesPerView: 4 },
                    1320 : { slidesPerView: 5 }
                }}

            >
            { formations && <>
                { formations.map( formation => (
                    <SwiperSlide key={formation._id}>
                        <div className="card" key={formation._id}>
                            <div className="formation-image">
                                <Image src={ (formation.image.startsWith('https') || formation.image.startsWith('http')) ? formation.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${formation.image}` } alt={formation.title} width={500} height={500} unoptimized={ process.env.NEXT_PUBLIC_NODE_ENV === "development" } priority/>
                            </div>
                            <div className="formation-infos">
                                <h4>{formation.title}</h4>
                                <p>{formation.description}</p>
                                <Link href={`/registrations/formation/${formation._id}`}>
                                    <button>S'inscrire</button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </>}
            </Swiper>
        </>
    )
}