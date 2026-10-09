import {
  createTimeTravelHistory,
  type TimeTravelInspectorProps,
} from "@zentauri-ui/zentauri-components/ui/time-travel-inspector";

export const TIME_TRAVEL_APPEARANCES = [
  "default",
  "blue",
  "cyan",
  "teal",
  "emerald",
  "lime",
  "violet",
  "purple",
  "pink",
  "rose",
  "orange",
  "amber",
  "subtle",
  "contrast",
  "gradient-blue",
  "glass",
] as const satisfies readonly NonNullable<
  TimeTravelInspectorProps["appearance"]
>[];
export const TIME_TRAVEL_SIZES = ["sm", "md", "lg"] as const;
export type InspectorAppearance = (typeof TIME_TRAVEL_APPEARANCES)[number];
export type InspectorSize = (typeof TIME_TRAVEL_SIZES)[number];
export type CheckoutState = {
  quantity: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: string;
};
export const CHECKOUT_CAPTURES = [
  {
    id: "opened",
    timestamp: 0,
    label: "Cart opened",
    state: {
      quantity: 0,
      subtotal: 0,
      discount: 0,
      shipping: 0,
      total: 0,
      status: "Empty cart",
    },
  },
  {
    id: "added",
    timestamp: 2400,
    label: "Bag added",
    state: {
      quantity: 1,
      subtotal: 80,
      discount: 0,
      shipping: 0,
      total: 80,
      status: "In your cart",
    },
  },
  {
    id: "quantity",
    timestamp: 5100,
    label: "Quantity changed",
    state: {
      quantity: 2,
      subtotal: 160,
      discount: 0,
      shipping: 0,
      total: 160,
      status: "In your cart",
    },
  },
  {
    id: "discount",
    timestamp: 8200,
    label: "SAVE20 applied",
    state: {
      quantity: 2,
      subtotal: 160,
      discount: 32,
      shipping: 0,
      total: 128,
      status: "Discount applied",
    },
  },
  {
    id: "shipping",
    timestamp: 11400,
    label: "Shipping selected",
    state: {
      quantity: 2,
      subtotal: 160,
      discount: 32,
      shipping: 8,
      total: 136,
      status: "Ready to pay",
    },
  },
  {
    id: "paid",
    timestamp: 16000,
    label: "Checkout complete",
    state: {
      quantity: 2,
      subtotal: 160,
      discount: 32,
      shipping: 8,
      total: 136,
      status: "Order confirmed",
    },
  },
];
export const CHECKOUT_HISTORY = createTimeTravelHistory(CHECKOUT_CAPTURES, 3);
export const formatCheckoutTime = (timestamp: number) =>
  `+${(timestamp / 1000).toFixed(1)}s`;
