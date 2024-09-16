'use client'

import { FormEvent, useEffect, useState } from "react"
import db from "../../../utils/firebase"
import storage from "../../../utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, doc, documentId, setDoc } from "firebase/firestore"
import styles from "./SetPosts.module.css"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import {
    ClassicEditor,
    Autoformat,
    Bold,
    Italic,
    Underline,
    BlockQuote,
    Base64UploadAdapter,
    CloudServices,
    CKBox,
    Essentials,
    Heading,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    PictureEditing,
    Indent,
    IndentBlock,
    Link,
    List,
    MediaEmbed,
    Mention,
    Paragraph,
    PasteFromOffice,
    Table,
    TableColumnResize,
    TableToolbar,
    TextTransformation,
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import MyCustomUploadAdapterPlugin from "../UploadAdapter/page"

export default function SetPosts() {
    const [posts, setPosts] = useState({
        slug: '', titulo: '', subtitulo: '',
        resumo: '', texto: null, timestamp: '',
        imagem_destaque: null,
    })

    const [day, setDay] = useState(new Date().getDay())
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [dayMonth, setDayMonth] = useState(`${day}/${month}/${year}`)
    const [hour, setHour] = useState('')
    const [hora, setHora] = useState(new Date().getHours())
    const [minuto, setMinuto] = useState(new Date().getMinutes())
    const [img, setImg] = useState('')


    const [slug, setSlug] = useState('')

    useEffect(() => {
        savePosts
    }, [posts])

    useEffect(() => {
        const handleHour = () => { 
            setInterval(() =>{
                setHora(new Date().getHours())
                setMinuto(new Date().getMinutes())
                setHour(`${hora < 10 ? `0${hora}` : hora}:${minuto < 10 ? `0${minuto}` : minuto}`)
                setDay(new Date().getDay())
                setMonth(new Date().getMonth())
                setYear(new Date().getFullYear())
                setDayMonth(`${day}/${month}/${year}`)
            } , 1000)
        }
        handleHour()

    }, [hour, hora, minuto])

    const handleFileChange = (e: any) => {
        const file = e.target.files[0]
        setPosts({ ...posts, imagem_destaque: file })
        setImg(URL.createObjectURL(file))
    }

    const savePosts = async (e: any) => {
        e.preventDefault()

        // Upload do post sem imagem inicialmente
        const postsCollection = collection(db.db, "Post")
        const docSnap = await addDoc(postsCollection, {
            slug: posts.titulo.replaceAll(" ", "-").toLowerCase(),
            titulo: posts.titulo,
            subtitulo: posts.subtitulo,
            resumo: posts.resumo,
            texto: posts.texto,
            timeStamp: new Date().getTime(),
        })

        // Se houver imagem, faz o upload e salva a URL
        if (posts.imagem_destaque) {
            const imageRef = ref(storage.storage, `images/${docSnap.id}`)
            await uploadBytes(imageRef, posts.imagem_destaque)

            const imageUrl = await getDownloadURL(imageRef)

            // Atualizar o post com a URL da imagem
            await setDoc(doc(db.db, "Post", docSnap.id), {
                imagem_destaque: imageUrl
            }, { merge: true })
        }

        console.log("Post publicado com o ID: ", docSnap.id)

        setPosts({
            ...posts,
            slug: '', titulo: '',
            subtitulo: '', resumo: '', texto: null,
            imagem_destaque: null
        })
    }

    return (
        <div className={styles.set_Posts_content}>
            <form className={styles.formulario}>
                <div className={styles.input_content_form}>
                    <label htmlFor="">Título</label>
                    <input
                        type="text"
                        onChange={(e:any) => setPosts({ ...posts, titulo: e.target.value })}
                        className={`${styles.inputForm}`}
                        placeholder="Titulo"
                        onInput={(e:any) => setSlug(`/${e.target.value.replaceAll(" ", "-").toLowerCase()}/`)}
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
                    <label htmlFor="">Imagem de Destaque</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className={`${styles.inputForm}`}
                        placeholder="Imagem Destaque"
                        
                        
                    />
                </div>
                <div className={styles.input_content_form}>
                    <label htmlFor="text">Texto</label>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            toolbar: [
                                'undo',
                                'redo',
                                '|',
                                'heading',
                                '|',
                                'bold',
                                'italic',
                                'underline',
                                '|',
                                'link',
                                'uploadImage',
                                'ckbox',
                                'insertTable',
                                'blockQuote',
                                'mediaEmbed',
                                '|',
                                'bulletedList',
                                'numberedList',
                                '|',
                                'outdent',
                                'indent',
                            ],
                            plugins: [
                                Autoformat,
                                BlockQuote,
                                Bold,
                                CloudServices,
                                Essentials,
                                Heading,
                                Image,
                                ImageCaption,
                                ImageResize,
                                ImageStyle,
                                ImageToolbar,
                                ImageUpload,
                                Base64UploadAdapter,
                                Indent,
                                IndentBlock,
                                Italic,
                                Link,
                                List,
                                MediaEmbed,
                                Mention,
                                Paragraph,
                                PasteFromOffice,
                                PictureEditing,
                                Table,
                                TableColumnResize,
                                TableToolbar,
                                TextTransformation,
                                Underline,
                            ],
                            initialData: '<h1>Escreva o conteúdo do Post aqui!</h1>',
                            heading: {
                                options: [
                                    {
                                        model: 'paragraph',
                                        title: 'Paragraph',
                                        class: 'ck-heading_paragraph',
                                    },
                                    {
                                        model: 'heading1',
                                        view: 'h1',
                                        title: 'Heading 1',
                                        class: 'ck-heading_heading1',
                                    },
                                    {
                                        model: 'heading2',
                                        view: 'h2',
                                        title: 'Heading 2',
                                        class: 'ck-heading_heading2',
                                    },
                                    {
                                        model: 'heading3',
                                        view: 'h3',
                                        title: 'Heading 3',
                                        class: 'ck-heading_heading3',
                                    },
                                    {
                                        model: 'heading4',
                                        view: 'h4',
                                        title: 'Heading 4',
                                        class: 'ck-heading_heading4',
                                    },
                                ],
                            },
                            image: {
                                resizeOptions: [
                                    {
                                        name: 'resizeImage:original',
                                        label: 'Default image width',
                                        value: null,
                                    },
                                    {
                                        name: 'resizeImage:50',
                                        label: '50% page width',
                                        value: '50',
                                    },
                                    {
                                        name: 'resizeImage:75',
                                        label: '75% page width',
                                        value: '75',
                                    },
                                ],
                                toolbar: [
                                    'imageTextAlternative',
                                    'toggleImageCaption',
                                    '|',
                                    'imageStyle:inline',
                                    'imageStyle:wrapText',
                                    'imageStyle:breakText',
                                    '|',
                                    'resizeImage',
                                ],
                            },
                            link: {
                                addTargetToExternalLinks: true,
                                defaultProtocol: 'https://',
                            },
                            table: {
                                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                            },
                        }}
                        onChange={(event: any, editor: any) => {
                            const data = editor.getData()
                            setPosts({ ...posts, texto: data })
                        }}
                    />
                </div>

            </form>
            <div className={`${styles.btn_form_content} bg-slate-300 h-screen fixed right-0 top-0 bottom-0`}>
                <p className={`text-sm`}>Clique no botão para publicar</p>
                <p className={`text-xs`}>Post publicado {dayMonth} às {hour}</p>
                <p className={`text-[0.7rem] font-bold`}>{`Slug: ${slug}`}</p>
                <div>
                    {img && <img src={img} alt="" className={styles.img_thumb}/>}
                </div>
                <div className={styles.input_content_form} style={{height: '150px'}}>
                    <label htmlFor="">Resumo</label>
                    <textarea
                        onChange={(e) => setPosts({ ...posts, resumo: e.target.value })}
                        className={`${styles.inputForm}`}
                        placeholder="Resumo"
                        id="resumo"
                        style={{ height: '150px' }}
                    />
                </div>
                <input
                    type="submit"
                    value="Publicar"
                    onClick={savePosts}
                    className={`${styles.buttonForm} bg-blue-600 text-white py-2 px-4 rounded hover:text-blue-600 hover:bg-white hover:border hover:border-blue-600`}
                />
            </div>
        </div>
    )
}