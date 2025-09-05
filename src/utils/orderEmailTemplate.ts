// utils/orderEmailTemplate.ts

// Generate HTML for order confirmation email.
export function getOrderEmailHtml(sessionData: any) {
  const lineItems = sessionData.line_items?.data || [];

  // Generate HTML for each line item.
  const itemsHtml = lineItems
    .map((item: any) => {
      const product = item.price.product;
      return `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #bb936eff; padding:8px; gap:8px; color:#bb936eff;">
        <div style="flex-shrink:0; width:50px; height:50px; overflow:hidden; border-radius:4px;">
          ${
            item.price.product.images?.[0]
              ? `<img src="${item.price.product.images[0]}" width="50" height="50" style="object-fit:cover; display:block;" />`
              : ""
          }
        </div>
        <div style="flex:1; text-align:left;">
          <p style="font-weight:bold; margin:0;">${product.name}</p>
          <p style="margin:0;">Quantity: ${item.quantity}</p>
        </div>
        <div style="text-align:right; font-weight:bold;">
          $${(item.price.unit_amount ?? 0) / 100}
        </div>
      </div>`;
    })
    .join("");

  const trackingHtml = sessionData.trackingUrl
    ? `
      <div style="margin:16px 0; text-align:center; background-color:#fadadd; padding:8px; border-radius:4px; color:#bb936eff;">
        <p style="font-weight:bold; margin:0;">Your order has been shipped!</p>
        ${sessionData.carrier ? `<p style="margin:4px 0 0 0;">Carrier: ${sessionData.carrier}</p>` : ""}
        <p style="margin:4px 0 0 0;">
          Track your package here:
          <a href="${sessionData.trackingUrl}" target="_blank" style="color:#FADADD; text-decoration:underline;">Track Order</a>
        </p>
      </div>`
    : "";

  const headerHtml = `
  <div style="background-color:#fadadd; text-align:center; font-family:'Averia Serif Libre', serif; padding:12px 0; border-bottom:1px solid #bb936eff; margin:0;">
    <p style="margin:0; font-size:14px; color:#bb936eff;">Free Shipping on Domestic Orders $35+</p>
    <div style="margin-top:8px;">
      <a href="https://burbujitasybling.store" target="_blank">
        <img src="https://burbujitasybling.store/images/logos/logo-pink.png" 
             alt="Burbujitas & Bling" 
             style="width:200px; height:auto; display:block; margin:0 auto;" />
      </a>
    </div>
  </div>`;

  const footerHtml = `
  <div style="background-color:#ffffff; text-align:center; font-family:'Averia Serif Libre', serif; color:#9DBDD9; padding:16px 0 0 0; margin:0;">
    <img src="https://burbujitasybling.store/images/logos/logo-blue.png" 
         alt="Burbujitas & Bling" 
         style="width:200px; height:auto; display:block; margin:0 auto 8px auto;" />

    <div style="margin-bottom:8px;">
      <a href="https://linktr.ee/burbujitasYbling" style="margin:0 8px; color:#9DBDD9; text-decoration:none;">
        <img src="https://burbujitasybling.store/images/body/linktree.png" alt="Linktree" />
      </a>
      <a href="https://www.tiktok.com/@burbujitasybling" style="margin:0 8px; color:#9DBDD9; text-decoration:none;">
        <img src="https://burbujitasybling.store/images/body/tiktok.png" alt="TikTok" />
      </a>
      <a href="https://www.instagram.com/burbujitasybling" style="margin:0 8px; color:#9DBDD9; text-decoration:none;">
        <img src="https://burbujitasybling.store/images/body/instagram.png" alt="Instagram" />
      </a>
    </div>

    <div style="margin-bottom:0;">
      <a href="https://burbujitasybling.store/care-tips" style="margin:0 8px; color:#9DBDD9; text-decoration:none;">Care Tips</a>
      <a href="https://burbujitasybling.store/about-us" style="margin:0 8px; color:#9DBDD9; text-decoration:none;">About Us</a>
      <a href="https://burbujitasybling.store/policies" style="margin:0 8px; color:#9DBDD9; text-decoration:none;">Policies</a>
      <a href="https://burbujitasybling.store/contact-us" style="margin:0 8px; color:#9DBDD9; text-decoration:none;">Contact Us</a>
    </div>
  </div>`;

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Order Confirmation</title>
      <style>
        body { 
          font-family: "Averia Serif Libre", serif; 
          background-color:#fadadd; 
          margin:0; 
          padding:0; 
          color:#bb936eff; 
        }
        a { color:#bb936eff; text-decoration:none; }
      </style>
    </head>
    <body>
      <div style="max-width:600px; margin:0 auto; background-color:#fadadd;">
        ${headerHtml}

        <div style="text-align:center; margin:0 auto; padding:16px 0;">
          <h1 style="margin:0; font-size:20px;">Order Confirmed</h1>
          <h2 style="margin:4px 0;">Hi, Friend</h2>
          <p style="margin:4px 0;">Your order has been received! Thanks for supporting this little business of mine.<br />xoxo, Jocelyn</p>
        </div>

        ${trackingHtml}
        ${itemsHtml}

        <div style="display:flex; justify-content:space-between; margin-top:16px; padding:0 16px;">
          <div>
            <p>Discount: $${((sessionData.total_details?.amount_discount ?? 0) / 100).toFixed(2)}</p>
            <p>Subtotal: $${((sessionData.amount_subtotal ?? 0) / 100).toFixed(2)}</p>
            <p>Shipping: $${((sessionData.shipping_cost?.amount_total ?? 0) / 100).toFixed(2)}</p>
            <p style="font-weight:bold;">Total: $${((sessionData.amount_total ?? 0) / 100).toFixed(2)}</p>
          </div>
          <div style="text-align:right;">
            <p>${sessionData.customer_details?.name}</p>
            <p>${sessionData.customer_details?.address?.line1}</p>
            ${sessionData.customer_details?.address?.line2 ? `<p>${sessionData.customer_details.address.line2}</p>` : ""}
            <p>${sessionData.customer_details?.address?.city}, ${sessionData.customer_details?.address?.state}</p>
            <p>${sessionData.customer_details?.address?.postal_code}</p>
          </div>
        </div>

        ${footerHtml}
      </div>
    </body>
  </html>
  `;
}
