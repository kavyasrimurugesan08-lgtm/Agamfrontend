import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Truck, 
  Sparkles,
  ArrowRight,
  Heart
} from 'lucide-react';

const Footer = () => {
  const { siteSettings, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('Thank you for subscribing to AGAM Heirloom Weaves!', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer style={{
      backgroundColor: '#061527',
      color: '#CBD5E1',
      borderTop: '2px solid #D6A32D',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Decorative Gold Diamond Strip at top of footer */}
      <div className="gold-diamond-border" />

      {/* Main Footer Container */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '60px 24px 30px'
      }}>
        
        {/* Top Newsletter & Brand Promise Banner */}
        <div style={{
          backgroundColor: '#0A233F',
          borderRadius: '12px',
          border: '1px solid rgba(214, 163, 45, 0.35)',
          padding: '30px 36px',
          marginBottom: '50px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: '30px',
          alignItems: 'center'
        }} className="footer-newsletter-banner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F0C96A', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              <Sparkles size={14} /> The AGAM Heritage Circle
            </div>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              color: '#FFFFFF',
              margin: '0 0 6px 0'
            }}>
              Join Our Exclusive Weaves & Festive Previews
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0 }}>
              Receive direct mill release announcements, festive coupon vouchers, and handloom craftsmanship stories.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '6px',
                border: '1px solid rgba(214, 163, 45, 0.4)',
                backgroundColor: '#081B32',
                color: '#FFFFFF',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-gold"
              style={{ padding: '12px 24px', whiteSpace: 'nowrap' }}
            >
              <span>Subscribe</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* 4 Footer Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr',
          gap: '40px',
          marginBottom: '50px'
        }} className="footer-columns-grid">
          
          {/* Column 1: Brand & Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link to="/" style={{ display: 'inline-block', textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '8px 16px', borderRadius: '8px', display: 'inline-block', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <img src="/agam-logo.png" alt="AGAM - The Unit of Nirmala Tex" style={{ height: '46px', width: 'auto', display: 'block' }} />
              </div>
            </Link>

            <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
              Rooted in the renowned master weaving traditions of Tamil Nadu, AGAM brings authentic pure mulberry silk sarees, bridal drapes, and festive attire straight from our heritage looms at direct mill pricing.
            </p>

            {/* Certification signals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#F0C96A' }}>
                <Award size={16} /> 100% Certified Silk Mark Organization of India
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#10B981' }}>
                <ShieldCheck size={16} /> Genuine Tested Gold & Silver Zari Woven
              </div>
            </div>
          </div>

          {/* Column 2: Traditional Collections */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-serif)',
              color: '#F0C96A',
              fontSize: '1.1rem',
              marginBottom: '18px',
              borderBottom: '1px solid rgba(214, 163, 45, 0.3)',
              paddingBottom: '8px'
            }}>
              Collections
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><Link to="/category/sarees" style={{ color: '#CBD5E1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#F0C96A'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Kanchipuram Silk Sarees</Link></li>
              <li><Link to="/category/sarees?sub=Banarasi+Sarees" style={{ color: '#CBD5E1' }}>Banarasi Brocades</Link></li>
              <li><Link to="/category/kurtis" style={{ color: '#CBD5E1' }}>Chanderi Silk Flared Kurtis</Link></li>
              <li><Link to="/category/salwar-suits" style={{ color: '#CBD5E1' }}>Zardozi Salwar Suits</Link></li>
              <li><Link to="/category/mens-wear" style={{ color: '#CBD5E1' }}>Pure Silk Kurta & Veshti</Link></li>
              <li><Link to="/category/kids-wear" style={{ color: '#CBD5E1' }}>Girls' Pattu Pavadai Sets</Link></li>
              <li><Link to="/category/lehengas" style={{ color: '#CBD5E1' }}>Royal Bridal Lehengas</Link></li>
              <li><Link to="/festive-collection" style={{ color: '#CBD5E1' }}>Festive Specials (Diwali & Pongal)</Link></li>
              <li><Link to="/wedding-collection" style={{ color: '#CBD5E1' }}>Wedding & Muhurtham Edit</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-serif)',
              color: '#F0C96A',
              fontSize: '1.1rem',
              marginBottom: '18px',
              borderBottom: '1px solid rgba(214, 163, 45, 0.3)',
              paddingBottom: '8px'
            }}>
              Customer Service
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><Link to="/orders" style={{ color: '#CBD5E1' }}>Track Your Order</Link></li>
              <li><Link to="/contact" style={{ color: '#CBD5E1' }}>Contact Customer Support</Link></li>
              <li><Link to="/faqs" style={{ color: '#CBD5E1' }}>Frequently Asked Questions</Link></li>
              <li><Link to="/shipping-policy" style={{ color: '#CBD5E1' }}>Shipping & Transit Insurance</Link></li>
              <li><Link to="/returns-policy" style={{ color: '#CBD5E1' }}>7-Day Returns & Exchanges</Link></li>
              <li><Link to="/privacy-policy" style={{ color: '#CBD5E1' }}>Privacy & Data Security</Link></li>
              <li><Link to="/terms-conditions" style={{ color: '#CBD5E1' }}>Terms of Service</Link></li>
              <li><Link to="/admin" style={{ color: '#F0C96A', fontWeight: 600 }}>Administrator Portal</Link></li>
            </ul>
          </div>

          {/* Column 4: Nirmala Tex Atelier Info */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-serif)',
              color: '#F0C96A',
              fontSize: '1.1rem',
              marginBottom: '18px',
              borderBottom: '1px solid rgba(214, 163, 45, 0.3)',
              paddingBottom: '8px'
            }}>
              Heritage Atelier
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} color="#D6A32D" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{siteSettings.storeAddress}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#D6A32D" style={{ flexShrink: 0 }} />
                <a href={`tel:${siteSettings.supportPhone}`} style={{ color: '#CBD5E1' }}>
                  {siteSettings.supportPhone} (10 AM - 7 PM IST)
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#D6A32D" style={{ flexShrink: 0 }} />
                <a href={`mailto:${siteSettings.supportEmail}`} style={{ color: '#CBD5E1' }}>
                  {siteSettings.supportEmail}
                </a>
              </div>

              {/* Secure Payment Badges */}
              <div style={{ marginTop: '10px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                  100% Secure Payment Gateways
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['UPI (GPay / PhonePe / Paytm)', 'RuPay', 'Visa', 'Mastercard', 'Net Banking', 'Cash on Delivery'].map(badge => (
                    <span key={badge} style={{
                      backgroundColor: '#0A233F',
                      border: '1px solid rgba(214, 163, 45, 0.3)',
                      color: '#F0C96A',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.68rem',
                      fontWeight: 600
                    }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.76rem',
          color: '#64748B'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>AGAM</strong> – The Unit of Nirmala Textiles. All rights reserved. Handcrafted with traditional master weaving heritage in Tamil Nadu, India.
          </div>
          <div style={{ display: 'flex', gap: '18px' }}>
            <Link to="/privacy-policy" style={{ color: '#94A3B8' }}>Privacy Policy</Link>
            <Link to="/terms-conditions" style={{ color: '#94A3B8' }}>Terms of Service</Link>
            <Link to="/shipping-policy" style={{ color: '#94A3B8' }}>Shipping Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
