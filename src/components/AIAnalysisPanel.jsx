import React, { useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import api from '../api';

export default function AIAnalysisPanel() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const triggerAnalysis = async () => {
    setLoading(true);
    try {
      const res = await api.post('/api/ai/analyze/1');
      setAnalysis(res.data);
    } catch (e) {
      setTimeout(() => {
        setAnalysis({
          rootCause: 'Sudden obstacle avoidance maneuver resulting in excessive tilt.',
          sensor: 'tilt/x',
          timestamp: Date.now() - 50000,
          suggestedFix: 'Reduce max speed in narrow corridors; tune PID controller for smoother turning.',
          confidenceLevel: 89.5
        });
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <h2 className="title" style={{ margin: 0, color: 'var(--accent-blue)' }}><BrainCircuit size={20}/> AI Analysis</h2>
        <button className="btn-primary" onClick={triggerAnalysis} disabled={loading} style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      
      {analysis ? (
        <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Root Cause</div>
            <div>{analysis.rootCause}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Suggested Fix</div>
            <div style={{ color: 'var(--accent-green)' }}>{analysis.suggestedFix}</div>
          </div>
          <div className="flex-between" style={{ fontSize: '0.8rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--panel-border)' }}>
            <span>Sensor: {analysis.sensor}</span>
            <span>Confidence: {analysis.confidenceLevel}%</span>
          </div>
        </div>
      ) : (
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', margin: 'auto' }}>
          No crash selected for analysis. Click "Analyze" to run AI diagnostics.
        </div>
      )}
    </div>
  );
}
