import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, User } from 'lucide-react';
// import api from '../api';
import ProfileModal from '../components/ProfileModal';

export default function NodesPage() {
  const [nodes, setNodes] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated fetch from API
    setNodes([
      { id: 1, name: 'Arduino-Front', status: 'Online', battery: '85%' },
      { id: 2, name: 'Arduino-Rear', status: 'Offline', battery: '10%' },
      { id: 3, name: 'Raspberry-Core', status: 'Online', battery: '100%' }
    ]);
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
      <header className="flex-between" style={{ marginBottom: '3rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Cpu color="var(--accent-blue)" /> Your Robots
        </h1>
        <div style={{ position: 'relative' }}>
          <button 
            style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)' }}
            onClick={() => setShowProfile(!showProfile)}
          >
            <User color="white" />
          </button>
          {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {nodes.map(node => (
          <div 
            key={node.id} 
            className="glass-panel" 
            style={{ cursor: 'pointer', borderTop: `4px solid ${node.status === 'Online' ? 'var(--accent-green)' : 'var(--accent-red)'}` }}
            onClick={() => navigate(`/dashboard/${node.id}`)}
          >
            <h2 style={{ marginBottom: '0.5rem' }}>{node.name}</h2>
            <div style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Status: <span style={{ color: node.status === 'Online' ? 'var(--accent-green)' : 'var(--accent-red)' }}>{node.status}</span></div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Battery: {node.battery}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

