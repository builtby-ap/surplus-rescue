'use client'

import { useState } from 'react'
import { Search, Edit, Trash2, Eye, CheckCircle, XCircle, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const mockBusinesses = [
  { id: '1', name: 'Happy Kitchen', type: 'restaurant', status: 'verified', owner: 'John Doe', city: 'Downtown', joined: '2026-07-15' },
  { id: '2', name: 'Golden Crust Bakery', type: 'bakery', status: 'pending', owner: 'Sarah Smith', city: 'Midtown', joined: '2026-08-01' },
  { id: '3', name: 'Green Market', type: 'grocery', status: 'verified', owner: 'Mike Johnson', city: 'Uptown', joined: '2026-06-20' },
]

export default function BusinessesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || business.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#526B91] mb-2">Business Management</h2>
        <p className="text-gray-600">Manage all businesses on the platform</p>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['all', 'verified', 'pending', 'suspended'].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBusinesses.map((business) => (
          <Card key={business.id} className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#526B91] rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#526B91]">{business.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{business.type}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                business.status === 'verified' ? 'bg-[#6F9B78]/10 text-[#6F9B78]' :
                business.status === 'pending' ? 'bg-[#E9B949]/10 text-[#E9B949]' :
                'bg-[#E87552]/10 text-[#E87552]'
              }`}>
                {business.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">Owner: {business.owner}</p>
              <p className="text-sm text-gray-600">City: {business.city}</p>
              <p className="text-sm text-gray-600">Joined: {business.joined}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              {business.status === 'pending' && (
                <>
                  <Button size="sm" className="flex-1 bg-[#6F9B78] hover:bg-[#5a8566]">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-[#E87552]">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </>
              )}
              {business.status === 'verified' && (
                <Button variant="outline" size="sm" className="text-[#E87552]">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredBusinesses.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No businesses found</p>
        </Card>
      )}
    </div>
  )
}
