'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})

    const { login, isLoading } = useAuth()
    const router = useRouter()

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {}

        if (!email) {
            newErrors.email = 'Email é obrigatório'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email inválido'
        }

        if (!password) {
            newErrors.password = 'Senha é obrigatória'
        } else if (password.length < 6) {
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        const result = await login(email, password)

        if (result.success) {
            router.push('/dashboard')
        } else {
            setErrors({ general: result.error || 'Erro no login' })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo e Título */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Sistema de Segurança
                    </h1>
                    <p className="text-gray-600">
                        Faça login para acessar o sistema
                    </p>
                </div>

                {/* Card de Login */}
                <Card className="shadow-xl border-0">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl font-semibold text-gray-900">
                            Entrar
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Use suas credenciais para acessar o sistema
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Campo Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Campo Senha */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Senha
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Erro Geral */}
                            {errors.general && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-sm text-red-600">{errors.general}</p>
                                </div>
                            )}

                            {/* Botão de Login */}
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Entrando...</span>
                                    </div>
                                ) : (
                                    'Entrar'
                                )}
                            </Button>
                        </form>

                        {/* Links de Ajuda */}
                        <div className="mt-6 text-center space-y-2">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                Esqueceu sua senha?
                            </Link>
                            <div className="text-sm text-gray-600">
                                Não tem uma conta?{' '}
                                <Link
                                    href="/register"
                                    className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                                >
                                    Registre-se
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Informações Adicionais */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        Sistema de Gestão de Segurança e Relatórios
                    </p>
                    <p className="text-xs text-gray-500">
                        Versão 1.0.0 - Desenvolvido com Next.js e TypeScript
                    </p>
                </div>
            </div>
        </div>
    )
}
