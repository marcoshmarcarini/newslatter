'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { collection, getDocs } from "firebase/firestore"
import db from "../../../../utils/firebase"
import "swiper/css"
import styles from './LoadPosts.module.css'


interface Banner {
    name: string
    url: string
}


export default function LoadBanner() {
    const [banner, setBanner] = useState<Banner[]>([])

    useEffect(() => {
        const getBanner = async () => {
            const querySnapshot = await getDocs(collection(db.db, 'banners'))
            const bannersArray: { name: string, url: string }[] = []
            querySnapshot.forEach((doc) => {
                bannersArray.push({
                    name: doc.data().name,
                    url: doc.data().url
                })
            })
            setBanner(bannersArray)
        }
        getBanner()
    }, [])

    return (
        <Swiper className={styles.banner_home}>
            {banner && banner.map((banner: any, index: any) => {
                return (
                    <SwiperSlide key={index}>
                        <Image
                            src={banner.url}
                            alt={banner.name}
                            width={1920}
                            height={696}
                            className={styles.slideImage}
                            priority
                        />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}