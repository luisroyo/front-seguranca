import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/services/api'
import { Ronda, PaginatedResponse } from '@/types/api'

interface RondasFilters {
    condominio_id?: number
    colaborador_id?: number
    status?: string
    turno?: string
    data_inicio?: string
    data_fim?: string
    page?: number
    per_page?: number
}

interface CreateRondaData {
    condominio_id: number
    colaborador_id: number
    data_hora_inicio: string
    observacoes?: string
}

interface UpdateRondaData {
    data_hora_fim?: string
    pontos_verificados?: number
    observacoes?: string
    status?: string
}

export const useRondas = (filters: RondasFilters = {}) => {
    const queryClient = useQueryClient()
    const { page = 1, per_page = 10, ...otherFilters } = filters

    const {
        data: rondasData,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['rondas', filters],
        queryFn: async (): Promise<PaginatedResponse<Ronda>> => {
            const params = new URLSearchParams({
                page: page.toString(),
                per_page: per_page.toString(),
                ...(otherFilters.condominio_id && { condominio_id: otherFilters.condominio_id.toString() }),
                ...(otherFilters.status && { status: otherFilters.status }),
                ...(otherFilters.turno && { turno: otherFilters.turno }),
                ...(otherFilters.colaborador_id && { colaborador_id: otherFilters.colaborador_id.toString() })
            })

            const response = await api.get(`/rondas?${params}`)
            return response.data
        },
        staleTime: 1 * 60 * 1000, // 1 minuto (rondas são mais dinâmicas)
        gcTime: 3 * 60 * 1000, // 3 minutos
    })

    const {
        data: ronda,
        isLoading: isLoadingRonda,
        error: rondaError
    } = useQuery({
        queryKey: ['ronda', filters.condominio_id],
        queryFn: async (): Promise<Ronda> => {
            const response = await api.get(`/rondas/${filters.condominio_id}`)
            return response.data.data
        },
        enabled: !!filters.condominio_id,
        staleTime: 2 * 60 * 1000, // 2 minutos
        gcTime: 5 * 60 * 1000, // 5 minutos
    })

    const createRonda = useMutation({
        mutationFn: async (data: CreateRondaData): Promise<Ronda> => {
            const response = await api.post('/rondas', data)
            return response.data.data
        },
        onSuccess: () => {
            // Invalida queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['rondas'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        }
    })

    const updateRonda = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateRondaData }): Promise<Ronda> => {
            const response = await api.put(`/rondas/${id}`, data)
            return response.data.data
        },
        onSuccess: (_, { id }) => {
            // Invalida queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['rondas'] })
            queryClient.invalidateQueries({ queryKey: ['ronda', id] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        }
    })

    const deleteRonda = useMutation({
        mutationFn: async (id: number): Promise<void> => {
            await api.delete(`/rondas/${id}`)
        },
        onSuccess: () => {
            // Invalida queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['rondas'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        }
    })

    const startRonda = useMutation({
        mutationFn: async (id: number): Promise<Ronda> => {
            const response = await api.put(`/rondas/${id}`, {
                status: 'em_andamento',
                data_hora_inicio: new Date().toISOString()
            })
            return response.data.data
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['rondas'] })
            queryClient.invalidateQueries({ queryKey: ['ronda', id] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        }
    })

    const finishRonda = useMutation({
        mutationFn: async ({ id, pontos_verificados, observacoes }: {
            id: number;
            pontos_verificados: number;
            observacoes?: string
        }): Promise<Ronda> => {
            const response = await api.put(`/rondas/${id}`, {
                status: 'concluida',
                data_hora_fim: new Date().toISOString(),
                pontos_verificados,
                observacoes
            })
            return response.data.data
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['rondas'] })
            queryClient.invalidateQueries({ queryKey: ['ronda', id] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        }
    })

    return {
        // Dados
        rondas: rondasData?.data || [],
        pagination: rondasData?.pagination,
        ronda,

        // Estado
        isLoading,
        isLoadingRonda,
        error,
        rondaError,

        // Ações
        refetch,
        createRonda: createRonda.mutate,
        updateRonda: updateRonda.mutate,
        deleteRonda: deleteRonda.mutate,
        startRonda: startRonda.mutate,
        finishRonda: finishRonda.mutate,

        // Estado das mutações
        isCreating: createRonda.isPending,
        isUpdating: updateRonda.isPending,
        isDeleting: deleteRonda.isPending,
        isStarting: startRonda.isPending,
        isFinishing: finishRonda.isPending,

        // Métodos de conveniência
        refresh: () => {
            refetch()
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        },

        // Filtros úteis
        rondasAtivas: rondasData?.data.filter(r => r.data_hora_fim === '') || [],
        rondasConcluidas: rondasData?.data.filter(r => r.data_hora_fim !== '') || [],
        rondasPendentes: rondasData?.data.filter(r => !r.data_hora_inicio) || []
    }
}
