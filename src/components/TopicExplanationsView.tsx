import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Filter, 
  CheckCircle2, 
  Check, 
  Clock, 
  ArrowRight, 
  LayoutList, 
  CreditCard,
  HelpCircle,
  Award,
  FileText,
  Calculator,
  AlertCircle
} from 'lucide-react';
import { PriorityLevel, SyllabusSubtopic } from '../types';

export const TopicExplanationsView: React.FC = () => {
  const { 
    allTopics, 
    paper2UnitsList, 
    paper1UnitsList, 
    openTopicLesson, 
    progress, 
    markTopicComplete 
  } = useStudy();

  const [activePaper, setActivePaper] = useState<'ALL' | 'paper1' | 'paper2'>('paper2');
  const [selectedUnit, setSelectedUnit] = useState<number | 'ALL'>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<PriorityLevel | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'detailed' | 'condensed'>('detailed');

  // Filter topics
  const filteredTopics = allTopics.filter(topic => {
    if (activePaper === 'paper1' && topic.paperType !== 'paper1') return false;
    if (activePaper === 'paper2' && topic.paperType !== 'paper2') return false;

    if (selectedUnit !== 'ALL' && topic.unitId !== selectedUnit) return false;
    if (selectedPriority !== 'ALL' && topic.priority !== selectedPriority) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = topic.title.toLowerCase().includes(q);
      const matchExpl = topic.oneLineExplanation.toLowerCase().includes(q);
      const matchMnemonic = topic.mnemonicTrick.trick.toLowerCase().includes(q) || topic.mnemonicTrick.meaning.toLowerCase().includes(q);
      const matchFacts = topic.quickFacts.some(f => f.toLowerCase().includes(q));
      if (!matchTitle && !matchExpl && !matchMnemonic && !matchFacts) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 rounded-3xl border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>6 Focus Units Revision Reader</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Short Topic Explanations & Master Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Read through the 6 high-yield focus units (DBMS, OS, Software Engg, Computer Networks, AI, and DSA) and Paper 1 topics explained in short, beginner-friendly sentences, mnemonics, and 3 golden revision facts.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 self-start md:self-auto flex-shrink-0">
          <button
            onClick={() => setViewMode('detailed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              viewMode === 'detailed'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Detailed Notes</span>
          </button>
          <button
            onClick={() => setViewMode('condensed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              viewMode === 'condensed'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>Quick Cheat-Sheet</span>
          </button>
        </div>
      </div>

      {/* Control & Filter Strip */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Paper Selector */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setActivePaper('paper2'); setSelectedUnit('ALL'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePaper === 'paper2' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Paper 2: Focus Units (6 Units)
            </button>
            <button
              onClick={() => { setActivePaper('paper1'); setSelectedUnit('ALL'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePaper === 'paper1' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Paper 1 (General)
            </button>
            <button
              onClick={() => { setActivePaper('ALL'); setSelectedUnit('ALL'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePaper === 'ALL' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Combined
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts (e.g. Normalization, Deadlock, A*, OSI)..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Second Row: Specific Unit Filter & Priority Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          
          {/* Unit Dropdown */}
          <div className="flex items-center space-x-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Units in this View ({filteredTopics.length} Topics)</option>
              {activePaper !== 'paper1' && (
                <>
                  <option value="4">Unit 4: Database Management Systems (Day 1 Focus)</option>
                  <option value="5">Unit 5: Operating System (Day 2 Focus)</option>
                  <option value="6">Unit 6: Software Engineering (Day 3 Focus)</option>
                  <option value="9">Unit 9: Computer Networks (Day 4 Focus)</option>
                  <option value="10">Unit 10: Artificial Intelligence (Day 5 Focus)</option>
                  <option value="7">Unit 7: Data Structures & Algorithms (Day 6 Focus)</option>
                </>
              )}
              {activePaper !== 'paper2' && (
                <>
                  <option value="101">Paper 1: Unit 1 — Teaching Aptitude</option>
                  <option value="102">Paper 1: Unit 2 — Research Aptitude</option>
                  <option value="104">Paper 1: Unit 4 — Communication</option>
                  <option value="108">Paper 1: Unit 8 — ICT</option>
                  <option value="109">Paper 1: Unit 9 — People & Environment (SDGs)</option>
                  <option value="110">Paper 1: Unit 10 — Higher Education System</option>
                  <option value="105">Paper 1: Unit 5 & 6 — Math & Logical Reasoning</option>
                </>
              )}
            </select>
          </div>

          {/* Priority Filter Pills */}
          <div className="flex items-center space-x-1.5 text-xs">
            <button
              onClick={() => setSelectedPriority('ALL')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedPriority === 'ALL' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Priorities
            </button>
            <button
              onClick={() => setSelectedPriority('A')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center space-x-1 ${
                selectedPriority === 'A' ? 'bg-rose-500/30 text-rose-300 border border-rose-500/50' : 'text-rose-400 hover:bg-slate-800'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Priority A</span>
            </button>
            <button
              onClick={() => setSelectedPriority('B')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center space-x-1 ${
                selectedPriority === 'B' ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' : 'text-amber-400 hover:bg-slate-800'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Priority B</span>
            </button>
            <button
              onClick={() => setSelectedPriority('C')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center space-x-1 ${
                selectedPriority === 'C' ? 'bg-slate-700 text-slate-200' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span>Priority C</span>
            </button>
          </div>

        </div>
      </div>

      {/* TOPIC LISTING - DETAILED MODE */}
      {viewMode === 'detailed' && (
        <div className="space-y-6">
          {filteredTopics.map((topic, idx) => {
            const isCompleted = progress.completedTopics.includes(topic.id);

            return (
              <div 
                key={topic.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-indigo-500/40 transition-all"
              >
                {/* Topic Header Strip */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => markTopicComplete(topic.id)}
                      title={isCompleted ? "Mark as Incomplete" : "Mark as Mastered"}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors flex-shrink-0 ${
                        isCompleted 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-slate-700 bg-slate-950 hover:border-indigo-400 text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          topic.priority === 'A' 
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                            : topic.priority === 'B' 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          Priority {topic.priority} {topic.priority === 'A' ? '• First 7 Days' : topic.priority === 'B' ? '• Week 2' : '• Revisit'}
                        </span>
                        <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
                          {topic.paperType === 'paper2' ? `Paper 2 CS Unit ${topic.unitId}` : 'Paper 1 General'}
                        </span>
                        {topic.dayAssigned && (
                          <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                            Day {topic.dayAssigned} Sprint
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white mt-1">
                        {topic.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openTopicLesson(topic)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-indigo-600/20 transition-all"
                    >
                      <span>Interactive Drill</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Topic Core Explanation & Notes Body */}
                <div className="p-5 sm:p-6 space-y-5 text-slate-200">
                  
                  {/* 1. ONE LINE BEGINNER EXPLANATION */}
                  <div className="bg-indigo-950/40 rounded-xl p-4 border border-indigo-500/30 space-y-1">
                    <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px] text-indigo-300">
                        1
                      </span>
                      <span>One-Line Core Explanation</span>
                    </div>
                    <p className="text-white text-base font-medium leading-relaxed pl-7">
                      {topic.oneLineExplanation}
                    </p>
                  </div>

                  {/* 2. REMEMBER THIS (MEMORY TRICK / MNEMONIC / COMPARISON) */}
                  <div className="bg-amber-950/30 rounded-xl p-4 border border-amber-500/30 space-y-2">
                    <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{topic.mnemonicTrick.title} (Memory Shortcut)</span>
                    </div>
                    <div className="pl-6 space-y-2">
                      <div className="bg-slate-950/80 p-3 rounded-lg border border-amber-500/20 text-amber-100 font-mono text-sm font-semibold">
                        💡 {topic.mnemonicTrick.trick}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <strong className="text-slate-100">Technical Meaning:</strong> {topic.mnemonicTrick.meaning}
                      </p>
                    </div>
                  </div>

                  {/* 3. THREE GOLDEN FACTS FOR EXAM REVISION */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>3 Golden Facts to Remember</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {topic.quickFacts.map((fact, fIdx) => (
                        <div key={fIdx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed flex items-start space-x-2">
                          <span className="text-purple-400 font-bold">•</span>
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. COMPREHENSIVE STUDY NOTES (Deep-Dive Concepts & Formulas) */}
                  {topic.detailedNotes && (
                    <div className="space-y-3 pt-3 border-t border-slate-800 animate-fade-in">
                      <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <span>Comprehensive Topic Notes & Master Cheat-Sheet</span>
                      </div>

                      {/* Detailed Concept Breakdown */}
                      <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                        <div className="text-xs font-bold text-slate-300">Detailed Concept Breakdown:</div>
                        <ul className="space-y-1.5 pl-1">
                          {topic.detailedNotes.summaryPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start space-x-2">
                              <span className="text-emerald-400 font-bold mt-0.5">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Formulas & Rules */}
                      {topic.detailedNotes.coreFormulas && topic.detailedNotes.coreFormulas.length > 0 && (
                        <div className="bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-500/30 space-y-2">
                          <div className="text-xs font-bold text-indigo-300 flex items-center space-x-1.5">
                            <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Formulas & Decision Rules:</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {topic.detailedNotes.coreFormulas.map((rule, rIdx) => (
                              <div key={rIdx} className="font-mono text-xs text-indigo-200 bg-slate-950/80 p-2.5 rounded-lg border border-indigo-500/20">
                                {rule}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Exam Traps & Common Distractors */}
                      {topic.detailedNotes.examTraps && topic.detailedNotes.examTraps.length > 0 && (
                        <div className="bg-rose-950/30 p-3.5 rounded-xl border border-rose-500/30 space-y-1.5">
                          <div className="text-xs font-bold text-rose-300 flex items-center space-x-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                            <span>MH-SET Exam Traps & Common Pitfalls:</span>
                          </div>
                          <div className="space-y-1">
                            {topic.detailedNotes.examTraps.map((trap, tIdx) => (
                              <div key={tIdx} className="text-xs text-rose-200/90 leading-relaxed flex items-start space-x-2">
                                <span className="text-rose-400 font-bold">⚠️</span>
                                <span>{trap}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Definitions */}
                      {topic.detailedNotes.keyDefinitions && topic.detailedNotes.keyDefinitions.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {topic.detailedNotes.keyDefinitions.map((def, dIdx) => (
                            <div key={dIdx} className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center space-x-1.5">
                              <span className="font-bold text-emerald-400">{def.term}:</span>
                              <span className="text-slate-400">{def.definition}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* TOPIC LISTING - CONDENSED RAPID CHEATSHEET MODE */}
      {viewMode === 'condensed' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800 shadow-xl">
          {filteredTopics.map((topic, idx) => (
            <div key={topic.id} className="p-4 hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                    topic.priority === 'A' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {topic.priority}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {topic.paperType === 'paper2' ? `U${topic.unitId}` : 'P1'}
                  </span>
                  <h3 className="font-heading font-bold text-white text-sm sm:text-base truncate">
                    {topic.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-indigo-300 font-medium">Concept:</strong> {topic.oneLineExplanation}
                </p>

                <p className="text-xs font-mono text-amber-200/90 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  💡 {topic.mnemonicTrick.trick}
                </p>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0 self-end md:self-auto">
                <button
                  onClick={() => openTopicLesson(topic)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center space-x-1 transition-all"
                >
                  <span>Practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredTopics.length === 0 && (
        <div className="text-center py-16 text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
          <CheckCircle2 className="w-12 h-12 text-slate-500 mx-auto mb-2" />
          <p className="font-semibold text-slate-200">No topics match your current filter criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try switching the unit dropdown or clearing the search bar.</p>
        </div>
      )}

    </div>
  );
};
