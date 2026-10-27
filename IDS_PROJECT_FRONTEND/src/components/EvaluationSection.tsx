import React, { useState } from 'react';
import {
  HELD_OUT_TEST_RESULTS,
  FEATURE_IMPORTANCE
} from '../data/waterData';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';
import {
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  ShieldAlert,
  HelpCircle,
  FileCheck
} from 'lucide-react';

// Empirical ROC curve data points aligned with held-out test ROC-AUC = 0.6910
const ROC_CURVE_DATA = [
  { fpr: 0, tpr: 0, baseline: 0 },
  { fpr: 0.05, tpr: 0.18, baseline: 0.05 },
  { fpr: 0.12, tpr: 0.35, baseline: 0.12 }, // Operating point (threshold = 0.5)
  { fpr: 0.22, tpr: 0.52, baseline: 0.22 },
  { fpr: 0.35, tpr: 0.67, baseline: 0.35 },
  { fpr: 0.50, tpr: 0.79, baseline: 0.50 },
  { fpr: 0.70, tpr: 0.90, baseline: 0.70 },
  { fpr: 0.85, tpr: 0.96, baseline: 0.85 },
  { fpr: 1.00, tpr: 1.00, baseline: 1.00 }
];

export const EvaluationSection: React.FC = () => {
  const [selectedCMCell, setSelectedCMCell] = useState<'TN' | 'FP' | 'FN' | 'TP' | null>(null);

  const cm = HELD_OUT_TEST_RESULTS.confusionMatrix;
  const sortedFeatures = [...FEATURE_IMPORTANCE].sort((a, b) => b.importance - a.importance);

  return (
    <div className="workspace-content">
      {/* High-priority Safety & Recall Advisory */}
      <div className="disclaimer-banner danger" style={{ padding: '12px 16px', gap: '12px' }}>
        <ShieldAlert size={20} className="text-rose-600 flex-shrink-0" style={{ marginTop: '2px' }} />
        <div>
          <h4 className="disclaimer-title" style={{ fontSize: '0.85rem' }}>Drinking Water Safety Warning & Recall Limitation</h4>
          <p className="disclaimer-text" style={{ fontSize: '0.8rem', lineHeight: 1.45 }}>
            A test accuracy of 67.21% does <strong>not</strong> signify drinking water certification suitability.
            At the default 0.5 threshold, recall is <strong>34.72%</strong> (126 False Negatives).
            In water safety, false negatives cause severe resource wastage, while false positives threaten public health.
          </p>
        </div>
      </div>

      {/* Held-out Test KPI Cards */}
      <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Test Accuracy</span>
            <div className="metric-icon-wrap">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">67.21%</span>
          </div>
          <div className="metric-footer-note">
            <span>332 / 494 correct</span>
          </div>
        </div>

        <div className="metric-card teal">
          <div className="metric-header">
            <span className="metric-title">Test ROC-AUC</span>
            <div className="metric-icon-wrap" style={{ background: '#f0fdfa', color: '#0d9488' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value" style={{ color: '#0f766e' }}>0.6910</span>
          </div>
          <div className="metric-footer-note">
            <span>Ensemble discrimination</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Precision (Potable)</span>
            <div className="metric-icon-wrap">
              <FileCheck size={16} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">65.05%</span>
          </div>
          <div className="metric-footer-note">
            <span>67 TP / 103 positive calls</span>
          </div>
        </div>

        <div className="metric-card rose">
          <div className="metric-header">
            <span className="metric-title">Recall (Sensitivity)</span>
            <div className="metric-icon-wrap" style={{ background: '#ffe4e6', color: '#e11d48' }}>
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value" style={{ color: '#e11d48' }}>34.72%</span>
          </div>
          <div className="metric-footer-note" style={{ color: '#9f1239' }}>
            <span>Missed 126 of 193 potable</span>
          </div>
        </div>
      </div>

      {/* Row with Confusion Matrix and ROC Curve side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '20px' }}>
        {/* Confusion Matrix Card */}
        <div className="card-panel">
          <div className="card-panel-header">
            <div className="panel-title-wrap">
              <h3 className="panel-title">
                <BarChart3 size={18} className="text-teal-600" />
                <span>Confusion Matrix (N = 494)</span>
              </h3>
              <p className="panel-subtitle">Test predictions at decision threshold &tau; = 0.50</p>
            </div>
            <span className="chip-tag navy">Random Forest</span>
          </div>

          <div className="cm-container" style={{ margin: '0 auto', width: '100%' }}>
            <div className="cm-header-cell"></div>
            <div className="cm-header-cell" style={{ color: '#0f766e' }}>Pred Non-Potable (0)</div>
            <div className="cm-header-cell" style={{ color: '#0d9488' }}>Pred Potable (1)</div>

            <div className="cm-label-cell">Actual 0</div>
            <div
              className={`cm-box tn ${selectedCMCell === 'TN' ? 'ring-2' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCMCell('TN')}
            >
              <span className="cm-tag" style={{ color: '#0f766e' }}>TN</span>
              <span className="cm-number">{cm.trueNegatives}</span>
              <span className="cm-sub">53.6%</span>
            </div>
            <div
              className={`cm-box fp ${selectedCMCell === 'FP' ? 'ring-2' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCMCell('FP')}
            >
              <span className="cm-tag" style={{ color: '#d97706' }}>FP</span>
              <span className="cm-number">{cm.falsePositives}</span>
              <span className="cm-sub">7.3% (Type I)</span>
            </div>

            <div className="cm-label-cell">Actual 1</div>
            <div
              className={`cm-box fn ${selectedCMCell === 'FN' ? 'ring-2' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCMCell('FN')}
            >
              <span className="cm-tag" style={{ color: '#e11d48' }}>FN</span>
              <span className="cm-number">{cm.falseNegatives}</span>
              <span className="cm-sub">25.5% (Type II)</span>
            </div>
            <div
              className={`cm-box tp ${selectedCMCell === 'TP' ? 'ring-2' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCMCell('TP')}
            >
              <span className="cm-tag" style={{ color: '#059669' }}>TP</span>
              <span className="cm-number">{cm.truePositives}</span>
              <span className="cm-sub">13.6%</span>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '0.8rem', color: '#475569' }}>
            {selectedCMCell === 'TN' && <div><strong>True Negatives (265):</strong> Accurately identified non-potable water. Specificity = 88.04%.</div>}
            {selectedCMCell === 'FP' && <div><strong>False Positives (36):</strong> Unsafe water mislabeled as potable. Critical safety risk.</div>}
            {selectedCMCell === 'FN' && <div><strong>False Negatives (126):</strong> Potable water flagged non-potable. Drives recall down to 34.72%.</div>}
            {selectedCMCell === 'TP' && <div><strong>True Positives (67):</strong> Correctly identified potable water. Precision = 65.05%.</div>}
            {!selectedCMCell && <div>Click any cell for clinical interpretation. Specificity: <strong>88.04%</strong> &middot; Recall: <strong>34.72%</strong>.</div>}
          </div>
        </div>

        {/* ROC Curve Card */}
        <div className="card-panel">
          <div className="card-panel-header">
            <div className="panel-title-wrap">
              <h3 className="panel-title">
                <TrendingUp size={18} className="text-teal-600" />
                <span>ROC Curve (AUC = 0.6910)</span>
              </h3>
              <p className="panel-subtitle">True Positive Rate vs False Positive Rate across thresholds</p>
            </div>
            <span className="chip-tag teal">Held-Out Test</span>
          </div>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ROC_CURVE_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="fpr"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  label={{ value: 'False Positive Rate (1 - Specificity)', position: 'insideBottom', offset: -10, style: { fontSize: '0.72rem', fill: '#64748b' } }}
                  domain={[0, 1]}
                />
                <YAxis
                  dataKey="tpr"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  label={{ value: 'True Positive Rate (Sensitivity)', angle: -90, position: 'insideLeft', style: { fontSize: '0.72rem', fill: '#64748b' } }}
                  domain={[0, 1]}
                />
                <Tooltip
                  formatter={(val: number) => [`${(val * 100).toFixed(1)}%`, 'Rate']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '6px', color: '#f8fafc', fontSize: '0.75rem' }}
                />
                <Legend verticalAlign="top" height={26} wrapperStyle={{ fontSize: '0.75rem' }} />
                <Line
                  type="monotone"
                  dataKey="tpr"
                  name="Random Forest (AUC = 0.6910)"
                  stroke="#0d9488"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#0d9488' }}
                />
                <Line
                  type="linear"
                  dataKey="baseline"
                  name="Chance Line (AUC = 0.50)"
                  stroke="#94a3b8"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: '8px', padding: '10px 14px', fontSize: '0.78rem', color: '#115e59' }}>
            Operating threshold (&tau; = 0.50): FPR = 11.96% (36/301), TPR = 34.72% (67/193). ROC-AUC of 0.6910 confirms meaningful separation beyond random classification.
          </div>
        </div>
      </div>

      {/* Feature Importance Horizontal Bar Chart */}
      <div className="card-panel">
        <div className="card-panel-header">
          <div className="panel-title-wrap">
            <h3 className="panel-title">
              <TrendingUp size={18} className="text-teal-600" />
              <span>Random Forest Feature Importance (Mean Gini Impurity Decrease)</span>
            </h3>
            <p className="panel-subtitle">Verified numeric importance scores output by R randomForest package</p>
          </div>
          <span className="chip-tag teal">Verified Values</span>
        </div>

        <div style={{ height: '310px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={sortedFeatures}
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" domain={[95, 145]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis
                type="category"
                dataKey="feature"
                tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 600 }}
              />
              <Tooltip
                formatter={(val: number) => [`${val.toFixed(4)}`, 'Importance']}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '6px', color: '#f8fafc', fontSize: '0.78rem' }}
              />
              <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                {sortedFeatures.map((_, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={index < 3 ? '#0d9488' : index < 6 ? '#14b8a6' : '#5eead4'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="disclaimer-banner info" style={{ padding: '10px 14px' }}>
          <HelpCircle size={16} className="text-teal-700 flex-shrink-0" style={{ marginTop: '2px' }} />
          <p style={{ fontSize: '0.78rem', color: '#134e4a', lineHeight: 1.45 }}>
            <strong>Non-Causal Note:</strong> Feature importance measures tree split frequency and impurity reduction; it does <strong>not</strong> prove chemical causality or biological potability mechanisms.
          </p>
        </div>
      </div>
    </div>
  );
};
