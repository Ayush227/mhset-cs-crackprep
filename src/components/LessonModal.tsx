import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  X, 
  CheckCircle, 
  Bookmark, 
  AlertTriangle, 
  Sparkles, 
  HelpCircle, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Eye,
  Award,
  FileText,
  Calculator,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LessonModal: React.FC = () => {
  const { 
    activeTopic, 
    closeTopicLesson, 
    progress, 
    markTopicComplete, 
    recordBlankAnswer, 
    toggleBookmark, 
    toggleWeakTopic, 
    allTopics, 
    openTopicLesson,
    setActiveTab
  } = useStudy();

  // Local state for interactive blanks
  const [revealedBlanks, setRevealedBlanks] = useState<{ [index: number]: boolean }>({});
  const [userBlankInputs, setUserBlankInputs] = useState<{ [index: number]: string }>({});

  if (!activeTopic) return null;

  const isCompleted = progress.completedTopics.includes(activeTopic.id);
  const isBookmarked = progress.bookmarkedTopics.includes(activeTopic.id);
  const isWeak = progress.weakTopics.includes(activeTopic.id);

  const currentIndex = allTopics.findIndex(t => t.id === activeTopic.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const handleToggleComplete = () => {
    markTopicComplete(activeTopic.id);
    if (!isCompleted) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  };

  const handleRevealBlank = (index: number) => {
    setRevealedBlanks(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCheckBlank = (index: number, correctAnswer: string) => {
    const inputVal = (userBlankInputs[index] || '').trim();
    const isCorrect = inputVal.toLowerCase() === correctAnswer.toLowerCase();
    recordBlankAnswer(activeTopic.id, index, isCorrect, inputVal);
    setRevealedBlanks(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              activeTopic.priority === 'A' 
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              Focus Priority {activeTopic.priority}
            </span>
            <span className="text-xs text-slate-400 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeTopic.estimatedMinutes} min lesson</span>
            </span>
            {activeTopic.dayAssigned && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Day {activeTopic.dayAssigned} Sprint
              </span>
            )}
          </div>

          {/* Quick Actions & Close */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleBookmark(activeTopic.id)}
              title={isBookmarked ? "Bookmarked" : "Bookmark this topic"}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => toggleWeakTopic(activeTopic.id)}
              title={isWeak ? "Flagged as Weak Topic" : "Flag as Needs Revision"}
              className={`p-2 rounded-lg border transition-colors ${
                isWeak 
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-rose-300'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
            </button>

            <button
              onClick={closeTopicLesson}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* Topic Title */}
          <div>
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">
              {activeTopic.paperType === 'paper2' ? `Paper 2 CS • Focus Unit ${activeTopic.unitId}` : 'Paper 1 General'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              {activeTopic.title}
            </h2>
          </div>

          {/* SECTION A: One-line explanation */}
          <div className="rounded-xl p-4 bg-gradient-to-r from-indigo-950/70 via-indigo-900/40 to-slate-900 border border-indigo-500/30">
            <div className="flex items-center space-x-2 text-indigo-300 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-300 border border-indigo-500/30">
                A
              </span>
              <h3 className="font-heading font-bold text-sm tracking-wide text-indigo-200 uppercase">
                One-Line Core Explanation
              </h3>
            </div>
            <p className="text-slate-100 font-medium text-base sm:text-lg leading-relaxed pl-7">
              {activeTopic.oneLineExplanation}
            </p>
          </div>

          {/* SECTION B: Remember this (Mnemonic / Short trick / Formula) */}
          <div className="rounded-xl p-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30">
            <div className="flex items-center space-x-2 text-amber-300 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center font-bold text-xs text-amber-300 border border-amber-500/30">
                B
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-heading font-bold text-sm tracking-wide text-amber-200 uppercase">
                Remember This (Memory Trick & Comparison)
              </h3>
            </div>
            <div className="pl-7 space-y-2">
              <div className="bg-slate-950/80 rounded-lg p-3 border border-amber-500/20">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  {activeTopic.mnemonicTrick.title}
                </span>
                <p className="text-amber-100 font-mono text-sm sm:text-base font-semibold mt-1">
                  💡 {activeTopic.mnemonicTrick.trick}
                </p>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <strong className="text-slate-200">Concept Meaning:</strong> {activeTopic.mnemonicTrick.meaning}
              </p>
            </div>
          </div>

          {/* SECTION: Deep-Dive Comprehensive Notes (If available) */}
          {activeTopic.detailedNotes && (
            <div className="rounded-xl p-4 bg-slate-900/90 border border-emerald-500/30 space-y-3.5 shadow-lg">
              <div className="flex items-center space-x-2 text-emerald-400">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h3 className="font-heading font-bold text-sm tracking-wide text-emerald-300 uppercase">
                  Comprehensive Master Notes & Concept Deep-Dive
                </h3>
              </div>

              {/* Summary Points */}
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5 pl-4">
                <div className="text-xs font-bold text-slate-300">Detailed Concept Breakdown:</div>
                <ul className="space-y-1.5">
                  {activeTopic.detailedNotes.summaryPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Formulas */}
              {activeTopic.detailedNotes.coreFormulas && activeTopic.detailedNotes.coreFormulas.length > 0 && (
                <div className="bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-500/30 space-y-1.5">
                  <div className="text-xs font-bold text-indigo-300 flex items-center space-x-1.5">
                    <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Formulas & Decision Rules:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {activeTopic.detailedNotes.coreFormulas.map((rule, rIdx) => (
                      <div key={rIdx} className="font-mono text-xs text-indigo-200 bg-slate-950/90 p-2.5 rounded-lg border border-indigo-500/20">
                        {rule}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exam Traps & Pitfalls */}
              {activeTopic.detailedNotes.examTraps && activeTopic.detailedNotes.examTraps.length > 0 && (
                <div className="bg-rose-950/30 p-3.5 rounded-xl border border-rose-500/30 space-y-1">
                  <div className="text-xs font-bold text-rose-300 flex items-center space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>MH-SET Exam Traps & Common Distractors:</span>
                  </div>
                  <div className="space-y-1 pt-1">
                    {activeTopic.detailedNotes.examTraps.map((trap, tIdx) => (
                      <div key={tIdx} className="text-xs text-rose-200/90 leading-relaxed flex items-start space-x-2">
                        <span className="text-rose-400 font-bold">⚠️</span>
                        <span>{trap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Definitions */}
              {activeTopic.detailedNotes.keyDefinitions && activeTopic.detailedNotes.keyDefinitions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeTopic.detailedNotes.keyDefinitions.map((def, dIdx) => (
                    <div key={dIdx} className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center space-x-1.5">
                      <span className="font-bold text-emerald-400">{def.term}:</span>
                      <span className="text-slate-400">{def.definition}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION C: Key Fill in the Blanks */}
          <div className="rounded-xl p-4 bg-slate-900/80 border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2 text-sky-300">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center font-bold text-xs text-sky-300 border border-sky-500/30">
                  C
                </span>
                <HelpCircle className="w-4 h-4 text-sky-400" />
                <h3 className="font-heading font-bold text-sm tracking-wide text-sky-200 uppercase">
                  Fill In The Blanks (Topic Drill)
                </h3>
              </div>
              <button
                onClick={() => { closeTopicLesson(); setActiveTab('blanks'); }}
                className="text-xs text-sky-400 hover:text-sky-300 underline font-semibold flex items-center space-x-1"
              >
                <span>View Full Unit Blanks Drill</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="pl-0 sm:pl-7 space-y-4">
              {activeTopic.fillInBlanks.map((blank, idx) => {
                const isRevealed = revealedBlanks[idx];
                const key = `${activeTopic.id}_blank_${idx}`;
                const savedResult = progress.solvedBlanks[key];

                return (
                  <div key={idx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-sm sm:text-base font-medium text-slate-100">
                      <span className="text-indigo-400 font-bold mr-1.5">{idx + 1}.</span>
                      {blank.question}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type your answer..."
                        value={userBlankInputs[idx] !== undefined ? userBlankInputs[idx] : (savedResult?.userAnswer || '')}
                        onChange={(e) => setUserBlankInputs(prev => ({ ...prev, [idx]: e.target.value }))}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1 min-w-[160px]"
                      />
                      <button
                        onClick={() => handleCheckBlank(idx, blank.answer)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                      >
                        Check
                      </button>
                      <button
                        onClick={() => handleRevealBlank(idx)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center space-x-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isRevealed ? 'Hide Answer' : 'Reveal Answer'}</span>
                      </button>
                    </div>

                    {(isRevealed || savedResult?.answered) && (
                      <div className="mt-2 p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs space-y-1 animate-fade-in">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-indigo-300">Correct Answer:</span>
                          <span className="font-mono text-emerald-400 font-bold text-sm bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                            {blank.answer}
                          </span>
                        </div>
                        <p className="text-slate-300 text-xs leading-normal">
                          {blank.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION D: Quick revision (3 key facts) */}
          <div className="rounded-xl p-4 bg-slate-900/80 border border-slate-700/80">
            <div className="flex items-center space-x-2 text-purple-300 mb-2">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-xs text-purple-300 border border-purple-500/30">
                D
              </span>
              <h3 className="font-heading font-bold text-sm tracking-wide text-purple-200 uppercase">
                Quick Revision (3 Golden Facts)
              </h3>
            </div>
            <ul className="pl-7 space-y-2">
              {activeTopic.quickFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION E: PYQ connection */}
          <div className="rounded-xl p-4 bg-slate-900/80 border border-slate-700/80">
            <div className="flex items-center space-x-2 text-sky-300 mb-2">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center font-bold text-xs text-sky-300 border border-sky-500/30">
                E
              </span>
              <h3 className="font-heading font-bold text-sm tracking-wide text-sky-200 uppercase">
                Previous Year Question (PYQ) Connection
              </h3>
            </div>

            <div className="pl-0 sm:pl-7">
              {activeTopic.pyqs.length > 0 ? (
                <div className="space-y-3">
                  {activeTopic.pyqs.map((pyq) => (
                    <div key={pyq.id} className="bg-slate-950 p-4 rounded-xl border border-sky-500/20 text-xs sm:text-sm space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-sky-300">
                        <span>{pyq.exam} {pyq.bookletCode ? `(Set ${pyq.bookletCode})` : ''}</span>
                        <span className="bg-sky-950 px-2 py-0.5 rounded border border-sky-500/30">Q.{pyq.questionNumber || '—'}</span>
                      </div>
                      <p className="font-medium text-slate-100 whitespace-pre-line">
                        {pyq.questionText}
                      </p>
                      <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 text-xs">
                        <span className="font-bold text-emerald-400">Answer: {pyq.correctAnswer}</span>
                        <p className="text-slate-400 mt-1">{pyq.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-dashed border-slate-700 text-xs text-slate-400 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-300">Practice questions available in Unit Quizzes.</span>
                    <p className="mt-0.5">MCQs are consolidated into the dedicated Unit-Wise Quiz section for focused practice.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-10">
          <div className="flex items-center space-x-2">
            {prevTopic && (
              <button
                onClick={() => openTopicLesson(prevTopic)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1 border border-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev:</span>
                <span className="truncate max-w-[120px]">{prevTopic.title}</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleComplete}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
                isCompleted 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isCompleted ? 'Completed ✓' : 'Mark Topic Complete (+10 XP)'}</span>
            </button>

            {nextTopic && (
              <button
                onClick={() => openTopicLesson(nextTopic)}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm flex items-center space-x-1.5 border border-slate-700"
              >
                <span>Next Topic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
