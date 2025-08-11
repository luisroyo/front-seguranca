'use client'

import { useState } from 'react'
import { Users, Shield, Settings, Plus, Search, UserPlus, Building, Key } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Table } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { Select } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('usuarios')
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Dados mockados para demonstração
  const usuarios = [
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@empresa.com',
      cargo: 'Administrador',
      status: 'ativo',
      ultimo_acesso: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria@empresa.com',
      cargo: 'Supervisor',
      status: 'ativo',
      ultimo_acesso: '2024-01-15T09:15:00Z'
    }
  ]

  const colaboradores = [
    {
      id: 1,
      nome: 'Pedro Costa',
      email: 'pedro@empresa.com',
      funcao: 'Guarda',
      condominio: 'Residencial Verde',
      status: 'ativo',
      turno: 'Noturno'
    },
    {
      id: 2,
      nome: 'Ana Oliveira',
      email: 'ana@empresa.com',
      funcao: 'Guarda',
      condominio: 'Residencial Azul',
      status: 'ativo',
      turno: 'Diurno'
    }
  ]

  const condominios = [
    {
      id: 1,
      nome: 'Residencial Verde',
      endereco: 'Rua das Flores, 123',
      status: 'ativo',
      total_unidades: 120,
      responsavel: 'João Silva'
    },
    {
      id: 2,
      nome: 'Residencial Azul',
      endereco: 'Av. Principal, 456',
      status: 'ativo',
      total_unidades: 80,
      responsavel: 'Maria Santos'
    }
  ]

  const handleCreate = () => {
    setIsCreateModalOpen(true)
  }

  const getStatusColor = (status: string) => {
    return status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getStatusLabel = (status: string) => {
    return status === 'ativo' ? 'Ativo' : 'Inativo'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administração do Sistema</h1>
          <p className="text-gray-600">Gerencie usuários, colaboradores e configurações</p>
        </div>
        <Button onClick={handleCreate} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{usuarios.length}</p>
              <p className="text-sm text-gray-600">Usuários</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{colaboradores.length}</p>
              <p className="text-sm text-gray-600">Colaboradores</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{condominios.length}</p>
              <p className="text-sm text-gray-600">Condomínios</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Perfis</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs de Navegação */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usuarios" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="colaboradores" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Colaboradores
            </TabsTrigger>
            <TabsTrigger value="condominios" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Condomínios
            </TabsTrigger>
          </TabsList>

          {/* Tab Usuários */}
          <TabsContent value="usuarios" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value="todos"
                onValueChange={() => {}}
                options={[
                  { value: 'todos', label: 'Todos os Status' },
                  { value: 'ativo', label: 'Ativo' },
                  { value: 'inativo', label: 'Inativo' }
                ]}
                className="w-full sm:w-48"
              />
            </div>

            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Nome</Table.Head>
                  <Table.Head>Email</Table.Head>
                  <Table.Head>Cargo</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Último Acesso</Table.Head>
                  <Table.Head>Ações</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {usuarios.map((usuario) => (
                  <Table.Row key={usuario.id}>
                    <Table.Cell className="font-medium">{usuario.nome}</Table.Cell>
                    <Table.Cell>{usuario.email}</Table.Cell>
                    <Table.Cell>{usuario.cargo}</Table.Cell>
                    <Table.Cell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(usuario.status)}`}>
                        {getStatusLabel(usuario.status)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(usuario.ultimo_acesso).toLocaleDateString('pt-BR')}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="outline" size="sm" className="text-red-600">Excluir</Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </TabsContent>

          {/* Tab Colaboradores */}
          <TabsContent value="colaboradores" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar colaboradores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value="todos"
                onValueChange={() => {}}
                options={[
                  { value: 'todos', label: 'Todos os Turnos' },
                  { value: 'diurno', label: 'Diurno' },
                  { value: 'noturno', label: 'Noturno' }
                ]}
                className="w-full sm:w-48"
              />
            </div>

            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Nome</Table.Head>
                  <Table.Head>Email</Table.Head>
                  <Table.Head>Função</Table.Head>
                  <Table.Head>Condomínio</Table.Head>
                  <Table.Head>Turno</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Ações</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {colaboradores.map((colaborador) => (
                  <Table.Row key={colaborador.id}>
                    <Table.Cell className="font-medium">{colaborador.nome}</Table.Cell>
                    <Table.Cell>{colaborador.email}</Table.Cell>
                    <Table.Cell>{colaborador.funcao}</Table.Cell>
                    <Table.Cell>{colaborador.condominio}</Table.Cell>
                    <Table.Cell>{colaborador.turno}</Table.Cell>
                    <Table.Cell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(colaborador.status)}`}>
                        {getStatusLabel(colaborador.status)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="outline" size="sm" className="text-red-600">Excluir</Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </TabsContent>

          {/* Tab Condomínios */}
          <TabsContent value="condominios" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar condomínios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value="todos"
                onValueChange={() => {}}
                options={[
                  { value: 'todos', label: 'Todos os Status' },
                  { value: 'ativo', label: 'Ativo' },
                  { value: 'inativo', label: 'Inativo' }
                ]}
                className="w-full sm:w-48"
              />
            </div>

            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Nome</Table.Head>
                  <Table.Head>Endereço</Table.Head>
                  <Table.Head>Unidades</Table.Head>
                  <Table.Head>Responsável</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Ações</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {condominios.map((condominio) => (
                  <Table.Row key={condominio.id}>
                    <Table.Cell className="font-medium">{condominio.nome}</Table.Cell>
                    <Table.Cell>{condominio.endereco}</Table.Cell>
                    <Table.Cell>{condominio.total_unidades}</Table.Cell>
                    <Table.Cell>{condominio.responsavel}</Table.Cell>
                    <Table.Cell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(condominio.status)}`}>
                        {getStatusLabel(condominio.status)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="outline" size="sm" className="text-red-600">Excluir</Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Modal de Criação */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Adicionar Novo Item"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Formulário será implementado na próxima iteração
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsCreateModalOpen(false)}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
