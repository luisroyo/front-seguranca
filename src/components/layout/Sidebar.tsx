'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/stores/authStore'
import {
  Home,
  Shield,
  FileText,
  Users,
  Settings,
  BarChart3,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Rondas', href: '/rondas', icon: Shield },
  { name: 'Rondas Tempo Real', href: '/rondas-tempo-real', icon: Clock },
  { name: 'Ocorrências', href: '/ocorrencias', icon: AlertTriangle },
  { name: 'Relatórios', href: '/relatorios', icon: FileText },
  { name: 'Usuários', href: '/admin/users', icon: Users, admin: true },
  { name: 'Colaboradores', href: '/admin/colaboradores', icon: Users, admin: true },
  { name: 'Escalas', href: '/admin/escalas', icon: Clock, admin: true },
  { name: 'Ferramentas', href: '/admin/tools', icon: Settings, admin: true },
  { name: 'Analytics', href: '/admin/dashboard', icon: BarChart3, admin: true },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { isAdmin } = useAuth()

  const filteredNavigation = navigation.filter(item => 
    !item.admin || isAdmin
  )

  return (
    <div
      className={cn(
        'flex flex-col bg-white border-r border-gray-200 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-lg font-semibold text-gray-900">
            Segurança
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="ml-3">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Sistema de Gestão de Segurança
          </div>
        </div>
      )}
    </div>
  )
}
