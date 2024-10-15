'use client'
import Image from 'next/image'
import { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import db from '../../../utils/firebase'
import styles from './SetBanner.module.css'
import LoadBanner from './LoadBanner/page'


export default function SetBanner() {
    const [galeria, setGaleria] = useState({
        banners: null,
    })
    const [img, setImg] = useState('')
    const [file, setFile] = useState<File | null>(null)

    const handleGaleria = async (e: any) => {
        const file = e.target.files[0]
        if (file) {
            setGaleria({ ...galeria, banners: file })
            setImg(URL.createObjectURL(file))
            setFile(file)
        }

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!file) return

        const storage = getStorage()
        const storageRef = ref(storage, `banners/${file.name}`)
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log(`Banner publicado com o ID: ${snapshot.metadata.name}`)
        })

        const downloadURL = await getDownloadURL(storageRef)

        await setDoc(doc(db.db, 'banners', file.name), {
            name: file.name,
            url: downloadURL,
        })

        setGaleria({ banners: null })
        setImg('')

    }

    return (
        <div className={`py-[50px] flex flex-col gap-5`}>
            <form
                onSubmit={handleSubmit}
                className={`flex flex-col gap-5`}
            >
                <div>
                    <label
                        htmlFor="galeria_banners"
                        className={styles.labelImagem}
                    >
                        Imagem
                    </label>
                    <input
                        type="file"
                        name="Banners"
                        placeholder='Imagem'
                        className={`${styles.inputForm}`}
                        onChange={handleGaleria}
                        id={`galeria_banners`}
                    />
                </div>
                {img && <Image src={img} alt="Imagem" width={640} height={360} />}
                <div>
                    <input
                        type="submit"
                        value="Publicar"
                        className={`bg-violet-800 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-violet-700`}
                    />
                </div>
            </form>

            <LoadBanner />
        </div>
    )
}