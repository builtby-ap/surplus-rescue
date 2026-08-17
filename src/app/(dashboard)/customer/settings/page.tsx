'use client'

import { useState } from 'react'
import { Save, User, Bell, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function CustomerSettingsPage() {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
  })

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPromotions: false,
    pushOrders: true,
    pushPromotions: false,
  })

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile)
  }

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notifications)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#526B91] mb-2">Account Settings</h2>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">Full Name</label>
              <Input
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">Email</label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">Phone</label>
              <Input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
            <Button onClick={handleSaveProfile}>
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailOrders}
                onChange={(e) => setNotifications({ ...notifications, emailOrders: e.target.checked })}
                className="w-5 h-5 text-[#526B91] rounded focus:ring-[#526B91]"
              />
              <div>
                <p className="font-medium text-[#526B91]">Order Updates</p>
                <p className="text-sm text-gray-600">Receive email for order status changes</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailPromotions}
                onChange={(e) => setNotifications({ ...notifications, emailPromotions: e.target.checked })}
                className="w-5 h-5 text-[#526B91] rounded focus:ring-[#526B91]"
              />
              <div>
                <p className="font-medium text-[#526B91]">Promotions</p>
                <p className="text-sm text-gray-600">Receive email for deals and offers</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.pushOrders}
                onChange={(e) => setNotifications({ ...notifications, pushOrders: e.target.checked })}
                className="w-5 h-5 text-[#526B91] rounded focus:ring-[#526B91]"
              />
              <div>
                <p className="font-medium text-[#526B91]">Push Order Updates</p>
                <p className="text-sm text-gray-600">Receive push notifications for orders</p>
              </div>
            </label>
            <Button onClick={handleSaveNotifications}>
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-[#526B91] mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">Current Password</label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#526B91] mb-1">New Password</label>
              <Input type="password" placeholder="Enter new password" />
            </div>
          </div>
          <Button className="mt-4">
            Update Password
          </Button>
        </Card>
      </div>
    </div>
  )
}
