# Guest Receipts Integration Guide

This guide explains how to generate and allow guests to download their stay and order receipts from your customer-facing website.

## 1. Fetching Receipt Data

A complete receipt involves data from `bookings` (for the stay) and `orders` (for food items).

### Fetching Orders for a Booking

```javascript
async function getOrdersForReceipt(bookingId) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      totalPrice,
      orderTime,
      status,
      order_items (
        quantity,
        unitPrice,
        menu_items (name)
      )
    `,
    )
    .eq("bookingId", bookingId)
    .neq("status", "cancelled"); // Exclude cancelled orders

  if (error) throw error;
  return data;
}
```

## 2. Generating the PDF

To provide a premium experience similar to the admin panel, you can use `html2canvas` and `jsPDF` to generate a PDF from a hidden or visible HTML template.

### Basic PDF Generation Logic

```javascript
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

async function downloadReceipt(elementId, filename) {
  const element = document.getElementById(elementId);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.8);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
}
```

## 3. Receipt Layout Best Practices

- **Header**: Include "The Retreat Cottage" logo and address.
- **Summary**: Clearly separate "Stay Summary" and "Order Summary".
- **Totals**: Provide a clear "Grand Total" that combines stay price and all order prices.
- **Currency**: Format all amounts using `₹` (e.g., `new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)`).
