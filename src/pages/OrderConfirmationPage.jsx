import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Printer, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  MapPin,
  Calendar
} from 'lucide-react';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { orders } = useShop();

  const order = orders.find(o => o.id === orderId) || orders[0];

  const handlePrintInvoice = () => {
    window.print();
  };

  if (!order) {
    return (
      <div style={{ backgroundColor: '#F8F6F0', minHeight: '70vh', padding: '80px 24px', textAlign: 'center' }}>
        <h2>Order Not Found</h2>
        <Link to="/" className="btn-gold" style={{ marginTop: '16px' }}>Return to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Celebration Header Card */}
        <div style={{
          backgroundColor: '#081B32',
          borderRadius: '14px',
          border: '2px solid #D6A32D',
          padding: '40px 32px',
          textAlign: 'center',
          color: '#FFFFFF',
          boxShadow: '0 15px 35px rgba(8, 27, 50, 0.25)',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'rgba(214, 163, 45, 0.15)',
            border: '2px solid #D6A32D',
            color: '#F0C96A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <CheckCircle2 size={42} />
          </div>

          <span className="badge-heritage" style={{ marginBottom: '8px' }}>
            <Sparkles size={13} color="#F0C96A" /> ORDER CONFIRMED & ALLOCATED
          </span>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#FFFFFF', margin: '8px 0 6px 0' }}>
            Thank You for Your Patronage!
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
            Your pure silk heirloom order has been registered at our Nirmala Tex master atelier. Silk Mark authenticity certificates and packing are underway.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#0A233F',
            border: '1px dashed #D6A32D',
            padding: '10px 20px',
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Order Identifier:</span>
            <strong style={{ color: '#F0C96A', fontSize: '1.1rem', letterSpacing: '0.5px' }}>{order.id}</strong>
          </div>
        </div>

        {/* Invoice & Order Summary Paper */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '36px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
          marginBottom: '24px'
        }} id="printable-invoice">
          
          {/* Brand header on invoice */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #102D50', paddingBottom: '20px', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/agam-logo.png" alt="AGAM" style={{ height: '46px', width: 'auto' }} />
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#102D50', fontSize: '1.25rem', margin: 0 }}>
                  AGAM – The Unit of Nirmala Tex
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0 }}>
                  Master Weavers & Silk Mark Certified Atelier • Tamil Nadu, India
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Tax Invoice Date</span>
              <p style={{ fontWeight: 700, color: '#102D50', margin: '2px 0 0 0', fontSize: '0.9rem' }}>{order.date}</p>
            </div>
          </div>

          {/* Delivery & Payment Metadata */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', marginBottom: '28px', fontSize: '0.86rem' }}>
            <div>
              <h4 style={{ color: '#102D50', fontWeight: 700, margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} color="#D6A32D" /> Delivery Recipient & Address:
              </h4>
              <p style={{ margin: 0, fontWeight: 700, color: '#334155' }}>{order.shippingAddress?.name}</p>
              <p style={{ margin: '2px 0', color: '#64748B' }}>{order.shippingAddress?.street}, {order.shippingAddress?.city}</p>
              <p style={{ margin: '2px 0', color: '#64748B' }}>{order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
              <p style={{ margin: '2px 0', color: '#64748B' }}>Phone: {order.shippingAddress?.phone}</p>
            </div>

            <div>
              <h4 style={{ color: '#102D50', fontWeight: 700, margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#10B981" /> Payment & Courier Status:
              </h4>
              <p style={{ margin: 0, color: '#334155' }}>Method: <strong>{order.paymentMethod}</strong> ({order.paymentStatus})</p>
              <p style={{ margin: '2px 0', color: '#334155' }}>Courier Partner: <strong>{order.courier}</strong></p>
              <p style={{ margin: '2px 0', color: '#334155' }}>Airway Bill: <strong>{order.trackingNumber}</strong></p>
            </div>
          </div>

          {/* Ordered Products Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', marginBottom: '24px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#102D50' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Item Description</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Size & Color</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Qty</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={item.product?.images ? item.product.images[0] : item.product?.image} alt="" style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <span style={{ fontWeight: 700, color: '#102D50', display: 'block' }}>{item.product?.name}</span>
                      <span style={{ fontSize: '0.72rem', color: '#64748B' }}>SKU: {item.product?.sku}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', color: '#475569' }}>
                    {item.size} • {item.color}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontWeight: 700 }}>
                    {item.quantity}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 800, color: '#102D50' }}>
                    ₹{(item.product?.price * item.quantity).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
            <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Subtotal:</span>
                <span>₹{order.subtotal?.toLocaleString('en-IN')}</span>
              </div>
              {order.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 700 }}>
                  <span>Discount:</span>
                  <span>- ₹{order.discount?.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>GST Tax (5%):</span>
                <span>₹{order.tax?.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Transit Insurance & Freight:</span>
                <span style={{ color: '#10B981', fontWeight: 700 }}>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #102D50', paddingTop: '8px', marginTop: '4px', fontSize: '1.1rem', fontWeight: 900, color: '#102D50' }}>
                <span>Total Paid:</span>
                <span>₹{order.total?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <button
            onClick={handlePrintInvoice}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.88rem',
              color: '#102D50',
              cursor: 'pointer'
            }}
          >
            <Printer size={16} /> Print / Save Tax Invoice
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link
              to={`/orders?track=${order.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                backgroundColor: '#102D50',
                color: '#FFFFFF',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.88rem'
              }}
            >
              <Truck size={16} color="#F0C96A" /> Track Real-time Shipment
            </Link>

            <Link to="/collections" className="btn-gold" style={{ padding: '10px 20px' }}>
              <span>Continue Shopping</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmationPage;
