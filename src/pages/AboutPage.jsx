import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, ShieldCheck, HeartHandshake, Truck, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Hero Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <img src="/agam-logo.png" alt="AGAM – The Unit of Nirmala Textiles" style={{ height: '64px', width: 'auto', margin: '0 auto 16px', display: 'block' }} />
          <div className="badge-heritage" style={{ marginBottom: '8px' }}>
            <Sparkles size={13} color="#D6A32D" />
            <span style={{ color: '#102D50' }}>HERITAGE OF MASTER WEAVING</span>
            <Sparkles size={13} color="#D6A32D" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: '#102D50', margin: '6px 0 12px 0' }}>
            AGAM – The Unit of Nirmala Textiles
          </h1>
          <p style={{ color: '#64748B', fontSize: '1rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
            Preserving ancestral Indian textile artistry, pure mulberry silk purity, and authentic direct-from-mill ethics from the heart of Tamil Nadu.
          </p>
        </div>

        {/* Story Section: Left Image + Right Narrative */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '48px',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '40px',
          border: '1px solid rgba(214, 163, 45, 0.35)',
          boxShadow: '0 10px 30px rgba(8, 27, 50, 0.05)',
          marginBottom: '50px'
        }} className="about-grid">
          
          <div style={{ borderRadius: '10px', overflow: 'hidden', height: '440px', position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85"
              alt="Ancestral Handloom Silk Weaving"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              backgroundColor: 'rgba(8, 27, 50, 0.9)',
              color: '#F0C96A',
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #D6A32D',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              Master Looms • Tamil Nadu
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <span style={{ color: '#D6A32D', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              OUR FOUNDATIONAL LEGACY
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', color: '#102D50', lineHeight: 1.25, margin: 0 }}>
              Generations of Artisan Handloom Splendor
            </h2>
            <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.7, margin: 0 }}>
              Born under the illustrious umbrella of <strong>Nirmala Textiles</strong>, <strong>AGAM</strong> was created to bridge ancestral Tamil master weaving with modern connoisseurs who cherish genuine natural silk and ethical mill pricing.
            </p>
            <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.7, margin: 0 }}>
              For decades, Nirmala Textiles has operated heritage looms weaving Kanchipuram mulberry silks, Korvai interlocking drapes, Kasavu Mayilkanmu veshtis, and festive brocades. Every single warp and weft is tensioned by seasoned artisan hands whose families have practiced the weaving craft for generations.
            </p>
            <div style={{ display: 'flex', gap: '24px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
              <div>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D6A32D' }}>100%</span>
                <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0, fontWeight: 700 }}>Silk Mark Certified Purity</p>
              </div>
              <div>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D6A32D' }}>350+</span>
                <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0, fontWeight: 700 }}>Artisan Weaving Families</p>
              </div>
              <div>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D6A32D' }}>Zero</span>
                <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0, fontWeight: 700 }}>Middleman Retail Markups</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '50px'
        }}>
          {[
            {
              title: 'Korvai Double Warp Technique',
              desc: 'Our weavers interlock body and contrast pallu fabrics seamlessly using authentic wooden shuttle handlooms.'
            },
            {
              title: 'Tested Gold & Silver Zari',
              desc: 'Genuine zari electroplated with real silver and gold foil to ensure heirloom shine that lasts through generations.'
            },
            {
              title: 'Direct Mill Transparency',
              desc: 'Patrons receive direct mill pricing because we eliminate distributors, retail agents, and commercial showrooms.'
            },
            {
              title: 'Sustainable Artisan Livelihoods',
              desc: 'Fair wages, healthcare security, and safe working ateliers for our weaving cooperative members in Tamil Nadu.'
            }
          ].map((item, idx) => (
            <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '28px 24px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ color: '#D6A32D', fontSize: '1.2rem', fontWeight: 900, marginBottom: '8px' }}>
                0{idx + 1}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#102D50', margin: '0 0 8px 0' }}>
                {item.title}
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.86rem', lineHeight: 1.6, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          backgroundColor: '#0A233F',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          color: '#FFFFFF',
          border: '1px solid #D6A32D'
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFFFFF', margin: '0 0 10px 0' }}>
            Experience the Splendor of Authentic Handloom
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '0.92rem', maxWidth: '540px', margin: '0 auto 20px' }}>
            Explore our curated collections of pure silk sarees, festive kurtas, and traditional veshtis today.
          </p>
          <Link to="/collections" className="btn-gold">
            <span>Shop Silk Collections</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
