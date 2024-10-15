'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import { collection, getDocs, doc, deleteDoc, updateDoc, deleteField } from "firebase/firestore"
import db from '../../../../utils/firebase'
import styles from './LoadBanner.module.css'
import { get } from "http"

export default function LoadBanner() {
    const [banners, setBanners] = useState<{ name: string, url: string }[]>([])

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
            setBanners(bannersArray)
        }
        getBanner()

    }, [])

    const handleDelete = async (e: any) => {
        const i = e.target.id
        const index = doc(db.db, 'banners', banners[i].name)
        await deleteDoc(index)
    }

    return (
        <div>
            <div className={styles.banner}>
                {banners && banners.map((banner: any, index: any) => {
                    return (
                        <div key={index} className={styles.bannerItem}>
                            <Image
                                src={banner.url}
                                alt={banner.name}
                                width={200}
                                height={200}
                                className={styles.bannerImg}
                                id={index}
                            />
                            <button
                                className={styles.close}
                                onClick={handleDelete}
                                id={index}
                            >
                                X
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}