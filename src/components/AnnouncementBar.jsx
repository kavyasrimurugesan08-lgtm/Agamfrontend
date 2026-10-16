import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Truck, Phone } from 'lucide-react';

const MESSAGES = [
  'Welcome to AGAM – The Unit of Nirmala Textiles',
  'Discover Timeless Elegance',
  'Exclusive Festive Collections',
  'Authentic Traditional Fashion',
  'New Arrivals Now Available'
];

const AnnouncementBar = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(90deg, #081D36 0%, #102D50 50%, #081D36 100%)',
      color: '#E8C879',
      borderBottom: '1px solid rgba(212, 166, 58, 0.35)',
      fontSize: '0.8rem',
      padding: '8px 24px',
      position: 'relative',
      zIndex: 100,
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left Trust Note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="hidden-mobile">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFDF7', fontSize: '0.78rem' }}>
            <ShieldCheck size={14} color="#D4A63A" /> 100% Verified Silk Mark Certified
          </span>
          <span style={{ color: 'rgba(212, 166, 58, 0.4)' }}>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFDF7', fontSize: '0.78rem' }}>
            <Truck size={14} color="#D4A63A" /> Direct Mill Pricing from Nirmala Textiles
          </span>
        </div>

        {/* Center Rotating Message with Smooth Transition */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          fontWeight: 600,
          margin: '0 auto',
          textAlign: 'center',
          minHeight: '22px'
        }}>
          <Sparkles size={13} color="#D4A63A" />
          <span
            key={currentIdx}
            style={{
              animation: 'fadeIn 0.5s ease-out forwards',
              letterSpacing: '0.6px',
              fontFamily: 'var(--font-sans)',
              color: '#FFFDF7'
            }}
          >
            {MESSAGES[currentIdx]}
          </span>
          <Sparkles size={13} color="#D4A63A" />
        </div>

        {/* Right Care & Delivery Note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden-mobile">
          <span style={{ color: '#E8C879', fontSize: '0.75rem', fontWeight: 600 }}>
            Complimentary Shipping on Orders &gt; ₹1,999
          </span>
          <span style={{ color: 'rgba(212, 166, 58, 0.4)' }}>•</span>
          <a
            href="tel:+919876543210"
            style={{ color: '#FFFDF7', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <Phone size={12} color="#D4A63A" /> Atelier Care: +91 98765 43210
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
