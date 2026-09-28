import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, GiftReminder, Order, CustomerInfo, ShippingAddress, OccasionType, RecipientType } from '../types';
import { PRODUCTS_DATA, INITIAL_REMINDERS } from '../data/mockData';

interface GiftoraContextType {
  // Navigation & Filtering
  activeTab: 'home' | 'gift-cards' | 'gifts' | 'occasions' | 'for-him' | 'for-her' | 'personalized' | 'bundles' | 'about';
  setActiveTab: (tab: 'home' | 'gift-cards' | 'gifts' | 'occasions' | 'for-him' | 'for-her' | 'personalized' | 'bundles' | 'about') => void;
  selectedOccasion: OccasionType | null;
  setSelectedOccasion: (occ: OccasionType | null) => void;
  selectedRecipient: RecipientType | null;
  setSelectedRecipient: (rec: RecipientType | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  giftWrap: boolean;
  setGiftWrap: (val: boolean) => void;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  cartTotal: number;
  deliveryFee: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  // Modals & Overlays
  isAIFinderOpen: boolean;
  setIsAIFinderOpen: (open: boolean) => void;
  aiFinderInitialPrompt?: string;
  openAIFinderWithPrompt: (prompt: string) => void;
  isCustomCardOpen: boolean;
  setIsCustomCardOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  isWishlistModalOpen: boolean;
  setIsWishlistModalOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;

  // Reminders
  reminders: GiftReminder[];
  addReminder: (reminder: Omit<GiftReminder, 'id'>) => void;
  removeReminder: (id: string) => void;

  // Orders
  orders: Order[];
  lastOrder: Order | null;
  createOrder: (data: {
    customerInfo: CustomerInfo;
    shippingAddress?: ShippingAddress;
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  }) => Order;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const GiftoraContext = createContext<GiftoraContextType | undefined>(undefined);

export const GiftoraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'gift-cards' | 'gifts' | 'occasions' | 'for-him' | 'for-her' | 'personalized' | 'bundles' | 'about'>('home');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<RecipientType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State with LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('giftora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [giftWrap, setGiftWrap] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountAmount, setPromoDiscountAmount] = useState(0);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Wishlist State with LocalStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('giftora_wishlist');
      return saved ? JSON.parse(saved) : ['p-1', 'p-6'];
    } catch {
      return ['p-1', 'p-6'];
    }
  });

  // Reminders State with LocalStorage
  const [reminders, setReminders] = useState<GiftReminder[]>(() => {
    try {
      const saved = localStorage.getItem('giftora_reminders');
      return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
    } catch {
      return INITIAL_REMINDERS;
    }
  });

  // Orders State with LocalStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('giftora_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Modals
  const [isAIFinderOpen, setIsAIFinderOpen] = useState(false);
  const [aiFinderInitialPrompt, setAiFinderInitialPrompt] = useState<string | undefined>(undefined);
  const [isCustomCardOpen, setIsCustomCardOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('giftora_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('giftora_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('giftora_reminders', JSON.stringify(reminders));
    } catch (e) {
      console.error(e);
    }
  }, [reminders]);

  useEffect(() => {
    try {
      localStorage.setItem('giftora_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setCart(prev => {
      // Check if duplicate same product & options
      const existingIndex = prev.findIndex(
        i =>
          i.productId === item.productId &&
          i.selectedDenomination === item.selectedDenomination &&
          i.personalizationText === item.personalizationText &&
          !item.isCustomCard
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += item.quantity;
        return next;
      }
      return [...prev, { ...item, id }];
    });
    showToast(`Added "${item.product.name}" to cart! 🛍️`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.id !== cartItemId));
    showToast('Item removed from cart.');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(i => (i.id === cartItemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce((acc, item) => {
    const itemPrice = item.selectedDenomination || item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 99;
  const giftWrapFee = giftWrap ? 99 : 0;
  const cartDiscount = promoDiscountAmount;
  const cartTotal = Math.max(0, cartSubtotal + deliveryFee + giftWrapFee - cartDiscount);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GIFTORA10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setPromoCode('GIFTORA10');
      setPromoDiscountAmount(discount);
      showToast('🎉 Promo code GIFTORA10 applied: 10% off!');
      return { success: true, message: '10% discount applied!' };
    } else if (clean === 'SURPRISE20') {
      const discount = Math.round(cartSubtotal * 0.2);
      setPromoCode('SURPRISE20');
      setPromoDiscountAmount(discount);
      showToast('🎉 Promo code SURPRISE20 applied: 20% off!');
      return { success: true, message: '20% discount applied!' };
    } else {
      return { success: false, message: 'Invalid or expired code. Try "GIFTORA10"' };
    }
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your Wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // Reminders operations
  const addReminder = (rem: Omit<GiftReminder, 'id'>) => {
    const newRem: GiftReminder = {
      ...rem,
      id: `rem-${Date.now()}`,
    };
    setReminders(prev => [...prev, newRem]);
    showToast(`Saved reminder for ${rem.personName} 🔔`);
  };

  const removeReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    showToast('Reminder deleted.');
  };

  // Create Order
  const createOrder = (data: {
    customerInfo: CustomerInfo;
    shippingAddress?: ShippingAddress;
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  }): Order => {
    const newOrder: Order = {
      id: `GFT-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee,
      giftWrapFee,
      total: cartTotal,
      customerInfo: data.customerInfo,
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod,
      status: 'Processing',
      estimatedDelivery: '3 - 4 business days',
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
    return newOrder;
  };

  const openAIFinderWithPrompt = (prompt: string) => {
    setAiFinderInitialPrompt(prompt);
    setIsAIFinderOpen(true);
  };

  return (
    <GiftoraContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedOccasion,
        setSelectedOccasion,
        selectedRecipient,
        setSelectedRecipient,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        giftWrap,
        setGiftWrap,
        promoCode,
        applyPromoCode,
        cartTotal,
        deliveryFee,
        isCartDrawerOpen,
        setIsCartDrawerOpen,

        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,

        isAIFinderOpen,
        setIsAIFinderOpen,
        aiFinderInitialPrompt,
        openAIFinderWithPrompt,
        isCustomCardOpen,
        setIsCustomCardOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        isWishlistModalOpen,
        setIsWishlistModalOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        quickViewProduct,
        setQuickViewProduct,

        reminders,
        addReminder,
        removeReminder,

        orders,
        lastOrder,
        createOrder,

        toastMessage,
        showToast,
      }}
    >
      {children}
    </GiftoraContext.Provider>
  );
};

export const useGiftora = () => {
  const context = useContext(GiftoraContext);
  if (!context) {
    throw new Error('useGiftora must be used within a GiftoraProvider');
  }
  return context;
};
