import React from 'react';
import {
  DATASET_METRICS,
  HELD_OUT_TEST_RESULTS
} from '../data/waterData';
import {
  Database,
  Award,
  TrendingUp,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const POTABILITY_DATA = [
  { name: 'Non-Potable (Label 0)', value: 1998, color: '#334155', percent: '61.0%' },
  { name: 'Potable (Label 1)', value: 1278, color: '#0d9488', percent: '39.0%' }
];

export const OverviewSection: React.FC = () => {
  return (
    <div className="workspace-content">
      {/* Compact Academic & Recall Limitation Notice */}
      <div className="disclaimer-banner danger" style={{ padding: '12px 16px', gap: '12px' }}>
        <AlertTriangle size={20} className="text-rose-600 flex-shrink-0" style={{ marginTop: '2px' }} />
        <div>
          <h4 className="disclaimer-title" style={{ fontSize: '0.85rem' }}>
            Academic Model & Recall Limitation Notice
          </h4>
          <p className="disclaimer-text" style={{ fontSize: '0.8rem', lineHeight: 1.45 }}>
            AquaSentinel is an academic case study predicting nominal dataset labels, <strong>not certifying drinking-water safety</strong>.
            At the standard 0.5 threshold, test recall is limited to <strong>34.72%</strong>, misclassifying <strong>126 potable-labelled test samples</strong> as non-potable.
          </p>
        </div>
      </div>

      {/* Exactly 4 Primary KPI Cards */}
      <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {/* 1. Dataset Records */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Dataset Records</span>
            <div className="metric-icon-wrap">
              <Database size={16} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">{DATASET_METRICS.totalRecords.toLocaleString()}</span>
          </div>
          <div className="metric-footer-note">
            <span>3,276 samples &middot; 9 predictors</span>
          </div>
        </div>

        {/* 2. Selected Model */}
        <div className="metric-card navy">
          <div className="metric-header">
            <span className="metric-title">Selected Model</span>
            <div className="metric-icon-wrap" style={{ background: '#e0e7ff', color: '#4338ca' }}>
              <Award size={16} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value" style={{ fontSize: '1.6rem' }}>Random Forest</span>
          </div>
          <div className="metric-footer-note">
            <span>Selected by Validation ROC-AUC</span>
          </div>
        </div>

        {/* 3. Test Accuracy */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Test Accuracy</span>
            <div className="metric-icon-wrap">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">{(HELD_OUT_TEST_RESULTS.accuracy * 100).toFixed(2)}%</span>
          </div>
          <div className="metric-footer-note">
            <span>332 / 494 held-out test predictions</span>
          </div>
        </div>

        {/* 4. ROC-AUC */}
        <div className="metric-card teal">
          <div className="metric-header">
            <span className="metric-title">ROC-AUC</span>
            <div className="metric-icon-wrap" style={{ background: '#f0fdfa', color: '#0d9488' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value" style={{ color: '#0f766e' }}>0.691</span>
          </div>
          <div className="metric-footer-note">
            <span>Held-out test discrimination</span>
          </div>
        </div>
      </div>

      {/* One Clear Potability Distribution Chart Card */}
      <div className="card-panel" style={{ padding: '20px 24px' }}>
        <div className="card-panel-header" style={{ paddingBottom: '10px' }}>
          <div className="panel-title-wrap">
            <h3 className="panel-title" style={{ fontSize: '1.05rem' }}>
              <span>Potability Class Distribution (N = 3,276)</span>
            </h3>
            <p className="panel-subtitle">
              Ground truth class balance across the Kaggle Water Potability benchmark
            </p>
          </div>
          <span className="chip-tag navy" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
            61.0% : 39.0%
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'center' }}>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={POTABILITY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {POTABILITY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val.toLocaleString()} samples (${((val / 3276) * 100).toFixed(1)}%)`, 'Count']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '6px', color: '#f8fafc', fontSize: '0.78rem' }}
                />
                <Legend verticalAlign="bottom" height={28} iconType="circle" wrapperStyle={{ fontSize: '0.8rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Non-Potable (Label 0)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#334155' }}>1,998 samples</div>
              </div>
              <span className="chip-tag navy" style={{ background: '#f1f5f9' }}>61.0%</span>
            </div>

            <div style={{ background: '#f0fdfa', padding: '12px 16px', borderRadius: '8px', border: '1px solid #99f6e4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#0f766e', fontWeight: 600, textTransform: 'uppercase' }}>Potable (Label 1)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0d9488' }}>1,278 samples</div>
              </div>
              <span className="chip-tag teal">39.0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
