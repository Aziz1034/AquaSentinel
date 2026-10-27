import React, { useState, useRef } from 'react';
import { Sidebar, SectionKey } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewSection } from './components/OverviewSection';
import { DatasetExplorerSection } from './components/DatasetExplorerSection';
import { EDASection } from './components/EDASection';
import { ModelComparisonSection } from './components/ModelComparisonSection';
import { EvaluationSection } from './components/EvaluationSection';
import { LIMESection } from './components/LIMESection';
import { MethodologySection } from './components/MethodologySection';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('overview');
  const mainRef = useRef<HTMLDivElement>(null);

  const handleSelectSection = (section: SectionKey) => {
    setActiveSection(section);
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      <div className="app-main" ref={mainRef}>
        <Header activeSection={activeSection} />

        <main>
          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'dataset' && <DatasetExplorerSection />}
          {activeSection === 'eda' && <EDASection />}
          {activeSection === 'models' && <ModelComparisonSection />}
          {activeSection === 'evaluation' && <EvaluationSection />}
          {activeSection === 'lime' && <LIMESection />}
          {activeSection === 'methodology' && <MethodologySection />}
        </main>
      </div>
    </div>
  );
};

export default App;
