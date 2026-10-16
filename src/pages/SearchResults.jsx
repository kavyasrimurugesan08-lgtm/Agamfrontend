import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Search, ArrowRight } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products } = useShop();

  const matchingProducts = useMemo(() => {
    if (!query.trim()) return [];
    const clean = query.trim().toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(clean) ||
      p.category.toLowerCase().includes(clean) ||
      p.subcategory?.toLowerCase().includes(clean) ||
      p.fabrics?.toLowerCase().includes(clean) ||
      p.sku?.toLowerCase().includes(clean) ||
      p.occasion?.toLowerCase().includes(clean)
    );
  }, [products, query]);

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Search Header */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px' }}>
            <Link to="/" style={{ color: '#102D50', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span>Search</span>
          </span>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#102D50', margin: '0 0 8px 0' }}>
            Search Results for <span style={{ color: '#D6A32D' }}>"{query}"</span>
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>
            Found {matchingProducts.length} matching handcrafted products from our looms
          </p>
        </div>

        {matchingProducts.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '60px 24px',
            textAlign: 'center',
            border: '1px solid #E2E8F0',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <Search size={42} color="#D6A32D" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#102D50', marginBottom: '8px' }}>
              No garments found for "{query}"
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              Try searching for popular terms like "silk saree", "anarkali", "chanderi", "dhoti", or "bridal".
            </p>
            <Link to="/collections" className="btn-gold">
              <span>Browse All Collections</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {matchingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchResults;
