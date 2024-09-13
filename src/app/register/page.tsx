'use client'
import { FormEvent, useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import auth  from '../../../utils/firebase'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const [error, setError] = useState(null)

    const handleRegister = (e: FormEvent) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("Usuário Criado: ", user)
            })
            .catch((error) => {
                setError(error.message)
                console.error("Erro ao criar usuário: ", error.message)
            })
    }

    return (
        <div className={`flex flex-col items-center justify-center h-screen`}>
            <h1 className={`text-2xl text-center py-5`}>Registrar</h1>
            <form onSubmit={handleRegister} className={`flex flex-col items-center justify-center gap-5`}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={`rounded text-center`}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassowrd(e.target.value)}
                    placeholder="Password"
                    className={`rounded text-center`}
                />
                <button type="submit" className={`bg-slate-600 text-white py-2 px-4 border border-transperent hover:cursos-pointer hover:border-slate-600 hover:bg-transparent hover:text-slate-600 hover:transition`}>
                    Registrar
                </button>
            </form>
            {error && <p className={`text-red-500 text-xl py-5 transition-all animate-pulse`}>{error}</p>}
        </div>
    )
}