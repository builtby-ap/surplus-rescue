'use client'

import { useState } from 'react'
import { Search, Edit, Trash2, Eye, Shield, User, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'active', joined: '2026-08-01' },
  { id: '2', name: 'Happy Kitchen', email: 'info@happykitchen.com', role: 'business', status: 'active', joined: '2026-07-15' },
  { id: '3', name: 'Admin User', email: 'admin@surplusrescue.com', role: 'admin', status: 'active', joined: '2026-06-01' },
  { id: '4', name: 'Sarah Smith', email: 'sarah@example.com', role: 'customer', status: 'inactive', joined: '2026-08-10' },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#526B91] mb-2">User Management</h2>
        <p className="text-gray-600">Manage all users on the platform</p>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['all', 'customer', 'business', 'admin'].map((role) => (
              <Button
                key={role}
                variant={filterRole === role ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRole(role)}
                className="capitalize"
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {user.role === 'business' ? (
                          <Building2 className="h-5 w-5 text-gray-500" />
                        ) : user.role === 'admin' ? (
                          <Shield className="h-5 w-5 text-gray-500" />
                        ) : (
                          <User className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' ? 'bg-[#E87552]/10 text-[#E87552]' :
                      user.role === 'business' ? 'bg-[#E9B949]/10 text-[#E9B949]' :
                      'bg-[#526B91]/10 text-[#526B91]'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active' ? 'bg-[#6F9B78]/10 text-[#6F9B78]' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredUsers.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No users found</p>
        </Card>
      )}
    </div>
  )
}
