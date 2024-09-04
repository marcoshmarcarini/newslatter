'use client'
import { FormEvent, useEffect, useState } from "react"
import db from "../../../utils/firebase"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import styles from "./SetPosts.module.css"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { ClassicEditor, Bold, Essentials, Heading, Indent, IndentBlock, Italic, Link, List, MediaEmbed, Paragraph, Table, Undo } from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'

export default function SetPosts() {
    const [posts, setPosts] = useState({
        slug: '', titulo: '', subtitulo: '',
        resumo: '', texto: '', timestamp: ''
    })


    useEffect(() => {
        savePosts
    }, [posts])

    const savePosts = async (e: any) => {
        e.preventDefault()
        const docRef = await addDoc(collection(db, "Post"), {
            slug: posts.slug, titulo: posts.titulo, subtitulo: posts.subtitulo,
            resumo: posts.resumo, texto: posts.texto, timeStamp: new Date().getTime()
        })

        console.log("Post publicado com o ID: ", docRef.id)

        setPosts({ ...posts, slug: '', titulo: '', subtitulo: '', resumo: '', texto: '' })
    }

    return (
        <div>
            <h1>Set Posts</h1>
            <form className={styles.formulario}>
                <div className={styles.input_content_form}>
                    <label htmlFor="">Slug</label>
                    <input
                        type="text"
                        onChange={(e) => setPosts({ ...posts, slug: e.target.value })}
                        className={`${styles.inputForm}`}
                        placeholder="Slug"
                    />
                </div>
                <div className={styles.input_content_form}>
                    <label htmlFor="">Título</label>
                    <input
                        type="text"
                        onChange={(e) => setPosts({ ...posts, titulo: e.target.value })}
                        className={`${styles.inputForm}`}
                        placeholder="Titulo"
                    />
                </div>
                <div className={styles.input_content_form}>
                    <label htmlFor="">Subtítulo</label>
                    <input
                        type="text"
                        onChange={(e) => setPosts({ ...posts, subtitulo: e.target.value })}
                        className={`${styles.inputForm}`}
                        placeholder="Subtitulo"
                    />
                </div>
                <div className={styles.input_content_form}>
                    <label htmlFor="">Resumo</label>
                    <input
                        type="text"
                        onChange={(e) => setPosts({ ...posts, resumo: e.target.value })}
                        className={`${styles.inputForm}`}
                        placeholder="Resumo"
                    />
                </div>
                <div className={styles.input_content_form}>
                    <label htmlFor="text">Texto</label>
                    {/* <textarea
                        name="text"
                        id=""
                        onChange={(e) => setPosts({ ...posts, texto: e.target.value })}
                        className={`${styles.inputForm}`}
                        placeholder="Texto"
                    /> */}
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            toolbar: [
                                'undo', 'redo', '|',
                                'heading', '|', 'bold', 'italic', '|',
                                'link', 'insertTable', 'mediaEmbed', '|',
                                'bulletedList', 'numberedList', 'indent', 'outdent'
                            ],
                            plugins: [
                                Bold,
                                Essentials,
                                Heading,
                                Indent,
                                IndentBlock,
                                Italic,
                                Link,
                                List,
                                MediaEmbed,
                                Paragraph,
                                Table,
                                Undo
                            ],
                            initialData: '<h1>Escreva o conteúdo do Post aqui!</h1>',
                        }}
                        onChange={(e: any) => setPosts({ ...posts, texto: e })}
                    />
                </div>
                <input
                    type="submit"
                    value="Publicar"
                    onClick={savePosts}
                />
            </form>
        </div>
    )
}