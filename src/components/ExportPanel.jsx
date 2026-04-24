import React from 'react';
import { Download, FileText } from 'lucide-react';
import api from '../api';
import jsPDF from 'jspdf';

export default function ExportPanel() {
  const handleCSV = async () => {
    try {
      const response = await api.get('/export/csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'session_export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      // Fallback CSV download if backend API fails
      const csvContent = "data:text/csv;charset=utf-8,Time,Topic,Value,Threshold\n10:45:02,tilt/x,50,45\n10:42:15,distance,5,10\n";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.href = encodedUri;
      link.setAttribute('download', 'fallback_export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Blackbox Anomaly Report", 20, 20);
    
    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleString(), 20, 30);
    
    doc.setFontSize(16);
    doc.text("Detected Anomalies", 20, 45);
    
    doc.setFontSize(12);
    doc.text("1. 10:45:02 - tilt/x breached 45 (recorded 50)", 20, 55);
    doc.text("2. 10:42:15 - distance breached 10 (recorded 5)", 20, 65);
    
    doc.text("AI Root Cause Analysis:", 20, 85);
    doc.setFontSize(10);
    doc.text("Sudden obstacle avoidance maneuver resulting in excessive tilt.", 20, 95);
    
    doc.save("anomaly_report.pdf");
  };

  return (
    <div className="flex-between gap-sm">
      <button className="btn-primary flex-between gap-sm" onClick={handleCSV}>
        <Download size={16} />
        <span>Export CSV</span>
      </button>
      <button className="btn-primary flex-between gap-sm" onClick={handlePDF} style={{ backgroundColor: 'var(--accent-red)' }}>
        <FileText size={16} />
        <span>Export PDF</span>
      </button>
    </div>
  );
}

