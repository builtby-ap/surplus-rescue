'use client'

import { Package, Truck, Clock, CheckCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navigation } from '@/components/layout/navigation'

const mockOrders = [
  {
    id: 'ORD-12345',
    item: 'Mixed Lunch Surprise',
    businessName: 'Happy Kitchen',
    fulfillmentType: 'delivery',
    status: 'out_for_delivery',
    totalAmount: 12.98,
    createdAt: '2026-08-17T10:00:00Z',
    estimatedDelivery: '12:30 PM',
  },
  {
    id: 'ORD-12344',
    item: 'Artisan Bread Basket',
    businessName: 'Golden Crust Bakery',
    fulfillmentType: 'pickup',
    status: 'delivered',
    totalAmount: 6.99,
    createdAt: '2026-08-16T14:00:00Z',
    deliveredAt: '2026-08-16T17:30:00Z',
  },
]

const statusConfig = {
  pending: { color: 'bg-gray-100 text-gray-600', icon: Clock, label: 'Pending' },
  confirmed: { color: 'bg-[#526B91]/10 text-[#526B91]', icon: CheckCircle, label: 'Confirmed' },
  preparing: { color: 'bg-[#E9B949]/10 text-[#E9B949]', icon: Package, label: 'Preparing' },
  ready: { color: 'bg-[#6F9B78]/10 text-[#6F9B78]', icon: CheckCircle, label: 'Ready' },
  picked_up: { color: 'bg-[#526B91]/10 text-[#526B91]', icon: Truck, label: 'Picked Up' },
  out_for_delivery: { color: 'bg-[#E9B949]/10 text-[#E9B949]', icon: Truck, label: 'Out for Delivery' },
  delivered: { color: 'bg-[#6F9B78]/10 text-[#6F9B78]', icon: CheckCircle, label: 'Delivered' },
  cancelled: { color: 'bg-[#E87552]/10 text-[#E87552]', icon: Package, label: 'Cancelled' },
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF2]">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#526B91] mb-8">My Orders</h1>

        <div className="space-y-4">
          {mockOrders.map((order) => {
            const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
            const StatusIcon = statusInfo.icon

            return (
              <Card key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#526B91]">{order.item}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color}`}>
                        <StatusIcon className="h-3 w-3 inline mr-1" />
                        {statusInfo.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.businessName}</p>
                  </div>
                  <p className="text-lg font-bold text-[#526B91]">${order.totalAmount.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    {order.fulfillmentType === 'delivery' ? (
                      <Truck className="h-4 w-4" />
                    ) : (
                      <Package className="h-4 w-4" />
                    )}
                    {order.fulfillmentType}
                  </span>
                  <span>Order ID: {order.id}</span>
                  {order.estimatedDelivery && (
                    <span>Est. {order.estimatedDelivery}</span>
                  )}
                </div>

                {/* Order Timeline */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    {['pending', 'confirmed', 'preparing', 'ready', order.fulfillmentType === 'delivery' ? 'out_for_delivery' : 'picked_up', 'delivered'].map((status, index) => {
                      const isCompleted = ['pending', 'confirmed', 'preparing', 'ready', order.fulfillmentType === 'delivery' ? 'out_for_delivery' : 'picked_up', 'delivered'].indexOf(order.status) >= index
                      const isCurrent = status === order.status

                      return (
                        <div key={status} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-[#526B91] text-white' : 'bg-gray-200 text-gray-400'
                          } ${isCurrent ? 'ring-2 ring-[#526B91] ring-offset-2' : ''}`}>
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 mt-1 capitalize">
                            {status.replace('_', ' ')}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  {order.status === 'delivered' && (
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4 mr-1" />
                      Rate Order
                    </Button>
                  )}
                  {order.status === 'out_for_delivery' && (
                    <Button size="sm">
                      <Truck className="h-4 w-4 mr-1" />
                      Track Delivery
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {mockOrders.length === 0 && (
          <Card className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No orders yet</p>
            <Button>Browse Mystery Bags</Button>
          </Card>
        )}
      </div>
    </div>
  )
}
