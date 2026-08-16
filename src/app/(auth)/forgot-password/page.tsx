'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { resetPassword, isLoading } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    setError(null)
    const { error } = await resetPassword(data.email)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <h1 className="text-2xl font-bold text-[#526B91]">Check Your Email</h1>
        <p className="text-gray-600">
          We've sent a password reset link to your email address.
        </p>
        <Link href="/login" className="text-[#526B91] font-medium hover:underline">
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#526B91]">Reset Password</h1>
        <p className="text-gray-600 mt-2">Enter your email to reset your password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 bg-[#E87552]/10 border border-[#E87552] rounded-lg text-[#E87552] text-sm">
            {error}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          id="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Send Reset Link
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Remember your password?{' '}
        <Link href="/login" className="text-[#526B91] font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
