import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  SlidersHorizontal, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Check, 
  TrendingUp, 
  Download, 
  Settings, 
  Lock, 
  LogOut, 
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Tag,
  Eye
} from 'lucide-react';

const AdminPortal = () => {
  const { 
    products, 
    categories, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    isAdminAuthenticated, 
    setIsAdminAuthenticated,
    siteSettings,
    setSiteSettings,
    showToast 
  } = useShop();

  // Admin Login Form States
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('agam2026');

  // Active module tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Product Add / Edit Modal States
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [prodName, setProdName] = useState('');
  const [prodTamilName, setProdTamilName] = useState('');
  const [prodCategory, setProdCategory] = useState('Sarees');
  const [prodPrice, setProdPrice] = useState(4999);
  const [prodOrigPrice, setProdOrigPrice] = useState(6499);
  const [prodStock, setProdStock] = useState(15);
  const [prodFabric, setProdFabric] = useState('Pure Mulberry Silk');
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80');

  // Announcement setting state
  const [announcementText, setAnnouncementText] = useState(siteSettings.announcement);
  const [freeShipThreshold, setFreeShipThreshold] = useState(siteSettings.freeShippingThreshold);

  // Search filter inside admin tables
  const [productSearch, setProductSearch] = useState('');

  // 1. Admin Login Gate
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'agam2026') {
      setIsAdminAuthenticated(true);
      showToast('Welcome to AGAM Executive Administration Suite.');
    } else {
      showToast('Invalid administrator credentials.', 'error');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    showToast('Signed out of Admin Portal.', 'info');
  };

  // KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStockProducts = products.filter(p => (p.stockCount || 0) < 10);

  // Open modal to add or edit
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProdName('');
    setProdTamilName('');
    setProdCategory('Sarees');
    setProdPrice(4999);
    setProdOrigPrice(6499);
    setProdStock(15);
    setProdFabric('Pure Mulberry Silk');
    setProdImage('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80');
    setShowProductModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdTamilName(p.tamilName || '');
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdOrigPrice(p.originalPrice || p.price);
    setProdStock(p.stockCount || 10);
    setProdFabric(p.fabrics || '');
    setProdImage(p.images ? p.images[0] : p.image);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const discount = prodOrigPrice > prodPrice ? Math.round(((prodOrigPrice - prodPrice) / prodOrigPrice) * 100) : 0;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodName,
        tamilName: prodTamilName,
        category: prodCategory,
        price: Number(prodPrice),
        originalPrice: Number(prodOrigPrice),
        discount,
        stockCount: Number(prodStock),
        fabrics: prodFabric,
        image: prodImage,
        images: [prodImage]
      });
    } else {
      addProduct({
        name: prodName,
        tamilName: prodTamilName,
        category: prodCategory,
        categorySlug: prodCategory.toLowerCase().replace(/['\s]/g, '-'),
        price: Number(prodPrice),
        originalPrice: Number(prodOrigPrice),
        discount,
        stockCount: Number(prodStock),
        fabrics: prodFabric,
        image: prodImage,
        images: [prodImage],
        inStock: true,
        origin: 'Nirmala Atelier, Tamil Nadu'
      });
    }
    setShowProductModal(false);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = 'Order ID,Date,Customer,Total,Status,Payment\n';
    const rows = orders.map(o => `${o.id},${o.date},"${o.shippingAddress?.name || 'Customer'}",${o.total},${o.status},${o.paymentMethod}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AGAM-Sales-Report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Sales Report CSV generated and downloaded!');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSiteSettings(prev => ({
      ...prev,
      announcement: announcementText,
      freeShippingThreshold: Number(freeShipThreshold)
    }));
    showToast('Website announcement banner & settings updated live!');
  };

  if (!isAdminAuthenticated) {
    return (
      <div style={{ backgroundColor: '#061527', minHeight: '85vh', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          maxWidth: '460px',
          width: '100%',
          backgroundColor: '#081B32',
          borderRadius: '12px',
          border: '2px solid #D6A32D',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          padding: '36px',
          color: '#FFFFFF'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '8px 16px', borderRadius: '8px', display: 'inline-block', margin: '0 auto 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              <img src="/agam-logo.png" alt="AGAM – The Unit of Nirmala Tex" style={{ height: '48px', width: 'auto', display: 'block' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#FFFFFF', fontSize: '1.6rem', margin: '0 0 6px 0' }}>
              AGAM Administrator Portal
            </h2>
            <p style={{ color: '#A7ADB1', fontSize: '0.8rem', margin: 0 }}>
              Authorized management portal for Nirmala Textiles operations
            </p>
          </div>

          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#F0C96A', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Admin Username
              </label>
              <input
                type="text"
                value={adminUsername}
                onChange={e => setAdminUsername(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(214, 163, 45, 0.4)', backgroundColor: '#0A233F', color: '#FFFFFF', fontSize: '0.88rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#F0C96A', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Secure Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(214, 163, 45, 0.4)', backgroundColor: '#0A233F', color: '#FFFFFF', fontSize: '0.88rem' }}
              />
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', marginTop: '6px' }}>
              Authenticate & Enter Dashboard
            </button>
          </form>

          <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(214, 163, 45, 0.1)', borderRadius: '6px', fontSize: '0.74rem', color: '#F0C96A', textAlign: 'center' }}>
            <strong>Demo Credentials:</strong> Username: <code>admin</code> • Password: <code>agam2026</code>
          </div>
        </div>
      </div>
    );
  }

  const filteredAdminProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
    p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '85vh', padding: '30px 24px 80px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Admin Header */}
        <div style={{
          backgroundColor: '#081B32',
          borderRadius: '12px',
          padding: '24px 32px',
          color: '#FFFFFF',
          border: '1px solid #D6A32D',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
              <img src="/agam-logo.png" alt="AGAM" style={{ height: '36px', width: 'auto' }} />
            </div>
            <div>
              <span className="badge-heritage" style={{ marginBottom: '2px' }}>EXECUTIVE CONTROL SUITE</span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#FFFFFF', margin: 0 }}>
                AGAM – Nirmala Tex Operations Portal
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleExportCSV}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #D6A32D',
                backgroundColor: 'rgba(214, 163, 45, 0.15)',
                color: '#F0C96A',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              <Download size={14} /> Export CSV
            </button>

            <button
              onClick={handleAdminLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              <LogOut size={14} /> Exit Admin
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          marginBottom: '28px',
          borderBottom: '2px solid #E2E8F0',
          paddingBottom: '8px'
        }}>
          {[
            { id: 'dashboard', label: 'Executive KPIs', icon: TrendingUp },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingCart },
            { id: 'inventory', label: `Inventory Alerts (${lowStockProducts.length})`, icon: AlertTriangle },
            { id: 'settings', label: 'Announcement & Store Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  backgroundColor: isActive ? '#102D50' : '#FFFFFF',
                  color: isActive ? '#F0C96A' : '#475569',
                  border: isActive ? '1px solid #D6A32D' : '1px solid #CBD5E1',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} color={isActive ? '#F0C96A' : '#64748B'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            {/* KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '22px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  <span>Total Invoiced Revenue</span>
                  <DollarSign size={18} color="#D6A32D" />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#102D50', margin: '8px 0 0' }}>
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: 700 }}>↑ +18.4% from festive season</span>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '22px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  <span>Orders Dispatched</span>
                  <ShoppingCart size={18} color="#102D50" />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#102D50', margin: '8px 0 0' }}>
                  {orders.length} Orders
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: 700 }}>100% On-time delivery rate</span>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '22px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  <span>Active Catalog Pieces</span>
                  <Package size={18} color="#102D50" />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#102D50', margin: '8px 0 0' }}>
                  {products.length} Weaves
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#64748B' }}>Across {categories.length} categories</span>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '22px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  <span>Low Stock Warnings</span>
                  <AlertTriangle size={18} color="#DC2626" />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: lowStockProducts.length > 0 ? '#DC2626' : '#102D50', margin: '8px 0 0' }}>
                  {lowStockProducts.length} Items
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#DC2626', fontWeight: 700 }}>Requires handloom loom allocation</span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#102D50', marginBottom: '16px' }}>
                Latest Patron Orders & Dispatch State
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#102D50' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Order ID</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Customer</th>
                    <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                    <th style={{ padding: '10px', textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 700, color: '#102D50' }}>{o.id}</td>
                      <td style={{ padding: '12px 10px', color: '#64748B' }}>{o.date}</td>
                      <td style={{ padding: '12px 10px', fontWeight: 600 }}>{o.shippingAddress?.name || o.customerName || 'Kavya S.'}</td>
                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                        <span style={{ backgroundColor: '#ECFDF5', color: '#065F46', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800 }}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 800, color: '#102D50' }}>
                        ₹{o.total?.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search products by SKU, title, category..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.84rem', width: '280px' }}
                />
              </div>

              <button onClick={handleOpenAdd} className="btn-gold" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
                <Plus size={16} /> Add New Weave Product
              </button>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#102D50', color: '#F0C96A' }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Item</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>SKU</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Category</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Stock</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Price</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdminProducts.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={p.images ? p.images[0] : p.image} alt="" style={{ width: '36px', height: '46px', objectFit: 'cover', borderRadius: '4px' }} />
                        <span style={{ fontWeight: 700, color: '#102D50' }}>{p.name}</span>
                      </td>
                      <td style={{ padding: '10px 12px', color: '#64748B' }}>{p.sku}</td>
                      <td style={{ padding: '10px 12px', color: '#475569' }}>{p.category}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <span style={{ fontWeight: 700, color: (p.stockCount || 0) < 10 ? '#DC2626' : '#059669' }}>
                          {p.stockCount || 0}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 800, color: '#102D50' }}>
                        ₹{p.price.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button onClick={() => handleOpenEdit(p)} style={{ color: '#102D50', padding: '4px', cursor: 'pointer' }} title="Edit Product">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => deleteProduct(p.id)} style={{ color: '#DC2626', padding: '4px', cursor: 'pointer' }} title="Archive">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDER MANAGEMENT */}
        {activeTab === 'orders' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '24px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#102D50', marginBottom: '16px' }}>
              Fulfillment & Courier Logistics
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map(o => (
                <div key={o.id} style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                  <div>
                    <h4 style={{ color: '#102D50', margin: '0 0 4px 0' }}>{o.id} • {o.shippingAddress?.name || 'Kavya S.'}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>AWB: {o.trackingNumber} via {o.courier} • Total: ₹{o.total?.toLocaleString('en-IN')}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#102D50' }}>Change Status:</span>
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem', fontWeight: 600 }}
                    >
                      <option value="Payment Confirmed">Payment Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INVENTORY ALERTS */}
        {activeTab === 'inventory' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '24px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#102D50', marginBottom: '16px' }}>
              Low-Stock Inventory Replenishment
            </h3>
            {lowStockProducts.length === 0 ? (
              <p style={{ color: '#10B981', fontWeight: 600 }}>All handloom product batches have healthy stock levels.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {lowStockProducts.map(p => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FCA5A5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <AlertTriangle size={20} color="#DC2626" />
                      <div>
                        <strong style={{ color: '#991B1B' }}>{p.name}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#7F1D1D' }}>SKU: {p.sku} • Current Stock: {p.stockCount} items</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        updateProduct({ ...p, stockCount: (p.stockCount || 0) + 20 });
                        showToast(`Restocked ${p.name} by +20 items.`);
                      }}
                      className="btn-gold"
                      style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                    >
                      + Quick Restock 20
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: WEBSITE SETTINGS */}
        {activeTab === 'settings' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '28px', border: '1px solid #E2E8F0', maxWidth: '700px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#102D50', marginBottom: '16px' }}>
              Live Store Settings & Announcement Bar
            </h3>
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Header Announcement Bar Message:
                </label>
                <textarea
                  rows="2"
                  value={announcementText}
                  onChange={e => setAnnouncementText(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.86rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Free Shipping Minimum Threshold (₹):
                </label>
                <input
                  type="number"
                  value={freeShipThreshold}
                  onChange={e => setFreeShipThreshold(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                />
              </div>

              <button type="submit" className="btn-gold" style={{ alignSelf: 'flex-start', padding: '10px 22px' }}>
                <Save size={15} /> Save Settings Live
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      {showProductModal && (
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
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '28px', maxWidth: '540px', width: '100%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid #D6A32D' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#102D50', margin: '0 0 16px 0' }}>
              {editingProduct ? 'Edit Handloom Product' : 'Add New Handloom Product'}
            </h3>
            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Product Title *" required value={prodName} onChange={e => setProdName(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
              <input type="text" placeholder="English Tagline (e.g. Handloom Pure Silk)" value={prodTamilName} onChange={e => setProdTamilName(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <select value={prodCategory} onChange={e => setProdCategory(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }}>
                  <option value="Sarees">Sarees</option>
                  <option value="Kurtis">Kurtis</option>
                  <option value="Salwar Suits">Salwar Suits</option>
                  <option value="Men's Wear">Men's Wear</option>
                  <option value="Kids' Wear">Kids' Wear</option>
                  <option value="Blouses">Blouses</option>
                  <option value="Lehengas">Lehengas</option>
                </select>
                <input type="number" placeholder="Stock Qty *" required value={prodStock} onChange={e => setProdStock(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input type="number" placeholder="Selling Price (₹) *" required value={prodPrice} onChange={e => setProdPrice(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
                <input type="number" placeholder="Original Price (₹)" value={prodOrigPrice} onChange={e => setProdOrigPrice(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
              </div>

              <input type="text" placeholder="Fabrics Details *" required value={prodFabric} onChange={e => setProdFabric(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
              <input type="url" placeholder="High-Res Image URL *" required value={prodImage} onChange={e => setProdImage(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowProductModal(false)} style={{ padding: '8px 16px', border: '1px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-gold" style={{ padding: '8px 20px' }}>Save Weave</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPortal;
