import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div style={{
      backgroundColor: '#081B32',
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      color: '#FFFFFF',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '560px',
        backgroundColor: '#0A233F',
        borderRadius: '14px',
        border: '2px solid #D6A32D',
        padding: '48px 36px',
        boxShadow: '0 20px 45px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          backgroundColor: 'rgba(214, 163, 45, 0.15)',
          color: '#F0C96A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <Compass size={36} />
        </div>

        <span className="badge-heritage" style={{ marginBottom: '12px' }}>PAGE NOT FOUND</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: '#F0C96A', margin: '4px 0 10px 0' }}>
          404
        </h1>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#FFFFFF', margin: '0 0 12px 0' }}>
          This Handloom Weave Has Moved
        </h2>
        <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 28px 0' }}>
          The page or product you are seeking may have been renamed or archived. Explore our current collections of pure silk sarees and festive wear.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-gold">
            <span>Return to Home</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/collections" className="btn-navy-outline">
            Browse All Collections
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
