'use client'

import { useState } from 'react'
import { ArrowRight, Leaf, Clock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navigation } from '@/components/layout/navigation'
import { CategoryNav } from '@/components/marketplace/category-nav'
import { MysteryBagCard } from '@/components/marketplace/mystery-bag-card'

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
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()

  const filteredBags = selectedCategory
    ? mockMysteryBags.filter(bag => bag.category === selectedCategory)
    : mockMysteryBags

  return (
    <div className="min-h-screen bg-[#FFFBF2]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#526B91] to-[#425a7a] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Save Food, Save Money, Save the Planet
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Get quality surplus food at steep discounts from local restaurants, cafes, and bakeries.
              Choose delivery or pickup - you decide!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#E9B949] text-[#526B91] hover:bg-[#d4a83e]">
                Browse Mystery Bags
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                For Businesses
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
          <div className="absolute right-10 top-10 w-32 h-32 bg-white rounded-full" />
          <div className="absolute right-32 bottom-20 w-24 h-24 bg-white rounded-full" />
          <div className="absolute right-60 top-1/2 w-16 h-16 bg-white rounded-full" />
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-12 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#6F9B78]/10 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-[#6F9B78]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#526B91] mb-1">Reduce Food Waste</h3>
                <p className="text-sm text-gray-600">Help rescue surplus food from going to waste</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E9B949]/10 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#E9B949]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#526B91] mb-1">Up to 70% Off</h3>
                <p className="text-sm text-gray-600">Get quality food at amazing discounts</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#526B91]/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#526B91]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#526B91] mb-1">Choose Your Way</h3>
                <p className="text-sm text-gray-600">Delivery or pickup - you decide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Category Navigation */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#526B91] mb-4">Browse by Category</h2>
            <CategoryNav
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* Mystery Bags Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#526B91]">
                {selectedCategory ? `${selectedCategory.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Mystery Bags` : 'Available Mystery Bags'}
              </h2>
              <Button variant="ghost" className="text-[#526B91]">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBags.map((bag) => (
                <MysteryBagCard
                  key={bag.id}
                  {...bag}
                />
              ))}
            </div>
          </div>

          {/* Featured Businesses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#526B91]">Featured Businesses</h2>
              <Button variant="ghost" className="text-[#526B91]">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: '1', name: 'Happy Kitchen', type: 'Restaurant', image: null, city: 'Downtown' },
                { id: '2', name: 'Golden Crust Bakery', type: 'Bakery', image: null, city: 'Midtown' },
                { id: '3', name: 'Green Market', type: 'Grocery', image: null, city: 'Uptown' },
              ].map((business) => (
                <Card key={business.id} variant="hover" className="overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-[#526B91] to-[#425a7a] flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">{business.name.charAt(0)}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#526B91]">{business.name}</h3>
                    <p className="text-sm text-gray-600">{business.type} • {business.city}</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      View Mystery Bags
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#526B91] text-white py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-[#526B91] font-bold text-lg">SR</span>
                </div>
                <span className="text-xl font-bold">Surplus Rescue</span>
              </div>
              <p className="text-white/80 text-sm">
                Saving food, saving money, saving the planet - one mystery bag at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white">Browse Mystery Bags</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Businesses</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white">Join as Business</a></li>
                <li><a href="#" className="hover:text-white">Business Dashboard</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            © 2026 Surplus Rescue. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
