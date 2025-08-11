import { http, HttpResponse } from 'msw'
import {
    User,
    Condominio,
    Colaborador,
    Ocorrencia,
    Ronda,
    DashboardData,
    DashboardStats,
    PaginatedResponse
} from '@/types/api'
import { DashboardOcorrenciaRecente, DashboardRondaRecente } from '@/types/dashboard'

// Dados mockados
const mockUsers: User[] = [
    {
        id: 1,
        nome: 'João Silva',
        email: 'joao.silva@seguranca.com',
        telefone: '+55 11 99999-9999',
        role: 'admin',
        ativo: true,
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z'
    },
    {
        id: 2,
        nome: 'Maria Santos',
        email: 'maria.santos@seguranca.com',
        telefone: '+55 11 88888-8888',
        role: 'supervisor',
        ativo: true,
        created_at: '2024-01-10T10:00:00Z',
        updated_at: '2024-01-10T10:00:00Z'
    },
    {
        id: 3,
        nome: 'Pedro Costa',
        email: 'pedro.costa@seguranca.com',
        telefone: '+55 11 77777-7777',
        role: 'colaborador',
        ativo: true,
        created_at: '2024-01-05T10:00:00Z',
        updated_at: '2024-01-05T10:00:00Z'
    }
]

const mockCondominios: Condominio[] = [
    {
        id: 1,
        nome: 'Residencial Parque das Flores',
        endereco: 'Rua das Flores, 123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01234-567',
        numero_residentes: 150,
        area_total: 5000.0,
        created_at: '2024-01-01T10:00:00Z',
        updated_at: '2024-01-01T10:00:00Z'
    },
    {
        id: 2,
        nome: 'Condomínio Solar',
        endereco: 'Av. do Sol, 456',
        bairro: 'Vila Nova',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '04567-890',
        numero_residentes: 80,
        area_total: 3000.0,
        created_at: '2024-01-02T10:00:00Z',
        updated_at: '2024-01-02T10:00:00Z'
    },
    {
        id: 3,
        nome: 'Edifício Horizonte',
        endereco: 'Rua Horizonte, 789',
        bairro: 'Jardins',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01234-123',
        numero_residentes: 120,
        area_total: 4000.0,
        created_at: '2024-01-03T10:00:00Z',
        updated_at: '2024-01-03T10:00:00Z'
    }
]

const mockColaboradores: Colaborador[] = [
    {
        id: 1,
        nome: 'Carlos Oliveira',
        cpf: '123.456.789-00',
        telefone: '+55 11 66666-6666',
        email: 'carlos.oliveira@seguranca.com',
        cargo: 'Vigilante',
        turno: 'noturno',
        condominio_id: 1,
        ativo: true,
        created_at: '2024-01-01T10:00:00Z',
        updated_at: '2024-01-01T10:00:00Z'
    },
    {
        id: 2,
        nome: 'Ana Paula',
        cpf: '987.654.321-00',
        telefone: '+55 11 55555-5555',
        email: 'ana.paula@seguranca.com',
        cargo: 'Supervisor',
        turno: 'diurno',
        condominio_id: 2,
        ativo: true,
        created_at: '2024-01-02T10:00:00Z',
        updated_at: '2024-01-02T10:00:00Z'
    }
]

const mockOcorrencias: Ocorrencia[] = [
    {
        id: 1,
        tipo: 'intrusao',
        descricao: 'Pessoa não identificada tentando acessar o condomínio',
        local: 'Portaria principal',
        gravidade: 'media',
        status: 'em_andamento',
        condominio_id: 1,
        colaborador_id: 1,
        created_at: '2024-01-15T14:30:00Z',
        updated_at: '2024-01-15T14:30:00Z'
    },
    {
        id: 2,
        tipo: 'vandalismo',
        descricao: 'Pichação na área comum',
        local: 'Área de lazer',
        gravidade: 'baixa',
        status: 'resolvido',
        condominio_id: 2,
        colaborador_id: 2,
        created_at: '2024-01-14T16:00:00Z',
        updated_at: '2024-01-14T16:00:00Z'
    },
    {
        id: 3,
        tipo: 'assalto',
        descricao: 'Tentativa de assalto na garagem',
        local: 'Garagem subterrânea',
        gravidade: 'alta',
        status: 'em_andamento',
        condominio_id: 3,
        colaborador_id: 1,
        created_at: '2024-01-13T22:00:00Z',
        updated_at: '2024-01-13T22:00:00Z'
    }
]

const mockRondas: Ronda[] = [
    {
        id: 1,
        condominio_id: 1,
        colaborador_id: 1,
        data_hora_inicio: '2024-01-15T20:00:00Z',
        data_hora_fim: '2024-01-15T22:00:00Z',
        pontos_verificados: 15,
        observacoes: 'Ronda realizada com sucesso, sem ocorrências',
        status: 'concluida',
        created_at: '2024-01-15T20:00:00Z',
        updated_at: '2024-01-15T22:00:00Z'
    },
    {
        id: 2,
        condominio_id: 2,
        colaborador_id: 2,
        data_hora_inicio: '2024-01-15T08:00:00Z',
        data_hora_fim: '2024-01-15T10:00:00Z',
        pontos_verificados: 12,
        observacoes: 'Ronda diurna concluída',
        status: 'concluida',
        created_at: '2024-01-15T08:00:00Z',
        updated_at: '2024-01-15T10:00:00Z'
    },
    {
        id: 3,
        condominio_id: 3,
        colaborador_id: 1,
        data_hora_inicio: '2024-01-15T18:00:00Z',
        data_hora_fim: null,
        pontos_verificados: 8,
        observacoes: 'Ronda em andamento',
        status: 'em_andamento',
        created_at: '2024-01-15T18:00:00Z',
        updated_at: '2024-01-15T18:00:00Z'
    }
]

const mockDashboardStats: DashboardStats = {
    total_ocorrencias: 45,
    ocorrencias_resolvidas: 38,
    total_rondas: 156,
    rondas_concluidas: 142,
    taxa_resolucao: 84.4,
    tempo_medio_resolucao: '2.5h'
}

const mockDashboardData: DashboardData = {
    stats: mockDashboardStats,
    ocorrencias_recentes: mockOcorrencias.slice(0, 5).map(oc => ({
        id: oc.id,
        tipo: oc.tipo,
        descricao: oc.descricao,
        condominio: mockCondominios.find(c => c.id === oc.condominio_id)?.nome || '',
        data: oc.created_at,
        status: oc.status,
        gravidade: oc.gravidade
    })),
    rondas_recentes: mockRondas.slice(0, 5).map(r => ({
        id: r.id,
        condominio: mockCondominios.find(c => c.id === r.condominio_id)?.nome || '',
        data: r.data_hora_inicio,
        turno: r.data_hora_inicio ?
            (new Date(r.data_hora_inicio).getHours() >= 6 && new Date(r.data_hora_inicio).getHours() < 18 ? 'diurno' : 'noturno') : 'não definido',
        status: r.status,
        total_patrulhas: r.pontos_verificados
    }))
}

// Handlers da API
export const handlers = [
    // Auth endpoints
    http.post('/api/flask/auth/login', () => {
        return HttpResponse.json({
            success: true,
            data: {
                user: mockUsers[0],
                access_token: 'mock_access_token_123',
                refresh_token: 'mock_refresh_token_456'
            }
        })
    }),

    http.post('/api/flask/auth/refresh', () => {
        return HttpResponse.json({
            success: true,
            data: {
                access_token: 'new_mock_access_token_789'
            }
        })
    }),

    // Users endpoints
    http.get('/api/flask/users', () => {
        return HttpResponse.json({
            success: true,
            data: mockUsers,
            pagination: {
                page: 1,
                per_page: 10,
                total: mockUsers.length,
                pages: 1
            }
        } as PaginatedResponse<User>)
    }),

    http.get('/api/flask/users/:id', ({ params }) => {
        const user = mockUsers.find(u => u.id === Number(params.id))
        if (!user) {
            return new HttpResponse(null, { status: 404 })
        }
        return HttpResponse.json({
            success: true,
            data: user
        })
    }),

    // Condominios endpoints
    http.get('/api/flask/condominios', () => {
        return HttpResponse.json({
            success: true,
            data: mockCondominios,
            pagination: {
                page: 1,
                per_page: 10,
                total: mockCondominios.length,
                pages: 1
            }
        } as PaginatedResponse<Condominio>)
    }),

    http.get('/api/flask/condominios/:id', ({ params }) => {
        const condominio = mockCondominios.find(c => c.id === Number(params.id))
        if (!condominio) {
            return new HttpResponse(null, { status: 404 })
        }
        return HttpResponse.json({
            success: true,
            data: condominio
        })
    }),

    // Colaboradores endpoints
    http.get('/api/flask/colaboradores', () => {
        return HttpResponse.json({
            success: true,
            data: mockColaboradores,
            pagination: {
                page: 1,
                per_page: 10,
                total: mockColaboradores.length,
                pages: 1
            }
        } as PaginatedResponse<Colaborador>)
    }),

    // Ocorrencias endpoints
    http.get('/api/flask/ocorrencias', () => {
        return HttpResponse.json({
            success: true,
            data: mockOcorrencias,
            pagination: {
                page: 1,
                per_page: 10,
                total: mockOcorrencias.length,
                pages: 1
            }
        } as PaginatedResponse<Ocorrencia>)
    }),

    http.get('/api/flask/ocorrencias/:id', ({ params }) => {
        const ocorrencia = mockOcorrencias.find(o => o.id === Number(params.id))
        if (!ocorrencia) {
            return new HttpResponse(null, { status: 404 })
        }
        return HttpResponse.json({
            success: true,
            data: ocorrencia
        })
    }),

    // Rondas endpoints
    http.get('/api/flask/rondas', () => {
        return HttpResponse.json({
            success: true,
            data: mockRondas,
            pagination: {
                page: 1,
                per_page: 10,
                total: mockRondas.length,
                pages: 1
            }
        } as PaginatedResponse<Ronda>)
    }),

    http.get('/api/flask/rondas/:id', ({ params }) => {
        const ronda = mockRondas.find(r => r.id === Number(params.id))
        if (!ronda) {
            return new HttpResponse(null, { status: 404 })
        }
        return HttpResponse.json({
            success: true,
            data: ronda
        })
    }),

    // Dashboard endpoints
    http.get('/api/flask/dashboard', () => {
        return HttpResponse.json({
            success: true,
            data: mockDashboardData
        })
    }),

    http.get('/api/flask/dashboard/stats', () => {
        return HttpResponse.json({
            success: true,
            data: mockDashboardStats
        })
    }),

    // Fallback para rotas não encontradas
    http.all('*', () => {
        return new HttpResponse(null, { status: 404 })
    })
]
