import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SystemStatsBar from '../components/SystemStatsBar';
import ExportPanel from '../components/ExportPanel';
import TopicExplorerSidebar from '../components/TopicExplorerSidebar';
import LiveMonitoringPanel from '../components/LiveMonitoringPanel';
import ReplayPanel from '../components/ReplayPanel';
import NodeHealthPanel from '../components/NodeHealthPanel';
import AnomalyLog from '../components/AnomalyLog';
import AIAnalysisPanel from '../components/AIAnalysisPanel';
import { Activity, ArrowLeft } from 'lucide-react';

export default function DashboardPage() {
  const { nodeId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header className="top-bar glass-panel">
        <div className="title" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/nodes')} 
            style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
            title="Back to Robots"
          >
            <ArrowLeft size={20} color="white" />
          </button>
          <Activity size={24} color="var(--accent-blue)" />
          <span>Blackbox - Node {nodeId}</span>
        </div>
        <SystemStatsBar />
        <ExportPanel />
      </header>
      
      <aside className="sidebar-left">
        <TopicExplorerSidebar />
      </aside>
      
      <main className="main-content">
        <LiveMonitoringPanel />
        <ReplayPanel />
      </main>
      
      <aside className="sidebar-right">
        <NodeHealthPanel />
        <AnomalyLog />
        <AIAnalysisPanel />
      </aside>
    </div>
  );
}
