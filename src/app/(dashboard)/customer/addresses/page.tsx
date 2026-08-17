'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, MapPin, Home, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const mockAddresses = [
  {
    id: '1',
    label: 'Home',
    address: '123 Main St, Apt 4B',
    city: 'Downtown',
    postalCode: '10001',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Work',
    address: '456 Office Blvd, Suite 200',
    city: 'Midtown',
    postalCode: '10002',
    isDefault: false,
  },
]

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(mockAddresses)
  const [isAdding, setIsAdding] = useState(false)
  const [newAddress, setNewAddress] = useState({
    label: '',
    address: '',
    city: '',
    postalCode: '',
  })

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.address && newAddress.city) {
      setAddresses([
        ...addresses,
        { ...newAddress, id: Date.now().toString(), isDefault: false },
      ])
      setNewAddress({ label: '', address: '', city: '', postalCode: '' })
      setIsAdding(false)
    }
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#526B91] mb-2">Saved Addresses</h2>
          <p className="text-gray-600">Manage your delivery addresses</p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      {/* Add Address Form */}
      {isAdding && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4">Add New Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">Label</label>
              <Input
                placeholder="e.g., Home, Work"
                value={newAddress.label}
                onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">Address</label>
              <Input
                placeholder="Street address"
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">City</label>
              <Input
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">Postal Code</label>
              <Input
                placeholder="Postal code"
                value={newAddress.postalCode}
                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAddAddress}>Save Address</Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Addresses List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <Card key={address.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  address.label === 'Home' ? 'bg-[#526B91]/10' : 'bg-[#E9B949]/10'
                }`}>
                  {address.label === 'Home' ? (
                    <Home className="h-6 w-6 text-[#526B91]" />
                  ) : (
                    <Building className="h-6 w-6 text-[#E9B949]" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#526B91]">{address.label}</h3>
                    {address.isDefault && (
                      <span className="px-2 py-1 text-xs bg-[#6F9B78] text-white rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{address.address}</p>
                  <p className="text-sm text-gray-600">{address.city}, {address.postalCode}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!address.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#E87552]"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {addresses.length === 0 && !isAdding && (
        <Card className="p-8 text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No saved addresses</p>
          <Button onClick={() => setIsAdding(true)}>Add Your First Address</Button>
        </Card>
      )}
    </div>
  )
}
