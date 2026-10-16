import React, { useState } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';

const SizeGuideModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('kurtis');
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(8, 27, 50, 0.75)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        maxWidth: '750px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        border: '1px solid #D6A32D',
        padding: '28px',
        animation: 'fadeIn 0.25s ease-out'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#FDF6E3',
              color: '#D6A32D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ruler size={20} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#102D50', margin: 0 }}>
                AGAM Master Weavers Size Chart
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0 }}>
                Precision measurements for traditional drapes & stitched ensembles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#102D50', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0 16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: 'kurtis', label: 'Women\'s Kurtis & Suits' },
              { id: 'sarees', label: 'Sarees & Blouses' },
              { id: 'mens', label: 'Men\'s Kurta & Dhoti' },
              { id: 'kids', label: 'Kids\' Pattu Pavadai' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  backgroundColor: activeTab === tab.id ? '#102D50' : '#F8FAFC',
                  color: activeTab === tab.id ? '#F0C96A' : '#475569',
                  border: activeTab === tab.id ? '1px solid #D6A32D' : '1px solid #E2E8F0',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', border: '1px solid #CBD5E1', borderRadius: '6px', overflow: 'hidden' }}>
            <button
              onClick={() => setUnit('in')}
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                backgroundColor: unit === 'in' ? '#D6A32D' : '#FFFFFF',
                color: unit === 'in' ? '#081B32' : '#64748B'
              }}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                backgroundColor: unit === 'cm' ? '#D6A32D' : '#FFFFFF',
                color: unit === 'cm' ? '#081B32' : '#64748B'
              }}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'kurtis' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#102D50', color: '#F0C96A' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Standard Size</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Bust ({unit})</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Waist ({unit})</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Hip ({unit})</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Shoulder ({unit})</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Kurta Length ({unit})</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: 'S (36)', bustIn: '36', waistIn: '32', hipIn: '38', shIn: '14.0', lenIn: '46' },
                  { size: 'M (38)', bustIn: '38', waistIn: '34', hipIn: '40', shIn: '14.5', lenIn: '46' },
                  { size: 'L (40)', bustIn: '40', waistIn: '36', hipIn: '42', shIn: '15.0', lenIn: '47' },
                  { size: 'XL (42)', bustIn: '42', waistIn: '38', hipIn: '44', shIn: '15.5', lenIn: '47' },
                  { size: 'XXL (44)', bustIn: '44', waistIn: '40', hipIn: '46', shIn: '16.0', lenIn: '48' }
                ].map((row, idx) => {
                  const toCm = (val) => Math.round(parseFloat(val) * 2.54);
                  return (
                    <tr key={row.size} style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700, color: '#102D50' }}>{row.size}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>{unit === 'in' ? row.bustIn : toCm(row.bustIn)}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>{unit === 'in' ? row.waistIn : toCm(row.waistIn)}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>{unit === 'in' ? row.hipIn : toCm(row.hipIn)}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>{unit === 'in' ? row.shIn : toCm(row.shIn)}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>{unit === 'in' ? row.lenIn : toCm(row.lenIn)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'sarees' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
            <div style={{ padding: '14px', backgroundColor: '#FDF6E3', borderRadius: '8px', border: '1px solid #D6A32D' }}>
              <h4 style={{ color: '#102D50', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="#D6A32D" /> Pure Silk Saree Standard Specifications:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: 1.6 }}>
                <li><strong>Saree Length:</strong> 5.5 meters standard drape + 0.8 meters unstitched running blouse fabric (Total 6.3 meters).</li>
                <li><strong>Saree Width:</strong> 44 to 45 inches (suitable for all heights up to 6 feet).</li>
                <li><strong>Blouse Piece:</strong> Included in pure matching silk with rich zari sleeve borders.</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#102D50', margin: '10px 0 6px' }}>Readymade Stitched Blouse Sizes:</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#102D50', color: '#F0C96A' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>Blouse Size</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center' }}>Bust ({unit})</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center' }}>Underbust ({unit})</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center' }}>Margin Inside</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: '34 (XS)', bust: '34', under: '28' },
                    { size: '36 (S)', bust: '36', under: '30' },
                    { size: '38 (M)', bust: '38', under: '32' },
                    { size: '40 (L)', bust: '40', under: '34' },
                    { size: '42 (XL)', bust: '42', under: '36' }
                  ].map(r => (
                    <tr key={r.size} style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 700 }}>{r.size}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }}>{r.bust}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }}>{r.under}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', color: '#10B981', fontWeight: 600 }}>2 inches margin included</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'mens' && (
          <div style={{ fontSize: '0.85rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#102D50', color: '#F0C96A' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Kurta Size</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Chest ({unit})</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Shoulder ({unit})</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Length ({unit})</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Matching Dhoti/Veshti</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: '38 (S)', chest: '40', sh: '17.5', len: '40', veshti: '4 Mulam / 8 Mulam Double' },
                  { size: '40 (M)', chest: '42', sh: '18.0', len: '41', veshti: '8 Mulam Double Kasavu' },
                  { size: '42 (L)', chest: '44', sh: '18.5', len: '42', veshti: '8 Mulam Double Kasavu' },
                  { size: '44 (XL)', chest: '46', sh: '19.0', len: '43', veshti: '8 Mulam Double Kasavu' },
                  { size: '46 (XXL)', chest: '48', sh: '19.5', len: '43', veshti: '8 Mulam Double Kasavu' }
                ].map(r => (
                  <tr key={r.size} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700 }}>{r.size}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>{r.chest}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>{r.sh}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>{r.len}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: '#D6A32D', fontWeight: 600 }}>{r.veshti}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'kids' && (
          <div style={{ fontSize: '0.85rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#102D50', color: '#F0C96A' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Age Group</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Chest ({unit})</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Skirt Length ({unit})</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Waist Elastic</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { age: '2 - 3 Years', chest: '22', skirt: '20' },
                  { age: '4 - 5 Years', chest: '24', skirt: '24' },
                  { age: '6 - 7 Years', chest: '26', skirt: '28' },
                  { age: '8 - 9 Years', chest: '28', skirt: '32' },
                  { age: '10 - 11 Years', chest: '30', skirt: '36' }
                ].map(r => (
                  <tr key={r.age} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700 }}>{r.age}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>{r.chest}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>{r.skirt}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: '#10B981', fontWeight: 600 }}>Soft stretch elastic with dori</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Measuring Guide Tip */}
        <div style={{ marginTop: '20px', padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #D6A32D', fontSize: '0.8rem', color: '#475569' }}>
          <strong>Pro Weavers Tip:</strong> Keep the tape comfortably loose over the fullest part of your bust/chest. All AGAM stitched garments feature a 2-inch internal fabric margin allowing easy local alteration if required.
        </div>

      </div>
    </div>
  );
};

export default SizeGuideModal;
