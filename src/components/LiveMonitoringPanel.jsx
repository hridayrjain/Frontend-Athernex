import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const topicInfo = {
  Distance: { topicName: 'distance/front', unit: 'cm', color: '#3b82f6', thresholdMin: 10, thresholdMax: 200 },
  Tilt: { topicName: 'tilt/x', unit: 'degrees', color: '#f59e0b', thresholdMin: -45, thresholdMax: 45 },
  Temp: { topicName: 'temperature/engine', unit: '°C', color: '#10b981', thresholdMin: 20, thresholdMax: 110 }
};

export default function LiveMonitoringPanel() {
  const [timeLabels, setTimeLabels] = useState(Array.from({length: 60}, (_, i) => `${60 - i}s ago`).reverse());
  const [dataDistance, setDataDistance] = useState(Array.from({length: 60}, () => Math.random() * 100));
  const [dataTilt, setDataTilt] = useState(Array.from({length: 60}, () => Math.random() * 50));
  const [dataTemp, setDataTemp] = useState(Array.from({length: 60}, () => Math.random() * 80));
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataDistance(prev => [...prev.slice(1), Math.random() * 100]);
      setDataTilt(prev => [...prev.slice(1), Math.random() * 50]);
      setDataTemp(prev => [...prev.slice(1), Math.random() * 80]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Make sure clicking anywhere outside clears the selection
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.canvas-container') && !e.target.closest('.stats-overlay')) {
        setSelectedPoint(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getOptions = (chartId, title, color, topicData) => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    scales: {
      y: { 
        grid: { color: 'rgba(255,255,255,0.05)' }, 
        ticks: { color: '#94a3b8' },
        title: { display: true, text: 'Value', color: '#94a3b8' }
      },
      x: { 
        grid: { display: false }, 
        ticks: { color: '#94a3b8', maxTicksLimit: 10 },
        title: { display: true, text: 'Time', color: '#94a3b8' }
      }
    },
    plugins: {
      legend: { display: false },
      title: { display: true, text: title, color, font: { size: 16 } }
    },
    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const val = chart.data.datasets[0].data[index];
        const time = chart.data.labels[index];
        setSelectedPoint({
          ...topicData,
          chartId,
          value: val.toFixed(2),
          time: time
        });
      } else {
        setSelectedPoint(null);
      }
    }
  });

  const renderOverlay = (chartId) => {
    if (selectedPoint && selectedPoint.chartId === chartId) {
      return (
        <div className="stats-overlay" style={{
          position: 'absolute',
          top: '0',
          right: '1rem',
          background: 'rgba(20, 20, 25, 0.95)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${selectedPoint.color}`,
          padding: '1.25rem',
          borderRadius: 'var(--radius-sm)',
          zIndex: 10,
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          minWidth: '220px'
        }}>
          <h3 style={{ color: selectedPoint.color, margin: '0 0 0.75rem 0', fontSize: '1.1rem' }}>{selectedPoint.topicName}</h3>
          <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div className="flex-between"><span style={{ color: 'var(--text-secondary)' }}>Time:</span> <span>{selectedPoint.time}</span></div>
            <div className="flex-between"><span style={{ color: 'var(--text-secondary)' }}>Value:</span> <span style={{ fontWeight: 'bold' }}>{selectedPoint.value} {selectedPoint.unit}</span></div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--panel-border)', margin: '0.25rem 0' }} />
            <div className="flex-between"><span style={{ color: 'var(--text-secondary)' }}>Min Thresh:</span> <span>{selectedPoint.thresholdMin}</span></div>
            <div className="flex-between"><span style={{ color: 'var(--text-secondary)' }}>Max Thresh:</span> <span>{selectedPoint.thresholdMax}</span></div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getDatasetStyle = (baseColor, topicData) => ({
    borderColor: baseColor,
    backgroundColor: `${baseColor}1A`, // roughly 10% opacity
    fill: true,
    tension: 0.4,
    pointHitRadius: 15,
    pointBackgroundColor: (context) => {
      const val = context.raw;
      if (val < topicData.thresholdMin || val > topicData.thresholdMax) return '#ef4444';
      return baseColor;
    },
    pointBorderColor: (context) => {
      const val = context.raw;
      if (val < topicData.thresholdMin || val > topicData.thresholdMax) return '#ef4444';
      return baseColor;
    },
    pointRadius: (context) => {
      const val = context.raw;
      if (val < topicData.thresholdMin || val > topicData.thresholdMax) return 5;
      return 3;
    }
  });

  return (
    <div className="glass-panel" style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 className="title"><Activity size={20}/> Live Monitoring</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="canvas-container" style={{ height: '250px', position: 'relative' }}>
          {renderOverlay('distance')}
          <Line 
            data={{ labels: timeLabels, datasets: [{ data: dataDistance, ...getDatasetStyle('#3b82f6', topicInfo.Distance) }] }} 
            options={getOptions('distance', 'Distance Sensor', '#3b82f6', topicInfo.Distance)} 
          />
        </div>
        <div className="canvas-container" style={{ height: '250px', position: 'relative' }}>
          {renderOverlay('tilt')}
          <Line 
            data={{ labels: timeLabels, datasets: [{ data: dataTilt, ...getDatasetStyle('#f59e0b', topicInfo.Tilt) }] }} 
            options={getOptions('tilt', 'Tilt Sensor (X-Axis)', '#f59e0b', topicInfo.Tilt)} 
          />
        </div>
        <div className="canvas-container" style={{ height: '250px', position: 'relative' }}>
          {renderOverlay('temp')}
          <Line 
            data={{ labels: timeLabels, datasets: [{ data: dataTemp, ...getDatasetStyle('#10b981', topicInfo.Temp) }] }} 
            options={getOptions('temp', 'Engine Temperature', '#10b981', topicInfo.Temp)} 
          />
        </div>
      </div>
    </div>
  );
}
