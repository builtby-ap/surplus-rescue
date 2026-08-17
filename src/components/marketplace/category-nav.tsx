'use client'

import { UtensilsCrossed, Cake, ShoppingBasket, Apple, Cookie, Coffee, IceCream } from 'lucide-react'

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  color: string
}

const categories: Category[] = [
  { id: 'mixed_meals', name: 'Mixed Meals', icon: <UtensilsCrossed className="h-6 w-6" />, color: 'bg-[#526B91]' },
  { id: 'bakery', name: 'Bakery', icon: <Cake className="h-6 w-6" />, color: 'bg-[#E9B949]' },
  { id: 'grocery', name: 'Grocery', icon: <ShoppingBasket className="h-6 w-6" />, color: 'bg-[#6F9B78]' },
  { id: 'produce', name: 'Produce', icon: <Apple className="h-6 w-6" />, color: 'bg-[#E87552]' },
  { id: 'snacks', name: 'Snacks', icon: <Cookie className="h-6 w-6" />, color: 'bg-[#526B91]' },
  { id: 'beverages', name: 'Beverages', icon: <Coffee className="h-6 w-6" />, color: 'bg-[#E9B949]' },
  { id: 'desserts', name: 'Desserts', icon: <IceCream className="h-6 w-6" />, color: 'bg-[#6F9B78]' },
]

interface CategoryNavProps {
  selectedCategory?: string
  onCategorySelect?: (categoryId: string) => void
}

export function CategoryNav({ selectedCategory, onCategorySelect }: CategoryNavProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect?.(category.id)}
          className={`flex flex-col items-center gap-2 min-w-[80px] p-4 rounded-xl transition-all ${
            selectedCategory === category.id
              ? `${category.color} text-white shadow-lg scale-105`
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <div className={`${selectedCategory === category.id ? 'text-white' : 'text-[#526B91]'}`}>
            {category.icon}
          </div>
          <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
        </button>
      ))}
    </div>
  )
}
