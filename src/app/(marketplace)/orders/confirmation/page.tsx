'use client'

import { CheckCircle, Truck, MapPin, Clock, ArrowRight, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navigation } from '@/components/layout/navigation'
import Link from 'next/link'

export default function OrderConfirmationPage() {
  // Mock order data
  const order = {
    id: 'ORD-12345',
    fulfillmentType: 'delivery' as const,
    deliveryAddress: '123 Main St, Downtown',
    timeSlot: '12:00 - 13:00',
    totalAmount: 12.98,
    estimatedDelivery: '12:30 PM',
  }

  return (
    <div className="min-h-screen bg-[#FFFBF2]">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card className="p-8 text-center">
          <div className="w-20 h-20 bg-[#6F9B78] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-[#526B91] mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Thank you for your order. We&apos;re preparing your mystery bag.</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="text-lg font-bold text-[#526B91]">{order.id}</p>
          </div>

          <div className="space-y-4 text-left mb-8">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              {order.fulfillmentType === 'delivery' ? (
                <Truck className="h-6 w-6 text-[#526B91]" />
              ) : (
                <MapPin className="h-6 w-6 text-[#526B91]" />
              )}
              <div>
                <p className="font-medium text-[#526B91] capitalize">{order.fulfillmentType}</p>
                {order.fulfillmentType === 'delivery' && (
                  <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 text-[#526B91]" />
              <div>
                <p className="font-medium text-[#526B91]">Time Slot</p>
                <p className="text-sm text-gray-600">{order.timeSlot}</p>
              </div>
            </div>

            {order.fulfillmentType === 'delivery' && (
              <div className="flex items-center gap-4 p-4 bg-[#6F9B78]/10 rounded-lg">
                <Truck className="h-6 w-6 text-[#6F9B78]" />
                <div>
                  <p className="font-medium text-[#6F9B78]">Estimated Delivery</p>
                  <p className="text-sm text-gray-600">{order.estimatedDelivery}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <CreditCard className="h-5 w-5 text-[#526B91]" />
            <span className="text-[#526B91]">Pay ${order.totalAmount.toFixed(2)} cash on {order.fulfillmentType === 'delivery' ? 'delivery' : 'pickup'}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/orders">
              <Button variant="outline">Track Order</Button>
            </Link>
            <Link href="/">
              <Button>
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
