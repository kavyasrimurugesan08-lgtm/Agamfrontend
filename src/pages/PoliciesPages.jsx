import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, ChevronUp, Search, ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';

export const FAQsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const filteredFaqs = FAQS.filter(f => 
    f.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#102D50', margin: '0 0 8px 0' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.94rem' }}>
            Answers regarding Silk Mark purity, direct mill pricing, order tracking, and returns.
          </p>

          <div style={{ position: 'relative', maxWidth: '500px', margin: '20px auto 0' }}>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 42px',
                borderRadius: '30px',
                border: '1px solid #CBD5E1',
                fontSize: '0.88rem'
              }}
            />
            <Search size={18} color="#64748B" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: isOpen ? '1px solid #D6A32D' : '1px solid #E2E8F0',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    color: '#102D50',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    backgroundColor: isOpen ? '#FDF6E3' : '#FFFFFF'
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} color="#D6A32D" /> : <ChevronDown size={18} color="#64748B" />}
                </button>
                {isOpen && (
                  <div style={{ padding: '16px 20px 20px', fontSize: '0.88rem', color: '#475569', lineHeight: 1.7, borderTop: '1px solid #F1F5F9' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ShippingPolicyPage = () => (
  <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
    <div style={{ maxWidth: '850px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D6A32D', marginBottom: '8px' }}>
        <Truck size={22} />
        <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>LOGISTICS & TRANSIT</span>
      </div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#102D50', margin: '0 0 20px 0' }}>
        Shipping & Delivery Policy
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#475569', fontSize: '0.9rem', lineHeight: 1.7 }}>
        <p>
          At <strong>AGAM – The Unit of Nirmala Tex</strong>, every pure silk saree, bespoke kurti, and ethnic dhoti is inspected and packed in rigid tamper-evident moisture-barrier packaging to preserve handloom condition during transit.
        </p>
        <h3 style={{ color: '#102D50', margin: '10px 0 0' }}>1. Dispatch & Delivery Timelines</h3>
        <p>
          - Orders placed before 2:00 PM IST on business days are dispatched within 24 hours.<br />
          - Metro cities (Chennai, Bengaluru, Hyderabad, Mumbai, Delhi, Kolkata): 2 to 3 business days.<br />
          - Rest of India: 3 to 5 business days.<br />
          - Remote & Hill states: 5 to 7 business days.
        </p>
        <h3 style={{ color: '#102D50', margin: '10px 0 0' }}>2. Shipping Charges & Free Threshold</h3>
        <p>
          - <strong>Complimentary Free Shipping</strong> is provided on all orders of ₹1,999 and above across India.<br />
          - For orders below ₹1,999, a nominal flat freight charge of ₹99 is applicable.
        </p>
        <h3 style={{ color: '#102D50', margin: '10px 0 0' }}>3. 100% Transit Insurance</h3>
        <p>
          Every shipment dispatched from our atelier in Tamil Nadu is 100% insured against loss, transit theft, or package damage at no additional charge to the customer.
        </p>
      </div>
    </div>
  </div>
);

export const ReturnsPolicyPage = () => (
  <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
    <div style={{ maxWidth: '850px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D6A32D', marginBottom: '8px' }}>
        <RotateCcw size={22} />
        <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>PATRON ASSURANCE</span>
      </div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#102D50', margin: '0 0 20px 0' }}>
        7-Day Returns & Exchange Policy
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#475569', fontSize: '0.9rem', lineHeight: 1.7 }}>
        <p>
          We stand unconditionally behind the authenticity, purity, and craftsmanship of our master weaves. If for any reason you are not completely enchanted with your purchase, our 7-day policy protects you.
        </p>
        <h3 style={{ color: '#102D50', margin: '10px 0 0' }}>Eligibility for Return or Size Exchange</h3>
        <p>
          - Items must be initiated for return within 7 calendar days from the date of recorded delivery.<br />
          - Garments must remain unwashed, unworn, and unhemmed.<br />
          - The official tamper-proof <strong>Silk Mark QR tag</strong> and brand labels must remain firmly affixed.<br />
          - Custom tailored blouses with bespoke individual measurements are eligible for free alterations rather than full return.
        </p>
        <h3 style={{ color: '#102D50', margin: '10px 0 0' }}>Refund Processing</h3>
        <p>
          Approved returns are refunded to the original payment method (UPI, Bank Account, Credit/Debit card) within 48 hours of inspection at our Tamil Nadu atelier.
        </p>
      </div>
    </div>
  </div>
);

export const PrivacyPolicyPage = () => (
  <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
    <div style={{ maxWidth: '850px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#102D50', margin: '0 0 20px 0' }}>
        Privacy & Data Security Policy
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#475569', fontSize: '0.9rem', lineHeight: 1.7 }}>
        <p>
          Your privacy is sacred to AGAM – The Unit of Nirmala Tex. We strictly collect only necessary information required to fulfill orders and provide bespoke textile customer service.
        </p>
        <p>
          - We never sell, rent, or lease customer data to third-party advertisers.<br />
          - All payment transactions are encrypted using 256-bit SSL encryption. We never store credit card numbers or CVVs on our servers.<br />
          - You may request removal of your account or browsing data at any time by contacting our care team.
        </p>
      </div>
    </div>
  </div>
);

export const TermsConditionsPage = () => (
  <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
    <div style={{ maxWidth: '850px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#102D50', margin: '0 0 20px 0' }}>
        Terms and Conditions
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#475569', fontSize: '0.9rem', lineHeight: 1.7 }}>
        <p>
          By accessing or shopping at AGAM – The Unit of Nirmala Tex, you agree to comply with our store policies, authentic handloom trade practices, and Indian consumer rights guidelines.
        </p>
        <p>
          - <strong>Handloom Authenticity:</strong> Authentic handloom garments may exhibit minute irregular slubs, selvedge thread ties, or natural dye nuances. These are hallmarks of pure artisan craft and not manufacturing defects.<br />
          - <strong>Pricing:</strong> All prices listed are in Indian Rupees (INR) and include applicable Goods and Services Tax (GST).
        </p>
      </div>
    </div>
  </div>
);
