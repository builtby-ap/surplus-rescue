'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Truck, MapPin, Clock, CreditCard, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Navigation } from '@/components/layout/navigation'

type FulfillmentType = 'delivery' | 'pickup'

interface CheckoutData {
  fulfillmentType: FulfillmentType
  deliveryAddress: string
  deliveryNotes: string
  selectedTimeSlot: string
  specialRequests: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    fulfillmentType: 'delivery',
    deliveryAddress: '',
    deliveryNotes: '',
    selectedTimeSlot: '',
    specialRequests: '',
  })

  // Mock order data
  const orderSummary = {
    items: [
      { name: 'Mixed Lunch Surprise', price: 9.99, quantity: 1 },
    ],
    subtotal: 9.99,
    deliveryFee: 2.99,
    total: 12.98,
  }

  const timeSlots = [
    '10:00 - 11:00',
    '12:00 - 13:00',
    '17:00 - 18:00',
    '21:00 - 22:00',
  ]

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handlePlaceOrder = () => {
    // Process order
    console.log('Placing order:', checkoutData)
    router.push('/orders/confirmation')
  }

  return (
    <div className="min-h-screen bg-[#FFFBF2]">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#526B91] mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[
            { num: 1, label: 'Fulfillment' },
            { num: 2, label: 'Details' },
            { num: 3, label: 'Confirm' },
          ].map((s, index) => (
            <div key={s.num} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= s.num ? 'bg-[#526B91] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s.num ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <span>{s.num}</span>
                )}
              </div>
              <span className={`ml-2 ${step >= s.num ? 'text-[#526B91] font-medium' : 'text-gray-500'}`}>
                {s.label}
              </span>
              {index < 2 && (
                <div className={`w-16 h-1 mx-4 ${step > s.num ? 'bg-[#526B91]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Fulfillment Type */}
            {step === 1 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#526B91] mb-6">Choose Fulfillment Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setCheckoutData({ ...checkoutData, fulfillmentType: 'delivery' })}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      checkoutData.fulfillmentType === 'delivery'
                        ? 'border-[#526B91] bg-[#526B91]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Truck className={`h-8 w-8 mb-3 ${
                      checkoutData.fulfillmentType === 'delivery' ? 'text-[#526B91]' : 'text-gray-400'
                    }`} />
                    <h3 className="font-semibold text-[#526B91] mb-1">Delivery</h3>
                    <p className="text-sm text-gray-600">We&apos;ll deliver to your address</p>
                    <p className="text-sm text-[#6F9B78] mt-2">+ $2.99 delivery fee</p>
                  </button>

                  <button
                    onClick={() => setCheckoutData({ ...checkoutData, fulfillmentType: 'pickup' })}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      checkoutData.fulfillmentType === 'pickup'
                        ? 'border-[#526B91] bg-[#526B91]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <MapPin className={`h-8 w-8 mb-3 ${
                      checkoutData.fulfillmentType === 'pickup' ? 'text-[#526B91]' : 'text-gray-400'
                    }`} />
                    <h3 className="font-semibold text-[#526B91] mb-1">Pickup</h3>
                    <p className="text-sm text-gray-600">Pick up from the business</p>
                    <p className="text-sm text-[#6F9B78] mt-2">Free pickup</p>
                  </button>
                </div>
              </Card>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#526B91] mb-6">
                  {checkoutData.fulfillmentType === 'delivery' ? 'Delivery Details' : 'Pickup Details'}
                </h2>

                {checkoutData.fulfillmentType === 'delivery' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#526B91] mb-1">
                        Delivery Address
                      </label>
                      <Input
                        placeholder="Enter your full address"
                        value={checkoutData.deliveryAddress}
                        onChange={(e) => setCheckoutData({ ...checkoutData, deliveryAddress: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#526B91] mb-1">
                        Delivery Notes (optional)
                      </label>
                      <Input
                        placeholder="Apartment number, gate code, etc."
                        value={checkoutData.deliveryNotes}
                        onChange={(e) => setCheckoutData({ ...checkoutData, deliveryNotes: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#526B91] mb-3">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setCheckoutData({ ...checkoutData, selectedTimeSlot: slot })}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          checkoutData.selectedTimeSlot === slot
                            ? 'border-[#526B91] bg-[#526B91]/5 text-[#526B91]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Clock className="h-5 w-5 mx-auto mb-1" />
                        <span className="text-sm font-medium">{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#526B91] mb-1">
                    Special Requests (optional)
                  </label>
                  <Input
                    placeholder="Any allergies or special requirements?"
                    value={checkoutData.specialRequests}
                    onChange={(e) => setCheckoutData({ ...checkoutData, specialRequests: e.target.value })}
                  />
                </div>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-[#526B91] mb-6">Order Confirmation</h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    {checkoutData.fulfillmentType === 'delivery' ? (
                      <Truck className="h-6 w-6 text-[#526B91]" />
                    ) : (
                      <MapPin className="h-6 w-6 text-[#526B91]" />
                    )}
                    <div>
                      <p className="font-medium text-[#526B91] capitalize">
                        {checkoutData.fulfillmentType}
                      </p>
                      {checkoutData.fulfillmentType === 'delivery' && (
                        <p className="text-sm text-gray-600">{checkoutData.deliveryAddress}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Clock className="h-6 w-6 text-[#526B91]" />
                    <div>
                      <p className="font-medium text-[#526B91]">Time Slot</p>
                      <p className="text-sm text-gray-600">{checkoutData.selectedTimeSlot}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <CreditCard className="h-6 w-6 text-[#526B91]" />
                    <div>
                      <p className="font-medium text-[#526B91]">Payment</p>
                      <p className="text-sm text-gray-600">Cash on Delivery</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                Back
              </Button>
              {step < 3 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handlePlaceOrder} className="bg-[#6F9B78] hover:bg-[#5a8566]">
                  Place Order
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-[#526B91] mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{item.name} × {item.quantity}</span>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                {checkoutData.fulfillmentType === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>${orderSummary.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-[#526B91] pt-2 border-t">
                  <span>Total</span>
                  <span>
                    ${checkoutData.fulfillmentType === 'delivery'
                      ? orderSummary.total.toFixed(2)
                      : orderSummary.subtotal.toFixed(2)
                    }
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-[#E9B949]/10 rounded-lg">
                <p className="text-sm text-[#526B91]">
                  💡 Pay with cash when your order arrives
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
