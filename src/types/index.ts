export type PriorityLevel = 'A' | 'B' | 'C';

export interface FillBlankItem {
  question: string; // e.g. "The normal form that eliminates partial dependency is ______."
  answer: string;   // e.g. "2NF" or "Second Normal Form"
  hint?: string;
  explanation: string;
}

export interface McqOption {
  id: string;
  text: string;
}

export interface McqItem {
  question: string;
  options: McqOption[];
  correctOptionId: string;
  explanation: string;
  examTag?: string; // e.g. "MH-SET 2024", "MH-SET 2025", "Standard MH-SET Pattern"
}

export interface PyqItem {
  id: string;
  exam: string; // e.g. "MH-SET APR-2024 Paper-I" or "MH-SET CS Paper-II"
  year: number;
  bookletCode?: string;
  questionNumber?: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface DetailedStudyNotes {
  summaryPoints: string[];       // In-depth concept explanation points
  coreFormulas?: string[];       // Mathematical equations, complexities, rules
  examTraps?: string[];          // Common MH-SET traps & distractor warnings
  keyDefinitions?: { term: string; definition: string }[]; // Key vocabulary
}

export interface SyllabusSubtopic {
  id: string;
  title: string;
  unitId: number;
  paperType: 'paper1' | 'paper2';
  priority: PriorityLevel; // A: First 7 days, B: If time permits, C: Revisit post week-1
  estimatedMinutes: number; // 3 - 10 mins
  dayAssigned?: number; // 1 to 7

  // The Mandatory Teaching Components:
  // A. One-line explanation
  oneLineExplanation: string;
  // B. Remember this (mnemonic, formula, trick, comparison)
  mnemonicTrick: {
    title: string;
    trick: string;
    meaning: string;
  };
  // C. Fill in the blank
  fillInBlanks: FillBlankItem[];
  // D. Quick MCQ
  quickMcq: McqItem;
  // E. Quick revision (3 short key facts)
  quickFacts: [string, string, string];
  // F. PYQ connection
  pyqs: PyqItem[];
  // G. Deep-Dive Revision Notes & Exam Master Points
  detailedNotes?: DetailedStudyNotes;
}

export interface SyllabusUnit {
  id: number;
  title: string;
  codeName: string;
  paperType: 'paper1' | 'paper2';
  priorityDay?: number; // 1 to 7 if in primary 7-day plan
  description: string;
  topics: SyllabusSubtopic[];
}

export interface DayPlan {
  day: number;
  title: string;
  paper2FocusUnit: number;
  paper2UnitName: string;
  paper1FocusTopic: string;
  description: string;
  priorityTopicIds: string[];
  targetDurationMinutes: number;
}

export interface UserProgress {
  completedTopics: string[]; // topic IDs
  solvedBlanks: { [blankKey: string]: { answered: boolean; isCorrect: boolean; userAnswer?: string } };
  mcqResults: { [topicId: string]: { selectedOptionId: string; isCorrect: boolean } };
  bookmarkedTopics: string[];
  weakTopics: string[]; // auto-added or manually flagged
  currentDay: number;
  uploadedPapers: UploadedPaperMetadata[];
}

export interface UploadedPaperMetadata {
  id: string;
  fileName: string;
  uploadDate: string;
  paperType: 'paper1' | 'paper2';
  year: number;
  bookletCode: string;
  questionsExtractedCount: number;
  detectedTopicsCount: number;
  status: 'analyzed' | 'processing';
}
