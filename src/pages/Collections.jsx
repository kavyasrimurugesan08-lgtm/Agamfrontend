import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, Crown, Flame } from 'lucide-react';

const Collections = () => {
  const { categories, products } = useShop();

  const specialCollections = [
    {
      id: 'festive',
      name: 'Festive Specials (Diwali & Pongal)',
      tagline: 'Festive Handloom Silks',
      path: '/festive-collection',
      desc: 'Radiant silks with auspicious zari motifs designed for festival pujas and family celebrations.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      badge: 'FESTIVE 2026'
    },
    {
      id: 'wedding',
      name: 'Royal Muhurtham & Wedding Edit',
      tagline: 'Bridal Heirloom Silks',
      path: '/wedding-collection',
      desc: 'Pure Kanchipuram bridal sarees, zardozi lehengas, and royal mulberry silk sherwanis.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      badge: 'BRIDAL HEIRLOOMS'
    },
    {
      id: 'new-arrivals',
      name: 'Fresh Weaves & New Arrivals',
      tagline: 'Direct Loom Releases',
      path: '/new-arrivals',
      desc: 'Recently completed loom batches featuring innovative contemporary weaves & soft silhouettes.',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      badge: 'NEW ARRIVALS'
    }
  ];

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge-heritage" style={{ marginBottom: '8px' }}>
            <Sparkles size={13} color="#D6A32D" />
            <span style={{ color: '#102D50' }}>NIRMALA TEXTILES MASTER ATELIER</span>
            <Sparkles size={13} color="#D6A32D" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: '#102D50', margin: '6px 0 10px 0' }}>
            All Traditional & Contemporary Collections
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.96rem', maxWidth: '650px', margin: '0 auto' }}>
            Discover our complete repertoire of handcrafted ethnic garments, woven with generational mastery in Tamil Nadu.
          </p>
        </div>

        {/* Featured Special Collections */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          marginBottom: '50px'
        }}>
          {specialCollections.map(item => (
            <Link
              key={item.id}
              to={item.path}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                height: '360px',
                display: 'block',
                boxShadow: '0 12px 28px rgba(8, 27, 50, 0.12)',
                border: '2px solid #D6A32D'
              }}
              className="category-card-hover"
            >
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(8, 27, 50, 0.95) 0%, rgba(8, 27, 50, 0.5) 60%, transparent 100%)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: '#FFFFFF'
              }}>
                <span style={{
                  backgroundColor: '#D6A32D',
                  color: '#081B32',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '3px',
                  alignSelf: 'flex-start',
                  marginBottom: '8px'
                }}>
                  {item.badge}
                </span>
                <span style={{ color: '#F0C96A', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {item.tagline}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#FFFFFF', margin: '4px 0 8px 0' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#CBD5E1', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#F0C96A', fontWeight: 700, fontSize: '0.86rem' }}>
                  <span>Shop Featured Collection</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Categories Grid */}
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#102D50', marginBottom: '24px' }}>
          Explore by Clothing Category
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {categories.map((cat) => {
            const count = products.filter(p => p.categorySlug === cat.slug).length;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="category-card-hover"
              >
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(8, 27, 50, 0.85)',
                    color: '#F0C96A',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}>
                    {count} Weaves Available
                  </span>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ color: '#D6A32D', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Artisanal Handloom
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#102D50', margin: '4px 0 8px 0' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 16px 0', flex: 1 }}>
                    {cat.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '12px', color: '#102D50', fontWeight: 700, fontSize: '0.84rem' }}>
                    <span>Browse Collection</span>
                    <ArrowRight size={16} color="#D6A32D" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Collections;
