import { Condominio } from './api'

export interface DashboardStats {
  total_ocorrencias: number
  total_rondas: number
  total_condominios: number
  rondas_em_andamento: number
  ocorrencias_ultimo_mes: number
  rondas_ultimo_mes: number
}

export interface DashboardUser {
  id: number
  username: string
  is_admin: boolean
  is_supervisor: boolean
}

export interface DashboardOcorrenciaRecente {
  id: number
  tipo: string
  condominio: string
  data: string
  descricao: string
}

export interface DashboardRondaRecente {
  id: number
  condominio: string
  dataPlantao: string
  escalaPlantao: string
  status: string
  totalRondas: number
}

export interface DashboardData {
  stats: DashboardStats
  user: DashboardUser
  ocorrenciasRecentes: DashboardOcorrenciaRecente[]
  rondasRecentes: DashboardRondaRecente[]
  condominios: Condominio[]
}

export interface DashboardComparativo {
  ano: number
  mes: number
  dados: {
    periodoAtual: MetricPeriod
    periodoAnterior: MetricPeriod
    variacao: PercentageChange
    tendencias: TrendAnalysis
  }
}

export interface DashboardOcorrencias {
  ano: number
  mes: number
  dados: {
    totalOcorrencias: number
    ocorrenciasPorTipo: {
      tipo: string
      quantidade: number
      percentual: number
    }[]
    ocorrenciasPorCondominio: {
      condominio: string
      quantidade: number
      percentual: number
    }[]
    ocorrenciasPorTurno: {
      turno: string
      quantidade: number
      percentual: number
    }[]
    evolucaoTemporal: {
      data: string
      quantidade: number
    }[]
  }
}

export interface DashboardRondas {
  ano: number
  mes: number
  dados: {
    totalRondas: number
    rondasPorCondominio: {
      condominio: string
      quantidade: number
      percentual: number
    }[]
    rondasPorTurno: {
      turno: string
      quantidade: number
      percentual: number
    }[]
    rondasPorStatus: {
      status: string
      quantidade: number
      percentual: number
    }[]
    evolucaoTemporal: {
      data: string
      quantidade: number
    }[]
  }
}

interface MetricPeriod {
  ocorrencias: number
  rondas: number
  condominios: number
}

interface PercentageChange {
  ocorrencias: number
  rondas: number
  condominios: number
}

interface TrendAnalysis {
  direcao: 'up' | 'down' | 'stable'
  intensidade: 'low' | 'medium' | 'high'
}
