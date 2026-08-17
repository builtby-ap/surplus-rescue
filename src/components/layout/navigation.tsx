'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, ShoppingCart, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#526B91] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SR</span>
            </div>
            <span className="text-xl font-bold text-[#526B91] hidden sm:block">Surplus Rescue</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search mystery bags..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#526B91] focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/mystery-bags" className="text-gray-600 hover:text-[#526B91] font-medium">
              Browse
            </Link>

            {user ? (
              <>
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <div className="relative group">
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 hidden group-hover:block">
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search mystery bags..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#526B91] focus:border-transparent"
              />
            </div>
            <Link
              href="/mystery-bags"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#526B91] hover:bg-gray-50"
            >
              Browse
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#526B91] hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <Link
                  href="/orders"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#526B91] hover:bg-gray-50"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-[#526B91] hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
