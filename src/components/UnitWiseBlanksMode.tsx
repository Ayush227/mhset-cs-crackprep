import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  HelpCircle, 
  Eye, 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles,
  BookOpen,
  ArrowRight,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const UnitWiseBlanksMode: React.FC = () => {
  const { allUnits, progress, recordBlankAnswer, setActiveTab } = useStudy();

  // Focus Units: 4, 5, 6, 9, 10, 7 + Paper 1 units
  const [activeUnitId, setActiveUnitId] = useState<number>(4);
  const [revealedKeys, setRevealedKeys] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  const currentUnit = allUnits.find(u => u.id === activeUnitId) || allUnits[0];

  // Collect all blanks for this entire unit
  const unitBlanks = currentUnit.topics.flatMap(topic =>
    topic.fillInBlanks.map((item, idx) => ({
      key: `${topic.id}_blank_${idx}`,
      topic,
      blankIndex: idx,
      ...item
    }))
  );

  const handleCheckSingle = (blankKey: string, topicId: string, index: number, correctAnswer: string) => {
    const userVal = (inputValues[blankKey] || '').trim();
    const isCorrect = userVal.toLowerCase() === correctAnswer.toLowerCase();
    recordBlankAnswer(topicId, index, isCorrect, userVal);
    setRevealedKeys(prev => ({ ...prev, [blankKey]: true }));

    if (isCorrect) {
      try {
        confetti({ particleCount: 25, spread: 45, origin: { y: 0.8 } });
      } catch (e) {}
    }
  };

  const handleToggleReveal = (blankKey: string) => {
    setRevealedKeys(prev => ({ ...prev, [blankKey]: !prev[blankKey] }));
  };

  const handleCheckAllUnit = () => {
    let anyCorrect = false;
    unitBlanks.forEach(blank => {
      const userVal = (inputValues[blank.key] || '').trim();
      if (userVal) {
        const isCorrect = userVal.toLowerCase() === blank.answer.toLowerCase();
        recordBlankAnswer(blank.topic.id, blank.blankIndex, isCorrect, userVal);
        setRevealedKeys(prev => ({ ...prev, [blank.key]: true }));
        if (isCorrect) anyCorrect = true;
      }
    });

    if (anyCorrect) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  const handleRevealAllUnit = () => {
    const allRev: { [k: string]: boolean } = {};
    unitBlanks.forEach(b => {
      allRev[b.key] = true;
    });
    setRevealedKeys(allRev);
  };

  // Unit completion metrics
  const unitCorrectCount = unitBlanks.filter(b => progress.solvedBlanks[b.key]?.isCorrect).length;
  const unitProgressPercent = unitBlanks.length > 0 ? Math.round((unitCorrectCount / unitBlanks.length) * 100) : 0;

  // 6 Focus Units list + Paper 1
  const focusUnitList = [
    { id: 4, label: 'Unit 4: DBMS', day: 'Day 1' },
    { id: 5, label: 'Unit 5: Operating System', day: 'Day 2' },
    { id: 6, label: 'Unit 6: Software Engg', day: 'Day 3' },
    { id: 9, label: 'Unit 9: Networks', day: 'Day 4' },
    { id: 10, label: 'Unit 10: Artificial Intelligence', day: 'Day 5' },
    { id: 7, label: 'Unit 7: Data Structures (DSA)', day: 'Day 6' },
    { id: 101, label: 'Paper 1: Teaching Aptitude', day: 'Daily P1' },
    { id: 102, label: 'Paper 1: Research Aptitude', day: 'Daily P1' },
    { id: 104, label: 'Paper 1: Communication', day: 'Daily P1' },
    { id: 108, label: 'Paper 1: ICT & Tech', day: 'Daily P1' },
    { id: 109, label: 'Paper 1: Environment & SDGs', day: 'Daily P1' },
    { id: 110, label: 'Paper 1: Higher Education', day: 'Daily P1' },
    { id: 105, label: 'Paper 1: Math & Reasoning', day: 'Daily P1' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-sky-500/30 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Dedicated Unit-Wise Active Recall</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Unit-Wise Fill-in-the-Blanks Drill
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every fill-in-the-blank for the selected unit consolidated in one continuous master sheet. 
            Test and drill core terms, normal forms, formulas, and laws without topic fragmentation.
          </p>
        </div>

        {/* Unit Mastery Score Card */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center space-x-4 self-start md:self-auto flex-shrink-0 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Unit Score</div>
            <div className="text-xl font-extrabold text-emerald-400 font-mono">
              {unitCorrectCount} / {unitBlanks.length} Mastered ({unitProgressPercent}%)
            </div>
          </div>
        </div>
      </div>

      {/* 6 FOCUS UNITS SELECTOR TABS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-200">Select Focus Unit to Drill:</span>
          <span>Showing 6 Core Focus Units + Paper 1</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {focusUnitList.slice(0, 6).map(unit => {
            const isSelected = unit.id === activeUnitId;
            return (
              <button
                key={unit.id}
                onClick={() => { setActiveUnitId(unit.id); setRevealedKeys({}); }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-sky-600/30 border-sky-400 text-white shadow-lg ring-1 ring-sky-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className={isSelected ? 'text-sky-300' : 'text-slate-400'}>{unit.day}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-sky-400" />}
                </div>
                <div className="text-xs font-extrabold text-white truncate mt-1">
                  {unit.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Paper 1 Pill Selector */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-2 scrollbar-none">
          <span className="text-[11px] font-bold uppercase text-purple-400 px-2 py-1 bg-purple-950/40 rounded-lg border border-purple-500/20 flex-shrink-0">
            Paper 1 Units:
          </span>
          {focusUnitList.slice(6).map(unit => {
            const isSelected = unit.id === activeUnitId;
            return (
              <button
                key={unit.id}
                onClick={() => { setActiveUnitId(unit.id); setRevealedKeys({}); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {unit.label.replace('Paper 1: ', '')}
              </button>
            );
          })}
        </div>
      </div>

      {/* UNIT HEADER & GLOBAL ACTIONS */}
      <div className="bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-sky-400 uppercase">
            {currentUnit.codeName}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            {currentUnit.title} — All Fill-in-the-Blanks ({unitBlanks.length} Items)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentUnit.description}
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleCheckAllUnit}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/30 transition-all flex items-center space-x-1.5"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Check All Answered</span>
          </button>
          <button
            onClick={handleRevealAllUnit}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Reveal All</span>
          </button>
          <button
            onClick={() => setActiveTab('explanations')}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Read Unit Notes</span>
          </button>
        </div>
      </div>

      {/* CONTINUOUS MASTER BLANKS LIST */}
      <div className="space-y-4">
        {unitBlanks.map((item, index) => {
          const isRevealed = revealedKeys[item.key];
          const savedResult = progress.solvedBlanks[item.key];
          const isAnsweredCorrect = savedResult?.answered && savedResult?.isCorrect;

          return (
            <div 
              key={item.key}
              className={`p-5 rounded-2xl border transition-all ${
                isAnsweredCorrect 
                  ? 'bg-slate-900/40 border-emerald-500/30 ring-1 ring-emerald-500/20' 
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-md'
              }`}
            >
              <div className="space-y-3">
                
                {/* Blank Header & Question Text */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                      isAnsweredCorrect 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <span className="text-[11px] text-slate-400 font-medium">
                        Subtopic: <span className="text-slate-300">{item.topic.title}</span>
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                        {item.question}
                      </p>
                      {item.hint && !isRevealed && (
                        <p className="text-xs text-slate-400 italic">
                          Hint: {item.hint}
                        </p>
                      )}
                    </div>
                  </div>

                  {isAnsweredCorrect && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1 flex-shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Mastered</span>
                    </span>
                  )}
                </div>

                {/* Input & Reveal Action */}
                <div className="flex flex-wrap items-center gap-2 pt-2 sm:pl-10">
                  <input
                    type="text"
                    placeholder="Type your answer here..."
                    value={inputValues[item.key] !== undefined ? inputValues[item.key] : (savedResult?.userAnswer || '')}
                    onChange={(e) => setInputValues(prev => ({ ...prev, [item.key]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCheckSingle(item.key, item.topic.id, item.blankIndex, item.answer);
                      }
                    }}
                    className="bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 flex-1 min-w-[200px]"
                  />
                  <button
                    onClick={() => handleCheckSingle(item.key, item.topic.id, item.blankIndex, item.answer)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition-colors"
                  >
                    Check
                  </button>
                  <button
                    onClick={() => handleToggleReveal(item.key)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isRevealed ? 'Hide Answer' : 'Reveal Answer'}</span>
                  </button>
                </div>

                {/* Answer & Explanation Box */}
                {(isRevealed || savedResult?.answered) && (
                  <div className="mt-2 p-3.5 rounded-xl bg-slate-950/90 border border-sky-500/30 text-xs sm:text-sm space-y-1.5 animate-fade-in sm:ml-10">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-300">Official Correct Answer:</span>
                      <span className="font-mono text-emerald-400 font-extrabold text-sm bg-emerald-950/70 px-2.5 py-0.5 rounded border border-emerald-500/40">
                        {item.answer}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-xs">
                      {item.explanation}
                    </p>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
