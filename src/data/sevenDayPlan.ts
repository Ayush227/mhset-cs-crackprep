import { DayPlan } from '../types';

export const initialSevenDayPlan: DayPlan[] = [
  {
    day: 1,
    title: 'Day 1: Database Management Systems & Teaching Aptitude',
    paper2FocusUnit: 4,
    paper2UnitName: 'Unit 4: Database Management Systems',
    paper1FocusTopic: 'Teaching Aptitude (Levels of Teaching, Evaluation & SWAYAM)',
    description: 'Master Database Normalization, ACID properties, Relational Algebra, ER Models, Data Warehousing (OLAP), and NoSQL/Big Data.',
    priorityTopicIds: [
      'dbms-normalization',
      'dbms-transactions-acid',
      'dbms-relational-algebra-sql',
      'dbms-er-schemas',
      'dbms-data-mining-warehousing',
      'dbms-nosql-bigdata',
      'p1-levels-of-teaching',
      'p1-evaluation-systems',
      'p1-digital-initiatives-swayam'
    ],
    targetDurationMinutes: 180
  },
  {
    day: 2,
    title: 'Day 2: Operating Systems & Research Aptitude',
    paper2FocusUnit: 5,
    paper2UnitName: 'Unit 5: System Software and Operating System',
    paper1FocusTopic: 'Research Aptitude (Qualitative vs Quantitative, Positivism, Misconduct FFP & Citations)',
    description: 'Nail Deadlock Banker\'s Algorithm, CPU Scheduling, Virtual Memory Paging, Disk RAID, Process Semaphores, and System Software.',
    priorityTopicIds: [
      'os-deadlocks',
      'os-cpu-scheduling',
      'os-virtual-memory-paging',
      'os-disk-scheduling-raid',
      'os-process-synchronization-semaphores',
      'os-system-software-loaders-linkers',
      'p1-research-types-positivism',
      'p1-research-ethics-citation'
    ],
    targetDurationMinutes: 180
  },
  {
    day: 3,
    title: 'Day 3: Software Engineering & Communication',
    paper2FocusUnit: 6,
    paper2UnitName: 'Unit 6: Software Engineering',
    paper1FocusTopic: 'Communication (Intra, Inter, Group, Mass & Non-Verbal Cues)',
    description: 'Conquer SDLC & Agile Scrum, Modularity (Coupling & Cohesion), Verification vs Validation, COCOMO estimation, and ISO Quality.',
    priorityTopicIds: [
      'se-sdlc-agile',
      'se-coupling-cohesion-design',
      'se-testing-verification-validation',
      'se-cocomo-cost-estimation',
      'se-quality-models-rmmm',
      'p1-comm-types-models'
    ],
    targetDurationMinutes: 180
  },
  {
    day: 4,
    title: 'Day 4: Computer Networks & ICT',
    paper2FocusUnit: 9,
    paper2UnitName: 'Unit 9: Data Communication and Computer Networks',
    paper1FocusTopic: 'ICT (Cloud Computing, Unicode Standards, File Formats & Web 2.0)',
    description: 'Crack OSI 7-layer hierarchy, IPv4 Subnetting, TCP vs UDP handshakes, CRC/Channel Capacity, and Network Cryptography.',
    priorityTopicIds: [
      'cn-osi-layers-devices',
      'cn-ipv4-subnetting-routing',
      'cn-tcp-udp-sliding-window',
      'cn-error-detection-channel-capacity',
      'cn-network-layer-cryptography',
      'p1-cloud-unicode-web2'
    ],
    targetDurationMinutes: 180
  },
  {
    day: 5,
    title: 'Day 5: Artificial Intelligence, Environment & Higher Education',
    paper2FocusUnit: 10,
    paper2UnitName: 'Unit 10: Artificial Intelligence',
    paper1FocusTopic: 'Environment (MDGs, SDGs 2030, ISA) & Higher Education (Ancient Systems & Commissions)',
    description: 'Master A* search heuristic admissibility, Fuzzy logic math, Perceptron XOR limitation, Knowledge Planning (STRIPS), and Genetic Algorithms.',
    priorityTopicIds: [
      'ai-heuristic-search-astar',
      'ai-fuzzy-logic-inference',
      'ai-neural-networks-backprop',
      'ai-knowledge-rep-planning',
      'ai-genetic-algorithms-expert-systems',
      'p1-mdg-sdg-pollution',
      'p1-ancient-colonial-higher-ed'
    ],
    targetDurationMinutes: 180
  },
  {
    day: 6,
    title: 'Day 6: Data Structures, Algorithms & Mathematical Reasoning',
    paper2FocusUnit: 7,
    paper2UnitName: 'Unit 7: Data Structures and Algorithms',
    paper1FocusTopic: 'Mathematical & Logical Reasoning (Averages, Divisibility by 18, Clock Angles, Syllogisms)',
    description: 'Solve Asymptotic Recurrences (Master Theorem), AVL balance factors, MST/Shortest paths, Sorting/Hashing, and NP-completeness.',
    priorityTopicIds: [
      'dsa-asymptotic-recurrences',
      'dsa-trees-avl-btree',
      'dsa-graph-algorithms',
      'dsa-sorting-searching-hashing',
      'dsa-dynamic-programming-greedy',
      'p1-arithmetic-logic-tricks'
    ],
    targetDurationMinutes: 180
  },
  {
    day: 7,
    title: 'Day 7: Grand 6-Unit Synthesis Revision & Mock Test',
    paper2FocusUnit: 0,
    paper2UnitName: 'Revision of all 6 Focus Units (DBMS, OS, SE, CN, AI, DSA)',
    paper1FocusTopic: 'Paper 1 Mixed Practice & Rapid Revision',
    description: 'Consolidate all one-liners, memorize crucial mnemonics, solve unit-wise fill-in-the-blanks, and take the 15-question sprint mock test.',
    priorityTopicIds: [
      'dbms-normalization',
      'os-deadlocks',
      'se-coupling-cohesion-design',
      'cn-osi-layers-devices',
      'ai-heuristic-search-astar',
      'dsa-asymptotic-recurrences'
    ],
    targetDurationMinutes: 240
  }
];
