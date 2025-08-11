import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/services/api'
import { Ocorrencia, PaginatedResponse } from '@/types/api'

interface OcorrenciasFilters {
    condominio_id?: number
    status?: string
    gravidade?: string
    tipo?: string
    page?: number
    per_page?: number
}

interface CreateOcorrenciaData {
    tipo: string
    descricao: string
    local: string
    gravidade: string
    condominio_id: number
    colaborador_id: number
}

interface UpdateOcorrenciaData {
    tipo?: string
    descricao?: string
    local?: string
    gravidade?: string
    status?: string
    observacoes?: string
}

export const useOcorrencias = (filters: OcorrenciasFilters = {}) => {
    const queryClient = useQueryClient()
    const { page = 1, per_page = 10, ...otherFilters } = filters

    const {
        data: ocorrenciasData,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['ocorrencias', filters],
        queryFn: async (): Promise<PaginatedResponse<Ocorrencia>> => {
            const params = new URLSearchParams({
                page: page.toString(),
                per_page: per_page.toString(),
                ...(otherFilters.condominio_id && { condominio_id: otherFilters.condominio_id.toString() }),
                ...(otherFilters.status && { status: otherFilters.status }),
                ...(otherFilters.gravidade && { gravidade: otherFilters.gravidade }),
                ...(otherFilters.tipo && { tipo: otherFilters.tipo })
            })

            const response = await api.get(`/ocorrencias?${params}`)
            return response.data
        },
        staleTime: 2 * 60 * 1000, // 2 minutos
        gcTime: 5 * 60 * 1000, // 5 minutos
    })

    const {
        data: ocorrencia,
        isLoading: isLoadingOcorrencia,
        error: ocorrenciaError
    } = useQuery({
        queryKey: ['ocorrencia', filters.condominio_id],
        queryFn: async (): Promise<Ocorrencia> => {
            const response = await api.get(`/ocorrencias/${filters.condominio_id}`)
            return response.data.data
        },
        enabled: !!filters.condominio_id,
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
    })

    const createOcorrencia = useMutation({
        mutationFn: async (data: CreateOcorrenciaData): Promise<Ocorrencia> => {
            const response = await api.post('/ocorrencias', data)
            return response.data.data
        },
        onSuccess: () => {
            // Invalida queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['ocorrencias'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        }
    })

    const updateOcorrencia = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateOcorrenciaData }): Promise<Ocorrencia> => {
            const response = await api.put(`/ocorrencias/${id}`, data)
            return response.data.data
        },
        onSuccess: (_, { id }) => {
            // Invalida queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['ocorrencias'] })
            queryClient.invalidateQueries({ queryKey: ['ocorrencia', id] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        }
    })

    const deleteOcorrencia = useMutation({
        mutationFn: async (id: number): Promise<void> => {
            await api.delete(`/ocorrencias/${id}`)
        },
        onSuccess: () => {
            // Invalida queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['ocorrencias'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        }
    })

    return {
        // Dados
        ocorrencias: ocorrenciasData?.data || [],
        pagination: ocorrenciasData?.pagination,
        ocorrencia,

        // Estado
        isLoading,
        isLoadingOcorrencia,
        error,
        ocorrenciaError,

        // Ações
        refetch,
        createOcorrencia: createOcorrencia.mutate,
        updateOcorrencia: updateOcorrencia.mutate,
        deleteOcorrencia: deleteOcorrencia.mutate,

        // Estado das mutações
        isCreating: createOcorrencia.isPending,
        isUpdating: updateOcorrencia.isPending,
        isDeleting: deleteOcorrencia.isPending,

        // Métodos de conveniência
        refresh: () => {
            refetch()
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        }
    }
}
