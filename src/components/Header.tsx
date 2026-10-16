import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  BookOpen, 
  Layers, 
  Sparkles, 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  AlertTriangle,
  Menu,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    completedCount, 
    totalTopicsCount, 
    accuracyRate, 
    progress 
  } = useStudy();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressPercent = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;

  // 5 Clean Consolidated Tabs
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers },
    { id: 'explanations', label: '6 Focus Units', icon: BookOpen },
    { id: 'blanks', label: 'Unit-Wise Blanks', icon: HelpCircle },
    { id: 'mocktest', label: 'Unit Quizzes & Mock', icon: Award },
    { id: 'mnemonics', label: 'Memory Tricks', icon: Sparkles },
  ] as const;

  const handleNavClick = (id: typeof activeTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Status Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 px-4 py-1.5 text-xs text-indigo-200 border-b border-indigo-500/20 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
            MH-SET Code 37
          </span>
          <span className="text-[11px] font-medium hidden sm:inline">
            6 Priority Units Sprint (DBMS • OS • SE • CN • AI • DSA)
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-slate-300">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{completedCount}/{totalTopicsCount} Mastered</span>
          </span>
          <span className="flex items-center space-x-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Acc: {accuracyRate}%</span>
          </span>
          {progress.weakTopics.length > 0 && (
            <span className="flex items-center space-x-1 text-rose-300 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>{progress.weakTopics.length} Weak</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          
          {/* Logo & Title */}
          <div 
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center space-x-2.5 cursor-pointer group flex-shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                  SET Crack Prep
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Day {progress.currentDay}/7
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                6 Focus Units Sprint • Computer Science
              </p>
            </div>
          </div>

          {/* Clean Desktop Navigation Bar (5 Items) */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-2 border-t border-slate-800 grid grid-cols-2 gap-2 animate-fade-in bg-slate-900/98">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-800 h-1">
        <div 
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-1 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
