import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Lock, Mail, Phone, User, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser, showToast } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter your email and password.', 'error');
      return;
    }

    const user = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: email.split('@')[0].toUpperCase(),
      email: email,
      phone: '+91 98401 23456',
      role: 'customer',
      addresses: [
        {
          id: 'ADDR-1',
          name: email.split('@')[0],
          phone: '+91 98401 23456',
          street: '14, Weavers Colony, Gandhipuram',
          city: 'Coimbatore',
          state: 'Tamil Nadu',
          pincode: '641012',
          isDefault: true
        }
      ]
    };

    setCurrentUser(user);
    showToast(`Welcome back to AGAM, ${user.name}!`);
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    const demoUser = {
      id: 'USR-2026-01',
      name: 'Kavya S.',
      email: 'kavya@example.com',
      phone: '+91 98401 23456',
      role: 'customer',
      addresses: [
        {
          id: 'ADDR-1',
          name: 'Kavya S.',
          phone: '+91 98401 23456',
          street: '14, Weaver\'s Colony, Gandhipuram',
          city: 'Coimbatore',
          state: 'Tamil Nadu',
          pincode: '641012',
          isDefault: true
        }
      ]
    };
    setCurrentUser(demoUser);
    showToast('Signed in as Patron Kavya S.');
    navigate('/dashboard');
  };

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        maxWidth: '460px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #D6A32D',
        boxShadow: '0 15px 35px rgba(8, 27, 50, 0.1)',
        padding: '36px',
        animation: 'fadeIn 0.3s ease-out'
      }}>
        {/* Brand header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src="/agam-logo.png" alt="AGAM" style={{ height: '48px', width: 'auto', margin: '0 auto 10px' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#102D50', margin: '0 0 4px 0' }}>
            Sign In to AGAM
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.82rem', margin: 0 }}>
            Access your orders, saved wishlists & Silk Mark certificates
          </p>
        </div>

        {/* Quick Demo Fill Button */}
        <div style={{ marginBottom: '20px' }}>
          <button
            type="button"
            onClick={handleDemoLogin}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#FDF6E3',
              border: '1px dashed #D6A32D',
              borderRadius: '6px',
              color: '#081B32',
              fontWeight: 700,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={14} color="#D6A32D" /> Quick Demo Login (Kavya S.)
          </button>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Email Address or Mobile Phone
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com or +91..."
                style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
              <Mail size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', margin: 0 }}>
                Password
              </label>
              <Link to="/forgot-password" style={{ fontSize: '0.74rem', color: '#D6A32D', fontWeight: 600 }}>
                Forgot Password?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
              />
              <Lock size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            className="btn-gold"
            style={{ width: '100%', padding: '12px', fontSize: '0.92rem', marginTop: '6px' }}
          >
            <span>Sign In</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', fontSize: '0.82rem', color: '#64748B' }}>
          New to AGAM?{' '}
          <Link to="/register" style={{ color: '#102D50', fontWeight: 700 }}>
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser, showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name,
      email,
      phone,
      role: 'customer',
      addresses: []
    };

    setCurrentUser(newUser);
    showToast(`Account created successfully! Welcome to AGAM, ${name}.`);
    navigate('/dashboard');
  };

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #D6A32D',
        boxShadow: '0 15px 35px rgba(8, 27, 50, 0.1)',
        padding: '36px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src="/agam-logo.png" alt="AGAM" style={{ height: '48px', width: 'auto', margin: '0 auto 10px' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#102D50', margin: '0 0 4px 0' }}>
            Register with AGAM
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.82rem', margin: 0 }}>
            Join our patron community for direct mill releases and pure silk drapes
          </p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ananya Raman"
              style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Mobile Phone *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98401 23456"
              style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Create Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              style={{ width: '100%', padding: '9px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
            />
          </div>

          <button
            type="submit"
            className="btn-gold"
            style={{ width: '100%', padding: '12px', fontSize: '0.92rem', marginTop: '6px' }}
          >
            <span>Create Account</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', fontSize: '0.82rem', color: '#64748B' }}>
          Already have an AGAM account?{' '}
          <Link to="/login" style={{ color: '#102D50', fontWeight: 700 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useShop();

  const handleReset = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      showToast(`Password recovery link and OTP sent to ${email}`);
    }
  };

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '80vh', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        maxWidth: '450px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #D6A32D',
        boxShadow: '0 15px 35px rgba(8, 27, 50, 0.1)',
        padding: '36px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#102D50', margin: '0 0 8px 0' }}>
          Reset Password
        </h2>
        <p style={{ color: '#64748B', fontSize: '0.84rem', margin: '0 0 20px 0' }}>
          Enter the registered email address or phone linked to your AGAM account.
        </p>

        {submitted ? (
          <div style={{ backgroundColor: '#ECFDF5', padding: '20px', borderRadius: '8px', border: '1px solid #10B981' }}>
            <CheckCircle2 size={32} color="#059669" style={{ margin: '0 auto 8px' }} />
            <h4 style={{ color: '#065F46', margin: '0 0 4px 0' }}>Recovery Verification Sent</h4>
            <p style={{ fontSize: '0.82rem', color: '#047857', margin: 0 }}>
              Check your inbox for 6-digit OTP and reset instructions.
            </p>
            <Link to="/login" className="btn-gold" style={{ display: 'inline-block', marginTop: '16px', padding: '8px 18px', fontSize: '0.82rem' }}>
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or phone"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
            />
            <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px' }}>
              Send OTP & Recovery Link
            </button>
            <Link to="/login" style={{ fontSize: '0.8rem', color: '#64748B', textDecoration: 'underline' }}>
              Back to Login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};
