'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const mockMysteryBags = [
  {
    id: '1',
    title: 'Mixed Lunch Surprise',
    category: 'mixed_meals',
    originalValue: 25.00,
    sellingPrice: 9.99,
    quantityAvailable: 5,
    quantitySold: 12,
    isAvailable: true,
  },
  {
    id: '2',
    title: 'Artisan Bread Basket',
    category: 'bakery',
    originalValue: 18.00,
    sellingPrice: 6.99,
    quantityAvailable: 0,
    quantitySold: 8,
    isAvailable: false,
  },
  {
    id: '3',
    title: 'Fresh Produce Box',
    category: 'produce',
    originalValue: 30.00,
    sellingPrice: 12.99,
    quantityAvailable: 3,
    quantitySold: 15,
    isAvailable: true,
  },
]

export default function MysteryBagsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBags = mockMysteryBags.filter(bag =>
    bag.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#526B91] mb-2">Mystery Bags</h2>
          <p className="text-gray-600">Manage your mystery bag offerings</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Mystery Bag
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search mystery bags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </Card>

      {/* Mystery Bags List */}
      <div className="space-y-4">
        {filteredBags.map((bag) => (
          <Card key={bag.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#526B91]">{bag.title}</h3>
                  <p className="text-sm text-gray-600 capitalize">{bag.category.replace('_', ' ')}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">
                      ${bag.sellingPrice.toFixed(2)} <span className="line-through text-gray-400">${bag.originalValue.toFixed(2)}</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {bag.quantityAvailable} available • {bag.quantitySold} sold
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  bag.isAvailable ? 'bg-[#6F9B78]/10 text-[#6F9B78]' : 'bg-gray-100 text-gray-500'
                }`}>
                  {bag.isAvailable ? 'Active' : 'Inactive'}
                </span>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-[#E87552]">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredBags.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No mystery bags found</p>
        </Card>
      )}
    </div>
  )
}
