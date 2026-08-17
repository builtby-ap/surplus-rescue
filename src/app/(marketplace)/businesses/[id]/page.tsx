'use client'

import { Star, MapPin, Clock, Phone, Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navigation } from '@/components/layout/navigation'
import { MysteryBagCard } from '@/components/marketplace/mystery-bag-card'
import Link from 'next/link'

// Mock data for demonstration
const mockBusiness = {
  id: 'biz-1',
  name: 'Happy Kitchen',
  type: 'restaurant',
  description: 'We serve delicious, freshly prepared meals using locally sourced ingredients. Our mission is to reduce food waste while providing quality food at great prices.',
  address: '123 Main St',
  city: 'Downtown',
  phone: '+1 (555) 123-4567',
  email: 'info@happykitchen.com',
  logoUrl: null,
  coverImageUrl: null,
  rating: 4.8,
  reviewCount: 89,
  isVerified: true,
  offersDelivery: true,
  offersPickup: true,
  deliveryRadius: 5.0,
  timeSlots: [
    { day: 'Monday', slots: ['10:00-11:00', '12:00-13:00', '17:00-18:00'] },
    { day: 'Tuesday', slots: ['10:00-11:00', '12:00-13:00', '17:00-18:00'] },
    { day: 'Wednesday', slots: ['10:00-11:00', '12:00-13:00', '17:00-18:00'] },
    { day: 'Thursday', slots: ['10:00-11:00', '12:00-13:00', '17:00-18:00'] },
    { day: 'Friday', slots: ['10:00-11:00', '12:00-13:00', '17:00-18:00'] },
  ],
}

const mockMysteryBags = [
  {
    id: '1',
    title: 'Mixed Lunch Surprise',
    category: 'mixed_meals',
    originalValue: 25.00,
    sellingPrice: 9.99,
    businessName: 'Happy Kitchen',
    businessCity: 'Downtown',
    availableUntil: '2026-08-17T14:00:00Z',
    offersDelivery: true,
    offersPickup: true,
  },
  {
    id: '2',
    title: 'Dinner Special',
    category: 'mixed_meals',
    originalValue: 35.00,
    sellingPrice: 14.99,
    businessName: 'Happy Kitchen',
    businessCity: 'Downtown',
    availableUntil: '2026-08-17T20:00:00Z',
    offersDelivery: true,
    offersPickup: true,
  },
]

const mockReviews = [
  { id: '1', customer: 'John D.', rating: 5, comment: 'Amazing food! Great value for money.', date: '2026-08-15' },
  { id: '2', customer: 'Sarah M.', rating: 4, comment: 'Delicious meal, will order again.', date: '2026-08-14' },
  { id: '3', customer: 'Mike R.', rating: 5, comment: 'Best mystery bag I\'ve ever ordered!', date: '2026-08-13' },
]

export default function BusinessProfilePage() {
  const business = mockBusiness

  return (
    <div className="min-h-screen bg-[#FFFBF2]">
      <Navigation />

      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-br from-[#526B91] to-[#425a7a]">
        {business.coverImageUrl ? (
          <img
            src={business.coverImageUrl}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-6xl font-bold opacity-20">{business.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30" />
        <Link href="/" className="absolute top-4 left-4 inline-flex items-center gap-2 text-white hover:text-white/80">
          <ArrowLeft className="h-5 w-5" />
          Back
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Business Header */}
            <Card className="p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-[#526B91] rounded-xl flex items-center justify-center flex-shrink-0">
                  {business.logoUrl ? (
                    <img
                      src={business.logoUrl}
                      alt={business.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-white text-3xl font-bold">{business.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-[#526B91]">{business.name}</h1>
                    {business.isVerified && (
                      <span className="px-2 py-1 text-xs bg-[#6F9B78] text-white rounded-full">Verified</span>
                    )}
                  </div>
                  <p className="text-gray-600 capitalize mb-2">{business.type}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-[#E9B949] text-[#E9B949]" />
                      <span className="font-medium text-[#526B91]">{business.rating}</span>
                      <span className="text-sm text-gray-500">({business.reviewCount} reviews)</span>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {business.city}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold text-[#526B91] mb-4">About</h2>
              <p className="text-gray-600">{business.description}</p>
            </Card>

            {/* Mystery Bags */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#526B91] mb-4">Mystery Bags</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockMysteryBags.map((bag) => (
                  <MysteryBagCard
                    key={bag.id}
                    {...bag}
                  />
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-semibold text-[#526B91] mb-4">Reviews</h2>
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Info */}
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#526B91] mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{business.address}, {business.city}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{business.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{business.email}</span>
                </div>
              </div>
            </Card>

            {/* Fulfillment Options */}
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#526B91] mb-4">Fulfillment Options</h3>
              <div className="space-y-3">
                {business.offersDelivery && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#6F9B78]/10 rounded-lg flex items-center justify-center">
                      <span className="text-[#6F9B78]">🚚</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#526B91]">Delivery</p>
                      <p className="text-sm text-gray-600">Up to {business.deliveryRadius} km radius</p>
                    </div>
                  </div>
                )}
                {business.offersPickup && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#E9B949]/10 rounded-lg flex items-center justify-center">
                      <span className="text-[#E9B949]">📦</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#526B91]">Pickup</p>
                      <p className="text-sm text-gray-600">Free pickup at store</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Time Slots */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#526B91] mb-4">Available Time Slots</h3>
              <div className="space-y-3">
                {business.timeSlots.map((daySchedule) => (
                  <div key={daySchedule.day}>
                    <p className="font-medium text-[#526B91] mb-1">{daySchedule.day}</p>
                    <div className="flex flex-wrap gap-2">
                      {daySchedule.slots.map((slot) => (
                        <span
                          key={slot}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
