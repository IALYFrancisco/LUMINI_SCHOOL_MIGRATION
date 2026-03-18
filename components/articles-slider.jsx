import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify"
import Link from "next/link"
import Image from "next/image"

export function ArticlesSlider() {

    const [ articles, setArticles ] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get`, { withCredentials: true })
        .then((response)=>{
            setArticles(response.data.filter(article => article.published === true))
        })
    }, [])

    const swiperRef = useRef()

    return(
        <>
            <div className="prev" onClick={()=> swiperRef.current?.slideNext()}>
                <Image src="/images/chevron-noir.png" alt="flèche" width={30} height={30} priority />
            </div>
            <div className="next" onClick={()=> swiperRef.current?.slidePrev()}>
                <Image src="/images/chevron-noir.png" alt="flèche" width={30} height={30} priority />
            </div>
            { articles.length == 0 && <div className="article-slider-loader">
                <p>Chargement ...</p>
            </div>
            }
            <Swiper
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={3}
                onSwiper={(swiper)=> (swiperRef.current = swiper)}
                modules={[Navigation, Autoplay]}
                breakpoints={{
                    0 : { slidesPerView: 1 },
                    460 : { slidesPerView: 2 },
                    720 : { slidesPerView: 3 },
                    768 : { slidesPerView: 2 },
                    1350 : { slidesPerView: 3 }
                }}
            >
                { articles && articles.map( article => <SwiperSlide key={article._id}>
                    <article className="card">
                        <div className="blog-image">
                            <Image src={ (article.image.startsWith('https') || article.image.startsWith('http')) ? article.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${article.image}` } alt={article.title} width={500} height={500} unoptimized={ process.env.NEXT_PUBLIC_NODE_ENV === "development" } priority />
                        </div>
                        <div className="blog-infos">
                            <h4>{article.title}</h4>
                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.contents) }}></p>
                            <Link href={`/article/${article.slug}`}>
                                <button>Lire plus</button>
                            </Link>
                        </div>
                    </article>
                </SwiperSlide>) }
            </Swiper>
        </>
    )
}