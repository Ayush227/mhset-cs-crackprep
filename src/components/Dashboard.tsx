import React from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  AlertTriangle, 
  BookOpen, 
  ArrowRight, 
  HelpCircle, 
  UploadCloud, 
  Award, 
  Clock, 
  Info, 
  ChevronRight, 
  Flame, 
  Check 
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    currentDay, 
    setCurrentDay, 
    sevenDayPlan, 
    progress, 
    allTopics, 
    openTopicLesson, 
    setActiveTab
  } = useStudy();

  const activeDayPlan = sevenDayPlan.find(p => p.day === currentDay) || sevenDayPlan[0];

  // Topics for today's plan
  const todayTopics = activeDayPlan.priorityTopicIds
    .map(id => allTopics.find(t => t.id === id))
    .filter(Boolean) as typeof allTopics;

  // Find next incomplete topic to "Continue Learning"
  const nextUnfinishedTopic = todayTopics.find(t => !progress.completedTopics.includes(t.id)) ||
    allTopics.find(t => !progress.completedTopics.includes(t.id)) ||
    todayTopics[0];

  const todayCompletedCount = todayTopics.filter(t => progress.completedTopics.includes(t.id)).length;
  const todayProgressPercent = todayTopics.length > 0 ? Math.round((todayCompletedCount / todayTopics.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* REALITY DISCLAIMER BANNER (Mandatory) */}
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5 shadow-md">
        <Info className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
          <strong className="text-amber-100 font-semibold block text-sm mb-0.5">
            Important Candidate Reality Check & Preparation Notice
          </strong>
          This 7-day curriculum is strictly focused on the 6 highest-yield priority units (Unit 4 DBMS, Unit 5 OS, Unit 6 SE, Unit 9 Networks, Unit 10 AI, Unit 7 DSA) + Paper 1. 
          Units 1, 2, 3, and 8 have been removed to concentrate your preparation on the most heavily weighted scoring topics.
        </div>
      </div>

      {/* HERO SECTION: Current Day Progress & Continue Learning */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/80 via-slate-900 to-slate-950 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Day {currentDay} of 7 Study Sprint</span>
              <span>•</span>
              <span>{activeDayPlan.targetDurationMinutes} Mins Allocated</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              {activeDayPlan.title}
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {activeDayPlan.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Today's Target: {todayCompletedCount}/{todayTopics.length} completed</span>
              </span>
              <div className="w-32 bg-slate-800 rounded-full h-2">
                <div 
                  className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${todayProgressPercent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-emerald-400">{todayProgressPercent}%</span>
            </div>
          </div>

          {/* Continue Learning CTA */}
          <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
            {nextUnfinishedTopic && (
              <button
                onClick={() => openTopicLesson(nextUnfinishedTopic)}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-500/25 flex items-center justify-center space-x-3 group transition-all transform hover:scale-[1.02]"
              >
                <Play className="w-5 h-5 fill-current text-white group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] text-indigo-200 uppercase font-bold tracking-wider">Continue Learning</div>
                  <div className="text-sm font-semibold truncate max-w-[200px]">{nextUnfinishedTopic.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            <button
              onClick={() => setActiveTab('mocktest')}
              className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Take Quick Practice Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7-DAY SCHEDULE SELECTOR PILLS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-bold text-white flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span>7-Day Structured Plan</span>
          </h2>
          <span className="text-xs text-slate-400">Click any day to view or switch schedule</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {sevenDayPlan.map(plan => {
            const isSelected = plan.day === currentDay;
            const planTopics = plan.priorityTopicIds.map(id => allTopics.find(t => t.id === id)).filter(Boolean);
            const isDayFinished = planTopics.length > 0 && planTopics.every(t => progress.completedTopics.includes(t!.id));

            return (
              <button
                key={plan.day}
                onClick={() => setCurrentDay(plan.day)}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-indigo-600/30 border-indigo-500 shadow-lg shadow-indigo-600/20 ring-1 ring-indigo-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isSelected ? 'text-indigo-300' : 'text-slate-400'}`}>
                    Day {plan.day}
                  </span>
                  {isDayFinished && (
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-white truncate">
                  {plan.day === 7 ? 'Grand Revision' : plan.paper2UnitName.replace('Unit ', 'U')}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  + P1 Lesson
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TODAY'S LESSONS: PAPER 2 COMPUTER SCIENCE & PAPER 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Today's Specific Lessons */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-heading font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>Today's Priority Lessons (Day {currentDay})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Each topic is taught using one-liners, mnemonics, fill-in-the-blanks, and quick MCQs (3-10 min each).
              </p>
            </div>
            <span className="text-xs font-medium text-indigo-400">
              {todayTopics.length} Topics Scheduled
            </span>
          </div>

          <div className="space-y-3">
            {todayTopics.map((topic, index) => {
              const isTopicDone = progress.completedTopics.includes(topic.id);
              const isBookmarked = progress.bookmarkedTopics.includes(topic.id);
              const isWeak = progress.weakTopics.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => openTopicLesson(topic)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group flex items-start justify-between gap-4 ${
                    isTopicDone 
                      ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 opacity-80' 
                      : 'bg-slate-900/80 border-slate-700/80 hover:border-indigo-500/60 hover:shadow-lg hover:shadow-indigo-500/10'
                  }`}
                >
                  <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                      isTopicDone 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 group-hover:scale-105 transition-transform'
                    }`}>
                      {isTopicDone ? <Check className="w-4 h-4" /> : index + 1}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          topic.paperType === 'paper2' 
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {topic.paperType === 'paper2' ? `CS U${topic.unitId}` : 'Paper 1'}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{topic.estimatedMinutes}m</span>
                        </span>
                        {isWeak && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                            Weak Topic
                          </span>
                        )}
                        {isBookmarked && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                            Bookmarked
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-indigo-300 transition-colors truncate">
                        {topic.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-1">
                        {topic.oneLineExplanation}
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-center space-x-2 mt-2">
                    <span className="text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center">
                      <span className="hidden sm:inline mr-1">Study</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Quick Revision & Action Widgets */}
        <div className="space-y-6">
          
          {/* Weak Topics Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Weak Topics Tracker</span>
              </h3>
              <span className="text-xs font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-500/30">
                {progress.weakTopics.length}
              </span>
            </div>

            {progress.weakTopics.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-400">
                  Topics where an MCQ or blank was answered incorrectly:
                </p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {progress.weakTopics.map(id => {
                    const topic = allTopics.find(t => t.id === id);
                    if (!topic) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => openTopicLesson(topic)}
                        className="w-full text-left p-2 rounded-lg bg-slate-950/70 hover:bg-slate-800 border border-rose-500/20 text-xs text-slate-200 truncate flex items-center justify-between"
                      >
                        <span className="truncate">{topic.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                No weak topics flagged yet! When you miss an MCQ or blank, it is automatically cataloged here for revision.
              </p>
            )}
          </div>

          {/* Quick Learning Modes Shortcut */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-heading font-bold text-sm text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Speed Revision Shortcuts</span>
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('explanations')}
                className="w-full p-2.5 rounded-xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 hover:from-indigo-900 hover:to-purple-900 border border-indigo-500/40 text-left text-xs text-slate-200 flex items-center justify-between group transition-colors shadow-md"
              >
                <div className="flex items-center space-x-2.5">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <div>
                    <span className="font-bold block text-white">6 Focus Units Explanations</span>
                    <span className="text-[11px] text-indigo-200">Master notes: DBMS, OS, SE, CN, AI, DSA</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-indigo-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('blanks')}
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-700/80 text-left text-xs text-slate-200 flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <HelpCircle className="w-4 h-4 text-sky-400" />
                  <div>
                    <span className="font-semibold block text-white">Unit-Wise Blanks Master Drill</span>
                    <span className="text-[11px] text-slate-400">All blanks for the unit in one place</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('mocktest')}
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-700/80 text-left text-xs text-slate-200 flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-semibold block text-white">Dedicated Unit Quizzes & Mock</span>
                    <span className="text-[11px] text-slate-400">Timed MCQs filtered unit-by-unit</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('mnemonics')}
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-700/80 text-left text-xs text-slate-200 flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="font-semibold block text-white">Smart Memory Tricks Deck</span>
                    <span className="text-[11px] text-slate-400">OSI, Deadlocks, ACID & Codd</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 6 Focus Units Overview Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-heading font-bold text-sm text-white flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>6 High-Yield Focus Units</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Targeted focus on U4 (DBMS), U5 (OS), U6 (SE), U9 (Networks), U10 (AI), and U7 (DSA). Other units removed to maximize your revision efficiency.
            </p>
            <button
              onClick={() => setActiveTab('explanations')}
              className="w-full py-2 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>Browse 6 Focus Units</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
