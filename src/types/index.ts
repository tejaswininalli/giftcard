export type OccasionType =
  | 'birthday'
  | 'anniversary'
  | 'wedding'
  | 'graduation'
  | 'valentines'
  | 'mothers-day'
  | 'fathers-day'
  | 'christmas'
  | 'diwali'
  | 'housewarming'
  | 'baby-shower'
  | 'thank-you'
  | 'friendship'
  | 'corporate';

export type RecipientType =
  | 'her'
  | 'him'
  | 'kids'
  | 'couples'
  | 'parents'
  | 'friends'
  | 'colleagues'
  | 'all';

export type GiftCategory =
  | 'gift-cards'
  | 'jewelry'
  | 'perfumes'
  | 'handbags'
  | 'skincare'
  | 'watches'
  | 'wallets'
  | 'grooming'
  | 'gadgets'
  | 'toys-games'
  | 'books'
  | 'couple-gifts'
  | 'photo-frames'
  | 'hampers'
  | 'personalized'
  | 'bundles';

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  category: GiftCategory;
  occasions: OccasionType[];
  recipients: RecipientType[];
  isPersonalizable: boolean;
  personalizationPrompt?: string;
  deliveryTime: 'instant' | 'same-day' | '2-3-days';
  images: string[];
  tags: string[];
  isGiftCard?: boolean;
  brand?: string;
  denominations?: number[];
  badge?: string;
  inStock: boolean;
  bundleItems?: string[];
}

export interface GiftCardBrand {
  id: string;
  name: string;
  category: 'Shopping' | 'Food & Restaurants' | 'Entertainment' | 'Travel' | 'Fashion' | 'Beauty' | 'Gaming' | 'Electronics';
  image: string;
  denominations: number[];
  rating: number;
  description: string;
  popular?: boolean;
  terms: string;
  accentColor: string;
}

export interface BundleAddon {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  id: string; // unique cart entry id
  productId: string;
  product: Product;
  quantity: number;
  selectedDenomination?: number;
  personalizationText?: string;
  recipientName?: string;
  recipientEmail?: string;
  recipientPhone?: string;
  giftMessage?: string;
  scheduledDeliveryDate?: string;
  isCustomCard?: boolean;
  cardDesign?: string;
  bundleContents?: string[];
}

export interface GiftReminder {
  id: string;
  personName: string;
  relationship: string;
  occasion: OccasionType | string;
  date: string; // YYYY-MM-DD
  frequency: 'yearly' | 'once';
  notes?: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  giftWrapFee: number;
  total: number;
  customerInfo: CustomerInfo;
  shippingAddress?: ShippingAddress;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  status: 'Processing' | 'Packed' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}

export interface AIRecommendation {
  product: Product;
  reason: string;
  matchScore: number;
}
