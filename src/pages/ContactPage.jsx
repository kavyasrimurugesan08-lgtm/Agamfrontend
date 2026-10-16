import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

const ContactPage = () => {
  const { siteSettings, showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product / Weave Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to our master weaver concierge!', 'success');
  };

  const whatsappUrl = `https://wa.me/${siteSettings.supportPhone.replace(/\D/g, '')}?text=${encodeURIComponent('Vanakkam! I am interested in inquiring about AGAM silk sarees and festive collections.')}`;

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge-heritage" style={{ marginBottom: '8px' }}>
            <Sparkles size={13} color="#D6A32D" />
            <span style={{ color: '#102D50' }}>ATELIER CONCIERGE</span>
            <Sparkles size={13} color="#D6A32D" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', color: '#102D50', margin: '6px 0 10px 0' }}>
            Contact AGAM – Nirmala Tex
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.96rem', maxWidth: '600px', margin: '0 auto' }}>
            Have a question about pure silk sarees, custom bridal blouse stitching, or order status? Our concierge team is at your service.
          </p>
        </div>

        {/* Layout Grid: Left Contact Info + Right Interactive Form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '36px',
          alignItems: 'start'
        }} className="contact-grid">
          
          {/* Left: Contact Info & WhatsApp */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Atelier Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '30px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 6px 20px rgba(0,0,0,0.04)'
            }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#102D50', marginBottom: '18px' }}>
                Heritage Weaving Atelier
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="#D6A32D" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#102D50', display: 'block' }}>Store & Weaving Studio:</strong>
                    <span style={{ color: '#475569', lineHeight: 1.5 }}>{siteSettings.storeAddress}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Phone size={18} color="#D6A32D" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#102D50', display: 'block' }}>Customer Support Phone:</strong>
                    <a href={`tel:${siteSettings.supportPhone}`} style={{ color: '#475569' }}>{siteSettings.supportPhone}</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Mail size={18} color="#D6A32D" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#102D50', display: 'block' }}>Email Concierge:</strong>
                    <a href={`mailto:${siteSettings.supportEmail}`} style={{ color: '#475569' }}>{siteSettings.supportEmail}</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Clock size={18} color="#D6A32D" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#102D50', display: 'block' }}>Operational Hours:</strong>
                    <span style={{ color: '#475569' }}>Monday – Saturday: 10:00 AM to 7:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Card */}
            <div style={{
              backgroundColor: '#0A233F',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #D6A32D',
              color: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}>
                  <MessageSquare size={18} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#F0C96A', margin: 0 }}>
                  Instant WhatsApp Weaver Help
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                Chat directly with our textile stylists for custom bridal color consultations and live video showroom tours.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.84rem'
                }}
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right: Interactive Inquiry Form */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '36px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#102D50', marginBottom: '6px' }}>
              Send an Inquiry Message
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.84rem', margin: '0 0 24px 0' }}>
              Our team typically responds within 3-4 business hours.
            </p>

            {submitted ? (
              <div style={{ backgroundColor: '#ECFDF5', padding: '32px', borderRadius: '8px', textAlign: 'center', border: '1px solid #10B981' }}>
                <CheckCircle2 size={40} color="#059669" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ color: '#065F46', fontSize: '1.2rem', margin: '0 0 6px 0' }}>
                  Message Received with Honor
                </h4>
                <p style={{ color: '#047857', fontSize: '0.88rem', margin: '0 0 16px 0' }}>
                  Thank you, {name}. An AGAM textile concierge will reach out to you at {email || phone} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold"
                  style={{ padding: '8px 20px', fontSize: '0.84rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Meenakshi Sundaram"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98401..."
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Inquiry Topic *</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.86rem', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="Product / Weave Inquiry">Product / Weave Inquiry</option>
                    <option value="Bridal Saree Bulk Consultation">Bridal Saree Bulk Consultation</option>
                    <option value="Custom Blouse Tailoring">Custom Blouse Tailoring</option>
                    <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                    <option value="Exchange or Return Assistance">Exchange or Return Assistance</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Message Details *</label>
                  <textarea
                    rows="4"
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what you are looking for..."
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ width: '100%', padding: '12px', fontSize: '0.92rem' }}
                >
                  <Send size={16} /> Send Inquiry to Weavers
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;
