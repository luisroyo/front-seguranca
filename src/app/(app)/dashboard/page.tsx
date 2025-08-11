import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { RecentOcorrencias } from '@/components/dashboard/RecentOcorrencias'
import { RecentRondas } from '@/components/dashboard/RecentRondas'
import { CondominiosList } from '@/components/dashboard/CondominiosList'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Visão geral do sistema de segurança
        </p>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOcorrencias />
        <RecentRondas />
      </div>

      {/* Condomínios */}
      <CondominiosList />
    </div>
  )
}
