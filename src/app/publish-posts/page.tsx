'use client'
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import SetPosts from "@/components/SetPosts/page"
import {
    onAuthStateChanged,
    User,
    signInWithEmailAndPassword
} from "firebase/auth"
import auth from "../../../utils/firebase"
import { useRouter } from "next/navigation"
import AdminNav from "@/components/theme/AdminNav/page"

export default function PublishPost() {
    const [user, setUser] = useState<User | null>(null)
    const [email, setEmail] = useState("")
    const [password, setPassowrd] = useState("")
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() => {
        const usubscribe = onAuthStateChanged(auth.auth, (user) => {
            if (user) {
                setUser(user) // Usuário autenticado
                console.log(user)
            } else {
                // Redireciona para a página de login se o usuário não estiver autenticado
                redirect("/publish-posts")
            }
        })

        return () => usubscribe()
    }, [router])

    const handleLongin = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                setUser(user)
                console.log("Usuaário logado: ", user) // Define o usuário autenticado
                redirect("/publish-posts")
            })
            .catch((error) => {
                setError(error.message)
                console.error("Erro ao fazer login:", error.message)
            })

    }
    if (!user) {
        return (
            <div className={`flex flex-col items-center justify-center gap-5 h-screen`}>
                <h1>Você precisa fazer login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleLongin} className={`flex flex-col items-center justify-center gap-5`}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={`rounded text-center shadow-sm shadow-slate-300 h-[40px]`}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassowrd(e.target.value)}
                        placeholder="Password"
                        className={`rounded text-center shadow-sm shadow-slate-300 h-[40px]`}
                    />
                    <button
                        type="submit"
                        className={`rounded shadow-sm shadow-slate-300 h-[40px] w-[100px] bg-violet-600 text-white hover:bg-violet-800 hover:shadow-sm hover:shadow-violet-800 hover:transition hover:ease-in-out hover:duration-500`}
                    >
                        Login
                    </button>
                </form>
            </div>
        )
    } else {
        return (
            <div className={`flex items-start justify-between gap-5 h-screen overflow-y-hidden`}>
                <AdminNav />
                <SetPosts />
            </div>
        );
    }

    // Conteúdo da página é exibido após o login

}