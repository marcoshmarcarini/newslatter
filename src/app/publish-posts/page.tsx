'use client'
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import SetPosts from "@/components/SetPosts/page";
import {
    signInWithPopup,
    GithubAuthProvider,
    onAuthStateChanged,
    User,
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";
import auth  from "../../../utils/firebase";
import { useRouter } from "next/navigation";

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
            <div>
                <h1>Você precisa fazer login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleLongin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassowrd(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Publicar Posts</h1>
                <SetPosts />
            </div>
        );
    }

    // Conteúdo da página é exibido após o login

}