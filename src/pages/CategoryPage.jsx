import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import SizeGuideModal from '../components/SizeGuideModal';
import { Filter, SlidersHorizontal, X, ChevronDown, RotateCcw } from 'lucide-react';

const CategoryPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories } = useShop();

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Read subcategory query param if present
  const initialSub = searchParams.get('sub') || '';

  // Filter States
  const [selectedSub, setSelectedSub] = useState(initialSub);

  React.useEffect(() => {
    setSelectedSub(searchParams.get('sub') || '');
  }, [searchParams, slug]);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Find active category
  const activeCategory = categories.find(c => c.slug === slug);
  const categoryName = activeCategory ? activeCategory.name : 'All Traditional Collections';
  const categoryDesc = activeCategory ? activeCategory.description : 'Master handcrafted weaves and ethnic attire from Nirmala Tex.';

  // All available filter options for this view
  const categoryProducts = useMemo(() => {
    if (!slug || slug === 'all') return products;
    return products.filter(p => p.categorySlug === slug);
  }, [products, slug]);

  const availableColors = useMemo(() => {
    const set = new Set();
    categoryProducts.forEach(p => p.colors?.forEach(c => set.add(c)));
    return Array.from(set);
  }, [categoryProducts]);

  const availableSizes = useMemo(() => {
    const set = new Set();
    categoryProducts.forEach(p => p.sizes?.forEach(s => set.add(s)));
    return Array.from(set);
  }, [categoryProducts]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(p => {
      // Subcategory
      if (selectedSub && p.subcategory !== selectedSub) return false;
      // Price
      if (p.price > maxPrice) return false;
      // Colors
      if (selectedColors.length > 0 && !p.colors?.some(c => selectedColors.includes(c))) return false;
      // Sizes
      if (selectedSizes.length > 0 && !p.sizes?.some(s => selectedSizes.includes(s))) return false;
      // Fabrics
      if (selectedFabrics.length > 0 && !selectedFabrics.some(f => p.fabrics?.toLowerCase().includes(f.toLowerCase()))) return false;
      // Occasion
      if (selectedOccasion && !p.occasion?.toLowerCase().includes(selectedOccasion.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [categoryProducts, selectedSub, maxPrice, selectedColors, selectedSizes, selectedFabrics, selectedOccasion, sortBy]);

  const resetFilters = () => {
    setSelectedSub('');
    setMaxPrice(25000);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedFabrics([]);
    setSelectedOccasion('');
    setSortBy('featured');
    setSearchParams({});
  };

  const toggleColor = (color) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const activeFiltersCount = (selectedSub ? 1 : 0) + 
    (maxPrice < 25000 ? 1 : 0) + 
    selectedColors.length + 
    selectedSizes.length + 
    selectedFabrics.length + 
    (selectedOccasion ? 1 : 0);

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '30px 24px 60px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Breadcrumb & Header Banner */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px' }}>
            <Link to="/" style={{ color: '#102D50', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <Link to="/collections" style={{ color: '#102D50', fontWeight: 600 }}>Collections</Link>
            <span>/</span>
            <span style={{ color: '#D6A32D', fontWeight: 700 }}>{categoryName}</span>
          </div>

          <div style={{
            backgroundColor: '#0A233F',
            borderRadius: '10px',
            padding: '28px 32px',
            color: '#FFFFFF',
            border: '1px solid rgba(214, 163, 45, 0.4)',
            boxShadow: '0 10px 25px rgba(8, 27, 50, 0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <span className="badge-heritage" style={{ marginBottom: '6px' }}>AGAM HERITAGE COLLECTION</span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', color: '#FFFFFF', margin: '4px 0' }}>
                {categoryName}
              </h1>
              <p style={{ color: '#CBD5E1', fontSize: '0.9rem', margin: 0, maxWidth: '650px' }}>
                {categoryDesc}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F0C96A' }}>
                {filteredProducts.length}
              </span>
              <span style={{ color: '#A7ADB1', fontSize: '0.85rem', display: 'block' }}>Exclusive Pieces</span>
            </div>
          </div>
        </div>

        {/* Action Bar (Sorting & Mobile Filter Button) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          padding: '12px 18px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="mobile-only-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              backgroundColor: '#102D50',
              color: '#FFFFFF',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
          >
            <Filter size={15} color="#F0C96A" /> Filters ({activeFiltersCount})
          </button>

          {/* Active filter count & quick clear */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Showing <strong>{filteredProducts.length}</strong> styles
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  color: '#DC2626',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: '#FEF2F2',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}
              >
                <RotateCcw size={12} /> Clear all filters ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.84rem', color: '#102D50', fontWeight: 600 }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '0.84rem',
                color: '#102D50',
                backgroundColor: '#FFFFFF',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured Artisanship</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Patron Rating</option>
              <option value="newest">Newest Weaves</option>
            </select>
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Products */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '28px',
          alignItems: 'start'
        }} className="category-layout-grid">
          
          {/* Desktop Filter Sidebar */}
          <aside style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px'
          }} className="hidden-mobile">
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#102D50', margin: 0 }}>
                Refine Weaves
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  style={{ fontSize: '0.74rem', color: '#D6A32D', fontWeight: 700, cursor: 'pointer' }}
                >
                  Reset
                </button>
              )}
            </div>

            {/* Subcategories */}
            {activeCategory?.subcategories && (
              <div>
                <h4 style={{ fontSize: '0.85rem', color: '#102D50', fontWeight: 700, marginBottom: '10px' }}>
                  Subcategory
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#334155', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="subcategory"
                      checked={selectedSub === ''}
                      onChange={() => setSelectedSub('')}
                    />
                    <span>All Subcategories</span>
                  </label>
                  {activeCategory.subcategories.map(sub => (
                    <label key={sub} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#334155', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="subcategory"
                        checked={selectedSub === sub}
                        onChange={() => setSelectedSub(sub)}
                      />
                      <span>{sub}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Slider */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#102D50', fontWeight: 700, margin: 0 }}>Max Price</h4>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D6A32D' }}>
                  Up to ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#D6A32D' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                <span>₹1,000</span>
                <span>₹30,000+</span>
              </div>
            </div>

            {/* Colors */}
            {availableColors.length > 0 && (
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#102D50', fontWeight: 700, marginBottom: '8px' }}>Color Palette</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {availableColors.map(col => {
                    const isSelected = selectedColors.includes(col);
                    return (
                      <button
                        key={col}
                        onClick={() => toggleColor(col)}
                        style={{
                          fontSize: '0.74rem',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: isSelected ? '2px solid #D6A32D' : '1px solid #E2E8F0',
                          backgroundColor: isSelected ? '#FDF6E3' : '#FFFFFF',
                          color: isSelected ? '#081B32' : '#475569',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer'
                        }}
                      >
                        {col}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizes */}
            {availableSizes.length > 0 && (
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '0.85rem', color: '#102D50', fontWeight: 700, margin: 0 }}>Size</h4>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    style={{ fontSize: '0.72rem', color: '#D6A32D', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Size Chart
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {availableSizes.map(size => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        style={{
                          fontSize: '0.74rem',
                          padding: '4px 9px',
                          borderRadius: '4px',
                          border: isSelected ? '2px solid #102D50' : '1px solid #E2E8F0',
                          backgroundColor: isSelected ? '#102D50' : '#FFFFFF',
                          color: isSelected ? '#FFFFFF' : '#334155',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Occasion */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '0.85rem', color: '#102D50', fontWeight: 700, marginBottom: '8px' }}>Occasion</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Bridal', 'Festive', 'Wedding', 'Casual'].map(occ => (
                  <label key={occ} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#334155', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="occasion"
                      checked={selectedOccasion === occ}
                      onChange={() => setSelectedOccasion(selectedOccasion === occ ? '' : occ)}
                    />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* Product Cards Grid or Empty State */}
          <div>
            {filteredProducts.length === 0 ? (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                padding: '60px 24px',
                textAlign: 'center',
                border: '1px solid #E2E8F0'
              }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#102D50', marginBottom: '8px' }}>
                  No matching garments found
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '450px', margin: '0 auto 20px' }}>
                  Try relaxing your price slider or clearing selected color and size filters to view more handcrafted weaves.
                </p>
                <button onClick={resetFilters} className="btn-gold">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

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

export default CategoryPage;
