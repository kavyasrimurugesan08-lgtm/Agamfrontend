import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, Star, ArrowRight } from 'lucide-react';

const QuickViewModal = ({ product, onClose, onOpenSizeGuide }) => {
  const { addToCart, isInWishlist, toggleWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return null;

  const inWish = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(8, 27, 50, 0.75)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        border: '1px solid #D6A32D',
        animation: 'fadeIn 0.25s ease-out'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#102D50',
            cursor: 'pointer',
            zIndex: 10
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
          gap: '30px'
        }} className="quickview-grid">
          
          {/* Image & Angle Thumbnails */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ position: 'relative', backgroundColor: '#F8F6F0', minHeight: '380px', borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src={(product.images && product.images[activeImg]) || (product.images ? product.images[0] : product.image)}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s ease' }}
              />
              {product.discount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Angle Switcher */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImg(idx)}
                    style={{
                      width: '65px',
                      height: '80px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: activeImg === idx ? '2px solid #D6A32D' : '1px solid #CBD5E1',
                      padding: 0,
                      cursor: 'pointer',
                      opacity: activeImg === idx ? 1 : 0.65,
                      transition: 'all 0.2s ease',
                      boxShadow: activeImg === idx ? '0 2px 8px rgba(214, 163, 45, 0.3)' : 'none'
                    }}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ padding: '32px 32px 32px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            <div>
              <span style={{ color: '#D6A32D', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {product.category} • SKU: {product.sku}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                color: '#102D50',
                margin: '4px 0 8px 0',
                lineHeight: 1.25
              }}>
                {product.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#D6A32D' }}>
                  <Star size={14} fill="#D6A32D" />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{product.rating}</span>
                </div>
                <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#102D50' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.05rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700, backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
                Verified Mill Price
              </span>
            </div>

            {/* Fabric specs */}
            <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && (
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#102D50' }}>Color: {selectedColor}</span>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  {product.colors.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: selectedColor === col ? '2px solid #D6A32D' : '1px solid #CBD5E1',
                        backgroundColor: selectedColor === col ? '#FDF6E3' : '#FFFFFF',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes & Size Guide */}
            {product.sizes && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#102D50' }}>Select Size:</span>
                  <button
                    onClick={onOpenSizeGuide}
                    style={{ fontSize: '0.75rem', color: '#D6A32D', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}
                  >
                    View Size Guide
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '4px',
                        border: selectedSize === size ? '2px solid #102D50' : '1px solid #CBD5E1',
                        backgroundColor: selectedSize === size ? '#102D50' : '#FFFFFF',
                        color: selectedSize === size ? '#FFFFFF' : '#334155',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '8px 14px', backgroundColor: '#F8FAFC', fontWeight: 700 }}
                >
                  -
                </button>
                <span style={{ padding: '0 12px', fontWeight: 700, fontSize: '0.9rem' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '8px 14px', backgroundColor: '#F8FAFC', fontWeight: 700 }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="btn-gold"
                style={{ flex: 1, padding: '12px 20px' }}
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  width: '46px',
                  height: '46px',
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
                <Heart size={20} fill={inWish ? '#E11D48' : 'none'} />
              </button>
            </div>

            {/* Link to Full Details */}
            <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                style={{
                  color: '#102D50',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                View Complete Product Details & Care Instructions <ArrowRight size={14} color="#D6A32D" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
