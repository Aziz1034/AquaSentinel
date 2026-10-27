import React, { useState } from 'react';
import {
  DATASET_METRICS,
  SPLIT_DETAILS,
  DATA_DICTIONARY
} from '../data/waterData';
import {
  Database,
  Layers,
  FileCheck2,
  AlertCircle,
  Search,
  SlidersHorizontal,
  Table,
  CheckCircle2,
  Info
} from 'lucide-react';

export const DatasetExplorerSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMissingOnly, setFilterMissingOnly] = useState(false);

  const filteredFeatures = DATA_DICTIONARY.filter((feat) => {
    const matchesSearch =
      feat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feat.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMissing = filterMissingOnly ? feat.missingCount > 0 : true;
    return matchesSearch && matchesMissing;
  });

  return (
    <div className="workspace-content">
      {/* Label Disclaimer Banner */}
      <div className="disclaimer-banner danger">
        <AlertCircle size={20} className="text-rose-600 flex-shrink-0" style={{ marginTop: '2px' }} />
        <div>
          <h4 className="disclaimer-title">Dataset Classification Label Disclaimer</h4>
          <p className="disclaimer-text">
            <strong>Mandatory Clarification:</strong> Potability 0 (Non-Potable) and Potability 1 (Potable) represent the nominal labels provided in the Kaggle benchmark dataset.
            They reflect a synthetic or aggregated supervised target for machine learning experiments, and <strong>do not constitute independent laboratory certifications or official regulatory clearance</strong> of water safety.
          </p>
        </div>
      </div>

      {/* Dataset Core Snapshot Cards */}
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Total Records</span>
            <div className="metric-icon-wrap">
              <Database size={18} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">{DATASET_METRICS.totalRecords.toLocaleString()}</span>
          </div>
          <div className="metric-footer-note">
            <span>Water samples collected</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Exact Duplicate Rows</span>
            <div className="metric-icon-wrap" style={{ background: '#ecfdf5', color: '#059669' }}>
              <FileCheck2 size={18} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value" style={{ color: '#059669' }}>0</span>
          </div>
          <div className="metric-footer-note">
            <span>Clean row uniqueness verified</span>
          </div>
        </div>

        <div className="metric-card amber">
          <div className="metric-header">
            <span className="metric-title">Initial Missing Values</span>
            <div className="metric-icon-wrap" style={{ background: '#fffbeb', color: '#d97706' }}>
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value" style={{ color: '#d97706' }}>1,434</span>
            <span className="metric-sub">cells (3 features)</span>
          </div>
          <div className="metric-footer-note">
            <span>Reduced to 0 post median imputation</span>
          </div>
        </div>

        <div className="metric-card navy">
          <div className="metric-header">
            <span className="metric-title">Target Ratio (0 vs 1)</span>
            <div className="metric-icon-wrap" style={{ background: '#e0e7ff', color: '#4338ca' }}>
              <Layers size={18} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value" style={{ fontSize: '1.7rem' }}>61% : 39%</span>
          </div>
          <div className="metric-footer-note">
            <span>1,998 Non-Potable / 1,278 Potable</span>
          </div>
        </div>
      </div>

      {/* Stratified Partitioning Overview */}
      <div className="card-panel">
        <div className="card-panel-header">
          <div className="panel-title-wrap">
            <h3 className="panel-title">
              <Layers size={20} className="text-teal-600" />
              <span>Stratified Train / Validation / Test Splitting</span>
            </h3>
            <p className="panel-subtitle">
              Strict 70% / 15% / 15% partitioning in R. Missing values imputed with training-set medians only.
            </p>
          </div>
          <span className="chip-tag teal">0 Missing After Cleaning</span>
        </div>

        <div className="data-table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Split Partition</th>
                <th>Rows</th>
                <th>Share</th>
                <th>Non-Potable (0)</th>
                <th>Potable (1)</th>
                <th>Missing Values (Pre-Clean)</th>
                <th>Missing Values (Post-Clean)</th>
                <th>Purpose in Case Study</th>
              </tr>
            </thead>
            <tbody>
              {SPLIT_DETAILS.map((split, idx) => (
                <tr key={split.name}>
                  <td>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{split.name}</span>
                  </td>
                  <td>
                    <span className="code-badge">{split.rows}</span>
                  </td>
                  <td>{split.percentage}%</td>
                  <td>
                    <span style={{ color: '#64748b', fontWeight: 600 }}>{split.nonPotableCount}</span> (
                    {((split.nonPotableCount / split.rows) * 100).toFixed(1)}%)
                  </td>
                  <td>
                    <span style={{ color: '#0f766e', fontWeight: 600 }}>{split.potableCount}</span> (
                    {((split.potableCount / split.rows) * 100).toFixed(1)}%)
                  </td>
                  <td>
                    <span style={{ color: '#d97706', fontWeight: 600 }}>{split.missingBefore}</span>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 700 }}>
                      <CheckCircle2 size={14} /> 0
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#475569' }}>
                    {idx === 0 && 'Model parameter fitting & median reference calculation'}
                    {idx === 1 && 'Hyperparameter tuning & model selection between LR and RF'}
                    {idx === 2 && 'Quarantined unbiased held-out generalization test'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="disclaimer-banner info" style={{ padding: '12px 16px' }}>
          <Info size={18} className="text-teal-700 flex-shrink-0" />
          <p style={{ fontSize: '0.82rem', color: '#134e4a' }}>
            <strong>Data Leakage Prevention:</strong> Medians for <em>Sulfate (333.07)</em>, <em>ph (7.0368)</em>, and <em>Trihalomethanes (66.62)</em> were computed exclusively from the 2,292 training rows. Validation and Test splits were imputed using these training parameters to prevent test information from biasing training.
          </p>
        </div>
      </div>

      {/* Data Dictionary & Feature Attributes */}
      <div className="card-panel">
        <div className="card-panel-header">
          <div className="panel-title-wrap">
            <h3 className="panel-title">
              <Table size={20} className="text-teal-600" />
              <span>Hydrochemical Data Dictionary (10 Attributes)</span>
            </h3>
            <p className="panel-subtitle">
              Measured water quality indicators, missingness counts, WHO/EPA guidelines, and imputation medians.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search feature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '7px 12px 7px 32px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  outline: 'none',
                  width: '180px'
                }}
              />
            </div>
            <button
              type="button"
              className={`chip-tag ${filterMissingOnly ? 'amber' : 'navy'}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setFilterMissingOnly(!filterMissingOnly)}
            >
              <SlidersHorizontal size={13} />
              <span>{filterMissingOnly ? 'Showing Missing Only' : 'Filter Missing'}</span>
            </button>
          </div>
        </div>

        <div className="data-table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Feature Name</th>
                <th>Variable Type</th>
                <th>Physical Unit</th>
                <th>Missing Values</th>
                <th>Missingness Rate</th>
                <th>WHO / EPA Standard</th>
                <th>Imputed Training Median</th>
                <th>Chemical & Domain Significance</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeatures.map((feat) => (
                <tr key={feat.name}>
                  <td>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{feat.name}</span>
                    {feat.name === 'Potability' && (
                      <span style={{ marginLeft: '6px', fontSize: '0.7rem', background: '#e0e7ff', color: '#4338ca', padding: '1px 6px', borderRadius: '4px' }}>
                        Target
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="code-badge">{feat.type}</span>
                  </td>
                  <td>{feat.unit}</td>
                  <td>
                    {feat.missingCount > 0 ? (
                      <span style={{ color: '#d97706', fontWeight: 700 }}>{feat.missingCount}</span>
                    ) : (
                      <span style={{ color: '#059669' }}>0</span>
                    )}
                  </td>
                  <td>
                    {feat.missingPercent > 0 ? (
                      <span style={{ color: '#d97706', fontWeight: 600 }}>{feat.missingPercent.toFixed(1)}%</span>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>0.0%</span>
                    )}
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: '#334155', fontWeight: 500 }}>{feat.whoRange}</span>
                  </td>
                  <td>
                    <span className="code-badge" style={{ background: feat.imputedMedian.includes('None') ? '#f1f5f9' : '#f0fdfa', color: feat.imputedMedian.includes('None') ? '#64748b' : '#0f766e' }}>
                      {feat.imputedMedian}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#475569', maxWidth: '300px' }}>
                    {feat.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
