export interface OrderConfirmationEmail {
  orderId: string
  customerName: string
  businessName: string
  items: Array<{ name: string; quantity: number; price: number }>
  fulfillmentType: 'delivery' | 'pickup'
  deliveryAddress?: string
  timeSlot: string
  totalAmount: number
  deliveryFee?: number
}

export interface OrderStatusUpdateEmail {
  orderId: string
  customerName: string
  businessName: string
  status: string
  statusMessage: string
  estimatedTime?: string
}

export function generateOrderConfirmationEmail(data: OrderConfirmationEmail): string {
  const itemsHtml = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #FFFBF2; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #526B91, #425a7a); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Order Confirmed! 🎉</h1>
          <p style="color: rgba(255,255,255,0.9); margin-top: 10px;">Thank you for your order</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
          <p style="color: #333; font-size: 16px;">Hi ${data.customerName},</p>
          <p style="color: #666; line-height: 1.6;">Your order has been confirmed and is being prepared. Here are your order details:</p>

          <!-- Order Info -->
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Order ID:</strong> ${data.orderId}</p>
            <p style="margin: 0 0 10px 0;"><strong>Business:</strong> ${data.businessName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Fulfillment:</strong> ${data.fulfillmentType === 'delivery' ? '🚚 Delivery' : '📦 Pickup'}</p>
            ${data.deliveryAddress ? `<p style="margin: 0 0 10px 0;"><strong>Address:</strong> ${data.deliveryAddress}</p>` : ''}
            <p style="margin: 0;"><strong>Time Slot:</strong> ${data.timeSlot}</p>
          </div>

          <!-- Items Table -->
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #526B91; color: white;">
                <th style="padding: 12px; text-align: left;">Item</th>
                <th style="padding: 12px; text-align: center;">Qty</th>
                <th style="padding: 12px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- Total -->
          <div style="border-top: 2px solid #526B91; padding-top: 15px; margin-top: 15px;">
            ${data.deliveryFee ? `<p style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Delivery Fee:</span><span>$${data.deliveryFee.toFixed(2)}</span></p>` : ''}
            <p style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 20px; font-weight: bold; color: #526B91;"><span>Total:</span><span>$${data.totalAmount.toFixed(2)}</span></p>
          </div>

          <!-- Payment Info -->
          <div style="background: #E9B949; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; color: #526B91; font-weight: bold;">💰 Pay $${data.totalAmount.toFixed(2)} cash on ${data.fulfillmentType === 'delivery' ? 'delivery' : 'pickup'}</p>
          </div>

          <p style="color: #666; line-height: 1.6;">We'll send you updates as your order progresses. You can also track your order in the app.</p>

          <p style="color: #666; margin-top: 20px;">Thank you for helping reduce food waste! 🌱</p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0;">Surplus Rescue - Save Food, Save Money, Save the Planet</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function generateOrderStatusUpdateEmail(data: OrderStatusUpdateEmail): string {
  const statusEmojis: Record<string, string> = {
    confirmed: '✅',
    preparing: '👨‍🍳',
    ready: '📦',
    picked_up: '🚚',
    out_for_delivery: '🚗',
    delivered: '🎉',
    cancelled: '❌',
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #FFFBF2; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #526B91, #425a7a); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Order Update ${statusEmojis[data.status] || '📦'}</h1>
          <p style="color: rgba(255,255,255,0.9); margin-top: 10px;">Order #${data.orderId}</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px; text-align: center;">
          <p style="color: #333; font-size: 16px;">Hi ${data.customerName},</p>
          <p style="color: #666; line-height: 1.6; font-size: 18px;">${data.statusMessage}</p>

          ${data.estimatedTime ? `
          <div style="background: #6F9B78; padding: 15px; border-radius: 8px; margin: 20px 0; color: white;">
            <p style="margin: 0; font-weight: bold;">Estimated Time: ${data.estimatedTime}</p>
          </div>
          ` : ''}

          <p style="color: #666; line-height: 1.6;">From: ${data.businessName}</p>

          <p style="color: #666; margin-top: 20px;">Thank you for your patience! 🙏</p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0;">Surplus Rescue - Save Food, Save Money, Save the Planet</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function generateBusinessNewOrderEmail(data: {
  orderId: string
  businessName: string
  customerName: string
  items: Array<{ name: string; quantity: number }>
  fulfillmentType: 'delivery' | 'pickup'
  timeSlot: string
  totalAmount: number
}): string {
  const itemsHtml = data.items
    .map((item) => `<li style="padding: 5px 0;">${item.name} × ${item.quantity}</li>`)
    .join('')

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #FFFBF2; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #E9B949, #d4a83e); padding: 30px; text-align: center;">
          <h1 style="color: #526B91; margin: 0; font-size: 24px;">New Order Received! 🎉</h1>
          <p style="color: #526B91; margin-top: 10px;">Order #${data.orderId}</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
          <p style="color: #333; font-size: 16px;">Hi ${data.businessName},</p>
          <p style="color: #666; line-height: 1.6;">You have a new order! Here are the details:</p>

          <!-- Order Info -->
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Customer:</strong> ${data.customerName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Fulfillment:</strong> ${data.fulfillmentType === 'delivery' ? '🚚 Delivery' : '📦 Pickup'}</p>
            <p style="margin: 0;"><strong>Time Slot:</strong> ${data.timeSlot}</p>
          </div>

          <!-- Items -->
          <div style="margin: 20px 0;">
            <h3 style="color: #526B91; margin-bottom: 10px;">Items:</h3>
            <ul style="color: #666; padding-left: 20px;">
              ${itemsHtml}
            </ul>
          </div>

          <!-- Total -->
          <div style="background: #526B91; padding: 15px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: white; font-size: 18px;"><strong>Total: $${data.totalAmount.toFixed(2)}</strong></p>
          </div>

          <p style="color: #666; margin-top: 20px;">Please prepare this order for the selected time slot.</p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0;">Surplus Rescue - Business Portal</p>
        </div>
      </div>
    </body>
    </html>
  `
}
