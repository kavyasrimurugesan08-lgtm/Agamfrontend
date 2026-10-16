import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  ChevronDown, 
  Sparkles, 
  X,
  ArrowRight
} from 'lucide-react';

const MEGA_MENUS = {
  'Kurtis': {
    slug: 'kurtis',
    allLinkText: 'All In Kurtis',
    allLinkPath: '/category/kurtis',
    columns: [
      {
        groups: [
          {
            title: 'Kurtis by Silhouette',
            items: [
              'Anarkali Kurtis',
              'Straight-Cut Kurtis',
              'Flared & Tiered Kurtis',
              'A-Line Kurtis',
              'Short Kurtas & Tunics'
            ]
          },
          {
            title: 'Daily & Workwear',
            items: [
              'Cotton Straight Kurtis',
              'Formal Workwear Kurtis',
              'Printed Daily Kurtis'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Festive & Party Wear',
            items: [
              'Chanderi Silk Kurtis',
              'Embroidered Anarkali Sets',
              'Gota Patti & Zardozi Kurtis',
              'Mirror Work & Foil Print'
            ]
          },
          {
            title: 'Occasions',
            items: [
              'Haldi & Mehendi Kurtis',
              'Festive Celebrations',
              'Wedding Guest Edit'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Kurti Sets & Co-ords',
            items: [
              'Kurti with Palazzo Sets',
              'Kurti with Dhoti Pants',
              'Kurti with Dupatta Sets',
              'Festive Co-ord Sets',
              'Peplum & Sharara Sets'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Fabrics & Weaves',
            items: [
              'Pure Chanderi Silk',
              'Handloom Cotton',
              'Modal & Silk Rayon',
              'Georgette & Organza'
            ]
          },
          {
            title: 'Special Collections',
            items: [
              'Hero Showcase Kurtis',
              'New Season Arrivals',
              'Direct Mill Pricing'
            ],
            isSpecial: true
          }
        ]
      }
    ]
  },
  'Men\'s Wear': {
    slug: 'mens-wear',
    allLinkText: 'All In Men\'s Wear',
    allLinkPath: '/category/mens-wear',
    columns: [
      {
        groups: [
          {
            title: 'Traditional Dhotis & Veshtis',
            items: [
              'Kasavu Gold Zari Veshti',
              'Pure Silk Mayilkanmu Dhoti',
              'Temple Border Veshtis',
              'Cotton Temple Veshtis',
              'Ready-to-Wear Velcro Dhotis'
            ]
          },
          {
            title: 'Angavastram & Sets',
            items: [
              'Veshti with Matching Shawl',
              'Pure Silk Angavastram'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Kurtas & Shirts',
            items: [
              'Pure Silk Kurtas',
              'Embroidered Festive Kurtas',
              'Short Silk Shirts',
              'Handloom Cotton Kurtas',
              'Mandarin Collar Kurtas'
            ]
          },
          {
            title: 'Kurta Sets',
            items: [
              'Kurta with Churidar Sets',
              'Kurta with Dhoti Sets'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Royal Wedding & Festive',
            items: [
              'Heritage Sherwanis',
              'Bandhgala & Jodhpuris',
              'Embroidered Nehru Jackets',
              'Raw Silk Waistcoats',
              'Groom\'s Silk Attire'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Fabrics & Textiles',
            items: [
              '100% Pure Mulberry Silk',
              'Tussar & Raw Silk',
              'Organic Handloom Cotton',
              'Tested Pure Zari'
            ]
          },
          {
            title: 'Collections',
            items: [
              'Festive Edit',
              'Auspicious Muhurtham',
              'Father & Son Matching',
              'Direct Mill Specials'
            ],
            isSpecial: true
          }
        ]
      }
    ]
  },
  'Kids\' Wear': {
    slug: 'kids-wear',
    allLinkText: 'All In Kids',
    allLinkPath: '/category/kids-wear',
    columns: [
      {
        groups: [
          {
            title: 'Boys Ethnic Wear',
            items: [
              'Boys\' Kurta Sets',
              'Traditional Silk Dhoti Sets',
              'Nehru Jackets & Waistcoats',
              'Churidars, Pyjamas & Dhotis',
              'Festive Sherwani Sets'
            ]
          },
          {
            title: 'Boys Western Wear',
            items: [
              'Shirts & Short Kurtas',
              'Linen Pants & Shorts'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Girls Ethnic Wear',
            items: [
              'Pure Silk Pattu Pavadai',
              'Kids\' Designer Lehengas',
              'Festive Anarkali Sets',
              'Ethnic Frocks & Gowns',
              'Kurti & Sharara Sets'
            ]
          },
          {
            title: 'Girls Western Wear',
            items: [
              'Dress & Jumpsuits',
              'Tops & T-Shirts',
              'Shorts & Skirts',
              'Leggings & Sets'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Infant Boys (0-2 Yrs)',
            items: [
              'Baby Silk Dhotis',
              'Infant Kurta Sets',
              'Shirts & Short Kurtas',
              'Soft Cotton Pyjamas'
            ]
          },
          {
            title: 'Infant Girls (0-2 Yrs)',
            items: [
              'Newborn Pattu Pavadai',
              'Baby Frocks & Dresses',
              'Festive Onepieces'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Collections',
            items: [
              'Festive Celebrations',
              'Temple & Naming Ceremony',
              'Sibling Matching Outfits',
              'Auspicious Occasions'
            ]
          },
          {
            title: 'Sale & Offers',
            items: [
              'Kids\' Festive Gift Packs',
              'Flat 10% Off with AGAM10',
              'Direct Mill Pricing'
            ],
            isSpecial: true
          }
        ]
      }
    ]
  },
  'Sarees': {
    slug: 'sarees',
    allLinkText: 'All In Sarees',
    allLinkPath: '/category/sarees',
    columns: [
      {
        groups: [
          {
            title: 'Silk Mark Pure Sarees',
            items: [
              'Kanchipuram Bridal Silks',
              'Banarasi Katan Silks',
              'Soft Silk Sarees',
              'Pure Tussar & Raw Silk',
              'Dharmavaram Silks'
            ]
          },
          {
            title: 'Handloom Cottons',
            items: [
              'Chettinad Cotton Sarees',
              'Coimbatore Soft Cottons',
              'Madurai Sungudi'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Weaving Artistry & Borders',
            items: [
              'Korvai Interlocking Borders',
              'Mayilkanmu Peacock Zari',
              'Temple Gopuram Motifs',
              'Kasavu Kerala Gold Zari',
              'Tissue Silk Sarees'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Occasion & Bridal Edit',
            items: [
              'Muhurtham Wedding Sarees',
              'Reception & Sangeet Drapes',
              'Temple & Festive Puja Silks',
              'Housewarming Specials',
              'Family Heirloom Drapes'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Blouses & Styling',
            items: [
              'Hand-Embroidered Blouses',
              'Ready-to-Wear Silk Blouses',
              'Pure Zari Dupattas'
            ]
          },
          {
            title: 'Special Collections',
            items: [
              '100% Certified Silk Mark',
              'Direct Mill Loom Releases',
              'Festive Specials'
            ],
            isSpecial: true
          }
        ]
      }
    ]
  },
  'Salwar Suits': {
    slug: 'salwar-suits',
    allLinkText: 'All In Salwar Suits',
    allLinkPath: '/category/salwar-suits',
    columns: [
      {
        groups: [
          {
            title: 'Suits by Silhouette',
            items: [
              'Anarkali Suit Sets',
              'Churidar Sets',
              'Straight Pant Suits',
              'Palazzo & Sharara Sets',
              'Angrakha Cut Suits'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Craft & Embroidery',
            items: [
              'Gota Patti Handwork',
              'Zardozi & Thread Work',
              'Chikankari Embroidered',
              'Foil Print & Zari Brocade'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Fabrics & Textiles',
            items: [
              'Pure Silk Suits',
              'Chanderi Silk',
              'Organza & Georgette',
              'Handloom Fine Cotton'
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Collections & Edit',
            items: [
              'Festive Specials',
              'Wedding Guest Edit',
              'Daily Elegance',
              'Direct Mill Value'
            ],
            isSpecial: true
          }
        ]
      }
    ]
  }
};

const Navbar = ({ mobileMenuOpen, onCloseMobileMenu }) => {
  const navigate = useNavigate();
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const navRef = useRef(null);

  // Exact categories from reference screenshot
  const navLinks = [
    { name: 'All Collections', path: '/collections', isSpecial: true },
    { name: 'Sarees', path: '/category/sarees', hasMega: true },
    { name: 'Kurtis', path: '/category/kurtis', hasMega: true },
    { name: 'Salwar Suits', path: '/category/salwar-suits', hasMega: true },
    { name: 'Men\'s Wear', path: '/category/mens-wear', hasMega: true },
    { name: 'Kids\' Wear', path: '/category/kids-wear', hasMega: true },
    { name: 'Blouses', path: '/category/blouses' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Festive Specials', path: '/festive-collection' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (e, link) => {
    if (link.hasMega) {
      e.preventDefault();
      setActiveMegaMenu(prev => (prev === link.name ? null : link.name));
    }
  };

  const handleSubItemClick = (slug, subName) => {
    setActiveMegaMenu(null);
    navigate(`/category/${slug}?sub=${encodeURIComponent(subName)}`);
  };

  const activeMegaData = activeMegaMenu ? MEGA_MENUS[activeMegaMenu] : null;

  return (
    <>
      {/* Desktop Navigation Bar */}
      <nav 
        ref={navRef}
        style={{
          backgroundColor: '#102D50',
          position: 'relative',
          zIndex: 90
        }}
        className="hidden-tablet"
      >
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'nowrap',
          overflowX: 'visible',
          scrollbarWidth: 'none'
        }}>
          {navLinks.map((link) => {
            const hasMega = Boolean(link.hasMega);
            const isOpen = activeMegaMenu === link.name;

            return (
              <div
                key={link.name}
                style={{ position: 'relative' }}
                onMouseEnter={() => hasMega && setActiveMegaMenu(link.name)}
              >
                {link.isSpecial ? (
                  <NavLink
                    to={link.path}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 18px',
                      backgroundColor: '#D6A32D',
                      color: '#081B32',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      letterSpacing: '0.2px',
                      borderRadius: '4px',
                      margin: '6px 4px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      whiteSpace: 'nowrap',
                      textDecoration: 'none'
                    }}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ) : (
                  <button
                    onClick={(e) => handleCategoryClick(e, link)}
                    style={{
                      background: 'none',
                      border: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '14px 14px',
                      color: isOpen ? '#F0C96A' : '#FFFFFF',
                      fontWeight: isOpen ? 800 : 600,
                      fontSize: isOpen ? '0.98rem' : '0.92rem',
                      letterSpacing: '0.25px',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      borderBottom: isOpen ? '3px solid #D6A32D' : '3px solid transparent'
                    }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.color = '#F0C96A'; 
                      e.currentTarget.style.fontSize = '0.98rem';
                      e.currentTarget.style.fontWeight = '800';
                    }}
                    onMouseLeave={(e) => { 
                      if (!isOpen) {
                        e.currentTarget.style.color = '#FFFFFF'; 
                        e.currentTarget.style.fontSize = '0.92rem';
                        e.currentTarget.style.fontWeight = '600';
                      }
                    }}
                  >
                    <span>{link.name}</span>
                    {hasMega && (
                      <ChevronDown 
                        size={14} 
                        style={{ 
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s ease',
                          opacity: 0.85
                        }} 
                      />
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Decorative Gold Diamond Border Strip */}
        <div className="gold-diamond-border" />

        {/* Multi-Column White Mega Menu Dropdown with Big, Crisp Fonts */}
        {activeMegaData && (
          <div
            onMouseLeave={() => setActiveMegaMenu(null)}
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '94vw',
              maxWidth: '1360px',
              backgroundColor: '#FFFFFF',
              borderRadius: '0 0 14px 14px',
              border: '1px solid rgba(214, 163, 45, 0.4)',
              borderTop: '3px solid #D6A32D',
              boxShadow: '0 25px 60px rgba(8, 27, 50, 0.2), 0 4px 16px rgba(0,0,0,0.08)',
              padding: '36px 48px 40px',
              zIndex: 300,
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            {/* Top Row: Big "All In Category" link & Close button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '18px',
              marginBottom: '26px',
              borderBottom: '2px solid #F1F5F9'
            }}>
              <Link
                to={activeMegaData.allLinkPath}
                onClick={() => setActiveMegaMenu(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#8B1E2D',
                  fontSize: '1.25rem', // Large prominent title
                  fontWeight: 800,
                  textDecoration: 'underline',
                  textUnderlineOffset: '5px',
                  letterSpacing: '0.4px',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <span>{activeMegaData.allLinkText}</span>
                <ArrowRight size={18} />
              </Link>

              <button
                onClick={() => setActiveMegaMenu(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#8B1E2D';
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#64748B';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* 4 Multi-Column Grid with Big Category Headers & Enlargeable Items */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '40px'
            }}>
              {activeMegaData.columns.map((col, colIdx) => (
                <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                  {col.groups.map((grp, grpIdx) => (
                    <div key={grpIdx}>
                      {/* Big Group Header in rich maroon */}
                      <h4 style={{
                        color: grp.isSpecial ? '#B45309' : '#8B1E2D',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.14rem', // Big, clear header font size
                        fontWeight: 800,
                        margin: '0 0 12px 0',
                        letterSpacing: '0.2px',
                        borderBottom: '2px solid rgba(139, 30, 45, 0.14)',
                        paddingBottom: '6px'
                      }}>
                        {grp.title}
                      </h4>

                      {/* Sub-item Links with Big Font & Hover Enlargement */}
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {grp.items.map((item) => (
                          <li key={item}>
                            <button
                              onClick={() => handleSubItemClick(activeMegaData.slug, item)}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: '3px 0',
                                color: '#334155',
                                fontSize: '0.98rem', // Big, comfortable readable font size
                                fontWeight: 500,
                                textAlign: 'left',
                                cursor: 'pointer',
                                display: 'block',
                                width: '100%',
                                transition: 'all 0.18s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#8B1E2D';
                                e.currentTarget.style.fontWeight = '700';
                                e.currentTarget.style.fontSize = '1.05rem'; // Enlarges when mouse pointer moves over!
                                e.currentTarget.style.transform = 'translateX(6px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#334155';
                                e.currentTarget.style.fontWeight = '500';
                                e.currentTarget.style.fontSize = '0.98rem';
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Bottom Accent Bar */}
            <div style={{
              marginTop: '32px',
              paddingTop: '16px',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              color: '#64748B'
            }}>
              <span>Direct Mill Weaving from Nirmala Textiles • 100% Verified Silk Mark Certified</span>
              <span style={{ color: '#8B1E2D', fontWeight: 700 }}>Enjoy Mill Pricing with Complimentary Transit Insurance</span>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex' }}>
          <div style={{ width: '85%', maxWidth: '340px', height: '100%', backgroundColor: '#081B32', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(214, 163, 45, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '4px 10px', borderRadius: '6px' }}>
                <img src="/agam-logo.png" alt="AGAM – The Unit of Nirmala Tex" style={{ height: '34px', width: 'auto', display: 'block' }} />
              </div>
              <button onClick={onCloseMobileMenu} style={{ color: '#F0C96A' }}><X size={22} /></button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.map(link => {
                const megaData = MEGA_MENUS[link.name];
                return (
                  <div key={link.name} style={{ display: 'flex', flexDirection: 'column' }}>
                    <NavLink
                      to={link.path}
                      onClick={onCloseMobileMenu}
                      style={({ isActive }) => ({
                        padding: '10px 14px',
                        borderRadius: '4px',
                        color: link.isSpecial ? '#081B32' : isActive ? '#F0C96A' : '#FFFFFF',
                        backgroundColor: link.isSpecial ? '#D6A32D' : isActive ? 'rgba(214, 163, 45, 0.15)' : 'transparent',
                        fontWeight: link.isSpecial || isActive ? 700 : 500,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      })}
                    >
                      <span>{link.name}</span>
                      {link.isSpecial && <Sparkles size={14} />}
                    </NavLink>

                    {/* Subcategories in Mobile if present */}
                    {megaData && (
                      <div style={{ paddingLeft: '14px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {megaData.columns[0]?.groups[0]?.items.slice(0, 4).map(item => (
                          <Link
                            key={item}
                            to={`/category/${megaData.slug}?sub=${encodeURIComponent(item)}`}
                            onClick={onCloseMobileMenu}
                            style={{ color: '#94A3B8', fontSize: '0.78rem', padding: '3px 8px' }}
                          >
                            • {item}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ flex: 1 }} onClick={onCloseMobileMenu} />
        </div>
      )}
    </>
  );
};

export default Navbar;
