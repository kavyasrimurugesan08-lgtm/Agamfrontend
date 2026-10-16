import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, HERO_SHOWCASE_PRODUCTS } from '../data/mockData';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  // Products & Categories (allows Admin CRUD in state + localStorage)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('agam_products');
    if (!saved) return PRODUCTS;
    try {
      const parsed = JSON.parse(saved);
      // Ensure all current catalog products exist
      const parsedIds = new Set(parsed.map(p => p.id));
      const missing = PRODUCTS.filter(p => !parsedIds.has(p.id));
      // Update saree products so new high-res local images & titles take effect immediately
      const updated = parsed.map(item => {
        const catalogItem = PRODUCTS.find(p => p.id === item.id);
        if (catalogItem && (catalogItem.category === 'Sarees' || !item.images || item.images.length < 2)) {
          return { ...item, ...catalogItem };
        }
        return item;
      });
      return [...updated, ...missing];
    } catch (e) {
      return PRODUCTS;
    }
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('agam_categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });

  // Cart: [{ product, size, color, quantity }]
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('agam_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Saved for Later
  const [savedForLater, setSavedForLater] = useState(() => {
    const saved = localStorage.getItem('agam_saved_later');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist: array of product IDs
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('agam_wishlist');
    return saved ? JSON.parse(saved) : ['AGAM-SAR-01', 'AGAM-KUR-01'];
  });

  // Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('agam_recently_viewed');
    return saved ? JSON.parse(saved) : [];
  });

  // User Authentication
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('agam_user');
    return saved ? JSON.parse(saved) : {
      id: 'USR-2026-01',
      name: 'Kavya S.',
      email: 'kavya@example.com',
      phone: '+91 98401 23456',
      role: 'customer',
      addresses: [
        {
          id: 'ADDR-1',
          name: 'Kavya S.',
          phone: '+91 98401 23456',
          street: '14, Weaver\'s Colony, Gandhipuram',
          city: 'Coimbatore',
          state: 'Tamil Nadu',
          pincode: '641012',
          isDefault: true
        }
      ]
    };
  });

  // Admin Authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('agam_admin_auth') === 'true';
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('agam_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'AGAM-ORD-9021',
        date: '2026-10-12',
        status: 'Shipped',
        trackingNumber: 'DEL-AGAM-894109',
        courier: 'BlueDart Express',
        items: [
          {
            product: PRODUCTS[0],
            size: 'M',
            color: 'Mint Green',
            quantity: 1,
            price: 3899
          }
        ],
        subtotal: 3899,
        shipping: 0,
        discount: 389,
        tax: 175,
        total: 3685,
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        shippingAddress: {
          name: 'Kavya S.',
          phone: '+91 98401 23456',
          street: '14, Weaver\'s Colony, Gandhipuram',
          city: 'Coimbatore',
          state: 'Tamil Nadu',
          pincode: '641012'
        },
        timeline: [
          { status: 'Order Placed', time: '12 Oct 2026, 10:30 AM', done: true },
          { status: 'Payment Confirmed', time: '12 Oct 2026, 10:32 AM', done: true },
          { status: 'Processing at Nirmala Atelier', time: '13 Oct 2026, 02:15 PM', done: true },
          { status: 'Quality Inspected & Packed', time: '14 Oct 2026, 11:00 AM', done: true },
          { status: 'Handed to Courier (BlueDart)', time: '14 Oct 2026, 06:45 PM', done: true },
          { status: 'Out for Delivery', time: 'Estimated 16 Oct 2026', done: false },
          { status: 'Delivered', time: 'Pending', done: false }
        ]
      }
    ];
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [giftPackaging, setGiftPackaging] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  // Active language: 'en' or 'ta'
  const [language, setLanguage] = useState('en');

  // Site Settings (editable in Admin)
  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem('agam_settings');
    return saved ? JSON.parse(saved) : {
      announcement: '✨ Grand Festive Weaves • Free Insured Delivery Across India on Orders Above ₹1,999 • 100% Verified Silk Mark Pure Mulberry Silks ✨',
      freeShippingThreshold: 1999,
      supportPhone: '+91 94432 10987',
      supportEmail: 'care@nirmalatex-agam.com',
      storeAddress: 'AGAM Heritage Atelier, Nirmala Textiles, Sathy Main Road, Erode - 638003, Tamil Nadu'
    };
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('agam_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('agam_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('agam_saved_later', JSON.stringify(savedForLater));
  }, [savedForLater]);

  useEffect(() => {
    localStorage.setItem('agam_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('agam_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('agam_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('agam_admin_auth', isAdminAuthenticated ? 'true' : 'false');
  }, [isAdminAuthenticated]);

  // Toast trigger
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Cart actions
  const addToCart = (product, size = null, color = null, quantity = 1) => {
    const selectedSize = size || (product.sizes ? product.sizes[0] : 'Free Size');
    const selectedColor = color || (product.colors ? product.colors[0] : 'Default');

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.size === selectedSize && item.color === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, size: selectedSize, color: selectedColor, quantity }];
      }
    });

    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const updateCartQuantity = (productId, size, color, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.size === size && item.color === color) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.size === size && item.color === color)
    ));
    showToast('Item removed from cart.', 'info');
  };

  const moveToSavedForLater = (productId, size, color) => {
    const item = cart.find(
      i => i.product.id === productId && i.size === size && i.color === color
    );
    if (item) {
      removeFromCart(productId, size, color);
      setSavedForLater(prev => [...prev, item]);
      showToast('Moved item to Saved for Later.', 'info');
    }
  };

  const moveToCartFromSaved = (item) => {
    setSavedForLater(prev => prev.filter(
      i => !(i.product.id === item.product.id && i.size === item.size && i.color === item.color)
    ));
    addToCart(item.product, item.size, item.color, item.quantity);
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed item from your wishlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Recently viewed
  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 8);
      localStorage.setItem('agam_recently_viewed', JSON.stringify(updated));
      return updated;
    });
  };

  // Coupon handling
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'AGAM10') {
      setAppliedCoupon({ code: 'AGAM10', discountPercent: 10, label: '10% Welcome Heritage Discount' });
      showToast('Coupon "AGAM10" applied! 10% off.');
      return true;
    } else if (cleanCode === 'FESTIVE500') {
      setAppliedCoupon({ code: 'FESTIVE500', flatDiscount: 500, minCart: 3000, label: '₹500 Flat Festive Discount' });
      showToast('Coupon "FESTIVE500" applied! ₹500 off.');
      return true;
    } else if (cleanCode === 'SILKMARK') {
      setAppliedCoupon({ code: 'SILKMARK', discountPercent: 15, label: '15% Pure Silk Mark Discount' });
      showToast('Coupon "SILKMARK" applied! 15% off.');
      return true;
    } else {
      showToast('Invalid or expired coupon code. Try AGAM10 or FESTIVE500.', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount && cartSubtotal >= (appliedCoupon.minCart || 0)) {
      discountAmount = appliedCoupon.flatDiscount;
    }
  }

  const shippingCost = cartSubtotal >= siteSettings.freeShippingThreshold || cartSubtotal === 0 ? 0 : 99;
  const packagingCost = giftPackaging ? 99 : 0;
  const taxAmount = Math.round((cartSubtotal - discountAmount) * 0.05); // 5% GST on apparel
  const cartFinalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost + packagingCost + taxAmount);

  // Order Placement
  const placeOrder = (orderData) => {
    const newOrderId = `AGAM-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      status: 'Payment Confirmed',
      trackingNumber: `DEL-AGAM-${Math.floor(100000 + Math.random() * 900000)}`,
      courier: 'BlueDart Express',
      items: [...cart],
      subtotal: cartSubtotal,
      shipping: shippingCost,
      discount: discountAmount,
      tax: taxAmount,
      total: cartFinalTotal,
      paymentMethod: orderData.paymentMethod || 'UPI',
      paymentStatus: 'Paid',
      shippingAddress: orderData.shippingAddress,
      timeline: [
        { status: 'Order Placed', time: 'Just now', done: true },
        { status: 'Payment Confirmed', time: 'Instant verification', done: true },
        { status: 'Processing at Nirmala Atelier', time: 'Allocating pure silk stock', done: false },
        { status: 'Quality Inspected & Packed', time: 'Silk Mark verification', done: false },
        { status: 'Handed to Courier (BlueDart)', time: 'Pending dispatch', done: false },
        { status: 'Out for Delivery', time: 'Estimated in 2-3 days', done: false },
        { status: 'Delivered', time: 'Pending', done: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    setGiftPackaging(false);
    return newOrder;
  };

  // Admin Actions
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `AGAM-PROD-${Date.now().toString().slice(-4)}`,
      sku: `NT-${Date.now().toString().slice(-4)}`,
      rating: 5.0,
      reviewCount: 0
    };
    setProducts(prev => [productWithId, ...prev]);
    showToast(`Product "${productWithId.name}" added successfully!`);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    showToast(`Updated product "${updatedProduct.name}".`);
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product archived / removed.', 'info');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updatedTimeline = ord.timeline.map(t => {
          if (t.status.toLowerCase().includes(newStatus.toLowerCase())) {
            return { ...t, done: true, time: 'Updated by Admin' };
          }
          return t;
        });
        return { ...ord, status: newStatus, timeline: updatedTimeline };
      }
      return ord;
    }));
    showToast(`Order ${orderId} status updated to ${newStatus}.`);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        savedForLater,
        wishlist,
        recentlyViewed,
        currentUser,
        setCurrentUser,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        orders,
        appliedCoupon,
        giftPackaging,
        setGiftPackaging,
        toast,
        language,
        setLanguage,
        siteSettings,
        setSiteSettings,
        showToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        moveToSavedForLater,
        moveToCartFromSaved,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToRecentlyViewed,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartTotalItems,
        discountAmount,
        shippingCost,
        packagingCost,
        taxAmount,
        cartFinalTotal,
        placeOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
