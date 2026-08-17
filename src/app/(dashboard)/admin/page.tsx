'use client'

import { Users, Building2, ShoppingBag, DollarSign, TrendingUp, AlertTriangle, Settings } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const stats = [
  { label: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'bg-[#526B91]' },
  { label: 'Active Businesses', value: '89', change: '+5%', icon: Building2, color: 'bg-[#6F9B78]' },
  { label: 'Total Orders', value: '5,678', change: '+18%', icon: ShoppingBag, color: 'bg-[#E9B949]' },
  { label: 'Platform Revenue', value: '$12,345', change: '+22%', icon: DollarSign, color: 'bg-[#E87552]' },
]

const recentActivity = [
  { id: '1', type: 'new_business', message: 'New business registered: Happy Kitchen', time: '5 min ago' },
  { id: '2', type: 'order_dispute', message: 'Order dispute: ORD-12345', time: '15 min ago' },
  { id: '3', type: 'document_verification', message: 'Document pending verification: Golden Crust Bakery', time: '1 hour ago' },
  { id: '4', type: 'new_user', message: 'New user registered: john@example.com', time: '2 hours ago' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#526B91] mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-[#526B91]">{stat.value}</p>
                <p className="text-sm text-[#6F9B78]">{stat.change} from last month</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#526B91]">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-[#526B91]">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'order_dispute' ? 'bg-[#E87552]' :
                  activity.type === 'document_verification' ? 'bg-[#E9B949]' :
                  'bg-[#6F9B78]'
                }`} />
                <div>
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
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
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Building2 className="h-6 w-6" />
              <span>Verify Businesses</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <ShoppingBag className="h-6 w-6" />
              <span>Handle Disputes</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Settings className="h-6 w-6" />
              <span>Platform Settings</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Pending Verifications */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#526B91]">Pending Verifications</h3>
          <Button variant="ghost" size="sm" className="text-[#526B91]">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {[
            { id: '1', business: 'Golden Crust Bakery', document: 'Business License', submitted: '2 hours ago' },
            { id: '2', business: 'Fresh Market', document: 'Health Permit', submitted: '1 day ago' },
          ].map((verification) => (
            <div key={verification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E9B949] rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#526B91]">{verification.business}</p>
                  <p className="text-sm text-gray-600">{verification.document} • Submitted {verification.submitted}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Review</Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
