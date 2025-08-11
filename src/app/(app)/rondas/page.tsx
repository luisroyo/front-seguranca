'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Calendar, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Table } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { Select } from '@/components/ui/select'
import { useRondas } from '@/hooks/useRondas'
import { Ronda } from '@/types/api'

export default function RondasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedRonda, setSelectedRonda] = useState<Ronda | null>(null)
  
  const { rondas, isLoading, error } = useRondas()
  
  const filteredRondas = rondas?.filter(ronda => {
    const matchesSearch = ronda.condominio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ronda.guarda.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || ronda.status === statusFilter
    return matchesSearch && matchesStatus
  }) || []

  const handleCreateRonda = () => {
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
        <Button onClick={handleCreateRonda} className="w-full sm:w-auto">
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
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRonda(ronda)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRonda(ronda.id)}
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
        
        {filteredRondas.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma ronda encontrada</p>
          </div>
        )}
      </Card>

      {/* Modal de Criação/Edição */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false)
          setSelectedRonda(null)
        }}
        title={selectedRonda ? 'Editar Ronda' : 'Nova Ronda'}
        size="lg"
      >
        <RondaForm
          ronda={selectedRonda}
          onSuccess={() => {
            setIsCreateModalOpen(false)
            setSelectedRonda(null)
          }}
        />
      </Modal>
    </div>
  )
}

// Componente do formulário (será implementado separadamente)
function RondaForm({ ronda, onSuccess }: { ronda?: Ronda | null, onSuccess: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Formulário de ronda será implementado na próxima iteração
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
