'use client'

import { ShoppingBag, Heart, MapPin, Star, Clock, TrendingUp, Settings } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const stats = [
  { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'bg-[#526B91]' },
  { label: 'Money Saved', value: '$156', icon: TrendingUp, color: 'bg-[#6F9B78]' },
  { label: 'Favorites', value: '5', icon: Heart, color: 'bg-[#E87552]' },
  { label: 'Avg. Rating Given', value: '4.5', icon: Star, color: 'bg-[#E9B949]' },
]

const recentOrders = [
  { id: '1', item: 'Mixed Lunch Surprise', business: 'Happy Kitchen', status: 'delivered', date: '2026-08-16', amount: 12.98 },
  { id: '2', item: 'Artisan Bread Basket', business: 'Golden Crust Bakery', status: 'delivered', date: '2026-08-14', amount: 6.99 },
  { id: '3', item: 'Fresh Produce Box', business: 'Green Market', status: 'preparing', date: '2026-08-17', amount: 15.98 },
]

const favoriteBags = [
  { id: '1', title: 'Mixed Lunch Surprise', business: 'Happy Kitchen', price: 9.99 },
  { id: '2', title: 'Artisan Bread Basket', business: 'Golden Crust Bakery', price: 6.99 },
]

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#526B91] mb-2">Welcome back!</h2>
        <p className="text-gray-600">Here&apos;s an overview of your account</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-[#526B91]">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#526B91]">Recent Orders</h3>
            <Link href="/customer/orders">
              <Button variant="ghost" size="sm" className="text-[#526B91]">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-[#526B91]">{order.item}</p>
                  <p className="text-sm text-gray-600">{order.business}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.status === 'delivered' ? 'bg-[#6F9B78]/10 text-[#6F9B78]' :
                    order.status === 'preparing' ? 'bg-[#E9B949]/10 text-[#E9B949]' :
                    'bg-[#526B91]/10 text-[#526B91]'
                  }`}>
                    {order.status}
                  </span>
                  <p className="text-sm font-medium text-[#526B91] mt-1">${order.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Favorite Bags */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#526B91]">Favorite Mystery Bags</h3>
            <Link href="/customer/favorites">
              <Button variant="ghost" size="sm" className="text-[#526B91]">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {favoriteBags.map((bag) => (
              <div key={bag.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-[#526B91]">{bag.title}</p>
                  <p className="text-sm text-gray-600">{bag.business}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#526B91]">${bag.price.toFixed(2)}</span>
                  <Button size="sm">Order</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-[#526B91] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
              <ShoppingBag className="h-6 w-6" />
              <span>Browse Bags</span>
            </Button>
          </Link>
          <Link href="/customer/orders">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
              <Clock className="h-6 w-6" />
              <span>Track Orders</span>
            </Button>
          </Link>
          <Link href="/customer/addresses">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
              <MapPin className="h-6 w-6" />
              <span>Manage Addresses</span>
            </Button>
          </Link>
          <Link href="/customer/settings">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
              <Settings className="h-6 w-6" />
              <span>Account Settings</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
