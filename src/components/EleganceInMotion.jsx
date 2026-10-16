import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const ROW1_ITEMS = [
  {
    title: 'Bridal Kanchipuram Weaves',
    desc: 'Dense gold zari korvai borders & pure mulberry silk threads.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85',
    link: '/category/sarees'
  },
  {
    title: 'Royal Chanderi Flared Kurtis',
    desc: 'Subtle zari embroidery with festive festive drapes.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=85',
    link: '/category/kurtis'
  },
  {
    title: 'Pure Mulberry Veshti & Kurta',
    desc: 'Traditional Mayilkanmu borders woven on generational looms.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85',
    link: '/category/mens-wear'
  },
  {
    title: 'Festive Salwar Brocades',
    desc: 'Bespoke handloom sets designed for temple & family festivities.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=85',
    link: '/category/salwar-suits'
  }
];

const ROW2_ITEMS = [
  {
    title: 'Heirloom Peacock Lehengas',
    desc: 'Intricate micro-zari craftsmanship and timeless crimson silk.',
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=700&q=85',
    link: '/collections'
  },
  {
    title: 'Kids\' Traditional Pattu Pavadai',
    desc: 'Pure soft silk with gold temple borders for little connoisseurs.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=85',
    link: '/category/kids-wear'
  },
  {
    title: 'Handcrafted Zardozi Blouses',
    desc: 'Bespoke tailoring with authentic tested gold bullion wire.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=85',
    link: '/collections'
  },
  {
    title: 'Banarasi Heritage Drapes',
    desc: 'Floral jaal brocades in vintage jewel tones from Nirmala atelier.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=85',
    link: '/category/sarees'
  }
];

const EleganceInMotion = () => {
  const [row1Paused, setRow1Paused] = useState(false);
  const [row2Paused, setRow2Paused] = useState(false);

  const duplicatedRow1 = [...ROW1_ITEMS, ...ROW1_ITEMS];
  const duplicatedRow2 = [...ROW2_ITEMS, ...ROW2_ITEMS];

  return (
    <section style={{
      padding: '75px 0',
      backgroundColor: '#081D36',
      color: '#FFFDF7',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Background Accent Lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(212, 166, 58, 0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.5,
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '45px', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <div className="badge-heritage" style={{ marginBottom: '10px', backgroundColor: 'rgba(212, 166, 58, 0.15)', borderColor: '#D4A63A' }}>
          <Sparkles size={13} color="#E8C879" />
          <span style={{ color: '#E8C879' }}>CINEMATIC FASHION SHOWCASE</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.5rem',
          color: '#FFFDF7',
          letterSpacing: '1px',
          margin: '0 0 10px 0'
        }}>
          Elegance in Motion
        </h2>
        <p style={{
          color: '#A7ADB1',
          fontSize: '0.96rem',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Witness the timeless artistry of pure handloom textures flowing with grace and contemporary sophistication.
        </p>
      </div>

      {/* ROW 1: Right to Left */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          marginBottom: '28px',
          padding: '8px 0'
        }}
        onMouseEnter={() => setRow1Paused(true)}
        onMouseLeave={() => setRow1Paused(false)}
      >
        <div
          style={{
            display: 'flex',
            gap: '26px',
            width: 'max-content',
            animation: 'marqueeRtoL 42s linear infinite',
            animationPlayState: row1Paused ? 'paused' : 'running'
          }}
        >
          {duplicatedRow1.map((card, idx) => (
            <Link
              key={idx}
              to={card.link}
              style={{
                width: '320px',
                height: '420px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                textDecoration: 'none',
                flexShrink: 0,
                border: '1px solid rgba(212, 166, 58, 0.35)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                transition: 'transform 0.4s ease, border-color 0.4s ease'
              }}
              className="motion-card"
            >
              <img
                src={card.image}
                alt={card.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(8, 29, 54, 0.95) 0%, rgba(8, 29, 54, 0.4) 50%, transparent 100%)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                transition: 'background 0.3s ease'
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  color: '#FFFDF7',
                  margin: '0 0 6px 0',
                  lineHeight: 1.3
                }}>
                  {card.title}
                </h3>
                <p style={{
                  color: '#CBD5E1',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  margin: '0 0 16px 0'
                }}>
                  {card.desc}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#E8C879',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  <span>Explore Design</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ROW 2: Left to Right */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          padding: '8px 0'
        }}
        onMouseEnter={() => setRow2Paused(true)}
        onMouseLeave={() => setRow2Paused(false)}
      >
        <div
          style={{
            display: 'flex',
            gap: '26px',
            width: 'max-content',
            animation: 'marqueeLtoR 42s linear infinite',
            animationPlayState: row2Paused ? 'paused' : 'running'
          }}
        >
          {duplicatedRow2.map((card, idx) => (
            <Link
              key={idx}
              to={card.link}
              style={{
                width: '320px',
                height: '420px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                textDecoration: 'none',
                flexShrink: 0,
                border: '1px solid rgba(212, 166, 58, 0.35)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                transition: 'transform 0.4s ease, border-color 0.4s ease'
              }}
              className="motion-card"
            >
              <img
                src={card.image}
                alt={card.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(8, 29, 54, 0.95) 0%, rgba(8, 29, 54, 0.4) 50%, transparent 100%)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                transition: 'background 0.3s ease'
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  color: '#FFFDF7',
                  margin: '0 0 6px 0',
                  lineHeight: 1.3
                }}>
                  {card.title}
                </h3>
                <p style={{
                  color: '#CBD5E1',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  margin: '0 0 16px 0'
                }}>
                  {card.desc}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#E8C879',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  <span>Explore Design</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EleganceInMotion;
