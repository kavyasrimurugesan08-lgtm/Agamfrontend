import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Trash2, 
  Bookmark, 
  ArrowRight, 
  Sparkles, 
  Gift, 
  Tag, 
  ShieldCheck, 
  Truck,
  RotateCcw
} from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    savedForLater, 
    updateCartQuantity, 
    removeFromCart, 
    moveToSavedForLater, 
    moveToCartFromSaved,
    cartSubtotal, 
    cartTotalItems,
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    discountAmount, 
    shippingCost, 
    giftPackaging, 
    setGiftPackaging, 
    packagingCost,
    taxAmount, 
    cartFinalTotal,
    siteSettings 
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const amountToFreeShipping = Math.max(0, siteSettings.freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / siteSettings.freeShippingThreshold) * 100));

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div style={{ backgroundColor: '#F8F6F0', minHeight: '70vh', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{
          maxWidth: '550px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '48px 32px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: '#FDF6E3',
            color: '#D6A32D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <ShoppingBag size={34} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#102D50', margin: '0 0 10px 0' }}>
            Your Shopping Bag is Empty
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 24px 0' }}>
            Explore our handcrafted Kanchipuram bridal silks, Chanderi kurtas, and festive collections straight from master looms.
          </p>
          <Link to="/collections" className="btn-gold">
            <span>Explore Collections</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Title */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#102D50', margin: '0 0 6px 0' }}>
            Your Shopping Bag ({cartTotalItems} items)
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>
            Insured direct-from-mill shipping for all orders across India
          </p>
        </div>

        {/* Free Shipping Progress Meter */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '16px 20px',
          border: '1px solid #D6A32D',
          marginBottom: '28px',
          boxShadow: '0 4px 12px rgba(214, 163, 45, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, color: '#102D50' }}>
              <Truck size={18} color="#D6A32D" />
              {amountToFreeShipping === 0 ? (
                <span style={{ color: '#10B981' }}>🎉 You unlocked Free Express Insured Delivery!</span>
              ) : (
                <span>Add <strong>₹{amountToFreeShipping.toLocaleString('en-IN')}</strong> more to unlock Free Insured Delivery!</span>
              )}
            </div>
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Free delivery threshold: ₹{siteSettings.freeShippingThreshold}</span>
          </div>

          <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${freeShippingProgress}%`,
              height: '100%',
              backgroundColor: freeShippingProgress >= 100 ? '#10B981' : '#D6A32D',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Grid Layout: Left Items + Right Order Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.9fr',
          gap: '36px',
          alignItems: 'start'
        }} className="cart-layout-grid">
          
          {/* Left Column: Cart Items & Saved for Later */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cart.map((item, idx) => {
              const p = item.product;
              return (
                <div
                  key={`${p.id}-${item.size}-${item.color}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    padding: '20px',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}
                  className="cart-item-card"
                >
                  <Link to={`/product/${p.id}`} style={{ width: '110px', height: '140px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#F8F6F0' }}>
                    <img src={p.images ? p.images[0] : p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Link>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#D6A32D', fontWeight: 800, textTransform: 'uppercase' }}>
                      {p.category}
                    </span>

                    <Link to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#102D50', margin: 0 }}>
                        {p.name}
                      </h3>
                    </Link>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#64748B' }}>
                      <span>Size: <strong style={{ color: '#102D50' }}>{item.size}</strong></span>
                      <span>Color: <strong style={{ color: '#102D50' }}>{item.color}</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '4px 0' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102D50' }}>
                        ₹{(p.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.quantity > 1 && (
                        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                          (₹{p.price.toLocaleString('en-IN')} each)
                        </span>
                      )}
                    </div>

                    {/* Controls: Quantity, Save for Later, Remove */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', flexWrap: 'wrap', gap: '10px' }}>
                      {/* Quantity stepper */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '4px', overflow: 'hidden' }}>
                        <button
                          onClick={() => updateCartQuantity(p.id, item.size, item.color, -1)}
                          style={{ padding: '4px 10px', backgroundColor: '#F8FAFC', fontWeight: 700 }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0 12px', fontSize: '0.85rem', fontWeight: 700 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(p.id, item.size, item.color, 1)}
                          style={{ padding: '4px 10px', backgroundColor: '#F8FAFC', fontWeight: 700 }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: '16px' }}>
                        <button
                          onClick={() => moveToSavedForLater(p.id, item.size, item.color)}
                          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#64748B', cursor: 'pointer' }}
                        >
                          <Bookmark size={14} /> Save for later
                        </button>
                        <button
                          onClick={() => removeFromCart(p.id, item.size, item.color)}
                          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#DC2626', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Saved For Later Section */}
            {savedForLater.length > 0 && (
              <div style={{ marginTop: '20px', backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '24px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#102D50', marginBottom: '16px' }}>
                  Saved For Later ({savedForLater.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {savedForLater.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img src={item.product.images ? item.product.images[0] : item.product.image} alt="" style={{ width: '60px', height: '75px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                          <p style={{ fontWeight: 700, color: '#102D50', margin: 0, fontSize: '0.92rem' }}>{item.product.name}</p>
                          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Size: {item.size} • ₹{item.product.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => moveToCartFromSaved(item)}
                        style={{
                          backgroundColor: '#102D50',
                          color: '#F0C96A',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '4px',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        Move to Bag
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary & Checkout Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid rgba(214, 163, 45, 0.4)',
            padding: '28px',
            boxShadow: '0 10px 30px rgba(8, 27, 50, 0.08)',
            position: 'sticky',
            top: '110px'
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#102D50', marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
              Order Price Breakdown
            </h2>

            {/* Coupon Code Box */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#102D50', display: 'block', marginBottom: '6px' }}>
                Have a Festive Coupon Code?
              </span>
              {appliedCoupon ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#ECFDF5',
                  border: '1px solid #10B981',
                  borderRadius: '6px',
                  padding: '8px 12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={15} color="#059669" />
                    <span style={{ fontWeight: 800, color: '#065F46', fontSize: '0.85rem' }}>{appliedCoupon.code}</span>
                    <span style={{ fontSize: '0.74rem', color: '#047857' }}>({appliedCoupon.label})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ fontSize: '0.74rem', color: '#DC2626', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="e.g. AGAM10 or FESTIVE500"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.84rem',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#102D50',
                      color: '#FFFFFF',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Gift Packaging Option */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              backgroundColor: '#FDF6E3',
              borderRadius: '8px',
              border: '1px solid #D6A32D',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gift size={18} color="#D6A32D" />
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.84rem', color: '#102D50', margin: 0 }}>
                    Add Luxury Heritage Gift Box
                  </p>
                  <p style={{ fontSize: '0.72rem', color: '#64748B', margin: 0 }}>
                    Includes gold foil seal & personalized greeting note (+₹99)
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={giftPackaging}
                onChange={(e) => setGiftPackaging(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#D6A32D', cursor: 'pointer' }}
              />
            </div>

            {/* Calculations Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>Bag Subtotal ({cartTotalItems} items)</span>
                <span style={{ fontWeight: 600, color: '#102D50' }}>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                  <span>Coupon Discount</span>
                  <span style={{ fontWeight: 700 }}>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>GST Tax (5% Standard Apparel)</span>
                <span style={{ fontWeight: 600, color: '#102D50' }}>₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>Transit Insured Delivery</span>
                <span style={{ fontWeight: 700, color: shippingCost === 0 ? '#10B981' : '#102D50' }}>
                  {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                </span>
              </div>

              {giftPackaging && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Luxury Heritage Gift Packaging</span>
                  <span style={{ fontWeight: 600, color: '#102D50' }}>₹{packagingCost}</span>
                </div>
              )}
            </div>

            {/* Final Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#102D50' }}>Total Amount</span>
                <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Includes all taxes & mill assurance</span>
              </div>
              <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#102D50' }}>
                ₹{cartFinalTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="btn-gold"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', letterSpacing: '0.5px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Continue Shopping */}
            <div style={{ textAlign: 'center', marginTop: '14px' }}>
              <Link to="/collections" style={{ color: '#64748B', fontSize: '0.82rem', textDecoration: 'underline' }}>
                ← Continue Browsing Collections
              </Link>
            </div>

            {/* Trust badge icons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', fontSize: '0.72rem', color: '#94A3B8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="#10B981" /> 100% Safe Payments
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <RotateCcw size={14} color="#D6A32D" /> 7-Day Easy Returns
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CartPage;
