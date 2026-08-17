'use client'

import { TrendingUp, DollarSign, ShoppingBag, Users, Clock, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'

const analyticsData = {
  revenue: {
    today: 245,
    thisWeek: 1850,
    thisMonth: 7200,
    change: 12,
  },
  orders: {
    today: 18,
    thisWeek: 142,
    thisMonth: 580,
    change: 8,
  },
  customers: {
    new: 12,
    returning: 45,
    total: 156,
  },
  ratings: {
    average: 4.8,
    total: 89,
    distribution: [2, 3, 5, 15, 64],
  },
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#526B91] mb-2">Analytics</h2>
        <p className="text-gray-600">Track your business performance</p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today&apos;s Revenue</p>
              <p className="text-2xl font-bold text-[#526B91]">${analyticsData.revenue.today}</p>
              <p className="text-sm text-[#6F9B78]">+{analyticsData.revenue.change}% from yesterday</p>
            </div>
            <div className="w-12 h-12 bg-[#6F9B78] rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-[#526B91]">${analyticsData.revenue.thisWeek}</p>
              <p className="text-sm text-[#6F9B78]">+15% from last week</p>
            </div>
            <div className="w-12 h-12 bg-[#526B91] rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-[#526B91]">${analyticsData.revenue.thisMonth}</p>
              <p className="text-sm text-[#6F9B78]">+22% from last month</p>
            </div>
            <div className="w-12 h-12 bg-[#E9B949] rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4">Orders Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Today</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="w-1/3 h-2 bg-[#526B91] rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-[#526B91]">{analyticsData.orders.today}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">This Week</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="w-2/3 h-2 bg-[#526B91] rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-[#526B91]">{analyticsData.orders.thisWeek}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">This Month</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="w-full h-2 bg-[#526B91] rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-[#526B91]">{analyticsData.orders.thisMonth}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Customer Stats */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4">Customer Insights</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#6F9B78]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-[#6F9B78]" />
              </div>
              <p className="text-2xl font-bold text-[#526B91]">{analyticsData.customers.new}</p>
              <p className="text-sm text-gray-600">New</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#E9B949]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-[#E9B949]" />
              </div>
              <p className="text-2xl font-bold text-[#526B91]">{analyticsData.customers.returning}</p>
              <p className="text-sm text-gray-600">Returning</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#526B91]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-[#526B91]" />
              </div>
              <p className="text-2xl font-bold text-[#526B91]">{analyticsData.customers.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </Card>

        {/* Ratings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4">Ratings</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#526B91]">{analyticsData.ratings.average}</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= analyticsData.ratings.average
                        ? 'fill-[#E9B949] text-[#E9B949]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{analyticsData.ratings.total} reviews</p>
            </div>
            <div className="flex-1 space-y-2">
              {analyticsData.ratings.distribution.reverse().map((count, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-4">{5 - index}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-[#E9B949] rounded-full"
                      style={{ width: `${(count / analyticsData.ratings.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4">Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg. Preparation Time</span>
              <span className="font-medium text-[#526B91]">12 min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Completion Rate</span>
              <span className="font-medium text-[#6F9B78]">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">On-Time Delivery</span>
              <span className="font-medium text-[#6F9B78]">95%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="font-medium text-[#E9B949]">4.8/5</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
