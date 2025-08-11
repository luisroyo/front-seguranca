'use client'

import { useEffect, useState } from 'react'
import { useToastGlobal, type Toast } from '@/hooks/useToastGlobal'
import { ToastWithIcon, ToastTitle, ToastDescription } from './toast'
import { AnimatePresence, motion } from 'framer-motion'

export function ToastContainer() {
  const { toasts, removeToast } = useToastGlobal()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ToastWithIcon
              variant={toast.type === 'error' ? 'destructive' : toast.type}
              onOpenChange={() => removeToast(toast.id)}
              className="shadow-lg"
              title={toast.title}
            >
              <div className="flex flex-col space-y-1">
                <ToastTitle>{toast.title}</ToastTitle>
                {toast.description && (
                  <ToastDescription>{toast.description}</ToastDescription>
                )}
              </div>
            </ToastWithIcon>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Componente alternativo sem framer-motion para casos onde não está disponível
export function ToastContainerSimple() {
  const { toasts, removeToast } = useToastGlobal()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-in slide-in-from-right-full duration-300"
        >
          <ToastWithIcon
            variant={toast.type === 'error' ? 'destructive' : toast.type}
            onOpenChange={() => removeToast(toast.id)}
            className="shadow-lg"
            title={toast.title}
          >
            <div className="flex flex-col space-y-1">
              <ToastTitle>{toast.title}</ToastTitle>
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
            </div>
          </ToastWithIcon>
        </div>
      ))}
    </div>
  )
}
