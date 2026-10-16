import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  Plus, 
  Trash2, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Edit3
} from 'lucide-react';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, orders, wishlist, showToast } = useShop();

  const [activeTab, setActiveTab] = useState('orders');
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Address form states
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('Tamil Nadu');
  const [addrPincode, setAddrPincode] = useState('');

  if (!currentUser) {
    return (
      <div style={{ backgroundColor: '#F8F6F0', minHeight: '70vh', padding: '80px 24px', textAlign: 'center' }}>
        <h2>Please Sign In to Access Your Account</h2>
        <Link to="/login" className="btn-gold" style={{ marginTop: '16px', display: 'inline-block' }}>
          Sign In
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Signed out successfully.', 'info');
    navigate('/');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const newAddr = {
      id: `ADDR-${Date.now().toString().slice(-4)}`,
      name: addrName,
      phone: addrPhone,
      street: addrStreet,
      city: addrCity,
      state: addrState,
      pincode: addrPincode,
      isDefault: currentUser.addresses?.length === 0
    };

    const updatedAddresses = [...(currentUser.addresses || []), newAddr];
    const updatedUser = { ...currentUser, addresses: updatedAddresses };
    setCurrentUser(updatedUser);
    localStorage.setItem('agam_user', JSON.stringify(updatedUser));
    setShowAddressModal(false);
    showToast('New delivery address saved!');
    setAddrName('');
    setAddrPhone('');
    setAddrStreet('');
    setAddrCity('');
    setAddrPincode('');
  };

  const handleDeleteAddress = (id) => {
    const updated = currentUser.addresses.filter(a => a.id !== id);
    const updatedUser = { ...currentUser, addresses: updated };
    setCurrentUser(updatedUser);
    localStorage.setItem('agam_user', JSON.stringify(updatedUser));
    showToast('Address removed.', 'info');
  };

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        
        {/* Profile Welcome Banner */}
        <div style={{
          backgroundColor: '#0A233F',
          borderRadius: '12px',
          padding: '28px 32px',
          color: '#FFFFFF',
          border: '1px solid rgba(214, 163, 45, 0.4)',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#D6A32D',
              color: '#081B32',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              fontWeight: 900
            }}>
              {currentUser.name ? currentUser.name[0] : 'P'}
            </div>
            <div>
              <span className="badge-heritage" style={{ marginBottom: '4px' }}>AGAM PATRON DASHBOARD</span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFFFFF', margin: '2px 0' }}>
                Vanakkam, {currentUser.name}
              </h1>
              <p style={{ color: '#CBD5E1', fontSize: '0.84rem', margin: 0 }}>
                {currentUser.email} • {currentUser.phone}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        {/* Dashboard Grid: Left Sidebar Nav + Right Content Area */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '28px',
          alignItems: 'start'
        }} className="dashboard-grid">
          
          {/* Navigation Sidebar */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            {[
              { id: 'orders', label: 'My Orders & Tracking', icon: Package, count: orders.length },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: currentUser.addresses?.length || 0 },
              { id: 'profile', label: 'Patron Profile', icon: User },
              { id: 'wishlist', label: 'My Wishlist', icon: Heart, count: wishlist.length }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: 'none',
                    borderLeft: isActive ? '4px solid #D6A32D' : '4px solid transparent',
                    backgroundColor: isActive ? '#FDF6E3' : '#FFFFFF',
                    color: isActive ? '#102D50' : '#475569',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.86rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderBottom: '1px solid #F1F5F9'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={18} color={isActive ? '#D6A32D' : '#64748B'} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span style={{
                      backgroundColor: isActive ? '#D6A32D' : '#F1F5F9',
                      color: isActive ? '#081B32' : '#64748B',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Content Tab Container */}
          <div>
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#102D50', margin: 0 }}>
                  Order History & Real-Time Tracking
                </h2>

                {orders.length === 0 ? (
                  <div style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '10px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                    <p style={{ color: '#64748B' }}>You have not placed any orders yet.</p>
                    <Link to="/collections" className="btn-gold" style={{ marginTop: '12px' }}>
                      Shop Handloom Collections
                    </Link>
                  </div>
                ) : (
                  orders.map(order => (
                    <div
                      key={order.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        padding: '24px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '14px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <span style={{ fontSize: '0.74rem', color: '#94A3B8', textTransform: 'uppercase' }}>Order ID:</span>
                          <h4 style={{ color: '#102D50', margin: '2px 0 0 0', fontSize: '1.1rem' }}>{order.id}</h4>
                          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Placed on {order.date}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            backgroundColor: '#ECFDF5',
                            color: '#065F46',
                            border: '1px solid #A7F3D0',
                            padding: '3px 10px',
                            borderRadius: '15px',
                            fontSize: '0.75rem',
                            fontWeight: 800
                          }}>
                            {order.status}
                          </span>
                          <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: '#102D50', marginTop: '4px' }}>
                            ₹{order.total?.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                        {order.items?.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img src={item.product?.images ? item.product.images[0] : item.product?.image} alt="" style={{ width: '45px', height: '55px', objectFit: 'cover', borderRadius: '4px' }} />
                              <div>
                                <p style={{ fontWeight: 700, color: '#102D50', margin: 0, fontSize: '0.88rem' }}>{item.product?.name}</p>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Size: {item.size} • Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#102D50' }}>₹{(item.product?.price * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
                        <Link
                          to={`/orders?track=${order.id}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '7px 14px',
                            borderRadius: '4px',
                            backgroundColor: '#102D50',
                            color: '#FFFFFF',
                            fontSize: '0.78rem',
                            fontWeight: 700
                          }}
                        >
                          <Truck size={14} color="#F0C96A" /> Live Courier Timeline
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#102D50', margin: 0 }}>
                    Saved Shipping Addresses
                  </h2>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="btn-gold"
                    style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  >
                    <Plus size={15} /> Add New Address
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                  {currentUser.addresses?.map(addr => (
                    <div
                      key={addr.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        padding: '20px',
                        position: 'relative'
                      }}
                    >
                      {addr.isDefault && (
                        <span style={{
                          backgroundColor: '#FDF6E3',
                          color: '#D6A32D',
                          border: '1px solid #D6A32D',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '3px',
                          position: 'absolute',
                          top: '16px',
                          right: '16px'
                        }}>
                          Default Address
                        </span>
                      )}
                      <h4 style={{ color: '#102D50', margin: '0 0 6px 0', fontSize: '1rem' }}>{addr.name}</h4>
                      <p style={{ color: '#475569', fontSize: '0.84rem', margin: '0 0 4px 0' }}>{addr.street}</p>
                      <p style={{ color: '#475569', fontSize: '0.84rem', margin: '0 0 4px 0' }}>{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p style={{ color: '#64748B', fontSize: '0.8rem', margin: '6px 0 0 0' }}>Phone: {addr.phone}</p>

                      <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#DC2626', cursor: 'pointer' }}
                        >
                          <Trash2 size={13} /> Delete Address
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '28px', border: '1px solid #E2E8F0' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#102D50', marginBottom: '18px' }}>
                  Patron Personal Profile
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '600px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Full Name</label>
                    <p style={{ fontWeight: 700, color: '#102D50', margin: '4px 0 0 0' }}>{currentUser.name}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Email Address</label>
                    <p style={{ fontWeight: 700, color: '#102D50', margin: '4px 0 0 0' }}>{currentUser.email}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Phone Number</label>
                    <p style={{ fontWeight: 700, color: '#102D50', margin: '4px 0 0 0' }}>{currentUser.phone}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Membership Level</label>
                    <p style={{ fontWeight: 700, color: '#D6A32D', margin: '4px 0 0 0' }}>AGAM Heritage Patron</p>
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Tab shortcut */}
            {activeTab === 'wishlist' && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '28px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#102D50', marginBottom: '8px' }}>
                  Saved Heirlooms ({wishlist.length})
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.88rem', margin: '0 0 16px 0' }}>
                  Manage and order from your curated list of favorite sarees and ethnic sets.
                </p>
                <Link to="/wishlist" className="btn-gold" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                  Open Full Wishlist Page
                </Link>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(8, 27, 50, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '20px'
        }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '28px', maxWidth: '480px', width: '100%', border: '1px solid #D6A32D' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#102D50', margin: '0 0 16px 0' }}>Add New Shipping Address</h3>
            <form onSubmit={handleAddAddress} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Recipient Name *" required value={addrName} onChange={e => setAddrName(e.target.value)} style={{ padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
              <input type="tel" placeholder="Mobile Phone *" required value={addrPhone} onChange={e => setAddrPhone(e.target.value)} style={{ padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
              <input type="text" placeholder="Street Address / Door No. *" required value={addrStreet} onChange={e => setAddrStreet(e.target.value)} style={{ padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input type="text" placeholder="City *" required value={addrCity} onChange={e => setAddrCity(e.target.value)} style={{ padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                <input type="text" placeholder="Pincode *" required value={addrPincode} onChange={e => setAddrPincode(e.target.value)} style={{ padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddressModal(false)} style={{ padding: '8px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-gold" style={{ padding: '8px 18px' }}>Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerDashboard;
