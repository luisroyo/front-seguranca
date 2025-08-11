import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Configuração do MSW para o browser
export const worker = setupWorker(...handlers)

// Inicializa o worker quando em desenvolvimento
if (process.env.NODE_ENV === 'development') {
    worker.start({
        onUnhandledRequest: 'bypass', // Ignora requisições não tratadas
        serviceWorker: {
            url: '/mockServiceWorker.js'
        }
    })
}
