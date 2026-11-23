import path from 'path'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@payload-config': path.resolve(
                dirname,
                'src/cms/payload.config.ts'
            ),
            '@': path.resolve(dirname, 'src'),
        },
    },
    test: {
        environment: 'jsdom',
        // reuses the jsdom environment per worker (~4x faster, still isolated per file)
        pool: 'vmThreads',
        setupFiles: ['./src/test/setup.ts'],
        include: ['src/**/*.test.{ts,tsx}'],
        env: { BASE_URL: 'https://www.example.com' },
    },
})
