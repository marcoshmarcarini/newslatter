'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"
import db from "../../../../utils/firebase"
import styles from './ListPosts.module.css'
import { useRouter } from "next/navigation"

export default function ListPosts() {
    const [list, setList] = useState([])
    const [deleteBtn, setDeleteBtn] = useState('8b5cf6')
    const router = useRouter()

    useEffect(() => {
        const getPosts = async () => {
            const querySnapshot = await getDocs(collection(db.db, 'Post'))
            const postsArray: any = []
            querySnapshot.forEach((doc) => {
                postsArray.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setList(postsArray)
        }
        getPosts()
    }, [])

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(db.db, 'Post', id))
        router.refresh()
    }

    return (
        <div>
            <div>
                <p className={`${styles.title}`}>Posts Publicados</p>
            </div>
            <table className={`table`}>
                <tbody>
                    {list && list.map((post: any) => (
                        <tr key={post.id} className={`${styles.postList}`}>
                            <td scope="row" className={`${styles.listTd}`}>
                                <p className={`${styles.postTitle}`}>{post.titulo}</p>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    onMouseOver={() => setDeleteBtn('5b21b6')}
                                    onMouseOut={() => setDeleteBtn('8b5cf6')}
                                    style={{ animation: '400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                                >
                                    <Image
                                        src={`https://img.icons8.com/android/24/${deleteBtn}/trash.png`}
                                        width={20}
                                        height={20}
                                        alt="Delete"
                                        style={{ animation: '400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}