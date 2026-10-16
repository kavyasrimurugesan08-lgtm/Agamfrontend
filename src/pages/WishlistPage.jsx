import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

const WishlistPage = () => {
  const { wishlist, products, addToCart, showToast } = useShop();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    wishlistedProducts.forEach(product => {
      addToCart(product);
    });
    showToast('Moved all wishlisted items to your shopping bag!');
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div style={{ backgroundColor: '#F8F6F0', minHeight: '70vh', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{
          maxWidth: '520px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '48px 32px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 8px 25px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#FFF1F2',
            color: '#E11D48',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Heart size={32} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#102D50', margin: '0 0 8px 0' }}>
            Your Wishlist is Empty
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 24px 0' }}>
            Tap the heart icon on any silk saree, anarkali, or ethnic garment to save it here for upcoming wedding & festive seasons.
          </p>
          <Link to="/collections" className="btn-gold">
            <span>Explore Collections</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <span className="badge-heritage" style={{ marginBottom: '6px' }}>SAVED HEIRLOOMS</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#102D50', margin: '4px 0 0 0' }}>
              My Wishlist ({wishlistedProducts.length} items)
            </h1>
          </div>

          <button
            onClick={handleMoveAllToBag}
            className="btn-gold"
            style={{ padding: '10px 22px', fontSize: '0.85rem' }}
          >
            <ShoppingBag size={16} /> Move All to Bag
          </button>
        </div>

        {/* Wishlist Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {wishlistedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default WishlistPage;
