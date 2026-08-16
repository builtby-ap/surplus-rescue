import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema, forgotPasswordSchema } from '@/lib/validations/auth'

describe('loginSchema', () => {
  it('validates correct login data', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'invalid-email',
      password: 'password123',
    })
    expect(result.success).toBe(false)
  })

  it('rejects short password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '12345',
    })
    expect(result.success).toBe(false)
  })
})

describe('registerSchema', () => {
  it('validates correct registration data', () => {
    const result = registerSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'John Doe',
      role: 'customer',
    })
    expect(result.success).toBe(true)
  })

  it('rejects mismatched passwords', () => {
    const result = registerSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password456',
      fullName: 'John Doe',
      role: 'customer',
    })
    expect(result.success).toBe(false)
  })

  it('rejects short name', () => {
    const result = registerSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'J',
      role: 'customer',
    })
    expect(result.success).toBe(false)
  })
})

describe('forgotPasswordSchema', () => {
  it('validates correct email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'test@example.com',
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'invalid-email',
    })
    expect(result.success).toBe(false)
  })
})
