import React from 'react';
import { Play, FastForward, Rewind, Pause } from 'lucide-react';

export default function ReplayPanel() {
  return (
    <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 className="title">Session Replay</h2>
      <div style={{ padding: '1rem 0' }}>
        <input type="range" style={{ width: '100%', accentColor: 'var(--accent-blue)' }} />
        <div className="flex-between" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          <span>00:00:00</span>
          <span>01:15:30</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: 'auto' }}>
        <button style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}><Rewind size={20}/></button>
        <button style={{ padding: '0.5rem', borderRadius: '50%', background: 'var(--accent-blue)', color: 'white' }}><Play size={20}/></button>
        <button style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}><FastForward size={20}/></button>
        <select style={{ background: 'transparent', color: 'white', border: '1px solid var(--panel-border)', borderRadius: '4px', padding: '0.2rem' }}>
          <option value="0.5" style={{ background: '#0a0a0c' }}>0.5x</option>
          <option value="1" selected style={{ background: '#0a0a0c' }}>1.0x</option>
          <option value="2" style={{ background: '#0a0a0c' }}>2.0x</option>
        </select>
      </div>
    </div>
  );
}
