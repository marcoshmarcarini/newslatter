'use client'
import { useState, useEffect } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { getDownloadURL, ref as storageRef } from "firebase/storage"
import db from "../../../../utils/firebase"
import storage from "../../../../utils/firebase"
import Link from "next/link"
import Image from "next/image"


interface Posts {
    id: string
    slug: string
    titulo: string
    subtitulo: string
    resumo: string
    timeStamp: string
    imagem_destaque: string | null // Agora pode ser null se não tiver a imagem ainda
}

export default function LoadPosts() {
    const [posts, setPosts] = useState<Posts[]>([])

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const postsRaw = await getDocs(collection(db.db, 'Post'))
                const postsData = await Promise.all(
                    postsRaw.docs.map(async (doc) => {
                        const data = doc.data()

                        // Tentando buscar a URL da imagem no storage se estiver no Firestore
                        let imagem_destaque_url = data.imagem_destaque
                        if (imagem_destaque_url) {
                            try {
                                const storagePath = storageRef(storage.storage, imagem_destaque_url)
                                imagem_destaque_url = await getDownloadURL(storagePath)
                            } catch (error) {
                                console.error("Erro ao carregar a imagem:", error)
                            }
                        }

                        return {
                            id: doc.id,
                            slug: data.slug,
                            titulo: data.titulo,
                            subtitulo: data.subtitulo,
                            texto: data.texto,
                            resumo: data.resumo,
                            timeStamp: data.timeStamp,
                            imagem_destaque: imagem_destaque_url,
                        }
                    })
                )
                setPosts(postsData)
            } catch (error) {
                console.error("Erro ao carregar os posts:", error)
            }
        }
        loadPosts()
    }, [])

    return (
        <div>
            <div className={`flex items-center justify-center flex-wrap py-[50px]`}>
                {posts.map((post) => (
                    <div key={post.id}>
                        <Link href={`/blog/${post.slug}`}>
                            {post.imagem_destaque && (
                                <Image
                                    width={300}
                                    height={300}
                                    src={post.imagem_destaque}
                                    alt={`Imagem de destaque de ${post.titulo}`}
                                    priority
                                />
                            )}
                            <p>{post.titulo}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}