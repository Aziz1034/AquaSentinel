import React from 'react';
import { SectionKey } from './Sidebar';
import { BookOpen, Terminal, Sparkles, Layers } from 'lucide-react';

interface HeaderProps {
  activeSection: SectionKey;
}

const SECTION_METADATA: Record<SectionKey, { title: string; desc: string; breadcrumb: string }> = {
  overview: {
    title: 'Project Overview & Key Insights',
    desc: 'Executive summary, core problem formulation, and key modeling outcomes.',
    breadcrumb: 'Executive Dashboard / Overview'
  },
  dataset: {
    title: 'Dataset Explorer & Partitioning',
    desc: 'Water Potability Dataset schema, split hygiene, missing value audits, and label definitions.',
    breadcrumb: 'Data Pipeline / Dataset Explorer'
  },
  eda: {
    title: 'Exploratory Data Analysis (EDA)',
    desc: 'Empirical class balance, missingness patterns, hydrochemical distributions, and correlation constraints.',
    breadcrumb: 'Data Pipeline / Exploratory Data Analysis'
  },
  models: {
    title: 'Model Comparison & Validation Selection',
    desc: 'Direct benchmark of Logistic Regression vs Random Forest on the validation partition.',
    breadcrumb: 'Modeling / Model Comparison'
  },
  evaluation: {
    title: 'Held-Out Test Set Evaluation',
    desc: 'Final performance of selected Random Forest model on 494 unseen test samples, confusion matrix, and feature importances.',
    breadcrumb: 'Evaluation / Test Performance'
  },
  lime: {
    title: 'LIME Local Explainability Analysis',
    desc: 'Case 968 local explanation surrogate fit, interpretability constraints, and verification protocols.',
    breadcrumb: 'Explainability / LIME'
  },
  methodology: {
    title: 'End-to-End Methodology & Disclaimers',
    desc: 'Complete 10-stage scientific workflow from data ingestion to model interpretation and regulatory boundary notes.',
    breadcrumb: 'Protocol / Methodology'
  }
};

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const meta = SECTION_METADATA[activeSection];

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-breadcrumbs">
          <Layers size={14} className="text-teal-600" />
          <span>{meta.breadcrumb}</span>
        </div>
        <div className="header-title-row">
          <h2 className="header-title">{meta.title}</h2>
        </div>
        <p className="header-desc">{meta.desc}</p>
      </div>

      <div className="header-right">
        <div className="chip-tag teal" title="Runtime environment">
          <Terminal size={13} />
          <span>R 4.x (Google Colab)</span>
        </div>
        <div className="chip-tag navy" title="Course Project">
          <BookOpen size={13} />
          <span>Intro to Data Science</span>
        </div>
        <div className="chip-tag amber" title="Benchmark Source">
          <Sparkles size={13} />
          <span>Kaggle Benchmark</span>
        </div>
      </div>
    </header>
  );
};
