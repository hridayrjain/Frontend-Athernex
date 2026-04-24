import React, { useState, useEffect } from 'react';
import api from '../api';
import { Search } from 'lucide-react';

export default function TopicExplorerSidebar() {
  const [topics, setTopics] = useState([]);
  
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get('/api/topics');
        if (res.data) setTopics(res.data);
      } catch (e) {
        setTopics([
          { topicName: 'distance/front', min: 10, max: 200, avg: 120, color: 'var(--accent-blue)' },
          { topicName: 'tilt/x', min: -45, max: 45, avg: 2.5, color: 'var(--accent-amber)' },
          { topicName: 'temperature/engine', min: 20, max: 110, avg: 85, color: 'var(--accent-green)' }
        ]);
      }
    };
    fetchTopics();
  }, []);

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="title">Topics</h2>
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          placeholder="Filter topics..." 
          style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
        {topics.map(t => (
          <div key={t.topicName} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${t.color}` }}>
            <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{t.topicName}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Min: {t.min}</span>
              <span>Avg: {t.avg}</span>
              <span>Max: {t.max}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
