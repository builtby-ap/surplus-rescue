'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const { signIn, isLoading } = useAuth()
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setError(null)
    const { error } = await signIn(data.email, data.password)
    if (error) {
      setError(error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#526B91]">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
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

        <Input
          label="Password"
          type="password"
          id="password"
          {...register('password')}
          error={errors.password?.message}
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <div className="text-center space-y-2">
        <Link href="/forgot-password" className="text-sm text-[#526B91] hover:underline">
          Forgot password?
        </Link>
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#526B91] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
