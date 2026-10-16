import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  Heart, 
  ShoppingBag, 
  User, 
  SlidersHorizontal, 
  Menu, 
  ChevronDown,
  LogOut,
  Package,
  MapPin
} from 'lucide-react';

const Header = ({ onOpenMobileMenu }) => {
  const navigate = useNavigate();
  const { 
    cartTotalItems, 
    wishlist, 
    currentUser, 
    setCurrentUser, 
    isAdminAuthenticated,
    showToast 
  } = useShop();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    setShowUserDropdown(false);
    showToast('Logged out successfully.', 'info');
  };

  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      boxShadow: '0 2px 8px rgba(8, 27, 50, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Left: Official AGAM Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src="/agam-logo.png" 
            alt="AGAM – The Unit of Nirmala Tex" 
            style={{ 
              height: '52px', 
              width: 'auto', 
              objectFit: 'contain',
              display: 'block'
            }} 
          />
        </Link>

        {/* Center: Heritage Brand Tagline */}
        <div className="header-heritage-unit" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          textAlign: 'center'
        }}>
          <span style={{
            display: 'inline-block',
            width: '28px',
            height: '1px',
            backgroundColor: '#D6A32D',
            opacity: 0.8
          }} />
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.05rem',
            fontWeight: 600,
            letterSpacing: '1.8px',
            color: '#102D50',
            textTransform: 'uppercase'
          }}>
            The Unit of Nirmala Textiles
          </span>
          <span style={{
            display: 'inline-block',
            width: '28px',
            height: '1px',
            backgroundColor: '#D6A32D',
            opacity: 0.8
          }} />
        </div>

        {/* Right: Admin Portal, Wishlist, Cart Pill [0], Login / Register, Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Admin Portal Button */}
          <Link
            to="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              border: '1px solid #D6A32D',
              borderRadius: '6px',
              backgroundColor: '#FFFFFF',
              color: '#102D50',
              fontWeight: 600,
              fontSize: '0.82rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDF6E3'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
          >
            <SlidersHorizontal size={14} color="#D6A32D" />
            <span>Admin Portal</span>
            {isAdminAuthenticated && (
              <span style={{ width: '6px', height: '6px', backgroundColor: '#10B981', borderRadius: '50%' }} />
            )}
          </Link>

          {/* Wishlist Heart Icon */}
          <Link
            to="/wishlist"
            style={{
              padding: '6px',
              color: '#102D50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            aria-label="Wishlist"
          >
            <Heart size={21} color={wishlist.length > 0 ? '#E11D48' : '#102D50'} fill={wishlist.length > 0 ? '#FFE4E6' : 'none'} />
            {wishlist.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '0',
                backgroundColor: '#D6A32D',
                color: '#081B32',
                fontSize: '0.65rem',
                fontWeight: 800,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Pill Button (Matching exact reference screenshot: Navy pill with gold cart and count) */}
          <Link
            to="/cart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#102D50',
              color: '#FFFFFF',
              padding: '7px 16px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.84rem',
              boxShadow: '0 2px 6px rgba(16, 45, 80, 0.25)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#081B32'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#102D50'}
          >
            <ShoppingBag size={16} color="#F0C96A" />
            <span>Cart</span>
            <span style={{
              backgroundColor: '#D6A32D',
              color: '#081B32',
              fontWeight: 900,
              fontSize: '0.75rem',
              padding: '1px 7px',
              borderRadius: '8px'
            }}>
              {cartTotalItems}
            </span>
          </Link>

          {/* Login / Register or Profile */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#102D50',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                <User size={15} color="#102D50" />
                <span>{currentUser.name.split(' ')[0]}</span>
                <ChevronDown size={13} color="#64748B" />
              </button>

              {showUserDropdown && (
                <div 
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '210px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                    border: '1px solid #E2E8F0',
                    padding: '8px 0',
                    zIndex: 200
                  }}
                  onMouseLeave={() => setShowUserDropdown(false)}
                >
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid #F1F5F9' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.86rem', color: '#102D50', margin: 0 }}>{currentUser.name}</p>
                    <p style={{ fontSize: '0.72rem', color: '#64748B', margin: 0 }}>{currentUser.email}</p>
                  </div>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setShowUserDropdown(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', fontSize: '0.82rem', color: '#334155' }}
                  >
                    <User size={15} color="#102D50" /> Customer Dashboard
                  </Link>
                  <Link 
                    to="/orders" 
                    onClick={() => setShowUserDropdown(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', fontSize: '0.82rem', color: '#334155' }}
                  >
                    <Package size={15} color="#102D50" /> My Orders & Tracking
                  </Link>
                  <div style={{ borderTop: '1px solid #F1F5F9', marginTop: '4px' }}>
                    <button
                      onClick={handleLogout}
                      style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', fontSize: '0.82rem', color: '#DC2626', cursor: 'pointer' }}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#102D50',
                fontWeight: 600,
                fontSize: '0.82rem'
              }}
            >
              <User size={15} color="#102D50" />
              <span>Login / Register</span>
            </Link>
          )}

          {/* Hamburger Menu Icon */}
          <button
            onClick={onOpenMobileMenu}
            style={{
              padding: '6px',
              color: '#102D50',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle navigation menu"
          >
            <Menu size={24} color="#102D50" />
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;
