import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rotas que requerem autenticação
const protectedRoutes = [
  '/dashboard',
  '/rondas',
  '/ocorrencias',
  '/condominios',
  '/usuarios',
  '/relatorios',
  '/configuracoes'
]

// Rotas de autenticação (não devem ser acessadas se já estiver logado)
const authRoutes = [
  '/login',
  '/register',
  '/forgot-password'
]

// Rotas públicas que não precisam de verificação
const publicRoutes = [
  '/',
  '/api',
  '/_next',
  '/favicon.ico'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Verificar se é uma rota pública
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Verificar se é uma rota de autenticação
  if (authRoutes.some(route => pathname.startsWith(route))) {
    // Se já estiver logado, redirecionar para dashboard
    const token = request.cookies.get('access_token')?.value
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Verificar se é uma rota protegida
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('access_token')?.value
    
    // Se não tiver token, redirecionar para login
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Verificar se o token é válido (implementação básica)
    try {
      // Aqui você pode adicionar validação JWT mais robusta
      // Por enquanto, apenas verifica se existe
      if (token) {
        return NextResponse.next()
      }
    } catch (error) {
      // Token inválido, redirecionar para login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
