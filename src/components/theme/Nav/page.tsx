import Image from "next/image"
import Link from "next/link"
import styles from './Nav.module.css'


export default function Nav() {

    const rotas = {
        home: '/',
        admin: '/publish-posts',
        blog: '/blog',
    }

    return (
        <div className={`${styles.nav_content} w-full`}>
            <nav className={styles.nav}>
                <div className={styles.nav_brand}>
                    <Link href={rotas.home}>
                        <Image
                            width={100}
                            height={50}
                            src={`/vercel.svg`}
                            alt="logo"
                            className={styles.logo}
                        />
                    </Link>
                </div>
                <ul className={styles.nav_list}>
                    <li>
                        <Link href={rotas.home}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href={rotas.blog}>
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href={rotas.admin}>
                            Admin
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}