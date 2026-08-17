'use client'

import { useState } from 'react'
import { Save, DollarSign, Settings, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    commissionRate: 12.5,
    minimumOrderAmount: 10.00,
    maximumDeliveryRadius: 20.00,
    platformName: 'Surplus Rescue',
    supportEmail: 'support@surplusrescue.com',
  })

  const handleSave = () => {
    // Save settings to database
    console.log('Saving platform settings:', settings)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#526B91] mb-2">Platform Settings</h2>
          <p className="text-gray-600">Configure platform-wide settings</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Commission Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">
                Default Commission Rate (%)
              </label>
              <Input
                type="number"
                value={settings.commissionRate}
                onChange={(e) => setSettings({ ...settings, commissionRate: parseFloat(e.target.value) })}
                min="0"
                max="100"
                step="0.5"
              />
              <p className="text-sm text-gray-500 mt-1">Percentage taken from each order</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">
                Minimum Order Amount ($)
              </label>
              <Input
                type="number"
                value={settings.minimumOrderAmount}
                onChange={(e) => setSettings({ ...settings, minimumOrderAmount: parseFloat(e.target.value) })}
                min="0"
                step="0.01"
              />
              <p className="text-sm text-gray-500 mt-1">Minimum order amount for customers</p>
            </div>
          </div>
        </Card>

        {/* Delivery Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Delivery Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">
                Maximum Delivery Radius (km)
              </label>
              <Input
                type="number"
                value={settings.maximumDeliveryRadius}
                onChange={(e) => setSettings({ ...settings, maximumDeliveryRadius: parseFloat(e.target.value) })}
                min="0"
                step="0.5"
              />
              <p className="text-sm text-gray-500 mt-1">Maximum distance businesses can deliver</p>
            </div>
          </div>
        </Card>

        {/* General Settings */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            General Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">
                Platform Name
              </label>
              <Input
                value={settings.platformName}
                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">
                Support Email
              </label>
              <Input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
