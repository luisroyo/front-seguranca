'use client'


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Clock, MapPin } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Mock data para desenvolvimento
const mockOcorrencias = [
    {
        id: 1,
        tipo: 'Segurança',
        condominio: 'Condomínio A',
        data: '2024-01-15T10:30:00',
        descricao: 'Ocorrência de segurança registrada no portão principal',
    },
    {
        id: 2,
        tipo: 'Manutenção',
        condominio: 'Condomínio B',
        data: '2024-01-15T09:15:00',
        descricao: 'Problema de manutenção identificado na área comum',
    },
    {
        id: 3,
        tipo: 'Segurança',
        condominio: 'Condomínio C',
        data: '2024-01-15T08:45:00',
        descricao: 'Suspeita de invasão reportada por morador',
    },
    {
        id: 4,
        tipo: 'Manutenção',
        condominio: 'Condomínio A',
        data: '2024-01-15T07:30:00',
        descricao: 'Vazamento de água na garagem',
    },
]

export function RecentOcorrencias() {
    // TODO: Implementar query real da API
    // const { data: ocorrencias, isLoading } = useQuery({
    //   queryKey: ['recent-ocorrencias'],
    //   queryFn: () => fetch('/api/flask/dashboard/recent-ocorrencias').then(res => res.json()),
    // })

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold">Ocorrências Recentes</CardTitle>
                <Button variant="outline" size="sm">
                    Ver Todas
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockOcorrencias.map((ocorrencia) => (
                        <div
                            key={ocorrencia.id}
                            className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <AlertTriangle className="h-4 w-4 text-red-600" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-900">
                                        {ocorrencia.tipo}
                                    </span>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs text-gray-500 flex items-center">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {ocorrencia.condominio}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {ocorrencia.descricao}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 mt-2">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {formatDate(ocorrencia.data)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
