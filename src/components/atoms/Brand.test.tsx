import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Brand } from './Brand'

describe('Brand', () => {
    it('links the logo to the home page', () => {
        render(<Brand />)
        expect(
            screen.getByRole('link', { name: 'Moments of Love Logo - Home' })
        ).toHaveAttribute('href', '/')
    })
})
