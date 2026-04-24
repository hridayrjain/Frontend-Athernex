import React from 'react';
import { Cpu } from 'lucide-react';

export default function NodeHealthPanel() {
  const nodes = [
    { name: 'Arduino-Front', alive: true, lastSeen: 'just now', msgs: 420 },
    { name: 'Arduino-Rear', alive: false, lastSeen: '45s ago', msgs: 120 }
  ];

  return (
    <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 className="title"><Cpu size={20}/> Node Health</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {nodes.map(n => (
          <div key={n.name} style={{ 
            padding: '1rem', 
            background: n.alive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${n.alive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: 'var(--radius-sm)'
          }}>
            <div className="flex-between">
              <span style={{ fontWeight: 500 }}>{n.name}</span>
              <span style={{ 
                width: 10, height: 10, borderRadius: '50%', 
                background: n.alive ? 'var(--accent-green)' : 'var(--accent-red)',
                boxShadow: `0 0 10px ${n.alive ? 'var(--accent-green)' : 'var(--accent-red)'}`
              }}></span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Last seen: {n.lastSeen} | {n.msgs} msgs
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
