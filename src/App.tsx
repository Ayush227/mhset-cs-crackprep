import React from 'react';
import { StudyProvider, useStudy } from './context/StudyContext';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SyllabusDirectory } from './components/SyllabusDirectory';
import { UnitWiseBlanksMode } from './components/UnitWiseBlanksMode';
import { UnitWiseQuizzesMode } from './components/UnitWiseQuizzesMode';
import { MnemonicsMode } from './components/MnemonicsMode';
import { PyqUploadHub } from './components/PyqUploadHub';
import { LessonModal } from './components/LessonModal';
import { TopicExplanationsView } from './components/TopicExplanationsView';
import { RotateCcw } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, resetProgress } = useStudy();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'explanations' && <TopicExplanationsView />}
        {activeTab === 'paper2' && <TopicExplanationsView />}
        {activeTab === 'paper1' && <SyllabusDirectory defaultPaper="paper1" />}
        {activeTab === 'blanks' && <UnitWiseBlanksMode />}
        {activeTab === 'mnemonics' && <MnemonicsMode />}
        {activeTab === 'pyqs' && <PyqUploadHub />}
        {activeTab === 'mocktest' && <UnitWiseQuizzesMode />}
      </main>

      {/* Global Lesson Modal */}
      <LessonModal />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-6 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-heading font-bold text-slate-200">
              SET 7-Day Crack Prep
            </span>
            <span>•</span>
            <span>Maharashtra SET Computer Science (MH-SET Code 37)</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={resetProgress}
              className="text-slate-500 hover:text-rose-400 flex items-center space-x-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progress</span>
            </button>
            <span>•</span>
            <span className="text-slate-500">
              6 Focus Units Sprint & Verified PYQs
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <StudyProvider>
      <AppContent />
    </StudyProvider>
  );
}
