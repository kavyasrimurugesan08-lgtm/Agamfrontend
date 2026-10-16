import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  RotateCcw, 
  ShieldCheck,
  Search,
  AlertCircle
} from 'lucide-react';

const OrderTrackingPage = () => {
  const [searchParams] = useSearchParams();
  const { orders, showToast } = useShop();

  const queryTrack = searchParams.get('track');
  const [searchInput, setSearchInput] = useState(queryTrack || '');
  const [activeOrder, setActiveOrder] = useState(() => {
    if (queryTrack) {
      return orders.find(o => o.id.toLowerCase() === queryTrack.toLowerCase()) || orders[0];
    }
    return orders[0];
  });

  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [returnReason, setReturnReason] = useState('Size does not fit');
  const [returnType, setReturnType] = useState('Exchange');
  const [returnComments, setReturnComments] = useState('');

  const handleSearchOrder = (e) => {
    e.preventDefault();
    const found = orders.find(o => o.id.toLowerCase().includes(searchInput.trim().toLowerCase()) || o.trackingNumber.toLowerCase().includes(searchInput.trim().toLowerCase()));
    if (found) {
      setActiveOrder(found);
    } else {
      showToast('No order found with that ID or Tracking Number.', 'error');
    }
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    setReturnModalOpen(false);
    showToast(`Return request registered for ${activeOrder.id}. Our courier will contact you for pickup.`, 'success');
  };

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="badge-heritage" style={{ marginBottom: '8px' }}>BLUEDART AIR EXPRESS VERIFIED COURIER</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#102D50', margin: '6px 0 8px 0' }}>
            Live Shipment & Order Tracking
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
            Track the artisan dispatch journey of your AGAM handloom order
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchOrder} style={{ maxWidth: '520px', margin: '20px auto 0', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Enter Order ID (e.g. AGAM-ORD-9021) or Tracking No."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '0.88rem'
              }}
            />
            <button
              type="submit"
              className="btn-gold"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              <Search size={15} /> Track
            </button>
          </form>
        </div>

        {activeOrder ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            padding: '36px',
            boxShadow: '0 8px 24px rgba(8, 27, 50, 0.05)'
          }}>
            {/* Top Order Information Strip */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '20px',
              borderBottom: '1px solid #F1F5F9',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Order Identifier
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#102D50', margin: '2px 0 0 0' }}>
                  {activeOrder.id}
                </h3>
              </div>

              <div>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8', textTransform: 'uppercase' }}>Courier Partner</span>
                <p style={{ fontWeight: 700, color: '#102D50', margin: '2px 0 0 0' }}>
                  {activeOrder.courier} (Air Express)
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8', textTransform: 'uppercase' }}>Tracking AWB</span>
                <p style={{ fontWeight: 700, color: '#D6A32D', margin: '2px 0 0 0' }}>
                  {activeOrder.trackingNumber}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.74rem', color: '#94A3B8', textTransform: 'uppercase' }}>Current Status</span>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  border: '1px solid #A7F3D0',
                  marginTop: '2px'
                }}>
                  {activeOrder.status}
                </span>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div style={{ margin: '36px 0', padding: '0 10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {activeOrder.timeline?.map((step, idx) => {
                  const isDone = step.done;
                  const isLast = idx === activeOrder.timeline.length - 1;

                  return (
                    <div key={idx} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                      {/* Vertical connector line */}
                      {!isLast && (
                        <div style={{
                          position: 'absolute',
                          top: '28px',
                          left: '15px',
                          bottom: '-16px',
                          width: '2px',
                          backgroundColor: isDone ? '#10B981' : '#E2E8F0',
                          zIndex: 1
                        }} />
                      )}

                      {/* Dot icon */}
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isDone ? '#10B981' : '#F1F5F9',
                        color: isDone ? '#FFFFFF' : '#94A3B8',
                        border: isDone ? '2px solid #059669' : '2px solid #CBD5E1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        flexShrink: 0
                      }}>
                        {isDone ? <CheckCircle2 size={18} /> : <Clock size={16} />}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, paddingBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                          <h4 style={{
                            fontSize: '0.96rem',
                            fontWeight: isDone ? 700 : 500,
                            color: isDone ? '#102D50' : '#64748B',
                            margin: 0
                          }}>
                            {step.status}
                          </h4>
                          <span style={{ fontSize: '0.78rem', color: isDone ? '#059669' : '#94A3B8', fontWeight: 600 }}>
                            {step.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Destination Address & Items Preview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              backgroundColor: '#F8FAFC',
              borderRadius: '8px',
              padding: '20px',
              border: '1px solid #E2E8F0',
              fontSize: '0.85rem'
            }}>
              <div>
                <h4 style={{ color: '#102D50', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} color="#D6A32D" /> Delivery Destination:
                </h4>
                <p style={{ margin: 0, fontWeight: 700 }}>{activeOrder.shippingAddress?.name}</p>
                <p style={{ margin: '2px 0', color: '#64748B' }}>
                  {activeOrder.shippingAddress?.street}, {activeOrder.shippingAddress?.city}, {activeOrder.shippingAddress?.state} - {activeOrder.shippingAddress?.pincode}
                </p>
              </div>

              <div>
                <h4 style={{ color: '#102D50', margin: '0 0 6px 0' }}>Items in this Shipment:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {activeOrder.items?.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={item.product?.images ? item.product.images[0] : item.product?.image} alt="" style={{ width: '32px', height: '40px', objectFit: 'cover', borderRadius: '3px' }} />
                      <span style={{ color: '#334155' }}>{item.product?.name} (Size: {item.size}, Qty: {item.quantity})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Return / Exchange Trigger */}
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748B' }}>
                <ShieldCheck size={16} color="#10B981" /> 7-Day Hassle-free Exchange Window Active
              </div>

              <button
                onClick={() => setReturnModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  border: '1px solid #D6A32D',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  color: '#102D50',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={15} color="#D6A32D" /> Request Return or Size Exchange
              </button>
            </div>

          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>No orders registered currently. Place an order to start tracking!</p>
          </div>
        )}

        {/* Return & Exchange Request Modal */}
        {returnModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 27, 50, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '560px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
              border: '1px solid #D6A32D',
              animation: 'fadeIn 0.25s ease-out'
            }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#102D50', margin: '0 0 12px 0' }}>
                Request Return or Size Exchange
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 18px 0' }}>
                For order #{activeOrder.id}. Please ensure garments remain unworn with intact Silk Mark tags.
              </p>

              <form onSubmit={handleReturnSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Resolution Preferred:
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {['Exchange for Size', 'Full Refund to Original Payment'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setReturnType(type)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: returnType === type ? '2px solid #D6A32D' : '1px solid #CBD5E1',
                          backgroundColor: returnType === type ? '#FDF6E3' : '#FFFFFF',
                          color: returnType === type ? '#081B32' : '#475569',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Reason for Return / Exchange:
                  </label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }}
                  >
                    <option value="Size does not fit">Size does not fit (requires alteration / exchange)</option>
                    <option value="Color shade difference">Color / shade appearance preference</option>
                    <option value="Fabric drape preference">Fabric feel or drape preference</option>
                    <option value="Transit packaging defect">Transit packaging damaged</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Patron Notes or Specific Requirements:
                  </label>
                  <textarea
                    rows="3"
                    value={returnComments}
                    onChange={(e) => setReturnComments(e.target.value)}
                    placeholder="Provide any details for our weaver concierge..."
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setReturnModalOpen(false)}
                    style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #CBD5E1', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default OrderTrackingPage;
