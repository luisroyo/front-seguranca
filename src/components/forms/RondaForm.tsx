'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, Clock, MapPin, User, Building, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Ronda } from '@/types/api'

const rondaSchema = z.object({
  condominio_id: z.string().min(1, 'Condomínio é obrigatório'),
  guarda_id: z.string().min(1, 'Guarda é obrigatório'),
  data_inicio: z.string().min(1, 'Data de início é obrigatória'),
  hora_inicio: z.string().min(1, 'Hora de início é obrigatória'),
  data_fim: z.string().min(1, 'Data de fim é obrigatória'),
  hora_fim: z.string().min(1, 'Hora de fim é obrigatória'),
  rota: z.string().min(1, 'Rota é obrigatória'),
  observacoes: z.string().optional(),
  prioridade: z.enum(['baixa', 'media', 'alta']).default('media'),
  status: z.enum(['agendada', 'em_andamento', 'concluida', 'cancelada']).default('agendada')
})

type RondaFormData = z.infer<typeof rondaSchema>

interface RondaFormProps {
  ronda?: Ronda | null
  onSubmit: (data: RondaFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export function RondaForm({ ronda, onSubmit, onCancel, isLoading = false }: RondaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm<RondaFormData>({
    resolver: zodResolver(rondaSchema),
    defaultValues: {
      condominio_id: ronda?.condominio.id || '',
      guarda_id: ronda?.guarda.id || '',
      data_inicio: ronda?.data_inicio ? new Date(ronda.data_inicio).toISOString().split('T')[0] : '',
      hora_inicio: ronda?.hora_inicio || '',
      data_fim: ronda?.data_fim ? new Date(ronda.data_fim).toISOString().split('T')[0] : '',
      hora_fim: ronda?.hora_fim || '',
      rota: ronda?.rota || '',
      observacoes: ronda?.observacoes || '',
      prioridade: ronda?.prioridade || 'media',
      status: ronda?.status || 'agendada'
    }
  })

  const watchedData = watch()

  const handleFormSubmit = async (data: RondaFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Validação de datas
  const isDataInicioValid = watchedData.data_inicio && watchedData.hora_inicio
  const isDataFimValid = watchedData.data_fim && watchedData.hora_fim

  const getDataError = () => {
    if (!isDataInicioValid || !isDataFimValid) return null
    
    const inicio = new Date(`${watchedData.data_inicio}T${watchedData.hora_inicio}`)
    const fim = new Date(`${watchedData.data_fim}T${watchedData.hora_fim}`)
    
    if (fim <= inicio) {
      return 'Data/hora de fim deve ser posterior à data/hora de início'
    }
    
    return null
  }

  const dataError = getDataError()

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Guarda */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4" />
            Guarda *
          </label>
          <Select
            value={watchedData.guarda_id}
            onValueChange={(value) => setValue('guarda_id', value)}
            error={errors.guarda_id?.message}
          >
            <option value="">Selecione um guarda</option>
            <option value="1">João Silva</option>
            <option value="2">Maria Santos</option>
            <option value="3">Pedro Costa</option>
          </Select>
          {errors.guarda_id && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.guarda_id.message}
            </p>
          )}
        </div>

        {/* Data e Hora de Início */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Data de Início *
          </label>
          <Input
            type="date"
            {...register('data_inicio')}
            error={errors.data_inicio?.message}
          />
          {errors.data_inicio && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.data_inicio.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Hora de Início *
          </label>
          <Input
            type="time"
            {...register('hora_inicio')}
            error={errors.hora_inicio?.message}
          />
          {errors.hora_inicio && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.hora_inicio.message}
            </p>
          )}
        </div>

        {/* Data e Hora de Fim */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Data de Fim *
          </label>
          <Input
            type="date"
            {...register('data_fim')}
            error={errors.data_fim?.message}
          />
          {errors.data_fim && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.data_fim.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Hora de Fim *
          </label>
          <Input
            type="time"
            {...register('hora_fim')}
            error={errors.hora_fim?.message}
          />
          {errors.hora_fim && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.hora_fim.message}
            </p>
          )}
        </div>

        {/* Prioridade */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Prioridade
          </label>
          <Select
            value={watchedData.prioridade}
            onValueChange={(value) => setValue('prioridade', value as 'baixa' | 'media' | 'alta')}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Status
          </label>
          <Select
            value={watchedData.status}
            onValueChange={(value) => setValue('status', value as 'agendada' | 'em_andamento' | 'concluida' | 'cancelada')}
          >
            <option value="agendada">Agendada</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="concluida">Concluída</option>
            <option value="cancelada">Cancelada</option>
          </Select>
        </div>
      </div>

      {/* Rota */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Rota *
        </label>
        <Input
          placeholder="Descreva a rota da ronda..."
          {...register('rota')}
          error={errors.rota?.message}
        />
        {errors.rota && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.rota.message}
          </p>
        )}
      </div>

      {/* Observações */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Observações
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="Observações adicionais..."
          {...register('observacoes')}
        />
      </div>

      {/* Erro de validação de datas */}
      {dataError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {dataError}
          </p>
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
          disabled={!isValid || isSubmitting || isLoading || !!dataError}
          loading={isSubmitting}
        >
          {ronda ? 'Atualizar Ronda' : 'Criar Ronda'}
        </Button>
      </div>
    </form>
  )
}
