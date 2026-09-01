import { vi } from 'vitest'

// jsdom has no layout engine, so it logs "Not implemented: Window's scrollTo()"
// every time vue-router applies scrollBehavior. Stub it to keep output readable.
vi.stubGlobal('scrollTo', vi.fn())
