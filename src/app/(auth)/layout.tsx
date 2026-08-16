import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-[#FFFBF2] flex items-center justify-center ${inter.className}`}>
      <div className="w-full max-w-md p-8">
        {children}
      </div>
    </div>
  )
}
