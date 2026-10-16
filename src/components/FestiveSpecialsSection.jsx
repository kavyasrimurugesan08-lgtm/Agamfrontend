import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';

const OCCASIONS = [
  { name: 'Diwali Splendour', tag: 'Pure Zari Silks', path: '/festive-collection' },
  { name: 'Pongal & Harvest', tag: 'Traditional Veshtis & Sarees', path: '/collections' },
  { name: 'Grand Weddings', tag: 'Bridal Kanchipuram & Lehengas', path: '/wedding-collection' },
  { name: 'Family Celebrations', tag: 'Festive Anarkalis & Kurta Sets', path: '/category/kurtis' },
  { name: 'Temple Occasions', tag: 'Korvai Border Silks', path: '/category/sarees' },
  { name: 'Festive Soirées', tag: 'Contemporary Embroidered Suits', path: '/category/salwar-suits' }
];

const FestiveSpecialsSection = () => {
  return (
    <section style={{
      maxWidth: '1440px',
      margin: '60px auto',
      padding: '0 24px'
    }}>
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 48px',
        boxShadow: '0 20px 45px rgba(8, 29, 54, 0.25)',
        border: '1.5px solid rgba(212, 166, 58, 0.5)'
      }}>
        {/* Background Image with Dark Luxury Gradient */}
        <img
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85"
          alt="Celebrate Festive Elegance"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7)'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(8, 29, 54, 0.94) 0%, rgba(8, 29, 54, 0.8) 50%, rgba(16, 45, 80, 0.6) 100%)'
        }} />

        {/* Floating Ambient Sparkles Glow */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212, 166, 58, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px' }}>
          <div className="badge-heritage" style={{ marginBottom: '16px', backgroundColor: 'rgba(212, 166, 58, 0.2)', borderColor: '#D4A63A' }}>
            <Flame size={14} color="#E8C879" />
            <span style={{ color: '#E8C879' }}>FESTIVE & AUSPICIOUS REPERTOIRE</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.8rem',
            color: '#FFFDF7',
            lineHeight: 1.15,
            margin: '0 0 16px 0',
            letterSpacing: '0.5px'
          }}>
            Celebrate Every Occasion in Style
          </h2>

          <p style={{
            color: '#CBD5E1',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            margin: '0 0 32px 0'
          }}>
            From radiant Diwali silks and auspicious Pongal traditional drapes to magnificent wedding heirlooms, explore ensembles woven to honor timeless ceremonies.
          </p>

          {/* Occasion Tags Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: '36px'
          }}>
            {OCCASIONS.map((occ, idx) => (
              <Link
                key={idx}
                to={occ.path}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(212, 166, 58, 0.3)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 166, 58, 0.25)';
                  e.currentTarget.style.borderColor = '#D4A63A';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(212, 166, 58, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ color: '#E8C879', fontWeight: 700, fontSize: '0.9rem', marginBottom: '2px' }}>
                  {occ.name}
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                  {occ.tag}
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/festive-collection" className="btn-gold" style={{ padding: '13px 30px' }}>
              <span>Shop Festive Specials</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/wedding-collection" className="btn-navy-outline" style={{ padding: '13px 26px' }}>
              <span>Explore Wedding Atelier</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestiveSpecialsSection;
