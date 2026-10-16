import React, { useState, useEffect } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  Award, 
  Clock, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RevisionTestModalProps {
  onClose?: () => void;
}

export const RevisionTestModal: React.FC<RevisionTestModalProps> = () => {
  const { allTopics, recordMcqAnswer } = useStudy();

  // Generate 15-question test from all topics
  const testQuestions = React.useMemo(() => {
    return allTopics.map(t => ({
      topicId: t.id,
      topicTitle: t.title,
      paperType: t.paperType,
      unitId: t.unitId,
      ...t.quickMcq
    })).slice(0, 15);
  }, [allTopics]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIndex: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(15 * 60); // 15 mins

  // Countdown timer
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = testQuestions[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optId }));
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    // Record results into StudyContext
    testQuestions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      if (selected) {
        const isCorrect = selected === q.correctOptionId;
        recordMcqAnswer(q.topicId, selected, isCorrect);
      }
    });

    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Score metrics
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  testQuestions.forEach((q, idx) => {
    const sel = selectedAnswers[idx];
    if (!sel) {
      unattemptedCount++;
    } else if (sel === q.correctOptionId) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / testQuestions.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Test Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Day 7 & Daily Revision Practice</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-heading mt-1">
            Mixed 15-Question Sprint Mock Test
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real exam simulation covering both Paper 2 Computer Science and Paper 1.
          </p>
        </div>

        {/* Timer & Submit */}
        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <div className="flex items-center space-x-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 font-mono text-sm">
            <Clock className={`w-4 h-4 ${timeLeftSeconds < 180 ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
            <span className={timeLeftSeconds < 180 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
              {formatTime(timeLeftSeconds)}
            </span>
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitTest}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedAnswers({});
                setIsSubmitted(false);
                setTimeLeftSeconds(15 * 60);
                setCurrentIndex(0);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center space-x-1.5 border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>
          )}
        </div>
      </div>

      {/* Result Card if Submitted */}
      {isSubmitted && (
        <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-xl animate-fade-in space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Test Evaluation Report
              </span>
              <h2 className="text-2xl font-extrabold text-white font-heading mt-0.5">
                Score: {correctCount * 2} / {testQuestions.length * 2} Marks ({scorePercentage}%)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {scorePercentage >= 60 
                  ? 'Great performance! Your high-yield concept foundation is strong.' 
                  : 'Good effort! Focus on reviewing the questions marked in red below to improve retention.'}
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <span className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                ✓ {correctCount} Correct
              </span>
              <span className="px-3 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                ✗ {wrongCount} Incorrect
              </span>
              <span className="px-3 py-2 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 font-semibold">
                — {unattemptedCount} Skipped
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Question Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left: Question Box (3 Cols) */}
        <div className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-lg">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Question {currentIndex + 1} of {testQuestions.length}
              </span>
              <span className="text-xs text-slate-400">
                {currentQ.paperType === 'paper2' ? `CS Unit ${currentQ.unitId}` : 'Paper 1'}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {currentQ.topicTitle}
            </span>
          </div>

          <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
            {currentQ.question}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map(option => {
              const isSelected = selectedAnswers[currentIndex] === option.id;
              const isCorrectAnswer = option.id === currentQ.correctOptionId;

              let btnStyle = "bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-600";
              if (isSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/50";
                } else if (isSelected) {
                  btnStyle = "bg-rose-950/70 border-rose-500 text-rose-200";
                }
              } else if (isSelected) {
                btnStyle = "bg-indigo-600/30 border-indigo-500 text-white font-semibold ring-1 ring-indigo-500/60";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm flex items-start space-x-3 transition-all ${btnStyle}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                    isSubmitted && isCorrectAnswer 
                      ? 'bg-emerald-500 text-white' 
                      : isSelected 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {option.id}
                  </span>
                  <span className="pt-0.5">{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation if Submitted */}
          {isSubmitted && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm space-y-1 animate-fade-in">
              <span className="font-bold text-emerald-400">Explanation:</span>
              <p className="text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold flex items-center space-x-1 border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              disabled={currentIndex === testQuestions.length - 1}
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center space-x-1"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right: Question Navigation Matrix (1 Col) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg self-start">
          <h3 className="font-heading font-bold text-sm text-white">
            Question Palette
          </h3>

          <div className="grid grid-cols-5 gap-2">
            {testQuestions.map((q, idx) => {
              const isSelected = selectedAnswers[idx] !== undefined;
              const isCurrent = idx === currentIndex;
              const isCorrect = selectedAnswers[idx] === q.correctOptionId;

              let badgeStyle = "bg-slate-950 text-slate-400 border-slate-800";
              if (isSubmitted) {
                if (isCorrect) {
                  badgeStyle = "bg-emerald-600 text-white border-emerald-500 font-bold";
                } else if (isSelected) {
                  badgeStyle = "bg-rose-600 text-white border-rose-500 font-bold";
                } else {
                  badgeStyle = "bg-slate-800 text-slate-500 border-slate-700";
                }
              } else if (isSelected) {
                badgeStyle = "bg-indigo-600 text-white border-indigo-500 font-bold";
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-lg border text-xs flex items-center justify-center font-mono transition-all ${badgeStyle} ${
                    isCurrent ? 'ring-2 ring-white scale-105' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400 space-y-1.5 pt-3 border-t border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-indigo-600" />
              <span>Answered</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-slate-950 border border-slate-700" />
              <span>Unattempted</span>
            </div>
            {isSubmitted && (
              <>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-emerald-600" />
                  <span>Correct</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-rose-600" />
                  <span>Incorrect</span>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
