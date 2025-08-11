'use client'

import { useState } from 'react'
import { Plus, Search, AlertTriangle, Calendar, MapPin, Clock, User, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Table } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { Select } from '@/components/ui/select'
import { useOcorrencias } from '@/hooks/useOcorrencias'
import { Ocorrencia } from '@/types/api'
import { OcorrenciaForm } from '@/components/forms/OcorrenciaForm'

export default function OcorrenciasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [tipoFilter, setTipoFilter] = useState('todos')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedOcorrencia, setSelectedOcorrencia] = useState<Ocorrencia | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const { ocorrencias, isLoading, error } = useOcorrencias()
  
  const filteredOcorrencias = ocorrencias?.filter(ocorrencia => {
    const matchesSearch = ocorrencia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ocorrencia.condominio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ocorrencia.reportado_por.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTipo = tipoFilter === 'todos' || ocorrencia.tipo === tipoFilter
    const matchesStatus = statusFilter === 'todos' || ocorrencia.status === statusFilter
    return matchesSearch && matchesTipo && matchesStatus
  }) || []

  const handleCreateOcorrencia = async (data: any) => {
    setIsLoading(true)
    try {
      // TODO: Implementar chamada para API
      console.log('Criando ocorrência:', data)
      setIsCreateModalOpen(false)
      // Recarregar dados
    } catch (error) {
      console.error('Erro ao criar ocorrência:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditOcorrencia = async (data: any) => {
    setIsLoading(true)
    try {
      // TODO: Implementar chamada para API
      console.log('Editando ocorrência:', data)
      setIsEditModalOpen(false)
      setSelectedOcorrencia(null)
      // Recarregar dados
    } catch (error) {
      console.error('Erro ao editar ocorrência:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteOcorrencia = async (ocorrencia: Ocorrencia) => {
    if (confirm('Tem certeza que deseja excluir esta ocorrência?')) {
      setIsLoading(true)
      try {
        // TODO: Implementar chamada para API
        console.log('Excluindo ocorrência:', ocorrencia.id)
        // Recarregar dados
      } catch (error) {
        console.error('Erro ao excluir ocorrência:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const openEditModal = (ocorrencia: Ocorrencia) => {
    setSelectedOcorrencia(ocorrencia)
    setIsEditModalOpen(true)
  }

  const openViewModal = (ocorrencia: Ocorrencia) => {
    setSelectedOcorrencia(ocorrencia)
    setIsViewModalOpen(true)
  }

  const openCreateModal = () => {
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
        <Button onClick={openCreateModal} className="w-full sm:w-auto">
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
                        variant="ghost"
                        size="sm"
                        onClick={() => openViewModal(ocorrencia)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(ocorrencia)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteOcorrencia(ocorrencia)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
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

      {/* Modal de Criação */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false)
          setSelectedOcorrencia(null)
        }}
        title="Nova Ocorrência"
        size="lg"
      >
        <OcorrenciaForm
          ocorrencia={null}
          onSubmit={handleCreateOcorrencia}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedOcorrencia(null)
        }}
        title="Editar Ocorrência"
        size="lg"
      >
        <OcorrenciaForm
          ocorrencia={selectedOcorrencia}
          onSubmit={handleEditOcorrencia}
          onCancel={() => setIsEditModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      {/* Modal de Visualização */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedOcorrencia(null)
        }}
        title="Detalhes da Ocorrência"
        size="lg"
      >
        {selectedOcorrencia && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Título</h3>
                <p className="text-lg font-medium text-gray-900">{selectedOcorrencia.titulo}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoColor(selectedOcorrencia.tipo)}`}>
                  {getTipoLabel(selectedOcorrencia.tipo)}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Condomínio</h3>
                <p className="text-lg font-medium text-gray-900">{selectedOcorrencia.condominio.nome}</p>
                <p className="text-sm text-gray-600">{selectedOcorrencia.condominio.endereco}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Local</h3>
                <p className="text-lg font-medium text-gray-900">{selectedOcorrencia.local}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Reportado por</h3>
                <p className="text-lg font-medium text-gray-900">{selectedOcorrencia.reportado_por}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data/Hora</h3>
                <p className="text-lg font-medium text-gray-900">
                  {new Date(selectedOcorrencia.data_ocorrencia).toLocaleDateString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(selectedOcorrencia.data_ocorrencia).toLocaleTimeString('pt-BR')}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
              <p className="text-gray-900">{selectedOcorrencia.descricao}</p>
            </div>
            {selectedOcorrencia.observacoes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Observações</h3>
                <p className="text-gray-900">{selectedOcorrencia.observacoes}</p>
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={() => setIsViewModalOpen(false)}>
                Fechar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}


