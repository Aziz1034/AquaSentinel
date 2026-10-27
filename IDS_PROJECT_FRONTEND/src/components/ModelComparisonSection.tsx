import React from 'react';
import { VALIDATION_RESULTS } from '../data/waterData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Award,
  TrendingUp,
  Scale
} from 'lucide-react';

const COMPARISON_CHART_DATA = [
  {
    metric: 'Accuracy',
    'Logistic Regression': +(VALIDATION_RESULTS.logisticRegression.accuracy * 100).toFixed(2),
    'Random Forest': +(VALIDATION_RESULTS.randomForest.accuracy * 100).toFixed(2)
  },
  {
    metric: 'Precision',
    'Logistic Regression': +(VALIDATION_RESULTS.logisticRegression.precision * 100).toFixed(2),
    'Random Forest': +(VALIDATION_RESULTS.randomForest.precision * 100).toFixed(2)
  },
  {
    metric: 'Recall',
    'Logistic Regression': +(VALIDATION_RESULTS.logisticRegression.recall * 100).toFixed(2),
    'Random Forest': +(VALIDATION_RESULTS.randomForest.recall * 100).toFixed(2)
  },
  {
    metric: 'F1-Score',
    'Logistic Regression': +(VALIDATION_RESULTS.logisticRegression.f1 * 100).toFixed(2),
    'Random Forest': +(VALIDATION_RESULTS.randomForest.f1 * 100).toFixed(2)
  },
  {
    metric: 'ROC-AUC',
    'Logistic Regression': +(VALIDATION_RESULTS.logisticRegression.rocAuc * 100).toFixed(2),
    'Random Forest': +(VALIDATION_RESULTS.randomForest.rocAuc * 100).toFixed(2)
  }
];

export const ModelComparisonSection: React.FC = () => {
  const lr = VALIDATION_RESULTS.logisticRegression;
  const rf = VALIDATION_RESULTS.randomForest;

  return (
    <div className="workspace-content">
      {/* Selection Decision Banner */}
      <div className="disclaimer-banner info">
        <Award size={22} className="text-teal-700 flex-shrink-0" style={{ marginTop: '2px' }} />
        <div>
          <h4 className="disclaimer-title">Decision Protocol: Validation ROC-AUC Governs Model Selection</h4>
          <p className="disclaimer-text">
            <strong>Random Forest was formally selected over Logistic Regression based on Validation ROC-AUC (0.6272 vs 0.4366).</strong>{' '}
            To prevent data snooping and maintain statistical validity, the held-out test set was kept completely untouched during model selection.
          </p>
        </div>
      </div>

      {/* Side-by-side metric comparison cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Logistic Regression Card */}
        <div className="card-panel" style={{ borderTop: '4px solid #94a3b8' }}>
          <div className="card-panel-header">
            <div className="panel-title-wrap">
              <h3 className="panel-title" style={{ color: '#475569' }}>
                <span>Logistic Regression</span>
              </h3>
              <p className="panel-subtitle">Generalized Linear Model (Baseline in R)</p>
            </div>
            <span className="chip-tag navy" style={{ background: '#f1f5f9' }}>Baseline Model</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>ACCURACY</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#334155' }}>{(lr.accuracy * 100).toFixed(2)}%</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>0.6122449</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>ROC-AUC</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#e11d48' }}>{(lr.rocAuc * 100).toFixed(2)}%</div>
              <div style={{ fontSize: '0.7rem', color: '#e11d48', fontWeight: 600 }}>0.4365512 (Sub-random)</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>PRECISION</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>{(lr.precision * 100).toFixed(1)}%</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>1.0000 (Artifact)</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>RECALL</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#e11d48' }}>{(lr.recall * 100).toFixed(2)}%</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>0.0052356 (1 / 191)</div>
            </div>
          </div>

          <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '6px', padding: '10px 14px', fontSize: '0.8rem', color: '#9f1239' }}>
            <strong>Majority Class Collapse:</strong> Logistic Regression predicted only 1 single sample as Potable in the entire validation set (which happened to be correct, giving 100% precision, but missing 190 out of 191 potable samples).
          </div>
        </div>

        {/* Random Forest Card */}
        <div className="card-panel" style={{ borderTop: '4px solid #0d9488' }}>
          <div className="card-panel-header">
            <div className="panel-title-wrap">
              <h3 className="panel-title" style={{ color: '#0f766e' }}>
                <Award size={18} />
                <span>Random Forest (Selected)</span>
              </h3>
              <p className="panel-subtitle">Ensemble Decision Trees (500 Trees in R)</p>
            </div>
            <span className="chip-tag teal">Validation Winner</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ background: '#f0fdfa', padding: '12px', borderRadius: '8px', border: '1px solid #99f6e4' }}>
              <div style={{ fontSize: '0.72rem', color: '#0f766e', fontWeight: 600 }}>ACCURACY</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f766e' }}>{(rf.accuracy * 100).toFixed(2)}%</div>
              <div style={{ fontSize: '0.7rem', color: '#115e59' }}>0.6224490</div>
            </div>
            <div style={{ background: '#f0fdfa', padding: '12px', borderRadius: '8px', border: '1px solid #99f6e4' }}>
              <div style={{ fontSize: '0.72rem', color: '#0f766e', fontWeight: 600 }}>ROC-AUC</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f766e' }}>{(rf.rocAuc * 100).toFixed(2)}%</div>
              <div style={{ fontSize: '0.7rem', color: '#0d9488', fontWeight: 700 }}>0.6272129 (+43.7% vs LR)</div>
            </div>
            <div style={{ background: '#f0fdfa', padding: '12px', borderRadius: '8px', border: '1px solid #99f6e4' }}>
              <div style={{ fontSize: '0.72rem', color: '#0f766e', fontWeight: 600 }}>PRECISION</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f766e' }}>{(rf.precision * 100).toFixed(2)}%</div>
              <div style={{ fontSize: '0.7rem', color: '#115e59' }}>0.5319149</div>
            </div>
            <div style={{ background: '#f0fdfa', padding: '12px', borderRadius: '8px', border: '1px solid #99f6e4' }}>
              <div style={{ fontSize: '0.72rem', color: '#0f766e', fontWeight: 600 }}>RECALL</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f766e' }}>{(rf.recall * 100).toFixed(2)}%</div>
              <div style={{ fontSize: '0.7rem', color: '#115e59' }}>0.2617801 (50 / 191)</div>
            </div>
          </div>

          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '6px', padding: '10px 14px', fontSize: '0.8rem', color: '#065f46' }}>
            <strong>Balanced Discrimination:</strong> Random Forest achieved an F1 of 0.3509 and ROC-AUC of 0.6272, proving its ability to extract non-linear decision boundaries where logistic regression failed.
          </div>
        </div>
      </div>

      {/* Grouped Bar Chart of All 5 Metrics */}
      <div className="card-panel">
        <div className="card-panel-header">
          <div className="panel-title-wrap">
            <h3 className="panel-title">
              <TrendingUp size={20} className="text-teal-600" />
              <span>Validation Metric Comparison Chart</span>
            </h3>
            <p className="panel-subtitle">Normalized percentage metrics on the 490-sample validation set</p>
          </div>
        </div>

        <div style={{ height: '340px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COMPARISON_CHART_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="metric" tick={{ fontSize: 12, fill: '#334155', fontWeight: 600 }} />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                domain={[0, 105]}
                label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', style: { fontSize: '0.75rem', fill: '#64748b' } }}
              />
              <Tooltip
                formatter={(val: number) => [`${val}%`, 'Score']}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '0.8rem' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="Logistic Regression" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Random Forest" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="card-panel">
        <div className="card-panel-header">
          <div className="panel-title-wrap">
            <h3 className="panel-title">
              <Scale size={20} className="text-teal-600" />
              <span>Exact Empirical Validation Metrics (R caret / pROC)</span>
            </h3>
            <p className="panel-subtitle">Direct numeric output recorded from the R Colab notebook</p>
          </div>
        </div>

        <div className="data-table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Evaluation Metric</th>
                <th>Logistic Regression</th>
                <th>Random Forest</th>
                <th>Delta (RF vs LR)</th>
                <th>Qualitative Interpretation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Accuracy</strong></td>
                <td><span className="code-badge">0.6122449</span> (61.22%)</td>
                <td><span className="code-badge" style={{ background: '#f0fdfa', color: '#0f766e' }}>0.6224490</span> (62.24%)</td>
                <td style={{ color: '#059669', fontWeight: 700 }}>+1.02%</td>
                <td style={{ fontSize: '0.8rem', color: '#475569' }}>Similar overall accuracy due to 61% majority class baseline.</td>
              </tr>
              <tr>
                <td><strong>Precision (Potable)</strong></td>
                <td><span className="code-badge">1.0000000</span> (100.0%)</td>
                <td><span className="code-badge" style={{ background: '#f0fdfa', color: '#0f766e' }}>0.5319149</span> (53.19%)</td>
                <td style={{ color: '#64748b' }}>-46.81% (Artifact)</td>
                <td style={{ fontSize: '0.8rem', color: '#475569' }}>LR precision of 1.0 is an artifact: it only predicted 1 sample as potable.</td>
              </tr>
              <tr>
                <td><strong>Recall / Sensitivity</strong></td>
                <td><span className="code-badge" style={{ color: '#e11d48' }}>0.0052356</span> (0.52%)</td>
                <td><span className="code-badge" style={{ background: '#f0fdfa', color: '#0f766e' }}>0.2617801</span> (26.18%)</td>
                <td style={{ color: '#059669', fontWeight: 700 }}>+25.66%</td>
                <td style={{ fontSize: '0.8rem', color: '#475569' }}>RF captured 50 potable samples; LR captured only 1 single sample.</td>
              </tr>
              <tr>
                <td><strong>F1-Score</strong></td>
                <td><span className="code-badge" style={{ color: '#e11d48' }}>0.0104167</span></td>
                <td><span className="code-badge" style={{ background: '#f0fdfa', color: '#0f766e' }}>0.3508772</span></td>
                <td style={{ color: '#059669', fontWeight: 700 }}>+0.3405</td>
                <td style={{ fontSize: '0.8rem', color: '#475569' }}>RF achieved a viable balance between precision and recall.</td>
              </tr>
              <tr style={{ background: '#f0fdfa' }}>
                <td><strong>ROC-AUC (Selection Metric)</strong></td>
                <td><span className="code-badge" style={{ color: '#e11d48' }}>0.4365512</span></td>
                <td><span className="code-badge" style={{ fontWeight: 800, color: '#0f766e' }}>0.6272129</span></td>
                <td style={{ color: '#059669', fontWeight: 800 }}>+0.1907</td>
                <td style={{ fontSize: '0.8rem', color: '#0f766e', fontWeight: 600 }}>
                  Decisive criterion. RF separates distributions substantially better than chance (0.50).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
