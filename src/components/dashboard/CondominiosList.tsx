'use client'


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, MapPin, Users, Shield } from 'lucide-react'

// Mock data para desenvolvimento
const mockCondominios = [
    {
        id: 1,
        nome: 'Condomínio A',
        endereco: 'Rua das Flores, 123',
        totalMoradores: 150,
        status: 'Ativo',
        rondasHoje: 3,
    },
    {
        id: 2,
        nome: 'Condomínio B',
        endereco: 'Avenida Principal, 456',
        totalMoradores: 89,
        status: 'Ativo',
        rondasHoje: 2,
    },
    {
        id: 3,
        nome: 'Condomínio C',
        endereco: 'Travessa da Paz, 789',
        totalMoradores: 67,
        status: 'Ativo',
        rondasHoje: 1,
    },
    {
        id: 4,
        nome: 'Condomínio D',
        endereco: 'Rua do Comércio, 321',
        totalMoradores: 120,
        status: 'Ativo',
        rondasHoje: 4,
    },
]

export function CondominiosList() {
    // TODO: Implementar query real da API
    // const { data: condominios, isLoading } = useQuery({
    //   queryKey: ['condominios'],
    //   queryFn: () => fetch('/api/flask/dashboard/condominios').then(res => res.json()),
    // })

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold">Condomínios</CardTitle>
                <Button variant="outline" size="sm">
                    Ver Todos
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockCondominios.map((condominio) => (
                        <div
                            key={condominio.id}
                            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                    <Building2 className="h-5 w-5 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{condominio.nome}</h3>
                                    <p className="text-xs text-gray-500 flex items-center">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {condominio.endereco}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 flex items-center">
                                        <Users className="h-3 w-3 mr-1" />
                                        Moradores
                                    </span>
                                    <span className="font-medium">{condominio.totalMoradores}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 flex items-center">
                                        <Shield className="h-3 w-3 mr-1" />
                                        Rondas Hoje
                                    </span>
                                    <span className="font-medium text-primary-600">
                                        {condominio.rondasHoje}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Status</span>
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                        {condominio.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
