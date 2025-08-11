'use client'

import { useState } from 'react'
import { Users, Shield, Settings, Plus, Search, UserPlus, Building, Key, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Table } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { Select } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UsuarioForm } from '@/components/forms/UsuarioForm'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('usuarios')
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Dados mockados para demonstração
  const usuarios = [
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@exemplo.com',
      telefone: '(11) 99999-9999',
      cpf: '123.456.789-00',
      role: 'admin',
      condominio_id: 1,
      condominio: { id: 1, nome: 'Residencial Solar' },
      ativo: true
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria@exemplo.com',
      telefone: '(11) 88888-8888',
      cpf: '987.654.321-00',
      role: 'gerente',
      condominio_id: 2,
      condominio: { id: 2, nome: 'Condomínio Verde' },
      ativo: true
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      email: 'pedro@exemplo.com',
      telefone: '(11) 77777-7777',
      cpf: '456.789.123-00',
      role: 'guarda',
      condominio_id: 1,
      condominio: { id: 1, nome: 'Residencial Solar' },
      ativo: false
    }
  ]

  const colaboradores = [
    {
      id: 1,
      nome: 'Carlos Oliveira',
      email: 'carlos@exemplo.com',
      funcao: 'Guarda',
      condominio: 'Residencial Solar',
      status: 'ativo',
      turno: 'Noturno'
    },
    {
      id: 2,
      nome: 'Ana Paula',
      email: 'ana@exemplo.com',
      funcao: 'Porteiro',
      condominio: 'Condomínio Verde',
      status: 'ativo',
      turno: 'Diurno'
    }
  ]

  const condominios = [
    {
      id: 1,
      nome: 'Residencial Solar',
      endereco: 'Rua das Flores, 123',
      status: 'ativo',
      total_unidades: 50,
      responsavel: 'João Silva'
    },
    {
      id: 2,
      nome: 'Condomínio Verde',
      endereco: 'Av. Principal, 456',
      status: 'ativo',
      total_unidades: 30,
      responsavel: 'Maria Santos'
    }
  ]

  const handleCreate = () => {
    setIsCreateModalOpen(true)
  }

  const handleCreateUsuario = async (data: any) => {
    setIsLoading(true)
    try {
      // TODO: Implementar chamada para API
      console.log('Criando usuário:', data)
      setIsCreateModalOpen(false)
      // Recarregar dados
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditUsuario = async (data: any) => {
    setIsLoading(true)
    try {
      // TODO: Implementar chamada para API
      console.log('Editando usuário:', data)
      setIsEditModalOpen(false)
      setSelectedUsuario(null)
      // Recarregar dados
    } catch (error) {
      console.error('Erro ao editar usuário:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUsuario = async (usuario: any) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setIsLoading(true)
      try {
        // TODO: Implementar chamada para API
        console.log('Excluindo usuário:', usuario.id)
        // Recarregar dados
      } catch (error) {
        console.error('Erro ao excluir usuário:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const openEditModal = (usuario: any) => {
    setSelectedUsuario(usuario)
    setIsEditModalOpen(true)
  }

  const openViewModal = (usuario: any) => {
    setSelectedUsuario(usuario)
    setIsViewModalOpen(true)
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
          Adicionar Usuário
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
                  <Table.Head>Telefone</Table.Head>
                  <Table.Head>Função</Table.Head>
                  <Table.Head>Condomínio</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Ações</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {usuarios.map((usuario) => (
                  <Table.Row key={usuario.id}>
                    <Table.Cell className="font-medium">{usuario.nome}</Table.Cell>
                    <Table.Cell>{usuario.email}</Table.Cell>
                    <Table.Cell>{usuario.telefone}</Table.Cell>
                    <Table.Cell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        usuario.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        usuario.role === 'gerente' ? 'bg-blue-100 text-blue-800' :
                        usuario.role === 'guarda' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {usuario.role === 'admin' ? 'Administrador' :
                         usuario.role === 'gerente' ? 'Gerente' :
                         usuario.role === 'guarda' ? 'Guarda' : 'Usuário'}
                      </span>
                    </Table.Cell>
                    <Table.Cell>{usuario.condominio.nome}</Table.Cell>
                    <Table.Cell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(usuario.ativo ? 'ativo' : 'inativo')}`}>
                        {getStatusLabel(usuario.ativo ? 'ativo' : 'inativo')}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewModal(usuario)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(usuario)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUsuario(usuario)}
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
        title="Novo Usuário"
        size="lg"
      >
        <UsuarioForm
          usuario={null}
          onSubmit={handleCreateUsuario}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUsuario(null)
        }}
        title="Editar Usuário"
        size="lg"
      >
        <UsuarioForm
          usuario={selectedUsuario}
          onSubmit={handleEditUsuario}
          onCancel={() => setIsEditModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      {/* Modal de Visualização */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedUsuario(null)
        }}
        title="Detalhes do Usuário"
        size="lg"
      >
        {selectedUsuario && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nome</h3>
                <p className="text-lg font-medium text-gray-900">{selectedUsuario.nome}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-lg font-medium text-gray-900">{selectedUsuario.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Telefone</h3>
                <p className="text-lg font-medium text-gray-900">{selectedUsuario.telefone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">CPF</h3>
                <p className="text-lg font-medium text-gray-900">{selectedUsuario.cpf}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Função</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedUsuario.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                  selectedUsuario.role === 'gerente' ? 'bg-blue-100 text-blue-800' :
                  selectedUsuario.role === 'guarda' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedUsuario.role === 'admin' ? 'Administrador' :
                   selectedUsuario.role === 'gerente' ? 'Gerente' :
                   selectedUsuario.role === 'guarda' ? 'Guarda' : 'Usuário'}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Condomínio</h3>
                <p className="text-lg font-medium text-gray-900">{selectedUsuario.condominio.nome}</p>
              </div>
            </div>
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
