'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Lock, Mail, Shield, User, Phone, Building } from 'lucide-react'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Limpa erro do campo quando usuário começa a digitar
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório'
        } else if (formData.nome.trim().length < 2) {
            newErrors.nome = 'Nome deve ter pelo menos 2 caracteres'
        }

        if (!formData.email) {
            newErrors.email = 'Email é obrigatório'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido'
        }

        if (!formData.telefone) {
            newErrors.telefone = 'Telefone é obrigatório'
        } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.telefone)) {
            newErrors.telefone = 'Telefone inválido'
        }

        if (!formData.empresa.trim()) {
            newErrors.empresa = 'Empresa é obrigatória'
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória'
        } else if (formData.password.length < 8) {
            newErrors.password = 'Senha deve ter pelo menos 8 caracteres'
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Senha deve conter letra maiúscula, minúscula e número'
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirmação de senha é obrigatória'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Senhas não coincidem'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsLoading(true)

        try {
            // Simula registro (será implementado com API real)
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Redireciona para login com mensagem de sucesso
            router.push('/login?registered=true')
        } catch (error) {
            setErrors({ general: 'Erro ao criar conta. Tente novamente.' })
        } finally {
            setIsLoading(false)
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
                        Crie sua conta para acessar o sistema
                    </p>
                </div>

                {/* Card de Registro */}
                <Card className="shadow-xl border-0">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl font-semibold text-gray-900">
                            Criar Conta
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Preencha os dados para se registrar
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Campo Nome */}
                            <div className="space-y-2">
                                <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                                    Nome Completo
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="nome"
                                        type="text"
                                        placeholder="Seu nome completo"
                                        value={formData.nome}
                                        onChange={(e) => handleInputChange('nome', e.target.value)}
                                        className={`pl-10 ${errors.nome ? 'border-red-500' : ''}`}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.nome && (
                                    <p className="text-sm text-red-600">{errors.nome}</p>
                                )}
                            </div>

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
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Campo Telefone */}
                            <div className="space-y-2">
                                <label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                                    Telefone
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="telefone"
                                        type="tel"
                                        placeholder="+55 (11) 99999-9999"
                                        value={formData.telefone}
                                        onChange={(e) => handleInputChange('telefone', e.target.value)}
                                        className={`pl-10 ${errors.telefone ? 'border-red-500' : ''}`}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.telefone && (
                                    <p className="text-sm text-red-600">{errors.telefone}</p>
                                )}
                            </div>

                            {/* Campo Empresa */}
                            <div className="space-y-2">
                                <label htmlFor="empresa" className="text-sm font-medium text-gray-700">
                                    Empresa
                                </label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="empresa"
                                        type="text"
                                        placeholder="Nome da sua empresa"
                                        value={formData.empresa}
                                        onChange={(e) => handleInputChange('empresa', e.target.value)}
                                        className={`pl-10 ${errors.empresa ? 'border-red-500' : ''}`}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.empresa && (
                                    <p className="text-sm text-red-600">{errors.empresa}</p>
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
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
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

                            {/* Campo Confirmar Senha */}
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                    Confirmar Senha
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirme sua senha"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        disabled={isLoading}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Erro Geral */}
                            {errors.general && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-sm text-red-600">{errors.general}</p>
                                </div>
                            )}

                            {/* Botão de Registro */}
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Criando conta...</span>
                                    </div>
                                ) : (
                                    'Criar Conta'
                                )}
                            </Button>
                        </form>

                        {/* Links de Ajuda */}
                        <div className="mt-6 text-center">
                            <div className="text-sm text-gray-600">
                                Já tem uma conta?{' '}
                                <Link
                                    href="/login"
                                    className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                                >
                                    Faça login
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
