'use client'
import { useState, useEffect } from "react"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import db from "../../../../utils/firebase"
import DOMPurify from 'dompurify'
import styles from './Slug.module.css'


interface Post {
    id: string
    slug: string
    titulo: string
    subtitulo: string
    texto: string
    resumo: string
    timeStamp: string
}

export default function Post({ params }: { params: { slug: string, titulo: string } }) {
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const q = query(collection(db.db, 'Post'), where('slug', '==', params.slug))
                const postsRaw = await getDocs(q)

                if (!postsRaw.empty) {
                    const postData = postsRaw.docs[0].data() as Post
                    setPost(postData)
                } else {
                    console.log("Post não encontrado")
                    setPost(null)
                }
            } catch (error) {
                console.error("Erro ao carregar o post: ", error)
            } finally {
                setLoading(false)
            }
        }
        loadPosts()
    }, [params.slug])

    if (loading) {
        return <div>Carregando...</div>
    }

    if (!post) {
        return <div>Post não encontrado</div>
    }

    return (
        <div className={styles.post_content}>
            <h1 className={styles.titulo}>{post.titulo}</h1>
            <h2 className={styles.subtitulo}>{post.subtitulo}</h2>
            <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.texto) }}
                className={styles.texto}
            />
        </div>
    )
}