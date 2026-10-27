import React from 'react';
import { METHODOLOGY_STEPS } from '../data/waterData';
import {
  Workflow,
  ShieldAlert,
  Terminal,
  FileCode,
  Layers,
  Database
} from 'lucide-react';

export const MethodologySection: React.FC = () => {
  return (
    <div className="workspace-content">
      {/* Formal Academic & Regulatory Limitation Notice */}
      <div className="disclaimer-banner danger">
        <ShieldAlert size={24} className="text-rose-600 flex-shrink-0" style={{ marginTop: '2px' }} />
        <div>
          <h4 className="disclaimer-title">Formal Academic & Regulatory Disclaimer</h4>
          <p className="disclaimer-text">
            <strong>AquaSentinel is an academic dataset-classification demonstration and does NOT replace official laboratory testing or regulatory assessment.</strong>{' '}
            Municipal water safety verification requires rigorous biological culture testing (e.g. <em>Escherichia coli</em>, <em>Cryptosporidium</em>, enteroviruses), heavy metal spectrometry, and EPA/WHO compliance inspections.
            Neither this static web dashboard nor the underlying machine learning models are authorized for municipal water treatment control or direct human consumption certification.
          </p>
        </div>
      </div>

      {/* R Colab Execution & Static Snapshot Notice */}
      <div className="card-panel" style={{ borderLeft: '5px solid #0d9488' }}>
        <div className="card-panel-header">
          <div className="panel-title-wrap">
            <h3 className="panel-title">
              <Terminal size={20} className="text-teal-600" />
              <span>Computational Architecture & Runtime Isolation</span>
            </h3>
            <p className="panel-subtitle">Google Colab R execution environment & dashboard snapshot</p>
          </div>
          <span className="chip-tag teal">Static Results Snapshot</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', fontSize: '0.84rem', color: '#334155' }}>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCode size={16} color="#0d9488" />
              <span>Statistical Modeling in R</span>
            </div>
            <p style={{ color: '#64748b', lineHeight: 1.5 }}>
              All empirical computations, median imputations, cross-validations, tree training, ROC curves, and LIME perturbations were executed in an <strong>R (v4.x)</strong> notebook on <strong>Google Colab</strong> using packages including <code>caret</code>, <code>randomForest</code>, <code>lime</code>, <code>pROC</code>, and <code>tidyverse</code>.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={16} color="#0d9488" />
              <span>Zero-Leakage Median Imputation</span>
            </div>
            <p style={{ color: '#64748b', lineHeight: 1.5 }}>
              To prevent data contamination, missing predictor values (Sulfate, ph, Trihalomethanes) were imputed strictly using <strong>training-split medians</strong>. The validation and held-out test splits inherited these frozen statistics without recomputing parameters on themselves.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} color="#0d9488" />
              <span>Dashboard Role</span>
            </div>
            <p style={{ color: '#64748b', lineHeight: 1.5 }}>
              This web interface provides a <strong>faithful, interactive presentation-ready snapshot</strong> of the notebook’s recorded empirical outputs. It does not pretend to execute R scripts in the browser or simulate random real-time inferences.
            </p>
          </div>
        </div>
      </div>

      {/* End-to-End Pipeline Visualization */}
      <div className="card-panel">
        <div className="card-panel-header">
          <div className="panel-title-wrap">
            <h3 className="panel-title">
              <Workflow size={20} className="text-teal-600" />
              <span>End-to-End Data Science Pipeline (10 Steps)</span>
            </h3>
            <p className="panel-subtitle">
              Visual methodology trace from dataset ingestion to interpretability validation
            </p>
          </div>
          <span className="chip-tag navy">Reproducible Protocol</span>
        </div>

        {/* Visual Stepper List */}
        <div className="pipeline-flow">
          {METHODOLOGY_STEPS.map((stepItem) => (
            <div key={stepItem.step} className="pipeline-step-item">
              <div className="step-node">{stepItem.step}</div>
              <div className="step-connector" />
              <div className="step-content-card">
                <div className="step-card-header">
                  <span className="step-title">{stepItem.title}</span>
                  <span className="step-subtitle">{stepItem.subtitle}</span>
                </div>
                <p className="step-desc">{stepItem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
