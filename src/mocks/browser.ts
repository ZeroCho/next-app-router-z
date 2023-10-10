import { setupWorker } from 'msw'
import { handlers } from './handlers'

// This configures a Service Worker with the given request handlers.
const worker = setupWorker(...handlers)

export default worker;