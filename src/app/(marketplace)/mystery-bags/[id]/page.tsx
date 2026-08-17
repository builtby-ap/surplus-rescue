'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, MapPin, Tag, Truck, ShoppingBag, Star, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navigation } from '@/components/layout/navigation'
import Link from 'next/link'

type FulfillmentType = 'delivery' | 'pickup'

// Mock data for demonstration
const mockMysteryBag = {
  id: '1',
  title: 'Mixed Lunch Surprise',
  description: 'A delicious assortment of today\'s freshest dishes, carefully curated from our kitchen to your table. Includes appetizers, main course, and a dessert!',
  category: 'mixed_meals',
  originalValue: 25.00,
  sellingPrice: 9.99,
  quantityAvailable: 5,
  quantitySold: 12,
  imageUrl: null,
  business: {
    id: 'biz-1',
    name: 'Happy Kitchen',
    type: 'restaurant',
    city: 'Downtown',
    address: '123 Main St, Downtown',
    rating: 4.8,
    reviewCount: 89,
    latitude: 40.7128,
    longitude: -74.0060,
  },
  availableUntil: '2026-08-17T14:00:00Z',
  offersDelivery: true,
  offersPickup: true,
  deliveryRadius: 5.0,
  deliveryFee: 2.99,
  minimumOrderForDelivery: 15.00,
  pickupInstructions: 'Pick up at the front counter. Show your order confirmation.',
  timeSlots: ['10:00 - 11:00', '12:00 - 13:00', '17:00 - 18:00'],
}

const mockReviews = [
  { id: '1', customer: 'John D.', rating: 5, comment: 'Amazing food! Great value for money.', date: '2026-08-15' },
  { id: '2', customer: 'Sarah M.', rating: 4, comment: 'Delicious meal, will order again.', date: '2026-08-14' },
]

export default function MysteryBagDetailPage() {
  const router = useRouter()
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('delivery')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  const bag = mockMysteryBag
  const discountPercentage = Math.round(((bag.originalValue - bag.sellingPrice) / bag.originalValue) * 100)

  const formatCategory = (cat: string) => {
    return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleAddToOrder = () => {
    // Add to cart and navigate to checkout
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-[#FFFBF2]">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#526B91] mb-6">
          <ArrowLeft className="h-5 w-5" />
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden">
              {bag.imageUrl ? (
                <img
                  src={bag.imageUrl}
                  alt={bag.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Tag className="h-24 w-24" />
                </div>
              )}
              <div className="absolute top-4 right-4 bg-[#E87552] text-white px-3 py-1 rounded-full text-lg font-bold">
                -{discountPercentage}%
              </div>
              <div className="absolute top-4 left-4 bg-[#526B91] text-white px-3 py-1 rounded-full text-sm font-medium">
                {formatCategory(bag.category)}
              </div>
            </div>

            {/* Business Info Card */}
            <Card className="p-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#526B91] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{bag.business.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <Link href={`/businesses/${bag.business.id}`} className="font-semibold text-[#526B91] hover:underline">
                    {bag.business.name}
                  </Link>
                  <p className="text-sm text-gray-600">{bag.business.type} • {bag.business.city}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-[#E9B949] text-[#E9B949]" />
                  <span className="font-medium text-[#526B91]">{bag.business.rating}</span>
                  <span className="text-sm text-gray-500">({bag.business.reviewCount})</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Details Section */}
          <div>
            <h1 className="text-3xl font-bold text-[#526B91] mb-4">{bag.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-gray-500">
                <MapPin className="h-4 w-4 inline mr-1" />
                {bag.business.city}
              </span>
              {bag.availableUntil && (
                <span className="text-sm text-gray-500">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Available until {formatTime(bag.availableUntil)}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-6">{bag.description}</p>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl text-gray-400 line-through">${bag.originalValue.toFixed(2)}</span>
              <span className="text-4xl font-bold text-[#526B91]">${bag.sellingPrice.toFixed(2)}</span>
              <span className="text-sm text-[#6F9B78]">You save ${(bag.originalValue - bag.sellingPrice).toFixed(2)}</span>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm ${
                bag.quantityAvailable > 0
                  ? 'bg-[#6F9B78]/10 text-[#6F9B78]'
                  : 'bg-[#E87552]/10 text-[#E87552]'
              }`}>
                {bag.quantityAvailable > 0
                  ? `${bag.quantityAvailable} available`
                  : 'Sold out'
                }
              </span>
              <span className="text-sm text-gray-500">{bag.quantitySold} sold</span>
            </div>

            {/* Fulfillment Type Selection */}
            <Card className="p-4 mb-6">
              <h3 className="font-semibold text-[#526B91] mb-3">Choose Fulfillment</h3>
              <div className="grid grid-cols-2 gap-3">
                {bag.offersDelivery && (
                  <button
                    onClick={() => setFulfillmentType('delivery')}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      fulfillmentType === 'delivery'
                        ? 'border-[#526B91] bg-[#526B91]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Truck className={`h-6 w-6 mb-2 ${
                      fulfillmentType === 'delivery' ? 'text-[#526B91]' : 'text-gray-400'
                    }`} />
                    <p className="font-medium text-[#526B91]">Delivery</p>
                    <p className="text-sm text-gray-600">+${bag.deliveryFee.toFixed(2)} fee</p>
                  </button>
                )}

                {bag.offersPickup && (
                  <button
                    onClick={() => setFulfillmentType('pickup')}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      fulfillmentType === 'pickup'
                        ? 'border-[#526B91] bg-[#526B91]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ShoppingBag className={`h-6 w-6 mb-2 ${
                      fulfillmentType === 'pickup' ? 'text-[#526B91]' : 'text-gray-400'
                    }`} />
                    <p className="font-medium text-[#526B91]">Pickup</p>
                    <p className="text-sm text-gray-600">Free</p>
                  </button>
                )}
              </div>
            </Card>

            {/* Time Slot Selection */}
            <Card className="p-4 mb-6">
              <h3 className="font-semibold text-[#526B91] mb-3">Select Time Slot</h3>
              <div className="grid grid-cols-3 gap-2">
                {bag.timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-3 rounded-lg border text-center text-sm transition-all ${
                      selectedTimeSlot === slot
                        ? 'border-[#526B91] bg-[#526B91]/5 text-[#526B91]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </Card>

            {/* Quantity */}
            <Card className="p-4 mb-6">
              <h3 className="font-semibold text-[#526B91] mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-lg font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(bag.quantityAvailable, quantity + 1))}
                >
                  +
                </Button>
              </div>
            </Card>

            {/* Add to Order Button */}
            <Button
              className="w-full"
              size="lg"
              onClick={handleAddToOrder}
              disabled={bag.quantityAvailable === 0 || !selectedTimeSlot}
            >
              {bag.quantityAvailable === 0 ? 'Sold Out' : 'Add to Order'}
            </Button>

            {/* Pickup Instructions */}
            {fulfillmentType === 'pickup' && bag.pickupInstructions && (
              <Card className="p-4 mt-4">
                <h3 className="font-semibold text-[#526B91] mb-2">Pickup Instructions</h3>
                <p className="text-sm text-gray-600">{bag.pickupInstructions}</p>
              </Card>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#526B91] mb-6">Reviews</h2>
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#526B91]">{review.customer}</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? 'fill-[#E9B949] text-[#E9B949]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
