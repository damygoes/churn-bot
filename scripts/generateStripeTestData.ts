import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config({ path: '.env.local' })

// Initialize Stripe with your test secret key
const stripe = new Stripe(process.env.PANTRY_MATE_STRIPE_ACCESS_TOKEN!, {
  apiVersion: '2025-05-28.basil',
})

const MONTHLY_PRICE_ID = 'price_1ReHDe2MVAElXfvkVoPP2KHu'
const YEARLY_PRICE_ID = 'price_1ReHFX2MVAElXfvklrwqqYBX'

async function createTestSubscription(index: number): Promise<void> {
  // Create customer
  const customer = await stripe.customers.create({
    email: `testuser${index}@example.com`,
    name: `Test User ${index}`,
  })

  // Attach test payment method (pm_card_visa) to customer
  const paymentMethod = await stripe.paymentMethods.attach('pm_card_visa', {
    customer: customer.id,
  })

  // Set default payment method for invoice/payment
  await stripe.customers.update(customer.id, {
    invoice_settings: {
      default_payment_method: paymentMethod.id,
    },
  })

  // Choose monthly or yearly plan randomly
  const isYearly = Math.random() < 0.5
  const priceId = isYearly ? YEARLY_PRICE_ID : MONTHLY_PRICE_ID

  // Create subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: priceId }],
  })

  console.log(
    `Created subscription for ${customer.email} (${isYearly ? 'yearly' : 'monthly'})`
  )

  // Randomly cancel ~20% to simulate churn
  if (Math.random() < 0.2) {
    await stripe.subscriptions.cancel(subscription.id)
    console.log(`Canceled subscription for ${customer.email}`)
  }
}

async function main() {
  const totalCustomers = 50

  for (let i = 1; i <= totalCustomers; i++) {
    try {
      await createTestSubscription(i)
    } catch (error) {
      console.error(`Failed to create subscription for user ${i}:`, error)
    }
  }

  console.log('Test data generation completed.')
}

main().catch(console.error)
