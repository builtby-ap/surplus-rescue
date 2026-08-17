'use client'

import { useState } from 'react'
import { Save, Truck, MapPin, DollarSign, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function DeliverySettingsPage() {
  const [settings, setSettings] = useState({
    offersDelivery: true,
    offersPickup: true,
    deliveryRadius: 5.0,
    deliveryFee: 2.99,
    minimumOrderForDelivery: 15.00,
    deliveryTimeSlots: ['10:00-11:00', '17:00-18:00', '21:00-22:00'],
  })

  const handleSave = () => {
    // Save settings to database
    console.log('Saving delivery settings:', settings)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#526B91] mb-2">Delivery Settings</h2>
          <p className="text-gray-600">Configure how you offer delivery and pickup</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fulfillment Options */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Fulfillment Options
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.offersDelivery}
                onChange={(e) => setSettings({ ...settings, offersDelivery: e.target.checked })}
                className="w-5 h-5 text-[#526B91] rounded focus:ring-[#526B91]"
              />
              <div>
                <p className="font-medium text-[#526B91]">Offer Delivery</p>
                <p className="text-sm text-gray-600">Allow customers to have orders delivered to their address</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.offersPickup}
                onChange={(e) => setSettings({ ...settings, offersPickup: e.target.checked })}
                className="w-5 h-5 text-[#526B91] rounded focus:ring-[#526B91]"
              />
              <div>
                <p className="font-medium text-[#526B91]">Offer Pickup</p>
                <p className="text-sm text-gray-600">Allow customers to pick up orders from your location</p>
              </div>
            </label>
          </div>
        </Card>

        {/* Delivery Configuration */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Delivery Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">
                Delivery Radius (km)
              </label>
              <Input
                type="number"
                value={settings.deliveryRadius}
                onChange={(e) => setSettings({ ...settings, deliveryRadius: parseFloat(e.target.value) })}
                min="0"
                step="0.5"
              />
              <p className="text-sm text-gray-500 mt-1">Maximum distance you&apos;ll deliver to</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">
                Delivery Fee ($)
              </label>
              <Input
                type="number"
                value={settings.deliveryFee}
                onChange={(e) => setSettings({ ...settings, deliveryFee: parseFloat(e.target.value) })}
                min="0"
                step="0.01"
              />
              <p className="text-sm text-gray-500 mt-1">Fee charged to customers for delivery</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">
                Minimum Order for Delivery ($)
              </label>
              <Input
                type="number"
                value={settings.minimumOrderForDelivery}
                onChange={(e) => setSettings({ ...settings, minimumOrderForDelivery: parseFloat(e.target.value) })}
                min="0"
                step="0.01"
              />
              <p className="text-sm text-gray-500 mt-1">Minimum order amount required for delivery</p>
            </div>
          </div>
        </Card>

        {/* Delivery Time Slots */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Delivery Time Slots
          </h3>
          <p className="text-gray-600 mb-4">Configure when delivery is available</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {settings.deliveryTimeSlots.map((slot, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={slot}
                  onChange={(e) => {
                    const newSlots = [...settings.deliveryTimeSlots]
                    newSlots[index] = e.target.value
                    setSettings({ ...settings, deliveryTimeSlots: newSlots })
                  }}
                  placeholder="HH:MM-HH:MM"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#E87552]"
                  onClick={() => {
                    const newSlots = settings.deliveryTimeSlots.filter((_, i) => i !== index)
                    setSettings({ ...settings, deliveryTimeSlots: newSlots })
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSettings({
                ...settings,
                deliveryTimeSlots: [...settings.deliveryTimeSlots, ''],
              })
            }}
          >
            Add Time Slot
          </Button>
        </Card>
      </div>
    </div>
  )
}
