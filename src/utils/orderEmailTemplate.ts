// utils/orderEmailTemplate.ts
type OrderEmailProps = {
  sessionData: any;
  trackingUrl?: string;
};

// Generate HTML for order confirmation email.
export function getOrderEmailHtml({
  sessionData,
  trackingUrl,
}: OrderEmailProps): string {
  const lineItems = sessionData.line_items?.data || [];
  const formatAmount = (amount?: number) =>
    `$${((amount ?? 0) / 100).toFixed(2)}`;
  const sessionMetadataItems = sessionData.metadata?.items
    ? JSON.parse(sessionData.metadata.items)
    : [];

  // Generate HTML for each line item.
  const itemsHtml = lineItems
    .map((item: any, idx: number) => {
      const product = item.price.product;
      const variation = sessionMetadataItems[idx] || {};
      return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:4px;">
  <tr>
    <td width="50" style="padding:2px; vertical-align:top;">
      ${
        product.images?.[0]
          ? `<img src="${product.images[0]}" width="60" height="60" style="display:block; object-fit:cover; border-radius:4px;" />`
          : ""
      }
    </td>
    <td style="padding:0;valign="top" font-size:13px; line-height:1.3; text-align:left; font-family:'Averia Serif Libre', serif; color:#bb936eff;">
      <p style="margin:0; font-weight:bold;">${product.name}</p>
      ${variation.selectedSize ? `<p style="margin:0;">Size: ${variation.selectedSize}</p>` : ""}
      ${variation.selectedColor ? `<p style="margin:0;">Color: ${variation.selectedColor}</p>` : ""}
    </td>
    <td style="padding:0 4px; text-align:right; font-weight:bold; font-family:'Averia Serif Libre', serif; color:#bb936eff;">
     ${item.quantity ?? 1} x $${(item.price.unit_amount ?? 0) / 100}
    </td>
  </tr>
</table>

    `;
    })
    .join("");

  const trackingHtml = trackingUrl
    ? `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" background-color:#fadadd;">
      <tr>
        <td align="center" color:#bb936eff;">
          <p style="font-weight:bold; font-size:18px;  margin:0;">Your order has been shipped!</p>
          <p style="margin:4px 0 ;">
            Track your package here: 
            <a href="${trackingUrl}" target="_blank" style="color:#bb936eff; text-decoration:underline;">Track Order</a>
          </p>
        </td>
      </tr>
  </table>`
    : "";

  const messageHtml = trackingUrl
    ? ""
    : `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" >
    <tr>
      <td align="center">
        <h1 style="margin:0; font-size:20px; color:#bb936eff;">Order Confirmed</h1>
        <h2 style="margin:4px 0; font-size:18px; color:#bb936eff;">Hi, Amiga</h2>
        <p style="margin:4px 0; color:#bb936eff;">
        Your order has been received! Thanks for supporting this little business of mine.<br/>xoxo, Jocelyn
        </p>
      </td>
    </tr>
  </table>`;

  const headerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td align="center" style="font-family:'Averia Serif Libre', serif; padding:12px 0 0 0;  #bb936eff;">

      <!-- Logo -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
        <tr>
          <td>
            <a href="https://burbujitasybling.store" target="_blank">
              <img src="https://burbujitasybling.store/images/logos/logo-pink.png" 
                   alt="Burbujitas & Bling" 
                   style="width:300px; height:auto; display:block; margin:0 auto;" />
            </a>
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>`;

  const footerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFF8F0">
  <tr>
    <td align="center" style="font-family:'Averia Serif Libre', serif; color:#9DBDD9; padding:16px 0 0 0;">
      
      <!-- Logo -->
      <img src="https://burbujitasybling.store/images/logos/logo-blue.png" 
           alt="Burbujitas & Bling" 
           style="width:150px; height:auto; display:block; margin:0 auto 8px auto;" />

      <!-- Social Icons -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
        <tr>
          <td style="padding:0 4px;">
            <a href="https://linktr.ee/burbujitasYbling" style="text-decoration:none;">
              <img src="https://burbujitasybling.store/images/icons/linktree.svg" alt="Linktree" style="display:block;" />
            </a>
          </td>
          <td style="padding:0 4px;">
            <a href="https://www.tiktok.com/@burbujitasybling" style="text-decoration:none;">
              <img src="https://burbujitasybling.store/images/icons/tiktok.svg" alt="TikTok" style="display:block;" />
            </a>
          </td>
          <td style="padding:0 4px;">
            <a href="https://www.instagram.com/burbujitasybling" style="text-decoration:none;">
              <img src="https://burbujitasybling.store/images/icons/instagram.svg" alt="Instagram" style="display:block;" />
            </a>
          </td>
        </tr>
      </table>

      <!-- Footer Links -->
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:0 8px;"><a href="https://burbujitasybling.store/care-tips" style="color:#9DBDD9; text-decoration:none;">Care Tips</a></td>
          <td style="padding:0 8px;"><a href="https://burbujitasybling.store/about-us" style="color:#9DBDD9; text-decoration:none;">About Us</a></td>
          <td style="padding:0 8px;"><a href="https://burbujitasybling.store/policies" style="color:#9DBDD9; text-decoration:none;">Policies</a></td>
          <td style="padding:0 8px;"><a href="https://burbujitasybling.store/contact-us" style="color:#9DBDD9; text-decoration:none;">Contact Us</a></td>
        </tr>
      </table>

    </td>
  </tr>
</table>`;

  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
      <title>Order Details</title>
  </head>
  <body style="margin:0; padding:0; background-color:#fadadd; color:#bb936eff; font-family:'Averia Serif Libre', serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">
          <!-- Main Container -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0"  style="border-collapse:collapse;">
            <tr>
              <td>

                <!-- HEADER -->
                ${headerHtml}

                <!-- CONFIRMATION MESSAGE -->
                ${messageHtml}

                <!-- TRACKING (if exists) -->
                ${trackingHtml}

                <!-- ORDER ITEMS -->
                <table width="80%" align="center" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid #bb936eff;">
                  <tr>
                    <td style="padding:8px 16px;">
                      ${itemsHtml}
                    </td>
                  </tr>
                </table>

                <!-- TOTALS + ADDRESS -->
                <table width="80%" align="center" cellpadding="0" cellspacing="0" border="0" >
                  <tr>
                    <td style="padding:16px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <!-- Totals -->
                          <td align="left" valign="bottom" style="font-size:14px; color:#bb936eff;">
                            <p style="margin:0;">Discount: ${formatAmount(
                              sessionData.total_details?.amount_discount ?? 0
                            )}</p>
                            <p style="margin:0;">Subtotal: ${formatAmount(
                              sessionData.amount_subtotal ?? 0
                            )}</p>
                            <p style="margin:0;">Shipping: ${formatAmount(
                              sessionData.shipping_cost?.amount_total ?? 0
                            )}</p>
                            <p style="margin:0; font-weight:bold;">Total: ${formatAmount(
                              sessionData.amount_total ?? 0
                            )}</p>
                          </td>

                          <!-- Customer Info -->
                          <td align="right" valign="top" style="font-size:14px; color:#bb936eff;">
                            <p style="margin:0;">${
                              sessionData.customer_details?.name
                            }</p>
                            <p style="margin:0;">${
                              sessionData.customer_details?.address?.line1
                            }</p>
                            ${
                              sessionData.customer_details?.address?.line2
                                ? `<p style="margin:0;">${sessionData.customer_details.address.line2}</p>`
                                : ""
                            }
                            <p style="margin:0;">${
                              sessionData.customer_details?.address?.city
                            }, ${
                              sessionData.customer_details?.address?.state
                            }</p>
                            <p style="margin:0;">${
                              sessionData.customer_details?.address?.postal_code
                            }</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- FOOTER -->
                ${footerHtml}

              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}
