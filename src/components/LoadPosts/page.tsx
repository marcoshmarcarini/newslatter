'use client'

import { useState, useEffect } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import db from "../../../utils/firebase"



interface Posts {
    id: string
    slug: string
    titulo: string
    subtitulo: string
    texto: string
    resumo: string
    timeStamp: string
}

export default function LoadPosts() {
    const [posts, setPosts] = useState<Posts[]>([]);

    console.log(db)
    useEffect(() => {
        const loadPosts = async () => {
            const postsRaw = await getDocs(collection(db, 'Post'))
            const postsData = postsRaw.docs.map((doc) => ({
                id: doc.id,
                slug: doc.data().slug,
                titulo: doc.data().titulo,
                subtitulo: doc.data().subtitulo,
                texto: doc.data().texto,
                resumo: doc.data().resumo,
                timeStamp: doc.data().timeStamp,
            }))
            setPosts(postsData)

        }
        loadPosts()
    }, [])
    console.log(posts)
    return (
        <div>
            <h1>Load Posts</h1>
            <div>
                {posts && posts.map((post: any, id: any) => (

                    <div key={id}>
                        <h2>{post.titulo}</h2>
                        <div>{post.texto}</div>
                    </div>
                ))}
            </div>
        </div>

    )
}