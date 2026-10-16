import React from 'react';
import { Sparkles } from 'lucide-react';

const InstagramIcon = ({ size = 14, color = "#D4A63A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const GALLERY_POSTS = [
  {
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=85',
    title: 'Bridal Kanchipuram Splendour',
    tag: '#AGAMBride'
  },
  {
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=85',
    title: 'Chanderi Festive Anarkali',
    tag: '#AGAMElegance'
  },
  {
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85',
    title: 'Royal Silk Veshti & Angavastram',
    tag: '#AGAMHeritage'
  },
  {
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=600&q=85',
    title: 'Micro-Zari Crimson Drape',
    tag: '#PureMulberrySilk'
  },
  {
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=85',
    title: 'Pastel Handloom Silk Suit',
    tag: '#FestiveWeaves'
  },
  {
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=85',
    title: 'Banarasi Floral Brocade',
    tag: '#NirmalaTextiles'
  }
];

const InstagramGallery = () => {
  return (
    <section style={{
      maxWidth: '1440px',
      margin: '60px auto 40px',
      padding: '0 24px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="badge-heritage" style={{ marginBottom: '10px' }}>
          <InstagramIcon size={14} color="#D4A63A" />
          <span style={{ color: '#102D50' }}>EDITORIAL GALLERY</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.4rem',
          color: '#102D50',
          margin: '0 0 8px 0'
        }}>
          Styled by AGAM
        </h2>
        <p style={{ color: '#64748B', fontSize: '0.94rem' }}>
          Real patrons, breathtaking heirloom drapes, and living celebrations across India
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        {GALLERY_POSTS.map((post, idx) => (
          <div
            key={idx}
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '1 / 1',
              boxShadow: '0 8px 20px rgba(8, 29, 54, 0.08)',
              border: '1px solid rgba(212, 166, 58, 0.25)',
              cursor: 'pointer'
            }}
            className="insta-card"
          >
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              loading="lazy"
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(8, 29, 54, 0.85) 0%, transparent 60%)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              opacity: 0,
              transition: 'opacity 0.3s ease'
            }} className="insta-overlay">
              <span style={{ color: '#E8C879', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                {post.tag}
              </span>
              <span style={{ color: '#FFFDF7', fontSize: '0.85rem', fontWeight: 600 }}>
                {post.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramGallery;
