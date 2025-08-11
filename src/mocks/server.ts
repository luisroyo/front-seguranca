import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Configuração do MSW para o servidor (SSR)
export const server = setupServer(...handlers)

// Inicializa o servidor quando em desenvolvimento
if (process.env.NODE_ENV === 'development') {
    server.listen({
        onUnhandledRequest: 'bypass' // Ignora requisições não tratadas
    })
}
