import React, { useState } from 'react';

export default function ProfileModal({ onClose }) {
  const [apiKey, setApiKey] = useState(localStorage.getItem('brokerApiKey') || '');

  const handleSave = () => {
    localStorage.setItem('brokerApiKey', apiKey);
    onClose();
  };

  return (
    <div style={{
      position: 'absolute',
      top: '3rem',
      right: '0',
      background: 'var(--panel-bg)',
      backdropFilter: 'blur(16px)',
      border: '1px solid var(--panel-border)',
      padding: '1.5rem',
      borderRadius: 'var(--radius-lg)',
      width: '300px',
      zIndex: 100,
      boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
    }}>
      <h3 style={{ marginBottom: '1rem', color: 'white' }}>Profile Settings</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Go Broker API Key</label>
        <input 
          type="password" 
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter API Key"
          style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: 'var(--radius-sm)' }}
        />
        <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={handleSave}>
          Save Key
        </button>
      </div>
    </div>
  );
}
