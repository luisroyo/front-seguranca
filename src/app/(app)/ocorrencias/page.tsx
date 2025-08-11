'use client'

import { useState } from 'react'
import { Plus, Search, AlertTriangle, Calendar, MapPin, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Table } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { Select } from '@/components/ui/select'
import { useOcorrencias } from '@/hooks/useOcorrencias'
import { Ocorrencia } from '@/types/api'

export default function OcorrenciasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [tipoFilter, setTipoFilter] = useState('todos')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedOcorrencia, setSelectedOcorrencia] = useState<Ocorrencia | null>(null)
  
  const { ocorrencias, isLoading, error } = useOcorrencias()
  
  const filteredOcorrencias = ocorrencias?.filter(ocorrencia => {
    const matchesSearch = ocorrencia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ocorrencia.condominio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ocorrencia.reportado_por.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTipo = tipoFilter === 'todos' || ocorrencia.tipo === tipoFilter
    const matchesStatus = statusFilter === 'todos' || ocorrencia.status === statusFilter
    return matchesSearch && matchesTipo && matchesStatus
  }) || []

  const handleCreateOcorrencia = () => {
    setIsCreateModalOpen(true)
  }

  const handleEditOcorrencia = (ocorrencia: Ocorrencia) => {
    setSelectedOcorrencia(ocorrencia)
    setIsCreateModalOpen(true)
  }

  const handleDeleteOcorrencia = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta ocorrência?')) {
      // Implementar delete
      console.log('Deletar ocorrência:', id)
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'seguranca': return 'bg-red-100 text-red-800'
      case 'manutencao': return 'bg-blue-100 text-blue-800'
      case 'administrativa': return 'bg-yellow-100 text-yellow-800'
      case 'outros': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'seguranca': return 'Segurança'
      case 'manutencao': return 'Manutenção'
      case 'administrativa': return 'Administrativa'
      case 'outros': return 'Outros'
      default: return tipo
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberta': return 'bg-red-100 text-red-800'
      case 'em_analise': return 'bg-yellow-100 text-yellow-800'
      case 'em_andamento': return 'bg-blue-100 text-blue-800'
      case 'resolvida': return 'bg-green-100 text-green-800'
      case 'fechada': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'aberta': return 'Aberta'
      case 'em_analise': return 'Em Análise'
      case 'em_andamento': return 'Em Andamento'
      case 'resolvida': return 'Resolvida'
      case 'fechada': return 'Fechada'
      default: return status
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Erro ao carregar ocorrências: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Ocorrências</h1>
          <p className="text-gray-600">Gerencie as ocorrências e incidentes dos condomínios</p>
        </div>
        <Button onClick={handleCreateOcorrencia} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Nova Ocorrência
        </Button>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por título, condomínio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={tipoFilter}
            onValueChange={setTipoFilter}
            options={[
              { value: 'todos', label: 'Todos os Tipos' },
              { value: 'seguranca', label: 'Segurança' },
              { value: 'manutencao', label: 'Manutenção' },
              { value: 'administrativa', label: 'Administrativa' },
              { value: 'outros', label: 'Outros' }
            ]}
            className="w-full"
          />
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
            options={[
              { value: 'todos', label: 'Todos os Status' },
              { value: 'aberta', label: 'Aberta' },
              { value: 'em_analise', label: 'Em Análise' },
              { value: 'em_andamento', label: 'Em Andamento' },
              { value: 'resolvida', label: 'Resolvida' },
              { value: 'fechada', label: 'Fechada' }
            ]}
            className="w-full"
          />
        </div>
      </Card>

      {/* Tabela de Ocorrências */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Título</Table.Head>
                <Table.Head>Condomínio</Table.Head>
                <Table.Head>Tipo</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Reportado Por</Table.Head>
                <Table.Head>Data</Table.Head>
                <Table.Head>Prioridade</Table.Head>
                <Table.Head>Ações</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredOcorrencias.map((ocorrencia) => (
                <Table.Row key={ocorrencia.id}>
                  <Table.Cell>
                    <div className="max-w-xs">
                      <p className="font-medium text-gray-900 truncate">{ocorrencia.titulo}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{ocorrencia.descricao}</p>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{ocorrencia.condominio.nome}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoColor(ocorrencia.tipo)}`}>
                      {getTipoLabel(ocorrencia.tipo)}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ocorrencia.status)}`}>
                      {getStatusLabel(ocorrencia.status)}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{ocorrencia.reportado_por}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {new Date(ocorrencia.data_ocorrencia).toLocaleDateString('pt-BR')}
                      </span>
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {new Date(ocorrencia.data_ocorrencia).toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ocorrencia.prioridade === 'alta' ? 'bg-red-100 text-red-800' :
                      ocorrencia.prioridade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ocorrencia.prioridade === 'alta' ? 'Alta' :
                       ocorrencia.prioridade === 'media' ? 'Média' : 'Baixa'}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditOcorrencia(ocorrencia)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteOcorrencia(ocorrencia.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Excluir
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        
        {filteredOcorrencias.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma ocorrência encontrada</p>
          </div>
        )}
      </Card>

      {/* Modal de Criação/Edição */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false)
          setSelectedOcorrencia(null)
        }}
        title={selectedOcorrencia ? 'Editar Ocorrência' : 'Nova Ocorrência'}
        size="lg"
      >
        <OcorrenciaForm
          ocorrencia={selectedOcorrencia}
          onSuccess={() => {
            setIsCreateModalOpen(false)
            setSelectedOcorrencia(null)
          }}
        />
      </Modal>
    </div>
  )
}

// Componente do formulário (será implementado separadamente)
function OcorrenciaForm({ ocorrencia, onSuccess }: { ocorrencia?: Ocorrencia | null, onSuccess: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Formulário de ocorrência será implementado na próxima iteração
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button onClick={onSuccess}>
          Salvar
        </Button>
      </div>
    </div>
  )
}
