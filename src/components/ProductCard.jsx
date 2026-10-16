import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart, isInWishlist, toggleWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const inWish = isInWishlist(product.id);
  const hasMultipleImages = product.images && product.images.length > 1;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        overflow: 'hidden',
        border: isHovered ? '1px solid #D6A32D' : '1px solid rgba(16, 45, 80, 0.1)',
        boxShadow: isHovered 
          ? '0 16px 32px -8px rgba(8, 27, 50, 0.16), 0 0 15px rgba(214, 163, 45, 0.15)' 
          : '0 4px 12px rgba(8, 27, 50, 0.05)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImgIdx(0);
      }}
    >
      {/* Product Image Section */}
      <Link 
        to={`/product/${product.id}`}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          paddingTop: '128%', // Portrait aspect ratio ideal for ethnic wear
          overflow: 'hidden',
          backgroundColor: '#F8F6F0'
        }}
      >
        {/* Primary Image */}
        <img
          src={product.images ? product.images[0] : product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            opacity: hasMultipleImages && (isHovered || activeImgIdx === 1) ? 0 : 1,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-in-out'
          }}
          loading="lazy"
        />

        {/* Secondary Image (Pallu / Detail view on hover) */}
        {hasMultipleImages && (
          <img
            src={product.images[1]}
            alt={`${product.name} detail view`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
              opacity: (isHovered || activeImgIdx === 1) ? 1 : 0,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-in-out'
            }}
            loading="lazy"
          />
        )}

        {/* Multiple Angles / Pallu indicator dots */}
        {hasMultipleImages && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 8,
              backgroundColor: 'rgba(8, 27, 50, 0.72)',
              backdropFilter: 'blur(6px)',
              padding: '3px 8px',
              borderRadius: '20px',
              border: '1px solid rgba(214, 163, 45, 0.3)'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {product.images.map((_, idx) => (
              <span
                key={idx}
                onMouseEnter={() => setActiveImgIdx(idx)}
                style={{
                  width: (activeImgIdx === idx || (isHovered && activeImgIdx === 0 && idx === 1)) ? '14px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: (activeImgIdx === idx || (isHovered && activeImgIdx === 0 && idx === 1)) ? '#F0C96A' : 'rgba(255, 255, 255, 0.6)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer'
                }}
                title={idx === 0 ? "Full Saree Drape" : "Zari Pallu & Detail"}
              />
            ))}
          </div>
        )}

        {/* Hover View Label */}
        {hasMultipleImages && isHovered && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '48px',
            backgroundColor: 'rgba(16, 45, 80, 0.85)',
            border: '1px solid #D6A32D',
            color: '#F0C96A',
            fontSize: '0.62rem',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '12px',
            letterSpacing: '0.3px',
            pointerEvents: 'none',
            zIndex: 9,
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {activeImgIdx === 1 || isHovered ? '🔍 Pallu & Zari View' : 'Full Drape'}
          </div>
        )}

        {/* Badges Overlay */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {product.isBestseller && (
            <span style={{
              backgroundColor: '#D6A32D',
              color: '#081B32',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '3px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span style={{
              backgroundColor: '#102D50',
              color: '#F0C96A',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '3px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              New Arrival
            </span>
          )}
          {product.category === 'Sarees' && (
            <span style={{
              backgroundColor: 'rgba(8, 27, 50, 0.85)',
              color: '#FFFFFF',
              fontSize: '0.62rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '3px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px'
            }}>
              <Sparkles size={10} color="#D6A32D" /> 100% Silk Mark
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '2px 7px',
            borderRadius: '3px'
          }}>
            {product.discount}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: inWish ? '#E11D48' : '#102D50',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          aria-label={inWish ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={inWish ? '#E11D48' : 'none'} color={inWish ? '#E11D48' : '#102D50'} />
        </button>

        {/* Quick View Hover Action */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.25s ease',
          zIndex: 10
        }}>
          <button
            onClick={handleQuickViewClick}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#102D50',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              cursor: 'pointer'
            }}
          >
            <Eye size={13} /> Quick View
          </button>
        </div>
      </Link>

      {/* Product Details Section */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Category & Rating */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {product.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.74rem', color: '#D6A32D', fontWeight: 700 }}>
            <Star size={12} fill="#D6A32D" color="#D6A32D" />
            <span>{product.rating}</span>
            <span style={{ color: '#94A3B8', fontSize: '0.68rem' }}>({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            fontWeight: 700,
            color: '#102D50',
            lineHeight: 1.35,
            margin: '0 0 6px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.7em'
          }}>
            {product.name}
          </h3>
        </Link>

        {/* Fabric Specs */}
        <p style={{
          fontSize: '0.75rem',
          color: '#5C6E82',
          margin: '0 0 10px 0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {product.fabrics}
        </p>

        {/* Size Selection Chips */}
        {product.sizes && product.sizes.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.7rem', color: '#94A3B8', marginRight: '2px' }}>Sizes:</span>
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  fontSize: '0.68rem',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  border: selectedSize === size ? '1px solid #102D50' : '1px solid #E2E8F0',
                  backgroundColor: selectedSize === size ? '#102D50' : '#FFFFFF',
                  color: selectedSize === size ? '#FFFFFF' : '#334155',
                  fontWeight: selectedSize === size ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Price & Add to Cart button */}
        <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102D50' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '0.82rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.68rem', color: '#10B981', fontWeight: 700 }}>Direct Mill Price</span>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: addedAnimation ? '#10B981' : '#102D50',
              color: '#FFFFFF',
              padding: '8px 14px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(16, 45, 80, 0.2)'
            }}
            onMouseEnter={(e) => {
              if (!addedAnimation) e.currentTarget.style.backgroundColor = '#D6A32D';
              if (!addedAnimation) e.currentTarget.style.color = '#081B32';
            }}
            onMouseLeave={(e) => {
              if (!addedAnimation) e.currentTarget.style.backgroundColor = '#102D50';
              if (!addedAnimation) e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            {addedAnimation ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Add
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
