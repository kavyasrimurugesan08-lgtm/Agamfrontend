import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const WhatsAppButton = () => {
  const { siteSettings } = useShop();
  const phone = siteSettings?.supportPhone?.replace(/[^0-9]/g, '') || '919876543210';
  const whatsappUrl = `https://wa.me/${phone}?text=Hello%20AGAM%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20pure%20silk%20and%20ethnic%20collections.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Support"
      style={{
        position: 'fixed',
        bottom: '85px',
        right: '24px',
        zIndex: 90,
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(37, 211, 102, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.4)';
      }}
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
