// Tipos base da API
export interface User {
  id: number
  username: string
  email: string
  is_approved: boolean
  is_admin: boolean
  is_supervisor: boolean
  date_registered: string
  last_login: string
}

export interface Condominio {
  id: number
  nome: string
}

export interface Colaborador {
  id: number
  nome_completo: string
  cargo: string
  matricula: string
  data_admissao: string
  status: string
}

export interface Logradouro {
  id: number
  nome: string
}

export interface OcorrenciaTipo {
  id: number
  nome: string
  descricao?: string
}

export interface Ronda {
  id: number
  data_hora_inicio: string
  data_hora_fim: string
  log_ronda_bruto: string
  relatorio_processado: string
  condominio_id: number
  user_id: number
  supervisor_id: number
  turno_ronda: string
  escala_plantao: string
  data_plantao_ronda: string
  tipo: 'tradicional' | 'esporadica'
  condominio?: Condominio
  user?: User
  supervisor?: User
}

export interface Ocorrencia {
  id: number
  relatorio_final: string
  data_hora_ocorrencia: string
  turno: string
  status: string
  endereco_especifico: string
  logradouro_id: number
  condominio_id: number
  ocorrencia_tipo_id: number
  registrado_por_user_id: number
  supervisor_id: number
  condominio?: Condominio
  ocorrencia_tipo?: OcorrenciaTipo
  logradouro?: Logradouro
  registrado_por?: User
  supervisor?: User
}

export interface PaginationInfo {
  page: number
  pages: number
  per_page: number
  total: number
  has_next: boolean
  has_prev: boolean
}

export interface ApiResponse<T> {
  data?: T
  message?: string
  error?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationInfo
}
