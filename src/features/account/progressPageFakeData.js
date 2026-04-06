/**
 * Placeholder orders until API wiring. Replace with loader / fetch later.
 */
export const FAKE_ORDERS = [
  {
    id: 1,
    orderDate: "1 March 2026",
    itemCount: 3,
    totalPayment: 775,
    status: "delivering",
    badge: 1,
    items: [
      {
        id: 101,
        name: "LCD Monitor",
        imageUrl:
          "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=160&h=120&fit=crop",
        price: 650,
        color: "Red",
        size: "Large",
        quantity: 12,
        subtotal: 7800,
      },
      {
        id: 102,
        name: "Wireless Mouse",
        imageUrl:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=160&h=120&fit=crop",
        price: 45,
        color: "Black",
        size: "—",
        quantity: 2,
        subtotal: 90,
      },
      {
        id: 103,
        name: "USB-C Hub",
        imageUrl:
          "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=160&h=120&fit=crop",
        price: 35,
        color: "Silver",
        size: "—",
        quantity: 1,
        subtotal: 35,
      },
    ],
  },
  {
    id: 2,
    orderDate: "28 February 2026",
    itemCount: 2,
    totalPayment: 1299,
    status: "shipping",
    badge: 2,
    items: [
      {
        id: 201,
        name: "Mechanical Keyboard",
        imageUrl:
          "https://images.unsplash.com/photo-1587829741301-d096520a64a0?w=160&h=120&fit=crop",
        price: 120,
        color: "White",
        size: "Full",
        quantity: 1,
        subtotal: 120,
      },
      {
        id: 202,
        name: "4K Webcam",
        imageUrl:
          "https://images.unsplash.com/photo-1587826080692-26031ac75d7a?w=160&h=120&fit=crop",
        price: 1179,
        color: "Black",
        size: "—",
        quantity: 1,
        subtotal: 1179,
      },
    ],
  },
  {
    id: 3,
    orderDate: "15 February 2026",
    itemCount: 1,
    totalPayment: 89,
    status: "pending",
    badge: 3,
    items: [
      {
        id: 301,
        name: "Desk Lamp LED",
        imageUrl:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=160&h=120&fit=crop",
        price: 89,
        color: "Blue",
        size: "Medium",
        quantity: 1,
        subtotal: 89,
      },
    ],
  },
];
