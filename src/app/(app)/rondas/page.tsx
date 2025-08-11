'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Calendar, MapPin, Clock, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Table } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { Select } from '@/components/ui/select'
import { useRondas } from '@/hooks/useRondas'
import { Ronda } from '@/types/api'
import { RondaForm } from '@/components/forms/RondaForm'

export default function RondasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedRonda, setSelectedRonda] = useState<Ronda | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const { rondas, isLoading, error } = useRondas()
  
  const filteredRondas = rondas?.filter(ronda => {
    const matchesSearch = ronda.condominio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ronda.guarda.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ronda.rota.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || ronda.status === statusFilter
    return matchesSearch && matchesStatus
  }) || []

  const handleCreateRonda = async (data: any) => {
    setIsLoading(true)
    try {
      // TODO: Implementar chamada para API
      console.log('Criando ronda:', data)
      setIsCreateModalOpen(false)
      // Recarregar dados
    } catch (error) {
      console.error('Erro ao criar ronda:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditRonda = async (data: any) => {
    setIsLoading(true)
    try {
      // TODO: Implementar chamada para API
      console.log('Editando ronda:', data)
      setIsEditModalOpen(false)
      setSelectedRonda(null)
      // Recarregar dados
    } catch (error) {
      console.error('Erro ao editar ronda:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteRonda = async (ronda: Ronda) => {
    if (confirm('Tem certeza que deseja excluir esta ronda?')) {
      setIsLoading(true)
      try {
        // TODO: Implementar chamada para API
        console.log('Excluindo ronda:', ronda.id)
        // Recarregar dados
      } catch (error) {
        console.error('Erro ao excluir ronda:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const openEditModal = (ronda: Ronda) => {
    setSelectedRonda(ronda)
    setIsEditModalOpen(true)
  }

  const openViewModal = (ronda: Ronda) => {
    setSelectedRonda(ronda)
    setIsViewModalOpen(true)
  }

  const openCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const handleEditRonda = (ronda: Ronda) => {
    setSelectedRonda(ronda)
    setIsCreateModalOpen(true)
  }

  const handleDeleteRonda = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta ronda?')) {
      // Implementar delete
      console.log('Deletar ronda:', id)
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
        <p className="text-red-500">Erro ao carregar rondas: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Rondas</h1>
          <p className="text-gray-600">Gerencie as rondas de segurança dos condomínios</p>
        </div>
        <Button onClick={openCreateModal} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Nova Ronda
        </Button>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por condomínio ou guarda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
            options={[
              { value: 'todos', label: 'Todos os Status' },
              { value: 'pendente', label: 'Pendente' },
              { value: 'em_andamento', label: 'Em Andamento' },
              { value: 'concluida', label: 'Concluída' },
              { value: 'cancelada', label: 'Cancelada' }
            ]}
            className="w-full sm:w-48"
          />
        </div>
      </Card>

      {/* Tabela de Rondas */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Condomínio</Table.Head>
                <Table.Head>Guarda</Table.Head>
                <Table.Head>Data/Hora</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Duração</Table.Head>
                <Table.Head>Ações</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredRondas.map((ronda) => (
                <Table.Row key={ronda.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{ronda.condominio.nome}</p>
                        <p className="text-sm text-gray-500">{ronda.condominio.endereco}</p>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {ronda.guarda.nome.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium">{ronda.guarda.nome}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {new Date(ronda.data_hora_inicio).toLocaleDateString('pt-BR')}
                      </span>
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {new Date(ronda.data_hora_inicio).toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ronda.status === 'concluida' ? 'bg-green-100 text-green-800' :
                      ronda.status === 'em_andamento' ? 'bg-blue-100 text-blue-800' :
                      ronda.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {ronda.status === 'concluida' ? 'Concluída' :
                       ronda.status === 'em_andamento' ? 'Em Andamento' :
                       ronda.status === 'pendente' ? 'Pendente' : 'Cancelada'}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-gray-600">
                      {ronda.duracao_minutos ? `${ronda.duracao_minutos} min` : 'N/A'}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openViewModal(ronda)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(ronda)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRonda(ronda)}
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
        
        {filteredRondas.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma ronda encontrada</p>
          </div>
        )}
      </Card>

      {/* Modal de Criação */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false)
          setSelectedRonda(null)
        }}
        title="Nova Ronda"
        size="lg"
      >
        <RondaForm
          ronda={null}
          onSubmit={handleCreateRonda}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedRonda(null)
        }}
        title="Editar Ronda"
        size="lg"
      >
        <RondaForm
          ronda={selectedRonda}
          onSubmit={handleEditRonda}
          onCancel={() => setIsEditModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      {/* Modal de Visualização */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedRonda(null)
        }}
        title="Detalhes da Ronda"
        size="lg"
      >
        {selectedRonda && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Condomínio</h3>
                <p className="text-lg font-medium text-gray-900">{selectedRonda.condominio.nome}</p>
                <p className="text-sm text-gray-600">{selectedRonda.condominio.endereco}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Guarda</h3>
                <p className="text-lg font-medium text-gray-900">{selectedRonda.guarda.nome}</p>
                <p className="text-sm text-gray-600">{selectedRonda.guarda.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data/Hora de Início</h3>
                <p className="text-lg font-medium text-gray-900">
                  {new Date(selectedRonda.data_hora_inicio).toLocaleDateString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(selectedRonda.data_hora_inicio).toLocaleTimeString('pt-BR')}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data/Hora de Fim</h3>
                <p className="text-lg font-medium text-gray-900">
                  {new Date(selectedRonda.data_hora_fim).toLocaleDateString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(selectedRonda.data_hora_fim).toLocaleTimeString('pt-BR')}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Rota</h3>
              <p className="text-gray-900">{selectedRonda.rota}</p>
            </div>
            {selectedRonda.observacoes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Observações</h3>
                <p className="text-gray-900">{selectedRonda.observacoes}</p>
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


