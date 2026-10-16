import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const NewsletterSection = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the AGAM Experience! Exclusive heirloom releases are on their way.', 'success');
    setEmail('');
  };

  return (
    <section style={{
      maxWidth: '1440px',
      margin: '60px auto',
      padding: '0 24px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #081D36 0%, #102D50 50%, #081D36 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        textAlign: 'center',
        border: '1.5px solid rgba(212, 166, 58, 0.4)',
        boxShadow: '0 20px 45px rgba(8, 29, 54, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Decorative Ring */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 166, 58, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
          <div className="badge-heritage" style={{ marginBottom: '16px', backgroundColor: 'rgba(212, 166, 58, 0.15)', borderColor: '#D4A63A' }}>
            <Sparkles size={13} color="#E8C879" />
            <span style={{ color: '#E8C879' }}>PRIVILEGED PATRON PRIVILEGES</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.5rem',
            color: '#FFFDF7',
            margin: '0 0 12px 0',
            lineHeight: 1.2
          }}>
            Be Part of the AGAM Experience
          </h2>

          <p style={{
            color: '#CBD5E1',
            fontSize: '0.98rem',
            lineHeight: 1.65,
            margin: '0 0 32px 0'
          }}>
            Subscribe for new collections, exclusive festive vouchers, and timeless fashion inspiration directly from Nirmala Textiles master weavers.
          </p>

          {subscribed ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10B981',
              color: '#34D399',
              padding: '12px 24px',
              borderRadius: '30px',
              fontWeight: 600
            }}>
              <CheckCircle2 size={18} />
              <span>Thank you! You are now enrolled in our Privileged Patron circle.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '500px',
              margin: '0 auto',
              flexWrap: 'wrap'
            }}>
              <div style={{
                flex: '1 1 280px',
                position: 'relative'
              }}>
                <Mail size={18} color="#D4A63A" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    borderRadius: '30px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(212, 166, 58, 0.45)',
                    color: '#FFFDF7',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn-gold"
                style={{
                  padding: '14px 28px',
                  borderRadius: '30px',
                  flex: '0 0 auto',
                  cursor: 'pointer'
                }}
              >
                Subscribe Now
              </button>
            </form>
          )}

          <div style={{ color: '#94A3B8', fontSize: '0.78rem', marginTop: '16px' }}>
            We respect your privacy. No spam, only authentic textile heirlooms.
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
