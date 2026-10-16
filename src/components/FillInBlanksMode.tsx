import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  HelpCircle, 
  Eye, 
  Award, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FillInBlanksMode: React.FC = () => {
  const { allTopics, progress, recordBlankAnswer, openTopicLesson } = useStudy();

  const [selectedUnitId, setSelectedUnitId] = useState<number | 'ALL'>('ALL');
  const [filterMode, setFilterMode] = useState<'ALL' | 'UNANSWERED' | 'WEAK'>('ALL');
  const [revealedKeys, setRevealedKeys] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  // Flatten all blanks with their topic context
  const allBlanks = allTopics.flatMap(topic => 
    topic.fillInBlanks.map((item, idx) => ({
      key: `${topic.id}_blank_${idx}`,
      topic,
      blankIndex: idx,
      ...item
    }))
  );

  // Apply filters
  const filteredBlanks = allBlanks.filter(blank => {
    if (selectedUnitId !== 'ALL' && blank.topic.unitId !== selectedUnitId) return false;
    
    const saved = progress.solvedBlanks[blank.key];
    if (filterMode === 'UNANSWERED' && saved?.answered) return false;
    if (filterMode === 'WEAK' && (!saved?.answered || saved?.isCorrect)) return false;

    return true;
  });

  const handleCheck = (blankKey: string, topicId: string, index: number, correctAnswer: string) => {
    const userVal = (inputValues[blankKey] || '').trim();
    const isCorrect = userVal.toLowerCase() === correctAnswer.toLowerCase();
    recordBlankAnswer(topicId, index, isCorrect, userVal);
    setRevealedKeys(prev => ({ ...prev, [blankKey]: true }));

    if (isCorrect) {
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      } catch (e) {}
    }
  };

  const handleToggleReveal = (blankKey: string) => {
    setRevealedKeys(prev => ({ ...prev, [blankKey]: !prev[blankKey] }));
  };

  const solvedCount = Object.values(progress.solvedBlanks).filter(b => b.answered && b.isCorrect).length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Bar */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Active-Recall Drill</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-heading mt-1">
            Fill-in-the-Blank Learning Mode
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Test and cement core terms, laws, and definitions without multiple-choice crutches. 
            Type your guess or click "Reveal Answer" for instant clarity and explanations.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800 self-start md:self-auto">
          <Award className="w-8 h-8 text-amber-400" />
          <div>
            <div className="text-xs text-slate-400 font-medium">Blanks Mastered</div>
            <div className="text-lg font-extrabold text-emerald-400 font-mono">
              {solvedCount} / {allBlanks.length}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterMode('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterMode === 'ALL' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Blanks ({allBlanks.length})
          </button>
          <button
            onClick={() => setFilterMode('UNANSWERED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterMode === 'UNANSWERED' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Unanswered Only
          </button>
          <button
            onClick={() => setFilterMode('WEAK')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterMode === 'WEAK' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-rose-300 hover:bg-slate-700'
            }`}
          >
            Needs Practice (Incorrect)
          </button>
        </div>

        {/* Unit Selector */}
        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedUnitId}
            onChange={(e) => setSelectedUnitId(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Syllabus Units</option>
            <option value="4">Unit 4: DBMS (Day 1 Focus)</option>
            <option value="5">Unit 5: Operating System (Day 2 Focus)</option>
            <option value="6">Unit 6: Software Engineering (Day 3 Focus)</option>
            <option value="9">Unit 9: Computer Networks (Day 4 Focus)</option>
            <option value="10">Unit 10: Artificial Intelligence (Day 5 Focus)</option>
            <option value="7">Unit 7: Data Structures & Algorithms (Day 6 Focus)</option>
            <option value="1">Unit 1: Discrete Structures</option>
            <option value="2">Unit 2: Architecture (COA)</option>
            <option value="3">Unit 3: Programming & Graphics</option>
            <option value="8">Unit 8: TOC & Compilers</option>
            <option value="101">Paper 1: Teaching Aptitude</option>
            <option value="102">Paper 1: Research Aptitude</option>
            <option value="104">Paper 1: Communication</option>
            <option value="108">Paper 1: ICT</option>
            <option value="109">Paper 1: Environment & SDGs</option>
            <option value="110">Paper 1: Higher Education</option>
            <option value="105">Paper 1: Math & Reasoning</option>
          </select>
        </div>
      </div>

      {/* Blanks Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBlanks.map((item) => {
          const isRevealed = revealedKeys[item.key];
          const savedResult = progress.solvedBlanks[item.key];

          return (
            <div 
              key={item.key}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg hover:border-sky-500/40 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/20">
                    {item.topic.paperType === 'paper2' ? `CS Unit ${item.topic.unitId}` : 'Paper 1'}
                  </span>
                  <button 
                    onClick={() => openTopicLesson(item.topic)}
                    className="text-slate-400 hover:text-white underline text-[11px]"
                  >
                    {item.topic.title}
                  </button>
                </div>

                <p className="text-sm font-medium text-slate-100 leading-relaxed pt-1">
                  {item.question}
                </p>

                {item.hint && !isRevealed && (
                  <p className="text-xs text-slate-400 italic">
                    Hint: {item.hint}
                  </p>
                )}
              </div>

              {/* Input & Reveal Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Enter missing term..."
                    value={inputValues[item.key] !== undefined ? inputValues[item.key] : (savedResult?.userAnswer || '')}
                    onChange={(e) => setInputValues(prev => ({ ...prev, [item.key]: e.target.value }))}
                    className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 flex-1"
                  />
                  <button
                    onClick={() => handleCheck(item.key, item.topic.id, item.blankIndex, item.answer)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition-colors"
                  >
                    Check
                  </button>
                  <button
                    onClick={() => handleToggleReveal(item.key)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    title={isRevealed ? "Hide Answer" : "Reveal Answer"}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Answer Display */}
                {(isRevealed || savedResult?.answered) && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-sky-500/30 text-xs space-y-1.5 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold text-slate-300">Answer:</span>
                        <span className="font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          {item.answer}
                        </span>
                      </div>
                      {savedResult && (
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          savedResult.isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {savedResult.isCorrect ? 'Correct ✓' : 'Needs Review ✗'}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredBlanks.length === 0 && (
        <div className="text-center py-12 text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
          <p className="font-semibold text-slate-200">No blanks match this filter!</p>
          <p className="text-xs text-slate-500 mt-1">Switch filter mode or unit selector above to continue practicing.</p>
        </div>
      )}

    </div>
  );
};
