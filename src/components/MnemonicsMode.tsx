import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  Sparkles, 
  Search, 
  ChevronRight
} from 'lucide-react';

export const MnemonicsMode: React.FC = () => {
  const { allTopics, openTopicLesson } = useStudy();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchMnemonic, setSearchMnemonic] = useState('');

  const filteredTopics = allTopics.filter(topic => {
    if (activeCategory === 'CS' && topic.paperType !== 'paper2') return false;
    if (activeCategory === 'P1' && topic.paperType !== 'paper1') return false;

    if (!searchMnemonic) return true;
    const q = searchMnemonic.toLowerCase();
    return (
      topic.mnemonicTrick.title.toLowerCase().includes(q) ||
      topic.mnemonicTrick.trick.toLowerCase().includes(q) ||
      topic.mnemonicTrick.meaning.toLowerCase().includes(q) ||
      topic.title.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 p-5 rounded-2xl border border-amber-500/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>High-Retention Memory Vault</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-heading mt-1">
            Smart Memory Tricks & Mnemonics
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Quick, scientifically grounded shortcuts for Maharashtra SET. Each mnemonic preserves strict technical correctness, 
            explaining underlying protocols, theorems, and hierarchies clearly.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeCategory === 'ALL' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
          >
            All Tricks
          </button>
          <button
            onClick={() => setActiveCategory('CS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeCategory === 'CS' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
          >
            Paper 2 (CS)
          </button>
          <button
            onClick={() => setActiveCategory('P1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeCategory === 'P1' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
          >
            Paper 1
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        <input
          type="text"
          value={searchMnemonic}
          onChange={(e) => setSearchMnemonic(e.target.value)}
          placeholder="Search mnemonics (e.g. OSI, ACID, Deadlock, Cohesion)..."
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Mnemonics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => {
          return (
            <div
              key={topic.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg hover:border-amber-500/40 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase">
                    {topic.paperType === 'paper2' ? `CS U${topic.unitId}` : 'Paper 1'}
                  </span>
                  <span className="text-xs text-slate-400 truncate max-w-[150px]">
                    {topic.title}
                  </span>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/20 space-y-1.5">
                  <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider block">
                    {topic.mnemonicTrick.title}
                  </span>
                  <p className="text-amber-100 font-mono text-xs sm:text-sm font-semibold leading-relaxed">
                    💡 {topic.mnemonicTrick.trick}
                  </p>
                </div>

                {/* Explanation */}
                <div className="text-xs text-slate-300 space-y-1">
                  <strong className="text-slate-100 block font-semibold">Technical Meaning:</strong>
                  <p className="leading-relaxed">
                    {topic.mnemonicTrick.meaning}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  One-liner: <span className="text-slate-200 truncate inline-block max-w-[160px] align-bottom">{topic.oneLineExplanation}</span>
                </span>
                
                <button
                  onClick={() => openTopicLesson(topic)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center space-x-1 transition-all"
                >
                  <span>Study</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
