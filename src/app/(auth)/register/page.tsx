'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const { signUp, isLoading } = useAuth()
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setError(null)
    const { error } = await signUp(data.email, data.password, {
      full_name: data.fullName,
      phone: data.phone,
      role: data.role,
    })
    if (error) {
      setError(error.message)
    } else {
      router.push('/verify-email')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#526B91]">Create Account</h1>
        <p className="text-gray-600 mt-2">Join Surplus Rescue today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 bg-[#E87552]/10 border border-[#E87552] rounded-lg text-[#E87552] text-sm">
            {error}
          </div>
        )}

        <Input
          label="Full Name"
          id="fullName"
          {...register('fullName')}
          error={errors.fullName?.message}
        />

        <Input
          label="Email"
          type="email"
          id="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Phone (optional)"
          type="tel"
          id="phone"
          {...register('phone')}
          error={errors.phone?.message}
        />

        <Input
          label="Password"
          type="password"
          id="password"
          {...register('password')}
          error={errors.password?.message}
        />

        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#526B91]">I want to</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="customer"
                {...register('role')}
                className="text-[#526B91] focus:ring-[#526B91]"
              />
              <span>Order food</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="business"
                {...register('role')}
                className="text-[#526B91] focus:ring-[#526B91]"
              />
              <span>Sell surplus food</span>
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-[#526B91] font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
