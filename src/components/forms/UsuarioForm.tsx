'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Mail, Lock, Shield, Building, AlertCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

const usuarioSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos').max(14, 'CPF deve ter no máximo 14 caracteres'),
  role: z.enum(['admin', 'gerente', 'usuario', 'guarda']).default('usuario'),
  condominio_id: z.string().min(1, 'Condomínio é obrigatório'),
  ativo: z.boolean().default(true),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional(),
  confirmar_senha: z.string().optional()
}).refine((data) => {
  if (data.senha && data.senha !== data.confirmar_senha) {
    return false
  }
  return true
}, {
  message: "Senhas não coincidem",
  path: ["confirmar_senha"]
})

type UsuarioFormData = z.infer<typeof usuarioSchema>

interface UsuarioFormProps {
  usuario?: any | null
  onSubmit: (data: UsuarioFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export function UsuarioForm({ usuario, onSubmit, onCancel, isLoading = false }: UsuarioFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nome: usuario?.nome || '',
      email: usuario?.email || '',
      telefone: usuario?.telefone || '',
      cpf: usuario?.cpf || '',
      role: usuario?.role || 'usuario',
      condominio_id: usuario?.condominio_id || '',
      ativo: usuario?.ativo ?? true,
      senha: '',
      confirmar_senha: ''
    }
  })

  const watchedData = watch()

  const handleFormSubmit = async (data: UsuarioFormData) => {
    setIsSubmitting(true)
    try {
      // Remove confirmar_senha antes de enviar
      const { confirmar_senha, ...dataToSubmit } = data
      await onSubmit(dataToSubmit)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRoleLabel = (role: string) => {
    const labels = {
      admin: 'Administrador',
      gerente: 'Gerente',
      usuario: 'Usuário',
      guarda: 'Guarda'
    }
    return labels[role as keyof typeof labels] || role
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4" />
            Nome Completo *
          </label>
          <Input
            placeholder="Digite o nome completo..."
            {...register('nome')}
            error={errors.nome?.message}
          />
          {errors.nome && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.nome.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </label>
          <Input
            type="email"
            placeholder="usuario@exemplo.com"
            {...register('email')}
            error={errors.email?.message}
          />
          {errors.email && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Telefone *
          </label>
          <Input
            placeholder="(11) 99999-9999"
            {...register('telefone')}
            error={errors.telefone?.message}
          />
          {errors.telefone && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.telefone.message}
            </p>
          )}
        </div>

        {/* CPF */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            CPF *
          </label>
          <Input
            placeholder="000.000.000-00"
            {...register('cpf')}
            error={errors.cpf?.message}
          />
          {errors.cpf && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.cpf.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Função *
          </label>
          <Select
            value={watchedData.role}
            onValueChange={(value) => setValue('role', value as 'admin' | 'gerente' | 'usuario' | 'guarda')}
          >
            <option value="usuario">Usuário</option>
            <option value="guarda">Guarda</option>
            <option value="gerente">Gerente</option>
            <option value="admin">Administrador</option>
          </Select>
        </div>

        {/* Condomínio */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Building className="w-4 h-4" />
            Condomínio *
          </label>
          <Select
            value={watchedData.condominio_id}
            onValueChange={(value) => setValue('condominio_id', value)}
            error={errors.condominio_id?.message}
          >
            <option value="">Selecione um condomínio</option>
            <option value="1">Residencial Solar</option>
            <option value="2">Condomínio Verde</option>
            <option value="3">Edifício Central</option>
          </Select>
          {errors.condominio_id && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.condominio_id.message}
            </p>
          )}
        </div>

        {/* Status Ativo */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Status
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="ativo"
              checked={watchedData.ativo}
              onChange={(e) => setValue('ativo', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="ativo" className="text-sm text-gray-700">
              Usuário ativo
            </label>
          </div>
        </div>
      </div>

      {/* Senha (apenas para novos usuários) */}
      {!usuario && (
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium text-gray-900">Definir Senha</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha *
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                {...register('senha')}
                error={errors.senha?.message}
              />
              {errors.senha && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.senha.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirmar Senha *
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirme a senha"
                {...register('confirmar_senha')}
                error={errors.confirmar_senha?.message}
              />
              {errors.confirmar_senha && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmar_senha.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="showPassword" className="text-sm text-gray-700">
              Mostrar senha
            </label>
          </div>
        </div>
      )}

      {/* Botões */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting || isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting || isLoading}
          loading={isSubmitting}
        >
          {usuario ? 'Atualizar Usuário' : 'Criar Usuário'}
        </Button>
      </div>
    </form>
  )
}
