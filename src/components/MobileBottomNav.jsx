import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const MobileBottomNav = () => {
  const { cartCount, wishlist } = useShop();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Collections', path: '/collections', icon: Grid },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlist.length },
    { label: 'Cart', path: '/cart', icon: ShoppingBag, badge: cartCount }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            end={item.path === '/'}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={20} />
              {item.badge > 0 && (
                <span className="mobile-nav-badge">
                  {item.badge}
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.7rem', marginTop: '3px', fontWeight: 600 }}>
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
