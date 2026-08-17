'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Heart, MapPin, Settings, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const sidebarItems = [
  { href: '/customer', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/customer/orders', label: 'My Orders', icon: ShoppingBag },
  { href: '/customer/favorites', label: 'Favorites', icon: Heart },
  { href: '/customer/addresses', label: 'Addresses', icon: MapPin },
  { href: '/customer/settings', label: 'Settings', icon: Settings },
]

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#FFFBF2]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-[#526B91]">
              <ChevronLeft className="h-5 w-5" />
              <span>Back to Store</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-[#526B91]">My Account</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Browse Mystery Bags
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#526B91] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
