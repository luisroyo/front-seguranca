'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertTriangle, Calendar, MapPin, User, Building, AlertCircle, FileText, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Ocorrencia } from '@/types/api'

const ocorrenciaSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório').max(100, 'Título deve ter no máximo 100 caracteres'),
  descricao: z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição deve ter no máximo 500 caracteres'),
  tipo: z.enum(['seguranca', 'manutencao', 'limpeza', 'ruido', 'outros']).default('seguranca'),
  prioridade: z.enum(['baixa', 'media', 'alta', 'critica']).default('media'),
  status: z.enum(['aberta', 'em_analise', 'em_andamento', 'resolvida', 'fechada']).default('aberta'),
  condominio_id: z.string().min(1, 'Condomínio é obrigatório'),
  local: z.string().min(1, 'Local é obrigatório'),
  reportado_por: z.string().min(1, 'Reportado por é obrigatório'),
  data_ocorrencia: z.string().min(1, 'Data da ocorrência é obrigatória'),
  hora_ocorrencia: z.string().min(1, 'Hora da ocorrência é obrigatória'),
  responsavel_id: z.string().optional(),
  observacoes: z.string().optional(),
  evidencia_url: z.string().optional()
})

type OcorrenciaFormData = z.infer<typeof ocorrenciaSchema>

interface OcorrenciaFormProps {
  ocorrencia?: Ocorrencia | null
  onSubmit: (data: OcorrenciaFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export function OcorrenciaForm({ ocorrencia, onSubmit, onCancel, isLoading = false }: OcorrenciaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm<OcorrenciaFormData>({
    resolver: zodResolver(ocorrenciaSchema),
    defaultValues: {
      titulo: ocorrencia?.titulo || '',
      descricao: ocorrencia?.descricao || '',
      tipo: ocorrencia?.tipo || 'seguranca',
      prioridade: ocorrencia?.prioridade || 'media',
      status: ocorrencia?.status || 'aberta',
      condominio_id: ocorrencia?.condominio.id || '',
      local: ocorrencia?.local || '',
      reportado_por: ocorrencia?.reportado_por || '',
      data_ocorrencia: ocorrencia?.data_ocorrencia ? new Date(ocorrencia.data_ocorrencia).toISOString().split('T')[0] : '',
      hora_ocorrencia: ocorrencia?.hora_ocorrencia || '',
      responsavel_id: ocorrencia?.responsavel?.id || '',
      observacoes: ocorrencia?.observacoes || '',
      evidencia_url: ocorrencia?.evidencia_url || ''
    }
  })

  const watchedData = watch()

  const handleFormSubmit = async (data: OcorrenciaFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTipoLabel = (tipo: string) => {
    const labels = {
      seguranca: 'Segurança',
      manutencao: 'Manutenção',
      limpeza: 'Limpeza',
      ruido: 'Ruído',
      outros: 'Outros'
    }
    return labels[tipo as keyof typeof labels] || tipo
  }

  const getPrioridadeLabel = (prioridade: string) => {
    const labels = {
      baixa: 'Baixa',
      media: 'Média',
      alta: 'Alta',
      critica: 'Crítica'
    }
    return labels[prioridade as keyof typeof labels] || prioridade
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      aberta: 'Aberta',
      em_analise: 'Em Análise',
      em_andamento: 'Em Andamento',
      resolvida: 'Resolvida',
      fechada: 'Fechada'
    }
    return labels[status as keyof typeof labels] || status
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Título */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Título *
          </label>
          <Input
            placeholder="Descreva brevemente a ocorrência..."
            {...register('titulo')}
            error={errors.titulo?.message}
          />
          {errors.titulo && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.titulo.message}
            </p>
          )}
        </div>

        {/* Tipo e Prioridade */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Tipo *
          </label>
          <Select
            value={watchedData.tipo}
            onValueChange={(value) => setValue('tipo', value as 'seguranca' | 'manutencao' | 'limpeza' | 'ruido' | 'outros')}
          >
            <option value="seguranca">Segurança</option>
            <option value="manutencao">Manutenção</option>
            <option value="limpeza">Limpeza</option>
            <option value="ruido">Ruído</option>
            <option value="outros">Outros</option>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Prioridade *
          </label>
          <Select
            value={watchedData.prioridade}
            onValueChange={(value) => setValue('prioridade', value as 'baixa' | 'media' | 'alta' | 'critica')}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Status *
          </label>
          <Select
            value={watchedData.status}
            onValueChange={(value) => setValue('status', value as 'aberta' | 'em_analise' | 'em_andamento' | 'resolvida' | 'fechada')}
          >
            <option value="aberta">Aberta</option>
            <option value="em_analise">Em Análise</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="resolvida">Resolvida</option>
            <option value="fechada">Fechada</option>
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

        {/* Local */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Local *
          </label>
          <Input
            placeholder="Local específico da ocorrência..."
            {...register('local')}
            error={errors.local?.message}
          />
          {errors.local && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.local.message}
            </p>
          )}
        </div>

        {/* Reportado por */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4" />
            Reportado por *
          </label>
          <Input
            placeholder="Nome de quem reportou..."
            {...register('reportado_por')}
            error={errors.reportado_por?.message}
          />
          {errors.reportado_por && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.reportado_por.message}
            </p>
          )}
        </div>

        {/* Responsável */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Responsável
          </label>
          <Select
            value={watchedData.responsavel_id || ''}
            onValueChange={(value) => setValue('responsavel_id', value)}
          >
            <option value="">Sem responsável</option>
            <option value="1">João Silva</option>
            <option value="2">Maria Santos</option>
            <option value="3">Pedro Costa</option>
          </Select>
        </div>

        {/* Data e Hora da Ocorrência */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Data da Ocorrência *
          </label>
          <Input
            type="date"
            {...register('data_ocorrencia')}
            error={errors.data_ocorrencia?.message}
          />
          {errors.data_ocorrencia && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.data_ocorrencia.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Hora da Ocorrência *
          </label>
          <Input
            type="time"
            {...register('hora_ocorrencia')}
            error={errors.hora_ocorrencia?.message}
          />
          {errors.hora_ocorrencia && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.hora_ocorrencia.message}
            </p>
          )}
        </div>

        {/* URL da Evidência */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-gray-700">
            URL da Evidência
          </label>
          <Input
            type="url"
            placeholder="https://exemplo.com/evidencia.jpg"
            {...register('evidencia_url')}
          />
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Descrição *
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
          placeholder="Descreva detalhadamente a ocorrência..."
          {...register('descricao')}
        />
        {errors.descricao && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.descricao.message}
          </p>
        )}
      </div>

      {/* Observações */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Observações Adicionais
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="Observações, instruções ou notas adicionais..."
          {...register('observacoes')}
        />
      </div>

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
          {ocorrencia ? 'Atualizar Ocorrência' : 'Criar Ocorrência'}
        </Button>
      </div>
    </form>
  )
}
