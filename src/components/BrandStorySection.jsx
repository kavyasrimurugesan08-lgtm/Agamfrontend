import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Award, ShieldCheck } from 'lucide-react';

const BrandStorySection = () => {
  return (
    <section style={{
      maxWidth: '1440px',
      margin: '60px auto',
      padding: '0 24px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid rgba(212, 166, 58, 0.35)',
        boxShadow: '0 16px 40px rgba(8, 29, 54, 0.06)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        alignItems: 'center'
      }}>
        {/* Left Column: Story & Official Logo */}
        <div style={{ padding: '56px 48px' }}>
          <div className="badge-heritage" style={{ marginBottom: '16px' }}>
            <Sparkles size={13} color="#D4A63A" />
            <span style={{ color: '#102D50' }}>HERITAGE WEAVING ATELIER</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.4rem',
            color: '#102D50',
            lineHeight: 1.2,
            margin: '0 0 16px 0'
          }}>
            The Story Behind AGAM
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <img
              src="/agam-logo.png"
              alt="AGAM – The Unit of Nirmala Textiles"
              style={{ height: '46px', width: 'auto', display: 'block' }}
            />
            <div style={{ borderLeft: '2px solid #D4A63A', paddingLeft: '14px' }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: '#102D50',
                letterSpacing: '1px'
              }}>
                AGAM – The Unit of Nirmala Textiles
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Woven With Tradition. Styled With Elegance.
              </div>
            </div>
          </div>

          <p style={{
            color: '#334155',
            fontSize: '1rem',
            lineHeight: 1.75,
            margin: '0 0 16px 0'
          }}>
            AGAM brings together timeless textile traditions and contemporary elegance. As a unit of Nirmala Textiles, AGAM celebrates the beauty of Indian craftsmanship through carefully curated ethnic fashion collections.
          </p>

          <p style={{
            color: '#64748B',
            fontSize: '0.9rem',
            lineHeight: 1.65,
            margin: '0 0 28px 0'
          }}>
            Every warp and weft is woven with tested pure zari, natural mulberry silk, and generational handloom precision—delivered directly to discerning patrons without distributor markups.
          </p>

          {/* Quick Badges */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#102D50', fontWeight: 600 }}>
              <Award size={18} color="#D4A63A" /> Certified Silk Mark Purity
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#102D50', fontWeight: 600 }}>
              <ShieldCheck size={18} color="#D4A63A" /> Direct Loom Pricing
            </div>
          </div>

          <Link
            to="/about"
            className="btn-gold"
            style={{ padding: '12px 28px' }}
          >
            <span>Discover Our Story</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Right Column: Editorial Visual */}
        <div style={{ position: 'relative', height: '100%', minHeight: '440px' }}>
          <img
            src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85"
            alt="Artisanal Handloom Craftsmanship"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(255,255,255,0.3) 0%, transparent 60%)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            backgroundColor: 'rgba(8, 29, 54, 0.85)',
            backdropFilter: 'blur(8px)',
            color: '#FFFDF7',
            padding: '12px 20px',
            borderRadius: '12px',
            border: '1px solid rgba(212, 166, 58, 0.4)',
            fontSize: '0.82rem',
            letterSpacing: '1px'
          }}>
            Nirmala Textiles • Master Looms
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;
