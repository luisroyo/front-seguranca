import { useAuthStore } from '@/stores/authStore'
import { useCallback } from 'react'

export const useAuth = () => {
  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    setUser,
    setTokens,
    logout,
    setLoading,
    clearAuth
  } = useAuthStore()

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      
      // Simula chamada para API de login
      const response = await fetch('/api/flask/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Credenciais inválidas')
      }

      const data = await response.json()
      
      if (data.success) {
        setUser(data.data.user)
        setTokens(data.data.access_token, data.data.refresh_token)
        return { success: true }
      } else {
        throw new Error(data.message || 'Erro no login')
      }
    } catch (error) {
      console.error('Erro no login:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      }
    } finally {
      setLoading(false)
    }
  }, [setUser, setTokens, setLoading])

  const refreshAuth = useCallback(async () => {
    if (!refreshToken) {
      logout()
      return false
    }

    try {
      const response = await fetch('/api/flask/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })

      if (!response.ok) {
        throw new Error('Token de refresh inválido')
      }

      const data = await response.json()
      
      if (data.success) {
        setTokens(data.data.access_token, refreshToken)
        return true
      } else {
        throw new Error(data.message || 'Erro ao renovar token')
      }
    } catch (error) {
      console.error('Erro ao renovar token:', error)
      logout()
      return false
    }
  }, [refreshToken, setTokens, logout])

  const logoutUser = useCallback(() => {
    logout()
  }, [logout])

  return {
    // Estado
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    
    // Ações
    login,
    logout: logoutUser,
    refreshAuth,
    
    // Permissões derivadas
    isAdmin: user?.role === 'admin',
    isSupervisor: user?.role === 'supervisor' || user?.role === 'admin',
    isColaborador: user?.role === 'colaborador',
    
    // Permissões específicas
    canManageUsers: user?.role === 'admin',
    canManageCondominios: user?.role === 'admin' || user?.role === 'supervisor',
    canManageRondas: user?.role === 'admin' || user?.role === 'supervisor' || user?.role === 'colaborador',
    canManageOcorrencias: user?.role === 'admin' || user?.role === 'supervisor' || user?.role === 'colaborador',
    canViewReports: user?.role === 'admin' || user?.role === 'supervisor',
  }
}
