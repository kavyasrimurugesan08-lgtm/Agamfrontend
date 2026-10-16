import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const CIRCULAR_CATEGORIES = [
  {
    name: 'Silk Sarees',
    subtitle: 'Pure Mulberry Weaves',
    image: '/images/sarees.jpg',
    slug: 'sarees'
  },
  {
    name: 'Designer Kurtis',
    subtitle: 'Chanderi & Anarkalis',
    image: '/images/kurtis.jpg',
    slug: 'kurtis'
  },
  {
    name: 'Salwar Suits',
    subtitle: 'Royal Embroidered Sets',
    image: '/images/salwar_suits.jpg',
    slug: 'salwar-suits'
  },
  {
    name: 'Men\'s Ethnic Wear',
    subtitle: 'Mulberry Silks & Veshtis',
    image: '/images/mens_wear.jpg',
    slug: 'mens-wear'
  },
  {
    name: 'Kids\' Collection',
    subtitle: 'Pure Silk Pattu Pavadai',
    image: '/images/kids_wear.jpg',
    slug: 'kids-wear'
  },
  {
    name: 'Designer Blouses',
    subtitle: 'Zardozi & Maggam Work',
    image: '/images/blouses.jpg',
    slug: 'blouses'
  },
  {
    name: 'Bridal Collection',
    subtitle: 'Heirloom Kanchipuram & Lehengas',
    image: '/images/lehengas.jpg',
    slug: 'lehengas'
  },
  {
    name: 'Festive Collection',
    subtitle: 'Celebration Masterpieces',
    image: '/images/chanderi_kurti.jpg',
    slug: 'festive-specials'
  }
];

const CircularSlider = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Duplicate for seamless infinite marquee loop
  const duplicatedList = [...CIRCULAR_CATEGORIES, ...CIRCULAR_CATEGORIES];

  return (
    <section style={{
      padding: '70px 0 60px',
      backgroundColor: '#FFFDF7',
      overflow: 'hidden',
      position: 'relative',
      borderTop: '1px solid rgba(212, 166, 58, 0.25)',
      borderBottom: '1px solid rgba(212, 166, 58, 0.25)'
    }}>
      {/* Decorative background ambient glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(212, 166, 58, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '46px', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <div className="badge-heritage" style={{ marginBottom: '10px' }}>
          <Sparkles size={13} color="#D4A63A" />
          <span style={{ color: '#102D50' }}>SIGNATURE HANDLOOM CURATIONS</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.5rem',
          color: '#102D50',
          letterSpacing: '1px',
          margin: '0 0 10px 0'
        }}>
          Explore Our Collections
        </h2>
        <p style={{
          color: '#5C6E82',
          fontSize: '1rem',
          maxWidth: '540px',
          margin: '0 auto',
          letterSpacing: '0.3px'
        }}>
          Discover Elegance in Every Collection – crafted with ancestral mastery by Nirmala Textiles
        </p>
      </div>

      {/* Marquee Track Container */}
      <div 
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          padding: '20px 0 30px'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredIdx(null);
        }}
      >
        {/* Infinite Moving Track */}
        <div 
          className="circular-marquee-track"
          style={{
            display: 'flex',
            gap: '36px',
            width: 'max-content',
            animation: 'marqueeCircular 38s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {duplicatedList.map((cat, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <Link
                key={idx}
                to={cat.slug === 'festive-specials' ? '/festive-collection' : (cat.slug === 'blouses' || cat.slug === 'lehengas' ? '/collections' : `/category/${cat.slug}`)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  flexShrink: 0,
                  width: '230px',
                  cursor: 'pointer',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Perfect Circular Image Container */}
                <div style={{
                  width: '230px',
                  height: '230px',
                  borderRadius: '50%',
                  position: 'relative',
                  overflow: 'hidden',
                  border: isHovered ? '3px solid #D4A63A' : '2px solid rgba(212, 166, 58, 0.45)',
                  boxShadow: isHovered 
                    ? '0 16px 36px rgba(212, 166, 58, 0.35), 0 0 20px rgba(212, 166, 58, 0.4)'
                    : '0 10px 25px rgba(8, 29, 54, 0.12)',
                  transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  backgroundColor: '#081D36'
                }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                      filter: isHovered ? 'brightness(1.08)' : 'brightness(0.96)',
                      transition: 'transform 0.6s ease, filter 0.4s ease'
                    }}
                    loading="lazy"
                  />

                  {/* Gradient Overlay & Hover Explore Button */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isHovered 
                      ? 'radial-gradient(circle, rgba(8, 29, 54, 0.4) 0%, rgba(8, 29, 54, 0.8) 100%)'
                      : 'linear-gradient(to top, rgba(8, 29, 54, 0.4) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.35s ease'
                  }}>
                    <span style={{
                      backgroundColor: '#D4A63A',
                      color: '#081D36',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                      padding: '8px 18px',
                      borderRadius: '24px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                      transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                      transition: 'transform 0.35s ease'
                    }}>
                      Explore <ArrowRight size={13} />
                    </span>
                  </div>
                </div>

                {/* Category Details Below Circle */}
                <div style={{
                  textAlign: 'center',
                  marginTop: '16px',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'transform 0.3s ease'
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.18rem',
                    color: isHovered ? '#D4A63A' : '#102D50',
                    margin: '0 0 3px 0',
                    fontWeight: 700,
                    transition: 'color 0.25s ease'
                  }}>
                    {cat.name}
                  </h3>
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#64748B',
                    letterSpacing: '0.3px',
                    display: 'block'
                  }}>
                    {cat.subtitle}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CircularSlider;
