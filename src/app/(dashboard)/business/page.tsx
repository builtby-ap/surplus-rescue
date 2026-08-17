'use client'

import { TrendingUp, Package, ShoppingBag, DollarSign, Clock, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const stats = [
  { label: 'Total Revenue', value: '$2,450', change: '+12%', icon: DollarSign, color: 'bg-[#6F9B78]' },
  { label: 'Orders Today', value: '18', change: '+5%', icon: ShoppingBag, color: 'bg-[#526B91]' },
  { label: 'Active Mystery Bags', value: '12', change: '+2', icon: Package, color: 'bg-[#E9B949]' },
  { label: 'Average Rating', value: '4.8', change: '+0.2', icon: Star, color: 'bg-[#E87552]' },
]

const recentOrders = [
  { id: '1', customer: 'John D.', item: 'Mixed Lunch Surprise', status: 'preparing', time: '10 min ago' },
  { id: '2', customer: 'Sarah M.', item: 'Artisan Bread Basket', status: 'ready', time: '25 min ago' },
  { id: '3', customer: 'Mike R.', item: 'Fresh Produce Box', status: 'delivered', time: '1 hour ago' },
]

export default function BusinessDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#526B91] mb-2">Welcome back!</h2>
        <p className="text-gray-600">Here&apos;s what&apos;s happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-[#526B91]">{stat.value}</p>
                <p className="text-sm text-[#6F9B78]">{stat.change} from yesterday</p>
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
            <Button variant="ghost" size="sm" className="text-[#526B91]">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-[#526B91]">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.item}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.status === 'preparing' ? 'bg-[#E9B949]/10 text-[#E9B949]' :
                    order.status === 'ready' ? 'bg-[#6F9B78]/10 text-[#6F9B78]' :
                    'bg-[#526B91]/10 text-[#526B91]'
                  }`}>
                    {order.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Package className="h-6 w-6" />
              <span>Create Mystery Bag</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Clock className="h-6 w-6" />
              <span>Manage Time Slots</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <ShoppingBag className="h-6 w-6" />
              <span>Update Delivery Settings</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-[#526B91] mb-4">Weekly Performance</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart will be implemented with actual data</p>
        </div>
      </Card>
    </div>
  )
}
