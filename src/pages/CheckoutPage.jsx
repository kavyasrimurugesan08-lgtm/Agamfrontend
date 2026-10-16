import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote, 
  Truck, 
  Lock, 
  CheckCircle,
  MapPin,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    currentUser, 
    cartSubtotal, 
    discountAmount, 
    shippingCost, 
    taxAmount, 
    cartFinalTotal, 
    placeOrder,
    showToast 
  } = useShop();

  const [contactName, setContactName] = useState(currentUser?.name || '');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '');
  const [street, setStreet] = useState(currentUser?.addresses?.[0]?.street || '');
  const [city, setCity] = useState(currentUser?.addresses?.[0]?.city || 'Coimbatore');
  const [state, setState] = useState(currentUser?.addresses?.[0]?.state || 'Tamil Nadu');
  const [pincode, setPincode] = useState(currentUser?.addresses?.[0]?.pincode || '641012');

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('kavya@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: '#F8F6F0', minHeight: '70vh', padding: '80px 24px', textAlign: 'center' }}>
        <h2>Your bag is empty</h2>
        <Link to="/collections" className="btn-gold" style={{ marginTop: '16px' }}>Return to Shop</Link>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!contactName || !contactPhone || !street || !pincode) {
      showToast('Please fill in all mandatory delivery address fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder({
        paymentMethod,
        shippingAddress: {
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          street,
          city,
          state,
          pincode
        }
      });

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSubmitting(false);
      navigate(`/order-confirmation/${order.id}`);
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Checkout Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge-heritage" style={{ marginBottom: '4px' }}>VERIFIED 256-BIT ENCRYPTED CHECKOUT</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#102D50', margin: '4px 0 0 0' }}>
              Checkout & Delivery Details
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '0.85rem', fontWeight: 700 }}>
            <Lock size={16} /> 100% Insured Transit Guarantee
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.9fr',
            gap: '36px',
            alignItems: 'start'
          }} className="checkout-layout-grid">
            
            {/* Left Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Step 1: Customer Contact */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '24px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#102D50', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#102D50', color: '#F0C96A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800 }}>1</span>
                  Contact Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '24px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#102D50', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#102D50', color: '#F0C96A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800 }}>2</span>
                  Delivery Address in India
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Street Address / Flat / Building *</label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="e.g. 14, Weavers Colony, Gandhipuram"
                      style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>State *</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem', backgroundColor: '#FFFFFF' }}
                    >
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Other States">Other Indian States</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Postal Pincode *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '24px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#102D50', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#102D50', color: '#F0C96A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800 }}>3</span>
                  Select Payment Option
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                  {[
                    { id: 'UPI', label: 'UPI / QR', icon: Smartphone, desc: 'GPay, PhonePe, Paytm' },
                    { id: 'Cards', label: 'Cards', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                    { id: 'NetBanking', label: 'Net Banking', icon: Building2, desc: 'All Indian Banks' },
                    { id: 'COD', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay at Doorstep' }
                  ].map(method => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        style={{
                          padding: '14px 10px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #D6A32D' : '1px solid #CBD5E1',
                          backgroundColor: isSelected ? '#FDF6E3' : '#FFFFFF',
                          color: isSelected ? '#081B32' : '#475569',
                          textAlign: 'center',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Icon size={20} color={isSelected ? '#D6A32D' : '#64748B'} />
                        <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-form for selected payment */}
                {paymentMethod === 'UPI' && (
                  <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Enter your UPI Virtual Payment Address (VPA)
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        style={{ flex: 1, padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                      />
                      <span style={{ alignSelf: 'center', fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                        ✓ Instant Auto-Verify
                      </span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Cards' && (
                  <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
                    <div style={{ gridColumn: 'span 3' }}>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8910"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Valid Thru</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength="3"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'NetBanking' && (
                  <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Choose your Bank:
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div style={{ padding: '14px', backgroundColor: '#FEF3C7', borderRadius: '8px', border: '1px solid #F59E0B', fontSize: '0.82rem', color: '#92400E' }}>
                    <strong>Cash on Delivery (COD) Verified:</strong> Please keep exact cash of ₹{cartFinalTotal.toLocaleString('en-IN')} ready at the time of delivery. Silk Mark seals will be verified before accepting payment.
                  </div>
                )}
              </div>

            </div>

            {/* Right Order Summary & Confirmation Button */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid rgba(214, 163, 45, 0.4)',
              padding: '28px',
              boxShadow: '0 10px 30px rgba(8, 27, 50, 0.08)',
              position: 'sticky',
              top: '110px'
            }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#102D50', marginBottom: '16px', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
                Order Summary ({cart.length} items)
              </h3>

              {/* Items List preview */}
              <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={item.product.images ? item.product.images[0] : item.product.image} alt="" style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div>
                        <p style={{ fontWeight: 700, color: '#102D50', margin: 0 }}>{item.product.name}</p>
                        <span style={{ color: '#64748B', fontSize: '0.72rem' }}>Qty: {item.quantity} • Size: {item.size}</span>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: '#102D50' }}>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', borderTop: '1px solid #F1F5F9', paddingTop: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                    <span>Coupon Savings</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                  <span>GST Tax (5%)</span>
                  <span>₹{taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                  <span>Transit Insured Delivery</span>
                  <span style={{ color: shippingCost === 0 ? '#10B981' : '#102D50', fontWeight: 700 }}>
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>
              </div>

              {/* Final Amount */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#102D50' }}>Total Amount</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#102D50' }}>
                  ₹{cartFinalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold"
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
              >
                {isSubmitting ? (
                  <span>Securing Order & Payment...</span>
                ) : (
                  <>
                    <span>Place Order & Pay</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.74rem', color: '#94A3B8' }}>
                By placing this order you agree to AGAM – The Unit of Nirmala Tex authentic handloom delivery terms.
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

export default CheckoutPage;
