import { server } from './src/mocks/server';

// Stabilisce un'istanza del server MSW prima di tutti i test
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// Reset di tutti i gestori richiesti tra i test
afterEach(() => server.resetHandlers());

// Chiude il server MSW dopo i test
afterAll(() => server.close());
