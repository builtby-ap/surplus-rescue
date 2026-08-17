'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

interface OrderStatusUpdate {
  orderId: string
  status: string
  updatedAt: string
}

export function useOrderRealtime(orderId: string, onStatusChange?: (update: OrderStatusUpdate) => void) {
  const [status, setStatus] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    let channel: RealtimeChannel

    const subscribe = async () => {
      // Get initial status
      const { data: order } = await supabase
        .from('orders')
        .select('status')
        .eq('id', orderId)
        .single()

      if (order) {
        setStatus(order.status)
      }

      // Subscribe to changes
      channel = supabase
        .channel(`order-${orderId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `id=eq.${orderId}`,
          },
          (payload) => {
            const newStatus = payload.new.status
            setStatus(newStatus)
            onStatusChange?.({
              orderId,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            })
          }
        )
        .subscribe((status) => {
          setIsConnected(status === 'SUBSCRIBED')
        })
    }

    subscribe()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [orderId, supabase, onStatusChange])

  return { status, isConnected }
}

export function useBusinessOrdersRealtime(businessId: string, onNewOrder?: (order: Record<string, unknown>) => void) {
  const [orders, setOrders] = useState<Record<string, unknown>[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    let channel: RealtimeChannel

    const subscribe = async () => {
      // Get initial orders
      const { data: initialOrders } = await supabase
        .from('orders')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
        .limit(10)

      if (initialOrders) {
        setOrders(initialOrders)
      }

      // Subscribe to new orders
      channel = supabase
        .channel(`business-orders-${businessId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'orders',
            filter: `business_id=eq.${businessId}`,
          },
          (payload) => {
            const newOrder = payload.new
            setOrders((prev) => [newOrder, ...prev])
            onNewOrder?.(newOrder)
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `business_id=eq.${businessId}`,
          },
          (payload) => {
            const updatedOrder = payload.new
            setOrders((prev) =>
              prev.map((order) =>
                order.id === updatedOrder.id ? updatedOrder : order
              )
            )
          }
        )
        .subscribe((status) => {
          setIsConnected(status === 'SUBSCRIBED')
        })
    }

    subscribe()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [businessId, supabase, onNewOrder])

  return { orders, isConnected }
}

export function useCustomerOrdersRealtime(customerId: string, onOrderUpdate?: (order: Record<string, unknown>) => void) {
  const [orders, setOrders] = useState<Record<string, unknown>[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    let channel: RealtimeChannel

    const subscribe = async () => {
      // Get initial orders
      const { data: initialOrders } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false })
        .limit(10)

      if (initialOrders) {
        setOrders(initialOrders)
      }

      // Subscribe to order updates
      channel = supabase
        .channel(`customer-orders-${customerId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `customer_id=eq.${customerId}`,
          },
          (payload) => {
            const updatedOrder = payload.new
            setOrders((prev) =>
              prev.map((order) =>
                order.id === updatedOrder.id ? updatedOrder : order
              )
            )
            onOrderUpdate?.(updatedOrder)
          }
        )
        .subscribe((status) => {
          setIsConnected(status === 'SUBSCRIBED')
        })
    }

    subscribe()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [customerId, supabase, onOrderUpdate])

  return { orders, isConnected }
}

export function useMysteryBagAvailabilityRealtime(businessId: string, onAvailabilityChange?: (bag: Record<string, unknown>) => void) {
  const [bags, setBags] = useState<Record<string, unknown>[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    let channel: RealtimeChannel

    const subscribe = async () => {
      // Get initial bags
      const { data: initialBags } = await supabase
        .from('mystery_bags')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })

      if (initialBags) {
        setBags(initialBags)
      }

      // Subscribe to availability changes
      channel = supabase
        .channel(`mystery-bags-${businessId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'mystery_bags',
            filter: `business_id=eq.${businessId}`,
          },
          (payload) => {
            const updatedBag = payload.new
            setBags((prev) =>
              prev.map((bag) =>
                bag.id === updatedBag.id ? updatedBag : bag
              )
            )
            onAvailabilityChange?.(updatedBag)
          }
        )
        .subscribe((status) => {
          setIsConnected(status === 'SUBSCRIBED')
        })
    }

    subscribe()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [businessId, supabase, onAvailabilityChange])

  return { bags, isConnected }
}
