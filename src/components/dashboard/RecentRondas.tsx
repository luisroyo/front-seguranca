'use client'


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Clock, MapPin, CheckCircle, PlayCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Mock data para desenvolvimento
const mockRondas = [
    {
        id: 1,
        condominio: 'Condomínio A',
        dataPlantao: '2024-01-15T08:00:00',
        escalaPlantao: 'Diurno',
        status: 'Concluída',
        totalRondas: 5,
    },
    {
        id: 2,
        condominio: 'Condomínio B',
        dataPlantao: '2024-01-15T20:00:00',
        escalaPlantao: 'Noturno',
        status: 'Em Andamento',
        totalRondas: 3,
    },
    {
        id: 3,
        condominio: 'Condomínio C',
        dataPlantao: '2024-01-15T06:00:00',
        escalaPlantao: 'Diurno',
        status: 'Concluída',
        totalRondas: 4,
    },
    {
        id: 4,
        condominio: 'Condomínio A',
        dataPlantao: '2024-01-14T20:00:00',
        escalaPlantao: 'Noturno',
        status: 'Concluída',
        totalRondas: 6,
    },
]

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Concluída':
            return <CheckCircle className="h-4 w-4 text-green-600" />
        case 'Em Andamento':
            return <PlayCircle className="h-4 w-4 text-blue-600" />
        default:
            return <Clock className="h-4 w-4 text-gray-600" />
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Concluída':
            return 'bg-green-100 text-green-800'
        case 'Em Andamento':
            return 'bg-blue-100 text-blue-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

export function RecentRondas() {
    // TODO: Implementar query real da API
    // const { data: rondas, isLoading } = useQuery({
    //   queryKey: ['recent-rondas'],
    //   queryFn: () => fetch('/api/flask/dashboard/recent-rondas').then(res => res.json()),
    // })

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold">Rondas Recentes</CardTitle>
                <Button variant="outline" size="sm">
                    Ver Todas
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockRondas.map((ronda) => (
                        <div
                            key={ronda.id}
                            className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Shield className="h-4 w-4 text-blue-600" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-900">
                                        {ronda.condominio}
                                    </span>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs text-gray-500 flex items-center">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {ronda.escalaPlantao}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-gray-500 flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {formatDate(ronda.dataPlantao)}
                                    </span>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs text-gray-500">
                                        {ronda.totalRondas} rondas
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 mt-2">
                                    {getStatusIcon(ronda.status)}
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(ronda.status)}`}>
                                        {ronda.status}
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
