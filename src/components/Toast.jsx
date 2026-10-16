import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const Toast = () => {
  const { toast } = useShop();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'error':
        return <AlertCircle size={20} color="#EF4444" />;
      case 'info':
        return <Info size={20} color="#3B82F6" />;
      default:
        return <CheckCircle2 size={20} color="#10B981" />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      backgroundColor: '#081B32',
      color: '#FFFFFF',
      border: '1px solid #D6A32D',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4), 0 0 15px rgba(214, 163, 45, 0.25)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 2000,
      maxWidth: '380px',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      {getIcon()}
      <span style={{ fontSize: '0.88rem', fontWeight: 500, lineHeight: 1.4 }}>
        {toast.message}
      </span>
    </div>
  );
};

export default Toast;
