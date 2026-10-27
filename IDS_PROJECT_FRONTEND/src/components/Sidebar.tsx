import React from 'react';
import {
  LayoutDashboard,
  Database,
  BarChart3,
  GitCompare,
  CheckCircle2,
  Eye,
  Workflow,
  Droplets,
  ShieldAlert,
  type LucideIcon
} from 'lucide-react';

export type SectionKey =
  | 'overview'
  | 'dataset'
  | 'eda'
  | 'models'
  | 'evaluation'
  | 'lime'
  | 'methodology';

interface SidebarProps {
  activeSection: SectionKey;
  onSelectSection: (section: SectionKey) => void;
}

interface NavItem {
  key: SectionKey;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'dataset', label: 'Dataset Explorer', icon: Database, badge: '3,276 rows' },
  { key: 'eda', label: 'Exploratory Data Analysis', icon: BarChart3 },
  { key: 'models', label: 'Model Comparison', icon: GitCompare, badge: 'Val ROC' },
  { key: 'evaluation', label: 'Evaluation', icon: CheckCircle2, badge: '67.2% Acc' },
  { key: 'lime', label: 'LIME Explainability', icon: Eye, badge: 'Case 968' },
  { key: 'methodology', label: 'Methodology', icon: Workflow, badge: '10 Steps' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSelectSection }) => {
  return (
    <aside className="app-sidebar" aria-label="Sidebar Navigation">
      <div className="sidebar-header">
        <div className="brand-badge">
          <Droplets size={12} />
          <span>Academic Case Study</span>
        </div>
        <div className="brand-title-wrap">
          <div className="brand-logo-icon">
            <Droplets size={24} />
          </div>
          <div>
            <h1 className="brand-title">AquaSentinel</h1>
            <p className="brand-subtitle">Water Potability Prediction</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.key;
          return (
            <button
              key={item.key}
              id={`nav-item-${item.key}`}
              type="button"
              className={`nav-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectSection(item.key)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge-pill">{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-meta-card">
          <div className="meta-row">
            <span className="meta-label">Environment</span>
            <span className="meta-val">R / Colab</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Selected Model</span>
            <span className="meta-val highlight">Random Forest</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Held-out ROC-AUC</span>
            <span className="meta-val highlight">0.6910</span>
          </div>
          <div className="meta-row" style={{ marginTop: '4px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="meta-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldAlert size={12} color="#f59e0b" />
              <span>Audit Scope</span>
            </span>
            <span className="meta-val" style={{ color: '#f59e0b' }}>Academic Only</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
