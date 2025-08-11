import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autenticação - Sistema de Segurança',
  description: 'Páginas de autenticação do Sistema de Gestão de Segurança',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {children}
    </div>
  )
}
