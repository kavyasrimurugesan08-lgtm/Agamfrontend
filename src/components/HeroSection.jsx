import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';

const SHOWCASE_PRODUCTS = [
  {
    id: 'AGAM-KUR-01',
    badge: 'DESIGNER FESTIVE KURTAS',
    tag: 'HAND-EMBROIDERED ANARKALI',
    title: 'Chanderi Silk Flared Kurta Set',
    price: '₹3,899',
    originalPrice: '₹4,999',
    origin: 'Nirmala Atelier',
    embroidery: 'Zardozi & Gota',
    shipping: 'FREE',
    ctaText: 'View Kurtis →',
    ctaSlug: 'kurtis',
    image: '/images/chanderi_kurti.jpg'
  },
  {
    id: 'AGAM-SAR-01',
    badge: 'KANCHIPURAM BRIDAL SILKS',
    tag: 'PURE MULBERRY SILK WEAVE',
    title: 'Kanchipuram Temple Border Silk Saree',
    price: '₹14,500',
    originalPrice: '₹18,999',
    origin: 'Kanchi Master Weavers',
    embroidery: 'Real Tested Zari',
    shipping: 'FREE',
    ctaText: 'Shop Silk Sarees →',
    ctaSlug: 'sarees',
    image: '/images/sarees.jpg'
  },
  {
    id: 'AGAM-MEN-01',
    badge: 'ROYAL HERITAGE MEN\'S',
    tag: 'PURE RAW SILK & MAYILKANMU',
    title: 'Mulberry Silk Kurta & Dhoti Set',
    price: '₹5,299',
    originalPrice: '₹6,999',
    origin: 'Nirmala Atelier',
    embroidery: 'Kasavu Border',
    shipping: 'FREE',
    ctaText: 'Explore Men\'s →',
    ctaSlug: 'mens-wear',
    image: '/images/mens_wear.jpg'
  },
  {
    id: 'AGAM-LEH-01',
    badge: 'BRIDAL & FESTIVE EDIT',
    tag: 'HAND-CRAFTED ZARDOZI',
    title: 'Heritage Peacock Zardozi Lehenga',
    price: '₹19,999',
    originalPrice: '₹26,000',
    origin: 'Nirmala Bridal Studio',
    embroidery: 'Micro-Zari & Pearls',
    shipping: 'FREE',
    ctaText: 'Explore Lehengas →',
    ctaSlug: 'lehengas',
    image: '/images/lehengas.jpg'
  },
  {
    id: 'AGAM-KID-01',
    badge: 'KIDS\' TRADITIONAL PATTU',
    tag: 'PURE SILK PATTU PAVADAI',
    title: 'Traditional Gold Zari Pattu Pavadai',
    price: '₹2,899',
    originalPrice: '₹3,799',
    origin: 'Nirmala Kids Atelier',
    embroidery: 'Temple Borders',
    shipping: 'FREE',
    ctaText: 'Explore Kids →',
    ctaSlug: 'kids-wear',
    image: '/images/kids_wear.jpg'
  },
  {
    id: 'AGAM-SAL-01',
    badge: 'FESTIVE SALWAR SUITS',
    tag: 'ROYAL EMBROIDERED SET',
    title: 'Royal Navy Silk Salwar Suit Set',
    price: '₹4,499',
    originalPrice: '₹5,999',
    origin: 'Nirmala Atelier',
    embroidery: 'Tilla & Zardozi',
    shipping: 'FREE',
    ctaText: 'View Suits →',
    ctaSlug: 'salwar-suits',
    image: '/images/salwar_suits.jpg'
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = SHOWCASE_PRODUCTS.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const activeProduct = SHOWCASE_PRODUCTS[currentSlide];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section 
      className="hero-pattern-bg"
      style={{
        position: 'relative',
        color: '#FFFFFF',
        padding: '24px 20px 28px',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(214, 163, 45, 0.25)'
      }}
    >
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.95fr)',
        gap: '32px',
        alignItems: 'center'
      }} className="hero-grid-responsive">
        
        {/* Left Column: Brand Story & Heritage CTAs matching screenshot */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Heritage Tag */}
          <div>
            <div className="badge-heritage" style={{ fontSize: '0.72rem', padding: '3px 12px' }}>
              <Sparkles size={12} color="#F0C96A" />
              <span>NIRMALA TEXTILES • MASTER WEAVING ARTISTRY & HERITAGE</span>
            </div>
          </div>

          {/* Grand Headline */}
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.9rem, 2.7vw, 2.6rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#FFFFFF',
            margin: 0,
            letterSpacing: '-0.4px'
          }}>
            Grand Silk & Festive Weaves of{' '}
            <span 
              style={{
                background: 'linear-gradient(135deg, #FCE8A6 0%, #F0C96A 40%, #D6A32D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                fontWeight: 900,
                letterSpacing: '1px',
                filter: 'drop-shadow(0 2px 8px rgba(214, 163, 45, 0.35))'
              }}
            >
              AGAM
            </span>
          </h1>

          {/* Italic Supporting Quote */}
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.05rem',
            fontStyle: 'italic',
            color: '#F0C96A',
            lineHeight: 1.35,
            margin: 0
          }}>
            "The Splendor of Pure Mulberry Silk, Rich Zari, and Heirloom Drapes from Tamil Nadu"
          </p>

          {/* Supporting Heritage Paragraph */}
          <p style={{
            fontSize: '0.88rem',
            color: '#CBD5E1',
            lineHeight: 1.55,
            maxWidth: '560px',
            margin: 0
          }}>
            As the flagship branch of <strong style={{ color: '#FFFFFF' }}>Nirmala Textiles</strong>, <strong style={{ color: '#F0C96A' }}>AGAM</strong> presents a peerless collection of handcrafted Kanchipuram bridal silks, lightweight soft silks, festive salwar suits, and traditional Mayilkanmu dhotis. Enjoy authentic mill pricing with verified Silk Mark purity.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '2px' }}>
            <Link to="/category/sarees" className="btn-gold" style={{ padding: '9px 22px', fontSize: '0.88rem' }}>
              <span>Shop Silk Sarees</span>
              <ArrowRight size={16} />
            </Link>

            <Link to="/category/mens-wear" className="btn-navy-outline" style={{ padding: '9px 20px', fontSize: '0.88rem' }}>
              <span>Men's Silk Wear</span>
            </Link>
          </div>

          {/* 3 Trust Indicators matching reference screenshot exactly */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginTop: '12px',
            paddingTop: '14px',
            borderTop: '1px solid rgba(214, 163, 45, 0.25)'
          }} className="hero-trust-grid">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Award size={18} color="#D6A32D" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ color: '#F0C96A', fontSize: '0.82rem', fontWeight: 700, margin: '0 0 1px 0' }}>
                  100% Silk Mark
                </h4>
                <p style={{ color: '#94A3B8', fontSize: '0.7rem', margin: 0, lineHeight: 1.25 }}>
                  Lab-tested pure mulberry silk
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Tag size={18} color="#D6A32D" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ color: '#F0C96A', fontSize: '0.82rem', fontWeight: 700, margin: '0 0 1px 0' }}>
                  Direct Mill Prices
                </h4>
                <p style={{ color: '#94A3B8', fontSize: '0.7rem', margin: 0, lineHeight: 1.25 }}>
                  Zero middleman commissions
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <ShieldCheck size={18} color="#D6A32D" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ color: '#F0C96A', fontSize: '0.82rem', fontWeight: 700, margin: '0 0 1px 0' }}>
                  Express Delivery
                </h4>
                <p style={{ color: '#94A3B8', fontSize: '0.7rem', margin: 0, lineHeight: 1.25 }}>
                  All-India safe insured transit
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Double-Gold Framed Luxury Showcase Card matching reference screenshot */}
        <div 
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Double Golden Border Framed Card */}
          <div style={{
            width: '100%',
            maxWidth: '460px',
            backgroundColor: '#081B32',
            border: '2px solid #D6A32D',
            outline: '3px solid rgba(214, 163, 45, 0.4)',
            outlineOffset: '4px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55), 0 0 20px rgba(214, 163, 45, 0.2)',
            position: 'relative'
          }}>
            
            {/* Card Header matching screenshot */}
            <div style={{
              padding: '8px 14px',
              backgroundColor: '#061527',
              borderBottom: '1px solid rgba(214, 163, 45, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src="/agam-logo-white.png" 
                  alt="AGAM – The Unit of Nirmala Tex" 
                  style={{ height: '26px', width: 'auto', objectFit: 'contain' }} 
                />
              </div>

              <span style={{
                border: '1px solid #D6A32D',
                color: '#F0C96A',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '1px',
                padding: '2px 7px',
                borderRadius: '3px',
                textTransform: 'uppercase'
              }}>
                {activeProduct.badge}
              </span>
            </div>

            {/* Showcase Image & Live Indicators */}
            <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
              <img 
                src={activeProduct.image} 
                alt={activeProduct.title}
                key={activeProduct.id}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top'
                }}
              />

              {/* Auto Showcase pill in top-right */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(8, 27, 50, 0.85)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(214, 163, 45, 0.4)',
                borderRadius: '20px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.7rem',
                color: '#FFFFFF',
                fontWeight: 600
              }}>
                <span className="pulse-dot" />
                <span>Auto Showcase ({currentSlide + 1}/{totalSlides})</span>
              </div>

              {/* Prev / Next circular controls */}
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(8, 27, 50, 0.75)',
                  border: '1px solid rgba(214, 163, 45, 0.5)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D6A32D'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(8, 27, 50, 0.75)'}
                aria-label="Previous Showcase Item"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(8, 27, 50, 0.75)',
                  border: '1px solid rgba(214, 163, 45, 0.5)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D6A32D'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(8, 27, 50, 0.75)'}
                aria-label="Next Showcase Item"
              >
                <ChevronRight size={18} />
              </button>

              {/* Lower Card Detail Overlay matching screenshot */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(8, 27, 50, 0.96) 0%, rgba(8, 27, 50, 0.72) 75%, transparent 100%)',
                padding: '14px 14px 10px'
              }}>
                <span style={{
                  color: '#F0C96A',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '2px'
                }}>
                  {activeProduct.tag}
                </span>

                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.08rem',
                      fontWeight: 700,
                      margin: '0 0 2px 0'
                    }}>
                      {activeProduct.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#F0C96A', fontWeight: 800, fontSize: '1.05rem' }}>
                        {activeProduct.price}
                      </span>
                      {activeProduct.originalPrice && (
                        <span style={{ color: '#94A3B8', textDecoration: 'line-through', fontSize: '0.82rem' }}>
                          {activeProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    to={`/category/${activeProduct.ctaSlug}`}
                    style={{
                      color: '#F0C96A',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#F0C96A'}
                  >
                    <span>{activeProduct.ctaText}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 0',
              backgroundColor: '#061527'
            }}>
              {SHOWCASE_PRODUCTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  style={{
                    width: currentSlide === idx ? '22px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: currentSlide === idx ? '#D6A32D' : 'rgba(255, 255, 255, 0.25)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Card Footer matching screenshot: Origin, Embroidery, Free Shipping */}
            <div style={{
              padding: '9px 14px',
              backgroundColor: '#0A233F',
              borderTop: '1px solid rgba(214, 163, 45, 0.3)',
              fontSize: '0.72rem',
              color: '#CBD5E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '4px'
            }}>
              <span>Origin: <strong style={{ color: '#FFFFFF' }}>{activeProduct.origin}</strong></span>
              <span style={{ color: 'rgba(214, 163, 45, 0.5)' }}>•</span>
              <span>Embroidery: <strong style={{ color: '#FFFFFF' }}>{activeProduct.embroidery}</strong></span>
              <span style={{ color: 'rgba(214, 163, 45, 0.5)' }}>•</span>
              <span>Shipping: <strong style={{ color: '#10B981' }}>{activeProduct.shipping}</strong></span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
