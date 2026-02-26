# Guest Menu & Ordering Integration Guide

This guide explains how to display the digital menu and allow guests to place food orders from your customer-facing website.

## 1. Fetching the Menu

You can fetch the current menu items directly from the `menu_items` table in Supabase.

### Data Structure

Each menu item contains:

- `id`: Internal ID
- `name`: Dish name
- `description`: Dish details
- `price`: Unit price
- `category`: (e.g., "Breakfast", "Himachali Cuisine")
- `image`: URL to the dish image (stored in Supabase storage)

### Example Query (Javascript)

```javascript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_ANON_KEY");

async function getMenu() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("category", { ascending: true });

  if (error) throw error;
  return data;
}
```

## 2. Placing an Order

To place an order, you must insert a record into the `orders` table and corresponding records into the `order_items` table.

### Requirement: Booking ID

Guests must have a valid `bookingId` to place an order. You can obtain this from their booking confirmation.

### Step-by-Step Ordering Logic

```javascript
async function placeOrder(bookingId, guestId, items) {
  // 1. Calculate total price
  const totalPrice = items.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0,
  );

  // 2. Insert into 'orders' table
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        bookingId,
        guestId,
        totalPrice,
        status: "unconfirmed", // Default status
        isPaid: false,
        orderTime: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (orderError) throw orderError;

  // 3. Prepare order items
  const orderItems = items.map((item) => ({
    orderId: order.id,
    menuItemId: item.menuItemId,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
  }));

  // 4. Insert into 'order_items' table
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    // Optional: Delete the order header if items fail (Rollback)
    await supabase.from("orders").delete().eq("id", order.id);
    throw itemsError;
  }

  return order;
}
```

## 3. Order Status Tracking

Guests can check their order status by querying the `orders` table filtered by their `bookingId`.

- `unconfirmed`: Order received
- `confirmed`: Kitchen is preparing
- `delivered`: Food is served
- `cancelled`: Order cancelled
