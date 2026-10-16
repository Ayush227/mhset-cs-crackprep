import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Check, 
  ArrowRight 
} from 'lucide-react';

interface SyllabusDirectoryProps {
  defaultPaper?: 'paper1' | 'paper2';
}

export const SyllabusDirectory: React.FC<SyllabusDirectoryProps> = ({ defaultPaper = 'paper2' }) => {
  const { 
    paper2UnitsList, 
    paper1UnitsList, 
    openTopicLesson, 
    progress, 
    markTopicComplete,
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority
  } = useStudy();

  const [activePaper, setActivePaper] = useState<'paper1' | 'paper2'>(defaultPaper);
  const unitsToDisplay = activePaper === 'paper2' ? paper2UnitsList : paper1UnitsList;

  // Filter topics based on search & priority
  const matchesSearch = (text: string) => text.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
              Official Maharashtra SET Syllabus
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              6 Focus Units Sprint
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-heading mt-1">
            {activePaper === 'paper2' ? 'Paper 2: CS Focus Units (Code 37)' : 'Paper 1: General Paper on Teaching & Research'}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {activePaper === 'paper2' 
              ? 'High-yield curriculum covering the 6 core units: DBMS (U4), Operating System (U5), Software Engineering (U6), Computer Networks (U9), AI (U10), and Data Structures (U7).' 
              : 'Core high-frequency topics covering Paper 1 units with verified questions from 2024 and 2025 question papers.'}
          </p>
        </div>

        {/* Paper Toggle Switch */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActivePaper('paper2')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activePaper === 'paper2'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Paper 2 (Computer Science)
          </button>
          <button
            onClick={() => setActivePaper('paper1')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activePaper === 'paper1'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Paper 1 (General)
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Priority Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterPriority('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterPriority === 'ALL'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            All Priorities
          </button>
          <button
            onClick={() => setFilterPriority('A')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 ${
              filterPriority === 'A'
                ? 'bg-rose-500/30 text-rose-200 border border-rose-500/50'
                : 'bg-slate-900 text-rose-400/80 hover:bg-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>Priority A (First 7 Days)</span>
          </button>
          <button
            onClick={() => setFilterPriority('B')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 ${
              filterPriority === 'B'
                ? 'bg-amber-500/30 text-amber-200 border border-amber-500/50'
                : 'bg-slate-900 text-amber-400/80 hover:bg-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Priority B (If Time Permits)</span>
          </button>
          <button
            onClick={() => setFilterPriority('C')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 ${
              filterPriority === 'C'
                ? 'bg-slate-700/50 text-slate-200 border border-slate-600'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span>Priority C (Post Week 1)</span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within units..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-6">
        {unitsToDisplay.map((unit) => {
          // Filter subtopics
          const filteredTopics = unit.topics.filter(topic => {
            const matchesPriority = filterPriority === 'ALL' || topic.priority === filterPriority;
            const matchesQuery = !searchQuery || 
              matchesSearch(topic.title) || 
              matchesSearch(topic.oneLineExplanation) || 
              matchesSearch(topic.mnemonicTrick.trick);
            return matchesPriority && matchesQuery;
          });

          if (filteredTopics.length === 0 && searchQuery) return null;

          const unitCompletedCount = unit.topics.filter(t => progress.completedTopics.includes(t.id)).length;

          return (
            <div 
              key={unit.id} 
              className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all"
            >
              {/* Unit Header Bar */}
              <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {unit.codeName}
                    </span>
                    {unit.priorityDay && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Sprint Day {unit.priorityDay} Focus
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white font-heading">
                    {unit.title}
                  </h2>
                  <p className="text-xs text-slate-400 max-w-3xl">
                    {unit.description}
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{unitCompletedCount}/{unit.topics.length} Mastered</span>
                  </span>
                </div>
              </div>

              {/* Subtopics Grid / List */}
              <div className="divide-y divide-slate-800/80">
                {filteredTopics.map((topic) => {
                  const isDone = progress.completedTopics.includes(topic.id);
                  const isBookmarked = progress.bookmarkedTopics.includes(topic.id);
                  const isWeak = progress.weakTopics.includes(topic.id);

                  return (
                    <div
                      key={topic.id}
                      className="p-4 hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group"
                    >
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <button
                          onClick={() => markTopicComplete(topic.id)}
                          title={isDone ? "Mark as Incomplete" : "Mark as Completed"}
                          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                            isDone 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'border-slate-600 hover:border-indigo-400 bg-slate-950'
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>

                        <div 
                          onClick={() => openTopicLesson(topic)}
                          className="cursor-pointer space-y-1 flex-1 min-w-0"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              topic.priority === 'A' 
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                                : topic.priority === 'B' 
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}>
                              Priority {topic.priority}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{topic.estimatedMinutes}m</span>
                            </span>
                            {isWeak && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                Weak Topic
                              </span>
                            )}
                            {isBookmarked && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                Bookmarked
                              </span>
                            )}
                          </div>

                          <h3 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-indigo-300 transition-colors">
                            {topic.title}
                          </h3>

                          <p className="text-xs text-slate-400 line-clamp-1">
                            {topic.oneLineExplanation}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 self-end sm:self-auto flex-shrink-0">
                        <button
                          onClick={() => openTopicLesson(topic)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center space-x-1 transition-all"
                        >
                          <span>Open Lesson</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
