'use client'
import Link from 'next/link'
import styles from './AdminNav.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Properties } from 'csstype'

export default function AdminNav() {
    const [comprimento, setComprimento] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0)

    const [corIcone, setCorIcone] = useState('8b5cf6')
    const [globalStyle, setGlobalStyle] = useState<Properties>({
        display: 'block',
    })

    const [arrowStyle, setArrowStyle] = useState<Properties>({
        transform: 'rotate(180deg)',
    })

    const [width, setWitdth] = useState<Properties>({
        width: '200px',
    })

    const [liItemStyle, setliItemStyle] = useState<Properties>({
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '200px',
        height: '40px',
    })

    const [subListStyle, setSubListStyle] = useState<Properties>({
        display: 'none',
    })

    useEffect(() => {
        const handleResize = () => {
            setComprimento(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        // Atualize o estilo ao montar o componente ou ao redimensionar a janela
        if (comprimento >= 991) {
            setArrowStyle({
                transform: 'rotate(180deg)'
            })
            setGlobalStyle({
                display: 'block'
            })
            setWitdth({
                width: '200px'
            })
            setliItemStyle({
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '200px',
            })
        } else {
            setArrowStyle({
                transform: 'rotate(0deg)',
            })
            setGlobalStyle({
                display: 'none'
            })
            setWitdth({
                width: '50px'
            })
            setliItemStyle({
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
            })
        }

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [comprimento]) // Dependência para que o efeito execute quando `comprimento` mudar

    const handleArrowStyle = () => {
        if (arrowStyle.transform === 'rotate(0deg)') {
            setArrowStyle({
                transform: 'rotate(180deg)'
            })
            setGlobalStyle({
                display: 'block'
            })
            setWitdth({
                width: '200px'
            })
            setliItemStyle({
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '200px',
            })

        } else {
            setArrowStyle({
                transform: 'rotate(0deg)',
            })
            setGlobalStyle({
                display: 'none'
            })
            setWitdth({
                width: '50px'
            })
            setliItemStyle({
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
            })
        }
    }

    const handleSubListStyle = () => {
        if (subListStyle.display === 'none') {
            setSubListStyle({
                display: 'block'
            })
            setliItemStyle({
                height: 'max-content',
                transition: '400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            })
        } else {
            setSubListStyle({
                display: 'none'
            })
            setliItemStyle({
                height: '40px',
                alignItems: 'flex-start',
                justifyContent: 'center',
                transition: '400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            })
        }
    }

    return (
        <div
            className={`${styles.AdminNav_content} bg-violet-700`}
            style={width}
        >
            <nav
                className={`${styles.AdminNav_nav} `}
                style={width}
            >
                <ul
                    className={`${styles.AdminNav_list} `}
                    style={width}
                >
                    <li
                        className={`${styles.AdminNav_item} bg-violet-900 hover:bg-violet-400 transition`}
                        onMouseOver={() => setCorIcone('5b21b6')}
                        onMouseOut={() => setCorIcone('8b5cf6')}
                        style={liItemStyle}
                    >
                        <button
                            className={`${styles.AdminNav_link}`}
                            onClick={handleSubListStyle}
                        >
                            <Image
                                src={`https://img.icons8.com/ios-filled/50/${corIcone}/news.png`}
                                width={20}
                                height={20}
                                alt='post'
                                className={`${styles.AdminNav_icon}`}
                            />
                            <p
                                style={globalStyle}
                            >
                                Publicar Posts
                            </p>
                        </button>
                        <ul
                            className={`${styles.AdminNav_sublist}`}
                            style={subListStyle}
                        >
                            <li>
                                <Link
                                    href={'/publish-posts/posts-publicados'}
                                    className={`flex gap-1 items-center`}
                                >
                                    <Image
                                        src={`https://img.icons8.com/ios-glyphs/30/sort-right.png`}
                                        width={10}
                                        height={10}
                                        alt='arrow-right'
                                        style={globalStyle}
                                    />
                                    <p style={globalStyle}>Todos os posts</p>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={'/publish-posts/'}
                                    className={`flex gap-1 items-center`}
                                >
                                    <Image
                                        src={`https://img.icons8.com/ios-glyphs/30/sort-right.png`}
                                        width={10}
                                        height={10}
                                        alt='arrow-right'
                                        style={globalStyle}
                                    />
                                    <p style={globalStyle}>Publicar Posts</p>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        className={`${styles.AdminNav_item} bg-violet-900 hover:bg-violet-400 transition`}
                        onMouseOver={() => setCorIcone('5b21b6')}
                        onMouseOut={() => setCorIcone('8b5cf6')}
                        style={liItemStyle}
                    >
                        <Link
                            href={'/publish-posts/banner'}
                            className={`${styles.AdminNav_link}`}
                        >
                            <Image
                                src={`https://img.icons8.com/material-rounded/24/${corIcone}/gallery.png`}
                                width={20}
                                height={20}
                                alt='bannerPrinmcipal'
                                className={`${styles.AdminNav_icon}`}
                            />
                            <p style={globalStyle}>Publicar Banner</p>
                        </Link>
                    </li>
                </ul>
                <Image
                    src={`https://img.icons8.com/ios-glyphs/30/4c1d95/sort-right.png`}
                    width={30}
                    height={30}
                    alt='arrow-right'
                    className={`${styles.AdminNav_recolherMenu}`}
                    style={arrowStyle}
                    onClick={handleArrowStyle}
                />
            </nav>

        </div >
    )
}