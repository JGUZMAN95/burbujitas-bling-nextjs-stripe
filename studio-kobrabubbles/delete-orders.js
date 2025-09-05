// delete.js
// TODO: build Script to delete all serverllogs monthly
// TODO: build SCHEMA for test orders

const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'wm8b2fha', // replace with your Sanity project ID
  dataset: 'production', // replace if different
  apiVersion: '2023-01-01', // lock API date
  token:
    'sk3ALuuH0YlvpHrSlJRqelT0I8F4OVU4PB5TFDTQfonoXq4ZICu8j1UaAude1r4N8XlEe2x58I4a14EMLt3dTy9X1M1G2dTTf9y3wlnhrX8ejH3wUZlCdIMsdnZdimfHNc6aVVCVHe3itAopJag9xaXxi7LzitxbPQpl7D0ifium2InjB5Ze', // must be a write-enabled token
  useCdn: false,
})

async function cleanupSanity() {
  try {
    // 1. Clear Stripe fields from products
    const products = await client.fetch(
      '*[_type == "product" && (defined(stripeId) || defined(stripePriceId))]{_id}',
    )
    console.log(`Found ${products.length} products with Stripe fields`)

    for (const product of products) {
      await client
        .patch(product._id)
        .unset(['stripeId', 'stripePriceId'])
        .commit({autoGenerateArrayKeys: true})

      console.log(`✅ Cleared Stripe fields for product ${product._id}`)
    }

    // 2. Delete all orders
    const orders = await client.fetch('*[_type == "order"]._id')
    console.log(`Found ${orders.length} orders`)

    if (orders.length > 0) {
      let tx = client.transaction()
      orders.forEach((id) => {
        tx = tx.delete(id)
      })
      await tx.commit()
      console.log('✅ All orders deleted successfully!')
    }

    // 3. Delete all server logs
    const logs = await client.fetch('*[_type == "serverError"]._id')
    console.log(`Found ${logs.length} server logs`)

    if (logs.length > 0) {
      let tx = client.transaction()
      logs.forEach((id) => {
        tx = tx.delete(id)
      })
      await tx.commit()
      console.log('✅ All server logs deleted successfully!')
    }

    console.log('🎉 Sanity cleanup complete!')
  } catch (err) {
    console.error('❌ Cleanup error:', err.message)
  }
}

cleanupSanity()
