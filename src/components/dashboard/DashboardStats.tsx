'use client'


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Shield,
  Clock,
  AlertTriangle,
  Building2,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { formatNumber } from '@/lib/utils'

// Mock data para desenvolvimento (será substituído pela API real)
const mockStats = {
  total_ocorrencias: 150,
  total_rondas: 89,
  total_condominios: 12,
  rondas_em_andamento: 3,
  ocorrencias_ultimo_mes: 45,
  rondas_ultimo_mes: 67
}

const statCards = [
  {
    title: 'Total de Ocorrências',
    value: mockStats.total_ocorrencias,
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    change: '+12%',
    changeType: 'up' as const,
  },
  {
    title: 'Total de Rondas',
    value: mockStats.total_rondas,
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    change: '+8%',
    changeType: 'up' as const,
  },
  {
    title: 'Condomínios',
    value: mockStats.total_condominios,
    icon: Building2,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    change: '+2',
    changeType: 'up' as const,
  },
  {
    title: 'Rondas em Andamento',
    value: mockStats.rondas_em_andamento,
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    change: '-1',
    changeType: 'down' as const,
  },
]

export function DashboardStats() {
  // TODO: Implementar query real da API
  // const { data: stats, isLoading } = useQuery({
  //   queryKey: ['dashboard-stats'],
  //   queryFn: () => fetch('/api/flask/dashboard/stats').then(res => res.json()),
  // })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon

        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatNumber(stat.value)}
              </div>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                {stat.changeType === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="ml-1">vs. mês anterior</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
