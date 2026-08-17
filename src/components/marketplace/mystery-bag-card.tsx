'use client'

import { Clock, MapPin, Tag } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface MysteryBagCardProps {
  id: string
  title: string
  category: string
  originalValue: number
  sellingPrice: number
  imageUrl?: string
  businessName: string
  businessCity: string
  availableUntil?: string
  offersDelivery: boolean
  offersPickup: boolean
  onAddToOrder?: (id: string) => void
}

export function MysteryBagCard({
  id,
  title,
  category,
  originalValue,
  sellingPrice,
  imageUrl,
  businessName,
  businessCity,
  availableUntil,
  offersDelivery,
  offersPickup,
  onAddToOrder,
}: MysteryBagCardProps) {
  const discountPercentage = Math.round(((originalValue - sellingPrice) / originalValue) * 100)

  const formatCategory = (cat: string) => {
    return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Card variant="hover" className="overflow-hidden">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Tag className="h-12 w-12" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-[#E87552] text-white px-2 py-1 rounded-full text-sm font-bold">
          -{discountPercentage}%
        </div>
        <div className="absolute top-2 left-2 bg-[#526B91] text-white px-2 py-1 rounded-full text-xs font-medium">
          {formatCategory(category)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#526B91] mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{businessName}</p>

        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4" />
          <span>{businessCity}</span>
        </div>

        {availableUntil && (
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <Clock className="h-4 w-4" />
            <span>Available until {formatTime(availableUntil)}</span>
          </div>
        )}

        {/* Fulfillment Options */}
        <div className="flex gap-2 mb-3">
          {offersDelivery && (
            <span className="text-xs bg-[#6F9B78]/10 text-[#6F9B78] px-2 py-1 rounded-full">
              Delivery
            </span>
          )}
          {offersPickup && (
            <span className="text-xs bg-[#E9B949]/10 text-[#E9B949] px-2 py-1 rounded-full">
              Pickup
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-400 line-through">${originalValue.toFixed(2)}</span>
            <span className="text-xl font-bold text-[#526B91] ml-2">${sellingPrice.toFixed(2)}</span>
          </div>
          <Button size="sm" onClick={() => onAddToOrder?.(id)}>
            Add to Order
          </Button>
        </div>
      </div>
    </Card>
  )
}
