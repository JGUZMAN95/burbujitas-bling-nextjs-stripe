// studio-kobrabubbles/schemaTypes/order.ts

// Define the schema for the "order" document type in Sanity.
export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {name: 'orderId', title: 'Order ID', type: 'string'},
    {name: 'customerName', title: 'Customer Name', type: 'string'},
    {name: 'customerEmail', title: 'Customer Email', type: 'string'},
    {
      name: 'lineItems',
      title: 'Line Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Product Name', type: 'string'},
            {name: 'quantity', title: 'Quantity', type: 'number'},
            {name: 'price', title: 'Price', type: 'number'},
          ],
        },
      ],
    },
    {name: 'total', title: 'Total', type: 'number'},
    {name: 'shippingCost', title: 'Shipping Cost', type: 'number'},
    {name: 'status', title: 'Status', type: 'string', options: {list: ['placed', 'shipped']}},
    {name: 'trackingUrl', title: 'Tracking URL', type: 'url'},
    {name: 'estimatedDelivery', title: 'Estimated Delivery', type: 'string'},
    {name: 'createdAt', title: 'Created At', type: 'datetime'},
    {name: 'shippedAt', title: 'Shipped At', type: 'datetime'},
  ],
}
