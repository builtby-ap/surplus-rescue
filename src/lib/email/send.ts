import { Resend } from 'resend'
import {
  generateOrderConfirmationEmail,
  generateOrderStatusUpdateEmail,
  generateBusinessNewOrderEmail,
  type OrderConfirmationEmail,
  type OrderStatusUpdateEmail,
} from './templates'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'Surplus Rescue <noreply@surplusrescue.com>'

export async function sendOrderConfirmationEmail(data: OrderConfirmationEmail & { customerEmail: string }) {
  try {
    const html = generateOrderConfirmationEmail(data)

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.customerEmail,
      subject: `Order Confirmed! #${data.orderId}`,
      html,
    })

    console.log(`Order confirmation email sent to ${data.customerEmail}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send order confirmation email:', error)
    return { success: false, error }
  }
}

export async function sendOrderStatusUpdateEmail(data: OrderStatusUpdateEmail & { customerEmail: string }) {
  try {
    const html = generateOrderStatusUpdateEmail(data)

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.customerEmail,
      subject: `Order #${data.orderId} - ${data.status}`,
      html,
    })

    console.log(`Order status update email sent to ${data.customerEmail}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send order status update email:', error)
    return { success: false, error }
  }
}

export async function sendBusinessNewOrderEmail(data: {
  orderId: string
  businessName: string
  businessEmail: string
  customerName: string
  items: Array<{ name: string; quantity: number }>
  fulfillmentType: 'delivery' | 'pickup'
  timeSlot: string
  totalAmount: number
}) {
  try {
    const html = generateBusinessNewOrderEmail(data)

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.businessEmail,
      subject: `New Order Received! #${data.orderId}`,
      html,
    })

    console.log(`New order notification email sent to ${data.businessEmail}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send new order email to business:', error)
    return { success: false, error }
  }
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #FFFBF2; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #526B91, #425a7a); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Reset Your Password</h1>
          </div>
          <div style="padding: 30px; text-align: center;">
            <p style="color: #666; line-height: 1.6;">Click the button below to reset your password:</p>
            <a href="${resetLink}" style="display: inline-block; background: #526B91; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">Reset Password</a>
            <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
          </div>
          <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #999; font-size: 12px;">
            <p style="margin: 0;">Surplus Rescue - Save Food, Save Money, Save the Planet</p>
          </div>
        </div>
      </body>
      </html>
    `

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Reset Your Password - Surplus Rescue',
      html,
    })

    console.log(`Password reset email sent to ${email}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    return { success: false, error }
  }
}
