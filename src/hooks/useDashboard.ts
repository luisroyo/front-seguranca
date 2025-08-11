import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { DashboardData, DashboardStats } from '@/types/api'

export const useDashboard = () => {
  const {
    data: dashboardData,
    isLoading: isLoadingDashboard,
    error: dashboardError,
    refetch: refetchDashboard
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async (): Promise<DashboardData> => {
      const response = await api.get('/dashboard')
      return response.data.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  })

  const {
    data: stats,
    isLoading: isLoadingStats,
    error: statsError,
    refetch: refetchStats
  } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const response = await api.get('/dashboard/stats')
      return response.data.data
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
  })

  return {
    // Dashboard completo
    dashboardData,
    isLoadingDashboard,
    dashboardError,
    refetchDashboard,
    
    // Estatísticas
    stats,
    isLoadingStats,
    statsError,
    refetchStats,
    
    // Estado geral
    isLoading: isLoadingDashboard || isLoadingStats,
    hasError: !!dashboardError || !!statsError,
    
    // Dados derivados
    ocorrenciasRecentes: dashboardData?.ocorrencias_recentes || [],
    rondasRecentes: dashboardData?.rondas_recentes || [],
    
    // Métodos de atualização
    refreshAll: () => {
      refetchDashboard()
      refetchStats()
    }
  }
}
