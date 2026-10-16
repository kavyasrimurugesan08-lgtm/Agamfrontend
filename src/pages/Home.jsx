import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import SizeGuideModal from '../components/SizeGuideModal';
import { REVIEWS, FAQS } from '../data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Truck, 
  Star, 
  Flame, 
  Crown, 
  ChevronRight,
  HeartHandshake,
  CheckCircle,
  Clock
} from 'lucide-react';
import CircularSlider from '../components/CircularSlider';
import EleganceInMotion from '../components/EleganceInMotion';
import BrandStorySection from '../components/BrandStorySection';
import FestiveSpecialsSection from '../components/FestiveSpecialsSection';
import InstagramGallery from '../components/InstagramGallery';
import NewsletterSection from '../components/NewsletterSection';

const Home = () => {
  const { products, categories, recentlyViewed } = useShop();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sareeTab, setSareeTab] = useState('All');

  // Filter specific product groups
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestseller).slice(0, 4);
  const allSilkSarees = products.filter(p => p.category === 'Sarees');
  const filteredSilkSarees = sareeTab === 'All'
    ? allSilkSarees
    : allSilkSarees.filter(p => (p.subcategory || '').toLowerCase().includes(sareeTab.toLowerCase()));
  const festiveEdit = products.filter(p => p.isFestive).slice(0, 4);
  const mensTraditional = products.filter(p => p.category === 'Men\'s Wear').slice(0, 4);
  const kidsCollection = products.filter(p => p.category === 'Kids\' Wear').slice(0, 4);

  return (
    <div style={{ backgroundColor: '#F8F6F0' }}>
      
      {/* 1. Exact Split-Screen Hero Section matching reference screenshot */}
      <HeroSection />

      {/* Special Feature: Horizontal Circular Image Slider */}
      <CircularSlider />

      {/* 2. Shop By Category - Sticky Split View */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '60px 24px 40px' }}>
        <div className="sticky-split-container">
          
          {/* Left Column: Stays fixed in one place as user scrolls */}
          <div className="sticky-split-sidebar" style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="badge-heritage" style={{ alignSelf: 'flex-start' }}>
              <Sparkles size={13} color="#D6A32D" />
              <span style={{ color: '#102D50' }}>EXPLORE OUR HEIRLOOM ATELIER</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#102D50', lineHeight: 1.18, margin: 0 }}>
              Shop by Traditional Craft & Category
            </h2>

            <p style={{ color: '#64748B', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
              From bridal Kanchipuram mulberry silks to contemporary festive Kurtis and pure silk dhotis. Explore ancestral loom artistry with verified Silk Mark purity.
            </p>

            {/* Quick Category Jump Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
              {categories.map(c => (
                <Link
                  key={c.id}
                  to={`/category/${c.slug}`}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(214, 163, 45, 0.4)',
                    color: '#102D50',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#102D50';
                    e.currentTarget.style.color = '#F0C96A';
                    e.currentTarget.style.borderColor = '#102D50';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#102D50';
                    e.currentTarget.style.borderColor = 'rgba(214, 163, 45, 0.4)';
                  }}
                >
                  {c.name}
                </Link>
              ))}
            </div>

            {/* Trust Points */}
            <div style={{ borderTop: '1px solid rgba(214, 163, 45, 0.25)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#102D50', fontWeight: 600 }}>
                <Award size={18} color="#D6A32D" /> 100% Certified Silk Mark Organization
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#102D50', fontWeight: 600 }}>
                <Crown size={18} color="#D6A32D" /> Direct Master Looms of Nirmala Tex
              </div>
            </div>

            <Link to="/collections" className="btn-gold" style={{ alignSelf: 'flex-start', padding: '11px 24px', marginTop: '6px' }}>
              <span>View All Collections</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right Column: Category cards scroll vertically in place */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '350px',
                  display: 'block',
                  boxShadow: '0 10px 25px rgba(8, 27, 50, 0.08)',
                  border: '1px solid rgba(214, 163, 45, 0.3)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                className="category-card-hover"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 27, 50, 0.94) 0%, rgba(8, 27, 50, 0.4) 60%, transparent 100%)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#FFFFFF'
                }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#FFFFFF', margin: '0 0 6px 0' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#CBD5E1', margin: '0 0 14px 0', lineHeight: 1.45 }}>
                    {cat.description}
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#F0C96A',
                    fontSize: '0.84rem',
                    fontWeight: 700
                  }}>
                    <span>Explore Collection</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Special Feature: Elegance in Motion Horizontal Dual Marquee */}
      <EleganceInMotion />

      {/* 3. New Arrivals Strip */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D6A32D', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Flame size={15} color="#D6A32D" /> Fresh Off The Ancestral Looms
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#102D50', margin: '4px 0 0 0' }}>
              New Arrivals This Season
            </h2>
          </div>
          <Link
            to="/new-arrivals"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#102D50',
              fontWeight: 700,
              fontSize: '0.88rem'
            }}
          >
            <span>View All New Arrivals</span>
            <ChevronRight size={16} color="#D6A32D" />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {newArrivals.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. Luxury Pure Silk Sarees Spotlight Section */}
      <section style={{
        backgroundColor: '#F4ECE0',
        color: '#102D50',
        padding: '50px 24px',
        margin: '40px 0',
        borderTop: '1px solid rgba(214, 163, 45, 0.3)',
        borderBottom: '1px solid rgba(214, 163, 45, 0.3)'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{
              border: '1px solid #D6A32D',
              color: '#8A6715',
              backgroundColor: 'rgba(214, 163, 45, 0.12)',
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}>
              100% PURE MULBERRY SILK MARK CERTIFIED
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.3rem', color: '#102D50', margin: '12px 0 8px 0' }}>
              Heirloom Kanchipuram & Banarasi Silks
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 24px auto' }}>
              Direct from generational master weavers of Nirmala Tex. Tested pure zari, dense korvai weaving, and temple borders passed through family heirlooms.
            </p>

            {/* Saree Craft Filter Tabs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '16px'
            }}>
              {[
                { label: `All Heirlooms (${allSilkSarees.length})`, value: 'All' },
                { label: 'Kanchipuram Bridal', value: 'Kanchipuram' },
                { label: 'Banarasi Brocade', value: 'Banarasi' },
                { label: 'Soft Silk Weaves', value: 'Soft Silk' }
              ].map(tab => (
                <button
                  key={tab.value}
                  onClick={() => setSareeTab(tab.value)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '24px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    backgroundColor: sareeTab === tab.value ? '#102D50' : '#FFFFFF',
                    color: sareeTab === tab.value ? '#F0C96A' : '#102D50',
                    border: sareeTab === tab.value ? '1.5px solid #102D50' : '1px solid rgba(214, 163, 45, 0.4)',
                    boxShadow: sareeTab === tab.value ? '0 4px 12px rgba(16, 45, 80, 0.18)' : '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Interactive Saree Viewing Hint */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              color: '#8A6715',
              backgroundColor: 'rgba(214, 163, 45, 0.1)',
              padding: '5px 14px',
              borderRadius: '20px',
              border: '1px dashed rgba(214, 163, 45, 0.4)'
            }}>
              <Sparkles size={13} color="#D6A32D" />
              <span>Hover over any saree or tap the dots to preview the intricate handwoven pure zari pallu</span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {filteredSilkSarees.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/category/sarees" className="btn-gold">
              <span>Explore All Silk Sarees</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Bestsellers & Festive Edit */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D6A32D', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Crown size={15} color="#D6A32D" /> Customer Favorites
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#102D50', margin: '4px 0 0 0' }}>
              Most Loved Festive & Bridal Pieces
            </h2>
          </div>
          <Link
            to="/festive-collection"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#102D50',
              fontWeight: 700,
              fontSize: '0.88rem'
            }}
          >
            <span>Explore Festive Edit</span>
            <ChevronRight size={16} color="#D6A32D" />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {bestSellers.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* Brand Story Section */}
      <BrandStorySection />

      {/* 6. Promotional Banner: Direct Mill Pricing & Coupon */}
      <section style={{ maxWidth: '1440px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F5ECDB 100%)',
          borderRadius: '14px',
          border: '2px solid #D6A32D',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          boxShadow: '0 12px 30px rgba(16, 45, 80, 0.08)'
        }} className="promo-banner-grid">
          
          <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ color: '#8A6715', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              FESTIVE CELEBRATION VOUCHER
            </span>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.2rem',
              color: '#102D50',
              lineHeight: 1.2,
              margin: '0 0 12px 0'
            }}>
              Flat 10% Off On Your First Heirloom Order
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              Experience the unmatched luxury of pure silk sarees, royal sherwanis, and festive kurta sets with direct mill pricing and complimentary transit insurance.
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{
                backgroundColor: 'rgba(214, 163, 45, 0.15)',
                border: '1px dashed #D6A32D',
                padding: '8px 16px',
                borderRadius: '6px',
                color: '#102D50',
                fontWeight: 800,
                fontSize: '1.1rem',
                letterSpacing: '1px'
              }}>
                CODE: AGAM10
              </div>
              <Link to="/collections" className="btn-gold" style={{ padding: '10px 22px' }}>
                Shop Collections Now
              </Link>
            </div>
          </div>

          <div style={{ position: 'relative', minHeight: '300px' }}>
            <img
              src="https://fazyo.com/cdn/shop/files/shirt_5_c2674de6-c495-496e-a790-2f59a728ab09.jpg?v=1785588539&width=1792"
              alt="AGAM Silk Saree Heritage"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(255,255,255,0.7) 0%, transparent 60%)'
            }} />
          </div>

        </div>
      </section>

      {/* Festive Special Collection Spotlight */}
      <FestiveSpecialsSection />

      {/* 7. Why Choose AGAM / Nirmala Textiles */}
      <section style={{ maxWidth: '1440px', margin: '60px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#102D50', margin: '0 0 8px 0' }}>
            The AGAM Master Weaving Promise
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
            Why discerning patrons across India and globally trust AGAM – The Unit of Nirmala Textiles
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              icon: <Award size={28} color="#D6A32D" />,
              title: '100% Silk Mark Authenticity',
              desc: 'Every pure silk drape bears an authorized Silk Mark QR tag verified by the Silk Mark Organisation of India.'
            },
            {
              icon: <Crown size={28} color="#D6A32D" />,
              title: 'Direct Mill Weaving Prices',
              desc: 'As the flagship branch of Nirmala Textiles, we eliminate intermediate retail markups, offering pure loom pricing.'
            },
            {
              icon: <HeartHandshake size={28} color="#D6A32D" />,
              title: 'Ancestral Handloom Artistry',
              desc: 'Our weavers carry decades of ancestral skill in korvai borders, temple motifs, and pure silver zari brocades.'
            },
            {
              icon: <Truck size={28} color="#D6A32D" />,
              title: 'Insured Transit & Easy Returns',
              desc: 'Safe door-to-door delivery with complimentary transit insurance on all orders above ₹1,999 and hassle-free 7-day returns.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '30px',
                padding: '36px 26px',
                border: '1.5px solid rgba(214, 163, 45, 0.2)',
                boxShadow: '0 8px 24px rgba(8, 27, 50, 0.05)',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div 
                className="info-round-blink"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#FDF6E3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  border: '1px solid rgba(214, 163, 45, 0.25)'
                }}
              >
                {item.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#102D50', margin: '0 0 8px 0' }}>
                {item.title}
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.84rem', lineHeight: 1.6, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Verified Customer Reviews */}
      <section style={{ backgroundColor: '#F3EFE6', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="badge-heritage" style={{ marginBottom: '8px' }}>
              <Star size={13} fill="#D6A32D" color="#D6A32D" />
              <span style={{ color: '#102D50' }}>VERIFIED PATRON REVIEWS</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#102D50', margin: 0 }}>
              Words of Appreciation From Our Patrons
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {REVIEWS.map(rev => (
              <div
                key={rev.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  padding: '28px',
                  border: '1px solid rgba(214, 163, 45, 0.3)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#D6A32D" color="#D6A32D" />
                    ))}
                  </div>
                  <p style={{ fontStyle: 'italic', color: '#334155', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                    "{rev.comment}"
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#102D50', fontSize: '0.92rem', margin: 0 }}>{rev.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '2px 0 0 0' }}>{rev.location} • <span style={{ color: '#D6A32D', fontWeight: 600 }}>{rev.productName}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery: Styled by AGAM */}
      <InstagramGallery />

      {/* Newsletter Section: Be Part of the AGAM Experience */}
      <NewsletterSection />

      {/* 9. Recently Viewed Products (if any) */}
      {recentlyViewed.length > 0 && (
        <section style={{ maxWidth: '1440px', margin: '60px auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Clock size={18} color="#D6A32D" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#102D50', margin: 0 }}>
              Recently Viewed by You
            </h3>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {recentlyViewed.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onOpenSizeGuide={() => setSizeGuideOpen(true)}
        />
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

    </div>
  );
};

export default Home;
