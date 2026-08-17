'use client'

import { useState } from 'react'
import { Package, Truck, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const mockOrders = [
  {
    id: '1',
    customer: 'John D.',
    item: 'Mixed Lunch Surprise',
    fulfillmentType: 'delivery',
    status: 'preparing',
    totalAmount: 12.98,
    deliveryAddress: '123 Main St, Downtown',
    timeSlot: '12:00-13:00',
    createdAt: '10 min ago',
  },
  {
    id: '2',
    customer: 'Sarah M.',
    item: 'Artisan Bread Basket',
    fulfillmentType: 'pickup',
    status: 'ready',
    totalAmount: 6.99,
    timeSlot: '17:00-18:00',
    createdAt: '25 min ago',
  },
  {
    id: '3',
    customer: 'Mike R.',
    item: 'Fresh Produce Box',
    fulfillmentType: 'delivery',
    status: 'delivered',
    totalAmount: 15.98,
    deliveryAddress: '456 Oak Ave, Midtown',
    timeSlot: '10:00-11:00',
    createdAt: '1 hour ago',
  },
]

const statusConfig = {
  pending: { color: 'bg-gray-100 text-gray-600', icon: Clock },
  confirmed: { color: 'bg-[#526B91]/10 text-[#526B91]', icon: CheckCircle },
  preparing: { color: 'bg-[#E9B949]/10 text-[#E9B949]', icon: Package },
  ready: { color: 'bg-[#6F9B78]/10 text-[#6F9B78]', icon: CheckCircle },
  picked_up: { color: 'bg-[#526B91]/10 text-[#526B91]', icon: Truck },
  out_for_delivery: { color: 'bg-[#E9B949]/10 text-[#E9B949]', icon: Truck },
  delivered: { color: 'bg-[#6F9B78]/10 text-[#6F9B78]', icon: CheckCircle },
  cancelled: { color: 'bg-[#E87552]/10 text-[#E87552]', icon: XCircle },
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<string>('all')

  const filteredOrders = filter === 'all'
    ? mockOrders
    : mockOrders.filter(order => order.status === filter)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#526B91] mb-2">Orders</h2>
        <p className="text-gray-600">Manage incoming orders and update their status</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'confirmed', 'preparing', 'ready', 'delivered'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
          const StatusIcon = statusInfo.icon

          return (
            <Card key={order.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#526B91]">{order.customer}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color}`}>
                        <StatusIcon className="h-3 w-3 inline mr-1" />
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{order.item}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        {order.fulfillmentType === 'delivery' ? (
                          <Truck className="h-4 w-4" />
                        ) : (
                          <Package className="h-4 w-4" />
                        )}
                        {order.fulfillmentType}
                      </span>
                      <span>Time slot: {order.timeSlot}</span>
                      <span>{order.createdAt}</span>
                    </div>
                    {order.deliveryAddress && (
                      <p className="text-sm text-gray-500 mt-1">
                        📍 {order.deliveryAddress}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#526B91]">${order.totalAmount.toFixed(2)}</p>
                  <div className="flex gap-2 mt-2">
                    {order.status === 'preparing' && (
                      <Button size="sm">Mark Ready</Button>
                    )}
                    {order.status === 'ready' && order.fulfillmentType === 'pickup' && (
                      <Button size="sm">Mark Picked Up</Button>
                    )}
                    {order.status === 'ready' && order.fulfillmentType === 'delivery' && (
                      <Button size="sm">Mark Out for Delivery</Button>
                    )}
                    {order.status === 'out_for_delivery' && (
                      <Button size="sm">Mark Delivered</Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No orders found</p>
        </Card>
      )}
    </div>
  )
}
