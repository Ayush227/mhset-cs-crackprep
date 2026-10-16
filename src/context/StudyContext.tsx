import React, { createContext, useContext, useState, useEffect } from 'react';
import { SyllabusSubtopic, SyllabusUnit, UserProgress, PriorityLevel, UploadedPaperMetadata, DayPlan } from '../types';
import { paper2Units } from '../data/paper2Units';
import { paper1Units } from '../data/paper1Units';
import { initialSevenDayPlan } from '../data/sevenDayPlan';

interface StudyContextType {
  // Data
  allUnits: SyllabusUnit[];
  paper1UnitsList: SyllabusUnit[];
  paper2UnitsList: SyllabusUnit[];
  sevenDayPlan: DayPlan[];
  allTopics: SyllabusSubtopic[];
  
  // State
  progress: UserProgress;
  currentDay: number;
  activeTopic: SyllabusSubtopic | null;
  activeTab: 'dashboard' | 'paper2' | 'paper1' | 'blanks' | 'mnemonics' | 'pyqs' | 'mocktest' | 'explanations';
  searchQuery: string;
  filterPriority: PriorityLevel | 'ALL';

  // Actions
  setActiveTab: (tab: 'dashboard' | 'paper2' | 'paper1' | 'blanks' | 'mnemonics' | 'pyqs' | 'mocktest' | 'explanations') => void;
  openTopicLesson: (topic: SyllabusSubtopic) => void;
  closeTopicLesson: () => void;
  markTopicComplete: (topicId: string) => void;
  recordBlankAnswer: (topicId: string, index: number, isCorrect: boolean, userAnswer: string) => void;
  recordMcqAnswer: (topicId: string, selectedOptionId: string, isCorrect: boolean) => void;
  toggleBookmark: (topicId: string) => void;
  toggleWeakTopic: (topicId: string) => void;
  setCurrentDay: (day: number) => void;
  setSearchQuery: (query: string) => void;
  setFilterPriority: (priority: PriorityLevel | 'ALL') => void;
  updateTopicPriority: (topicId: string, newPriority: PriorityLevel) => void;
  uploadPaper: (paperMeta: UploadedPaperMetadata, analyzedKeywords?: string[]) => void;
  resetProgress: () => void;
  
  // Computed helpers
  getTopicById: (id: string) => SyllabusSubtopic | undefined;
  getUnitById: (id: number) => SyllabusUnit | undefined;
  completedCount: number;
  totalTopicsCount: number;
  accuracyRate: number;
}

const STORAGE_KEY = 'mhset_cs_crackprep_v1_progress';
const CUSTOM_PRIORITIES_KEY = 'mhset_cs_crackprep_v1_priorities';

const initialUploadedPapers: UploadedPaperMetadata[] = [
  {
    id: 'mhset-2024-p1',
    fileName: 'MH-SET-2024-Paper-I-APR00124.pdf',
    uploadDate: 'Verified System Archive',
    paperType: 'paper1',
    year: 2024,
    bookletCode: 'A',
    questionsExtractedCount: 50,
    detectedTopicsCount: 14,
    status: 'analyzed'
  },
  {
    id: 'mhset-2025-p1',
    fileName: 'MH-SET-2025-Paper-I-JUN00125.pdf',
    uploadDate: 'Verified System Archive',
    paperType: 'paper1',
    year: 2025,
    bookletCode: 'A',
    questionsExtractedCount: 50,
    detectedTopicsCount: 15,
    status: 'analyzed'
  }
];

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage for progress
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return {
      completedTopics: [],
      solvedBlanks: {},
      mcqResults: {},
      bookmarkedTopics: [],
      weakTopics: [],
      currentDay: 1,
      uploadedPapers: initialUploadedPapers
    };
  });

  // Local storage for custom priority overrides (e.g. after uploading PYQs)
  const [priorityOverrides, setPriorityOverrides] = useState<{ [topicId: string]: PriorityLevel }>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_PRIORITIES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load priorities from localStorage', e);
    }
    return {};
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'paper2' | 'paper1' | 'blanks' | 'mnemonics' | 'pyqs' | 'mocktest' | 'explanations'>('dashboard');
  const [activeTopic, setActiveTopic] = useState<SyllabusSubtopic | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<PriorityLevel | 'ALL'>('ALL');

  // Sync progress to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  // Sync priority overrides to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_PRIORITIES_KEY, JSON.stringify(priorityOverrides));
    } catch (e) {
      console.error('Failed to save priorities to localStorage', e);
    }
  }, [priorityOverrides]);

  // Apply priority overrides to units & subtopics
  const applyOverridesToUnits = (units: SyllabusUnit[]): SyllabusUnit[] => {
    return units.map(unit => ({
      ...unit,
      topics: unit.topics.map(topic => ({
        ...topic,
        priority: priorityOverrides[topic.id] || topic.priority
      }))
    }));
  };

  const paper2UnitsList = applyOverridesToUnits(paper2Units);
  const paper1UnitsList = applyOverridesToUnits(paper1Units);
  const allUnits = [...paper2UnitsList, ...paper1UnitsList];

  const allTopics: SyllabusSubtopic[] = allUnits.flatMap(unit => unit.topics);

  const getTopicById = (id: string) => allTopics.find(t => t.id === id);
  const getUnitById = (id: number) => allUnits.find(u => u.id === id);

  const markTopicComplete = (topicId: string) => {
    setProgress(prev => {
      const isAlreadyCompleted = prev.completedTopics.includes(topicId);
      const newCompleted = isAlreadyCompleted
        ? prev.completedTopics.filter(id => id !== topicId)
        : [...prev.completedTopics, topicId];
      return { ...prev, completedTopics: newCompleted };
    });
  };

  const recordBlankAnswer = (topicId: string, index: number, isCorrect: boolean, userAnswer: string) => {
    const key = `${topicId}_blank_${index}`;
    setProgress(prev => {
      const newWeak = !isCorrect && !prev.weakTopics.includes(topicId)
        ? [...prev.weakTopics, topicId]
        : prev.weakTopics;
      return {
        ...prev,
        solvedBlanks: {
          ...prev.solvedBlanks,
          [key]: { answered: true, isCorrect, userAnswer }
        },
        weakTopics: newWeak
      };
    });
  };

  const recordMcqAnswer = (topicId: string, selectedOptionId: string, isCorrect: boolean) => {
    setProgress(prev => {
      const newWeak = !isCorrect && !prev.weakTopics.includes(topicId)
        ? [...prev.weakTopics, topicId]
        : prev.weakTopics;
      return {
        ...prev,
        mcqResults: {
          ...prev.mcqResults,
          [topicId]: { selectedOptionId, isCorrect }
        },
        weakTopics: newWeak
      };
    });
  };

  const toggleBookmark = (topicId: string) => {
    setProgress(prev => ({
      ...prev,
      bookmarkedTopics: prev.bookmarkedTopics.includes(topicId)
        ? prev.bookmarkedTopics.filter(id => id !== topicId)
        : [...prev.bookmarkedTopics, topicId]
    }));
  };

  const toggleWeakTopic = (topicId: string) => {
    setProgress(prev => ({
      ...prev,
      weakTopics: prev.weakTopics.includes(topicId)
        ? prev.weakTopics.filter(id => id !== topicId)
        : [...prev.weakTopics, topicId]
    }));
  };

  const setCurrentDay = (day: number) => {
    setProgress(prev => ({ ...prev, currentDay: day }));
  };

  const updateTopicPriority = (topicId: string, newPriority: PriorityLevel) => {
    setPriorityOverrides(prev => ({
      ...prev,
      [topicId]: newPriority
    }));
  };

  const uploadPaper = (paperMeta: UploadedPaperMetadata, analyzedKeywords: string[] = []) => {
    setProgress(prev => ({
      ...prev,
      uploadedPapers: [paperMeta, ...prev.uploadedPapers]
    }));

    // If keywords match syllabus topics, elevate their priority dynamically
    if (analyzedKeywords.length > 0) {
      setPriorityOverrides(prev => {
        const next = { ...prev };
        analyzedKeywords.forEach(kw => {
          allTopics.forEach(t => {
            if (
              t.title.toLowerCase().includes(kw.toLowerCase()) ||
              t.oneLineExplanation.toLowerCase().includes(kw.toLowerCase())
            ) {
              // Upgrade to Priority A if recurring
              next[t.id] = 'A';
            }
          });
        });
        return next;
      });
    }
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress data?')) {
      const fresh: UserProgress = {
        completedTopics: [],
        solvedBlanks: {},
        mcqResults: {},
        bookmarkedTopics: [],
        weakTopics: [],
        currentDay: 1,
        uploadedPapers: initialUploadedPapers
      };
      setProgress(fresh);
      setPriorityOverrides({});
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(CUSTOM_PRIORITIES_KEY);
    }
  };

  const openTopicLesson = (topic: SyllabusSubtopic) => {
    setActiveTopic(topic);
  };

  const closeTopicLesson = () => {
    setActiveTopic(null);
  };

  // Computed metrics
  const completedCount = progress.completedTopics.length;
  const totalTopicsCount = allTopics.length;
  const mcqEntries = Object.values(progress.mcqResults);
  const correctMcqs = mcqEntries.filter(m => m.isCorrect).length;
  const accuracyRate = mcqEntries.length > 0 ? Math.round((correctMcqs / mcqEntries.length) * 100) : 0;

  return (
    <StudyContext.Provider
      value={{
        allUnits,
        paper1UnitsList,
        paper2UnitsList,
        sevenDayPlan: initialSevenDayPlan,
        allTopics,
        progress,
        currentDay: progress.currentDay,
        activeTopic,
        activeTab,
        searchQuery,
        filterPriority,
        setActiveTab,
        openTopicLesson,
        closeTopicLesson,
        markTopicComplete,
        recordBlankAnswer,
        recordMcqAnswer,
        toggleBookmark,
        toggleWeakTopic,
        setCurrentDay,
        setSearchQuery,
        setFilterPriority,
        updateTopicPriority,
        uploadPaper,
        resetProgress,
        getTopicById,
        getUnitById,
        completedCount,
        totalTopicsCount,
        accuracyRate
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
