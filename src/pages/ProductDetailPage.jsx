import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import SizeGuideModal from '../components/SizeGuideModal';
import { 
  Heart, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Award, 
  Truck, 
  RotateCcw, 
  Ruler, 
  Star, 
  MapPin, 
  Check, 
  Sparkles,
  Share2
} from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    products, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    addToRecentlyViewed,
    showToast 
  } = useShop();

  const product = products.find(p => p.id === id) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [activeTab, setActiveTab] = useState('fabric');

  // Sync recently viewed
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      setActiveImageIdx(0);
      setSelectedSize(product.sizes ? product.sizes[0] : null);
      setSelectedColor(product.colors ? product.colors[0] : null);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) return null;

  const inWish = isInWishlist(product.id);
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const checkPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setDeliveryResult({
        serviceable: true,
        date: 'Estimated delivery in 2-3 business days',
        courier: 'BlueDart Insured Air Express',
        free: true
      });
      showToast('Pincode verified for express delivery!');
    } else {
      setDeliveryResult({
        serviceable: false,
        msg: 'Please enter a valid 6-digit Indian Postal Pincode'
      });
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '30px 24px 60px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.82rem', color: '#64748B', display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '24px' }}>
          <Link to="/" style={{ color: '#102D50', fontWeight: 600 }}>Home</Link>
          <span>/</span>
          <Link to={`/category/${product.categorySlug}`} style={{ color: '#102D50', fontWeight: 600 }}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: '#D6A32D', fontWeight: 700 }}>{product.name}</span>
        </div>

        {/* Product Showcase: Left Gallery + Right Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.15fr',
          gap: '48px',
          alignItems: 'start',
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '36px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 8px 30px rgba(8, 27, 50, 0.06)'
        }} className="product-detail-grid">
          
          {/* Left Gallery with Multi-Thumbnails */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Main Stage Image */}
            <div style={{
              position: 'relative',
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: '#F8F6F0',
              height: '560px',
              border: '1px solid rgba(214, 163, 45, 0.3)'
            }}>
              <img
                src={images[activeImageIdx]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Silk Mark Overlay Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(8, 27, 50, 0.88)',
                color: '#F0C96A',
                border: '1px solid #D6A32D',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Sparkles size={12} color="#D6A32D" /> 100% Verified Silk Mark
              </div>

              {/* Discount Tag */}
              {product.discount > 0 && (
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}>
                  SAVE {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    style={{
                      width: '80px',
                      height: '95px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: activeImageIdx === idx ? '2px solid #D6A32D' : '1px solid #CBD5E1',
                      padding: 0,
                      cursor: 'pointer',
                      opacity: activeImageIdx === idx ? 1 : 0.65,
                      transition: 'all 0.2s'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Specifications & Purchasing */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Header info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', color: '#D6A32D', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {product.category} • SKU: {product.sku}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#102D50', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Authentic Handloom
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                color: '#102D50',
                margin: '6px 0 10px 0',
                lineHeight: 1.25
              }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#D6A32D' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#D6A32D" color="#D6A32D" />
                  ))}
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', marginLeft: '4px', color: '#102D50' }}>{product.rating}</span>
                </div>
                <span style={{ color: '#94A3B8', fontSize: '0.82rem' }}>|</span>
                <span style={{ color: '#64748B', fontSize: '0.82rem' }}>{product.reviewCount} Verified Reviews</span>
              </div>
            </div>

            {/* Price block */}
            <div style={{
              padding: '16px 20px',
              backgroundColor: '#FDF6E3',
              borderRadius: '8px',
              border: '1px solid rgba(214, 163, 45, 0.4)',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: '#102D50' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span style={{ fontSize: '1.15rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 800 }}>
                    Direct Mill Price
                  </span>
                </div>
                <span style={{ fontSize: '0.74rem', color: '#64748B', display: 'block', marginTop: '2px' }}>
                  Inclusive of all taxes (GST 5%). Handloom purity assured.
                </span>
              </div>

              {/* In stock badge */}
              <div style={{
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                border: '1px solid #A7F3D0',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Check size={14} /> Only {product.stockCount} left in handloom batch
              </div>
            </div>

            {/* Color selection */}
            {product.colors && (
              <div>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#102D50' }}>Color: <strong>{selectedColor}</strong></span>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  {product.colors.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        border: selectedColor === col ? '2px solid #D6A32D' : '1px solid #CBD5E1',
                        backgroundColor: selectedColor === col ? '#FDF6E3' : '#FFFFFF',
                        color: selectedColor === col ? '#081B32' : '#334155',
                        fontWeight: selectedColor === col ? 700 : 500,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {product.sizes && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#102D50' }}>Select Size:</span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.78rem',
                      color: '#D6A32D',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <Ruler size={14} /> View Master Size Guide
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '6px',
                        border: selectedSize === size ? '2px solid #102D50' : '1px solid #CBD5E1',
                        backgroundColor: selectedSize === size ? '#102D50' : '#FFFFFF',
                        color: selectedSize === size ? '#FFFFFF' : '#334155',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
              {/* Quantity */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                height: '48px',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '40px', height: '100%', backgroundColor: '#F8FAFC', fontWeight: 700 }}
                >
                  -
                </button>
                <span style={{ padding: '0 16px', fontWeight: 700, fontSize: '0.95rem' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '40px', height: '100%', backgroundColor: '#F8FAFC', fontWeight: 700 }}
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="btn-gold"
                style={{ flex: 1, minWidth: '160px', height: '48px' }}
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                style={{
                  backgroundColor: '#102D50',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  padding: '0 24px',
                  height: '48px',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#081B32'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#102D50'}
              >
                <Zap size={18} color="#F0C96A" /> Buy Now
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: inWish ? '#E11D48' : '#102D50',
                  cursor: 'pointer'
                }}
                aria-label="Wishlist"
              >
                <Heart size={22} fill={inWish ? '#E11D48' : 'none'} />
              </button>
            </div>

            {/* Pincode Serviceability Check */}
            <div style={{
              marginTop: '12px',
              padding: '16px',
              backgroundColor: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#102D50', marginBottom: '8px' }}>
                <MapPin size={16} color="#D6A32D" /> Delivery & Transit Insurance Checker
              </div>
              <form onSubmit={checkPincode} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode (e.g. 641012)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.82rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#102D50',
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Check
                </button>
              </form>

              {deliveryResult && (
                <div style={{ marginTop: '8px', fontSize: '0.8rem', color: deliveryResult.serviceable ? '#065F46' : '#DC2626' }}>
                  {deliveryResult.serviceable ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontWeight: 700 }}>✓ {deliveryResult.date} via {deliveryResult.courier}</span>
                      <span style={{ color: '#047857' }}>Free All-India Transit Insurance included.</span>
                    </div>
                  ) : (
                    <span>{deliveryResult.msg}</span>
                  )}
                </div>
              )}
            </div>

            {/* 3 Value Pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
              <div style={{ textAlign: 'center' }}>
                <Award size={20} color="#D6A32D" style={{ margin: '0 auto 4px' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#102D50', display: 'block' }}>Silk Mark Certified</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Truck size={20} color="#D6A32D" style={{ margin: '0 auto 4px' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#102D50', display: 'block' }}>Free Insured Shipping</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <RotateCcw size={20} color="#D6A32D" style={{ margin: '0 auto 4px' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#102D50', display: 'block' }}>7-Day Easy Returns</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Specs: Fabric & Craft, Care Instructions, Delivery, Reviews */}
        <div style={{ marginTop: '48px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          {/* Tab Header */}
          <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', overflowX: 'auto' }}>
            {[
              { id: 'fabric', label: 'Fabric & Artisan Weave' },
              { id: 'care', label: 'Care & Storage Guide' },
              { id: 'shipping', label: 'Shipping & Returns' },
              { id: 'reviews', label: `Reviews (${product.reviewCount})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 24px',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? '#102D50' : '#64748B',
                  borderBottom: activeTab === tab.id ? '3px solid #D6A32D' : '3px solid transparent',
                  backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div style={{ padding: '32px' }}>
            {activeTab === 'fabric' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#102D50', margin: 0 }}>
                  Craftsmanship & Fabric Specifications
                </h3>
                <p style={{ color: '#475569', lineHeight: 1.7, margin: 0 }}>
                  {product.description}
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  marginTop: '12px'
                }}>
                  <div style={{ padding: '14px', backgroundColor: '#FDF6E3', borderRadius: '6px', border: '1px solid #D6A32D' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Fabric Base</span>
                    <p style={{ fontWeight: 700, color: '#102D50', margin: '4px 0 0 0' }}>{product.fabrics}</p>
                  </div>
                  <div style={{ padding: '14px', backgroundColor: '#FDF6E3', borderRadius: '6px', border: '1px solid #D6A32D' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Weave Artistry</span>
                    <p style={{ fontWeight: 700, color: '#102D50', margin: '4px 0 0 0' }}>{product.weave}</p>
                  </div>
                  <div style={{ padding: '14px', backgroundColor: '#FDF6E3', borderRadius: '6px', border: '1px solid #D6A32D' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Atelier of Origin</span>
                    <p style={{ fontWeight: 700, color: '#102D50', margin: '4px 0 0 0' }}>{product.origin}</p>
                  </div>
                  {product.sareeLength && (
                    <div style={{ padding: '14px', backgroundColor: '#FDF6E3', borderRadius: '6px', border: '1px solid #D6A32D' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Saree Dimensions</span>
                      <p style={{ fontWeight: 700, color: '#102D50', margin: '4px 0 0 0' }}>{product.sareeLength}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#102D50', margin: 0 }}>
                  Heirloom Fabric Care & Longevity
                </h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>{product.careInstructions}</p>
                <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: 1.7 }}>
                  <li>Never spray perfume, deodorant, or water directly onto zari borders or pure silk yarns.</li>
                  <li>Always roll sarees on a clean cardboard roller and wrap them in unbleached pure cotton or muslin fabric.</li>
                  <li>Air-dry in open shade every 4 months to prevent fold creases and maintain natural silk luster.</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#102D50', margin: 0 }}>
                  Delivery Timelines & Transit Security
                </h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  All orders are insured for 100% of their invoiced value during transit. Orders above ₹1,999 qualify for complimentary air express delivery via BlueDart. Standard dispatch window is 24 hours from our atelier in Tamil Nadu.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  <strong>Returns:</strong> We accept returns and size exchanges within 7 calendar days of receipt. Products must retain the original Silk Mark seal, price tags, and packaging intact.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center', padding: '16px 28px', backgroundColor: '#FDF6E3', borderRadius: '8px', border: '1px solid #D6A32D' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#102D50' }}>{product.rating}</span>
                    <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', margin: '4px 0' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="#D6A32D" color="#D6A32D" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Based on {product.reviewCount} reviews</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#102D50' }}>Gayatri M. (Verified Buyer)</span>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Chennai • 3 days ago</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', margin: '4px 0 8px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="#D6A32D" color="#D6A32D" />
                      ))}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
                      The zari borders have a rich authentic metallic glow that photographs beautifully. Shipped in a premium protective box.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#102D50', marginBottom: '24px' }}>
              Complementary Weaves You May Admire
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px'
            }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
