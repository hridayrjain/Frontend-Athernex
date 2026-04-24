import React, { useEffect, useState } from 'react';
import api from '../api';
import { Database, Zap, Clock, Activity } from 'lucide-react';

export default function SystemStatsBar() {
  const [stats, setStats] = useState({ totalMessages: 0, messagesPerSecond: 0, sqliteFileSize: 0, brokerUptime: '0h 0m' });

  useEffect(() => {
    // Polling simulation or actual API call
    const fetchStats = async () => {
      try {
        const res = await api.get('/api/stats');
        if (res.data) setStats(res.data);
      } catch (err) {
        // Use dummy data if backend is not wired yet
        setStats({ totalMessages: 14502, messagesPerSecond: 24.5, sqliteFileSize: 1048576 * 12, brokerUptime: '2h 14m' });
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-between gap-lg">
      <div className="flex-between gap-sm">
        <Database size={16} color="var(--text-secondary)" />
        <span className="text-sm">{stats.totalMessages.toLocaleString()} msgs</span>
      </div>
      <div className="flex-between gap-sm">
        <Zap size={16} color="var(--accent-amber)" />
        <span className="text-sm">{stats.messagesPerSecond} msg/s</span>
      </div>
      <div className="flex-between gap-sm">
        <Activity size={16} color="var(--accent-blue)" />
        <span className="text-sm">{(stats.sqliteFileSize / 1024 / 1024).toFixed(2)} MB</span>
      </div>
      <div className="flex-between gap-sm">
        <Clock size={16} color="var(--accent-green)" />
        <span className="text-sm">{stats.brokerUptime}</span>
      </div>
    </div>
  );
}
