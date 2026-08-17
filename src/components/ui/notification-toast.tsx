'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info, Bell } from 'lucide-react'
import { Button } from './button'

type NotificationType = 'success' | 'error' | 'info' | 'order'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
}

interface NotificationToastProps {
  notification: Notification
  onClose: (id: string) => void
}

export function NotificationToast({ notification, onClose }: NotificationToastProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => onClose(notification.id), 300)
    }, notification.duration || 5000)

    return () => clearTimeout(timer)
  }, [notification.duration, notification.id, onClose])

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-[#6F9B78]" />,
    error: <AlertCircle className="h-5 w-5 text-[#E87552]" />,
    info: <Info className="h-5 w-5 text-[#526B91]" />,
    order: <Bell className="h-5 w-5 text-[#E9B949]" />,
  }

  const bgColors = {
    success: 'bg-[#6F9B78]/10 border-[#6F9B78]',
    error: 'bg-[#E87552]/10 border-[#E87552]',
    info: 'bg-[#526B91]/10 border-[#526B91]',
    order: 'bg-[#E9B949]/10 border-[#E9B949]',
  }

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 p-4 ${
        bgColors[notification.type]
      } ${isExiting ? 'animate-slide-out' : 'animate-slide-in'}`}
    >
      <div className="flex items-start gap-3">
        {icons[notification.type]}
        <div className="flex-1">
          <h4 className="font-semibold text-[#526B91]">{notification.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
        </div>
        <button
          onClick={() => {
            setIsExiting(true)
            setTimeout(() => onClose(notification.id), 300)
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

interface NotificationContainerProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={onRemove}
        />
      ))}
    </div>
  )
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    setNotifications((prev) => [...prev, { ...notification, id }])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const showSuccess = (title: string, message: string) => {
    addNotification({ type: 'success', title, message })
  }

  const showError = (title: string, message: string) => {
    addNotification({ type: 'error', title, message })
  }

  const showInfo = (title: string, message: string) => {
    addNotification({ type: 'info', title, message })
  }

  const showOrderUpdate = (title: string, message: string) => {
    addNotification({ type: 'order', title, message, duration: 8000 })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showInfo,
    showOrderUpdate,
  }
}
