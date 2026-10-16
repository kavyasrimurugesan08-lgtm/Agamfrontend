import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Collections from './pages/Collections';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchResults from './pages/SearchResults';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import WishlistPage from './pages/WishlistPage';
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/AuthPages';
import CustomerDashboard from './pages/CustomerDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { 
  FAQsPage, 
  ShippingPolicyPage, 
  ReturnsPolicyPage, 
  PrivacyPolicyPage, 
  TermsConditionsPage 
} from './pages/PoliciesPages';
import AdminPortal from './pages/AdminPortal';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <ScrollToTop />
      
      {/* 1. Official White Header with Logo & Controls */}
      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* 3. Deep Navy Navigation Bar with Mega Menu */}
      <Navbar 
        mobileMenuOpen={mobileMenuOpen} 
        onCloseMobileMenu={() => setMobileMenuOpen(false)} 
      />

      {/* Main Content Router */}
      <main style={{ flex: 1, paddingBottom: '30px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/search" element={<SearchResults />} />
          
          {/* Curated Highlights */}
          <Route path="/new-arrivals" element={<CategoryPage />} />
          <Route path="/festive-collection" element={<CategoryPage />} />
          <Route path="/wedding-collection" element={<CategoryPage />} />

          {/* Cart & Checkout */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/orders" element={<OrderTrackingPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* Customer Auth & Account */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/addresses" element={<CustomerDashboard />} />

          {/* Brand & Support */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
          <Route path="/returns-policy" element={<ReturnsPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />

          {/* Admin Control Portal */}
          <Route path="/admin" element={<AdminPortal />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* 4. Deep Navy Footer */}
      <Footer />

      {/* Floating Customer Support Controls */}
      <WhatsAppButton />
      <BackToTop />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Toast Alert System */}
      <Toast />
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
