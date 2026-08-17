'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Navigation } from '@/components/layout/navigation'
import { MysteryBagCard } from '@/components/marketplace/mystery-bag-card'
import { CategoryNav } from '@/components/marketplace/category-nav'

// Mock data for demonstration
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
  {
    id: '3',
    title: 'Fresh Produce Box',
    category: 'produce',
    originalValue: 30.00,
    sellingPrice: 12.99,
    businessName: 'Green Market',
    businessCity: 'Uptown',
    availableUntil: '2026-08-17T20:00:00Z',
    offersDelivery: true,
    offersPickup: true,
  },
  {
    id: '4',
    title: 'Sweet Treats Collection',
    category: 'desserts',
    originalValue: 22.00,
    sellingPrice: 8.99,
    businessName: 'Sugar Rush Cafe',
    businessCity: 'Downtown',
    availableUntil: '2026-08-17T16:00:00Z',
    offersDelivery: true,
    offersPickup: false,
  },
  {
    id: '5',
    title: 'Healthy Snack Box',
    category: 'snacks',
    originalValue: 15.00,
    sellingPrice: 5.99,
    businessName: 'Green Market',
    businessCity: 'Uptown',
    availableUntil: '2026-08-17T19:00:00Z',
    offersDelivery: true,
    offersPickup: true,
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [filters, setFilters] = useState({
    delivery: false,
    pickup: false,
    minPrice: 0,
    maxPrice: 50,
  })

  const filteredBags = mockMysteryBags.filter((bag) => {
    const matchesSearch = bag.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bag.businessName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || bag.category === selectedCategory
    const matchesDelivery = !filters.delivery || bag.offersDelivery
    const matchesPickup = !filters.pickup || bag.offersPickup
    const matchesPrice = bag.sellingPrice >= filters.minPrice && bag.sellingPrice <= filters.maxPrice

    return matchesSearch && matchesCategory && matchesDelivery && matchesPickup && matchesPrice
  })

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(undefined)
    setFilters({
      delivery: false,
      pickup: false,
      minPrice: 0,
      maxPrice: 50,
    })
  }

  return (
    <div className="min-h-screen bg-[#FFFBF2]">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#526B91] mb-4">Search Mystery Bags</h1>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by name or business..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-6">
          <CategoryNav
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        {/* Active Filters */}
        {(selectedCategory || filters.delivery || filters.pickup || searchQuery) && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchQuery && (
              <span className="px-3 py-1 bg-[#526B91]/10 text-[#526B91] rounded-full text-sm flex items-center gap-1">
                {searchQuery}
                <button onClick={() => setSearchQuery('')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="px-3 py-1 bg-[#526B91]/10 text-[#526B91] rounded-full text-sm flex items-center gap-1 capitalize">
                {selectedCategory.replace('_', ' ')}
                <button onClick={() => setSelectedCategory(undefined)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.delivery && (
              <span className="px-3 py-1 bg-[#6F9B78]/10 text-[#6F9B78] rounded-full text-sm flex items-center gap-1">
                Delivery
                <button onClick={() => setFilters({ ...filters, delivery: false })}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.pickup && (
              <span className="px-3 py-1 bg-[#E9B949]/10 text-[#E9B949] rounded-full text-sm flex items-center gap-1">
                Pickup
                <button onClick={() => setFilters({ ...filters, pickup: false })}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredBags.length} mystery bag{filteredBags.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Mystery Bags Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBags.map((bag) => (
            <MysteryBagCard
              key={bag.id}
              {...bag}
            />
          ))}
        </div>

        {filteredBags.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#526B91] mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </Card>
        )}
      </div>
    </div>
  )
}
