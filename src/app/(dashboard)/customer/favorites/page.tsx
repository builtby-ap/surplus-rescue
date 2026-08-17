'use client'

import { Heart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MysteryBagCard } from '@/components/marketplace/mystery-bag-card'

const mockFavorites = [
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
    title: 'Artisan Bread Basket',
    category: 'bakery',
    originalValue: 18.00,
    sellingPrice: 6.99,
    businessName: 'Golden Crust Bakery',
    businessCity: 'Midtown',
    availableUntil: '2026-08-17T18:00:00Z',
    offersDelivery: false,
    offersPickup: true,
  },
]

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#526B91] mb-2">Favorite Mystery Bags</h2>
        <p className="text-gray-600">Your saved mystery bags for quick ordering</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFavorites.map((bag) => (
          <div key={bag.id} className="relative">
            <MysteryBagCard {...bag} />
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
              <Heart className="h-5 w-5 fill-[#E87552] text-[#E87552]" />
            </button>
          </div>
        ))}
      </div>

      {mockFavorites.length === 0 && (
        <Card className="p-8 text-center">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No favorite mystery bags yet</p>
          <Button>Browse Mystery Bags</Button>
        </Card>
      )}
    </div>
  )
}
