import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// The data cache needs a running Next.js server; in tests every query hits the (mocked) Payload client.
vi.mock('next/cache', () => ({
    unstable_cache: <T>(fn: T) => fn,
    revalidateTag: vi.fn(),
}))

afterEach(() => cleanup())
