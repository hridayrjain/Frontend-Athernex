import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AnomalyLog() {
  const logs = [
    { time: '10:45:02', topic: 'tilt/x', val: 50, thresh: 45 },
    { time: '10:42:15', topic: 'distance', val: 5, thresh: 10 }
  ];

  return (
    <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 className="title" style={{ color: 'var(--accent-amber)' }}>
        <AlertTriangle size={20} /> Anomaly Log
      </h2>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {logs.map((log, i) => (
          <div key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--panel-border)', cursor: 'pointer' }} className="log-item">
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{log.time}</div>
            <div style={{ fontSize: '0.9rem' }}>
              <span style={{ color: 'white' }}>{log.topic}</span> breached {log.thresh} (was {log.val})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
