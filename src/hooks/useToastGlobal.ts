import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
  createdAt: Date
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

export const useToastGlobal = create<ToastStore>()(
  persist(
    (set, get) => ({
      toasts: [],
      addToast: (toast) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newToast: Toast = {
          ...toast,
          id,
          createdAt: new Date(),
        }
        
        set((state) => ({
          toasts: [...state.toasts, newToast]
        }))

        // Auto-remove após duração especificada ou padrão
        const duration = toast.duration || 5000
        setTimeout(() => {
          get().removeToast(id)
        }, duration)
      },
      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id)
        }))
      },
      clearToasts: () => {
        set({ toasts: [] })
      },
    }),
    {
      name: 'toast-storage',
      partialize: (state) => ({ toasts: state.toasts.slice(-10) }), // Persistir apenas os últimos 10 toasts
    }
  )
)

// Helpers para tipos específicos de toast
export const toast = {
  success: (title: string, description?: string, duration?: number) => {
    useToastGlobal.getState().addToast({
      type: 'success',
      title,
      description,
      duration,
    })
  },
  error: (title: string, description?: string, duration?: number) => {
    useToastGlobal.getState().addToast({
      type: 'error',
      title,
      description,
      duration,
    })
  },
  warning: (title: string, description?: string, duration?: number) => {
    useToastGlobal.getState().addToast({
      type: 'warning',
      title,
      description,
      duration,
    })
  },
  info: (title: string, description?: string, duration?: number) => {
    useToastGlobal.getState().addToast({
      type: 'info',
      title,
      description,
      duration,
    })
  },
  default: (title: string, description?: string, duration?: number) => {
    useToastGlobal.getState().addToast({
      type: 'default',
      title,
      description,
      duration,
    })
  },
}
