# 🚀 SET 7-Day Crack Prep — Computer Science (MH-SET Code 37)

An intensive, beginner-friendly learning and revision web app designed for cracking the **Maharashtra State Eligibility Test (MH-SET) for Lectureship — Computer Science & Applications (Code 37)** in a focused 7-day sprint.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2D7?logo=tailwindcss)
![Lucide-Icons](https://img.shields.io/badge/Lucide-Icons-orange)

---

## 🎯 Target Audience & Strategy
Designed specifically for Computer Science aspirants preparing with limited time (7-day timeline). The curriculum focuses 100% on the **top 6 scoring units** from the official MH-SET Code 37 syllabus, cutting low-yield bulk and emphasizing:
- **One-line intuitive explanations**
- **Short tricks, mnemonics & formulas**
- **Active-recall Fill-in-the-Blanks (Consolidated unit-wise)**
- **Dedicated Unit-Wise Quizzes & Instant Scoring**
- **Deep-Dive Study Notes (Concept Breakdowns, Math Formulas, MH-SET Exam Traps, Key Definitions)**
- **Offline PYQ PDF upload and pattern analysis**

---

## 📑 The 6 High-Yield Focus Units (32 Topics)

| Unit | Title | Key Topics Covered |
| :--- | :--- | :--- |
| **Unit 4** | **Database Management Systems (DBMS)** | Normalization (1NF–BCNF), ACID & Concurrency Control, Relational Algebra & SQL Optimization, ER Diagrams & 3-Schema Architecture, Data Warehousing & OLAP Cubes (Apriori), NoSQL & Big Data (Hadoop HDFS). |
| **Unit 5** | **System Software & Operating System** | Deadlocks & Banker's Algorithm, CPU Scheduling, Virtual Memory & Page Replacement, Disk Scheduling (SSTF/SCAN) & RAID, Process Synchronization & Semaphores (Peterson's, IPC), System Software (Compilers, Loaders, Linkers). |
| **Unit 6** | **Software Engineering** | SDLC Models & Agile Scrum, Modularity (Coupling & Cohesion), Software Testing (White/Black Box, Cyclomatic Complexity), COCOMO Cost Estimation & Function Points, Quality Models (ISO 9126, McCall) & RMMM. |
| **Unit 9** | **Data Communication & Computer Networks** | OSI Reference Model & Network Devices, IPv4 Subnetting (CIDR) & Routing (Distance Vector/Link State), TCP vs UDP & Sliding Window, Error Detection (CRC, Hamming) & Channel Capacity (Nyquist/Shannon), Protocols (ARP, ICMP, IPv6) & Network Cryptography (RSA). |
| **Unit 10** | **Artificial Intelligence** | A* Heuristic Search & Minimax/Alpha-Beta Pruning, Fuzzy Logic (Membership, Defuzzification), Neural Networks (Perceptrons, MLP, Backprop), Knowledge Representation (Frames, Scripts) & STRIPS Planning, Genetic Algorithms (GA) & Expert Systems. |
| **Unit 7** | **Data Structures and Algorithms** | Asymptotic Notations & Master Theorem, Balanced Trees (BST, AVL, B-Tree, B+ Tree), Graph Algorithms (Kruskal, Prim, Dijkstra), Sorting/Searching Complexities & Hashing Collision Resolution, Dynamic Programming vs Greedy & NP-Completeness. |

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS, Lucide React
- **State Management**: Local state with browser `localStorage` persistence for completed topics, flashcards, blanks, and quiz scores
- **PDF Extraction**: Integrated `pdfjs-dist` for client-side MH-SET PYQ paper ingestion and syllabus keyword frequency analysis

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Ayush227/mhset-cs-crackprep.git
cd mhset-cs-crackprep
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🧠 Features

1. **7-Day Sprint Planner**: Step-by-step daily study roadmap with countdown timer and progress tracking.
2. **6 Focus Units & Deep-Dive Study Notes**: 32 curated topics with formulas, cheat-sheets, and MH-SET exam traps.
3. **Unit-Wise Blanks Drill**: 87+ interactive active-recall fill-in-the-blanks grouped by unit.
4. **Memory Tricks Vault**: Mnemonic flashcards to memorize hard rules quickly.
5. **Unit Quizzes & Full Mock**: Real-time timer, answer explanations, score breakdown, and question review.
6. **PYQ Archive & Priority Calculator**: Drag-and-drop past year papers to analyze topic weightage.

---

## 📄 License
MIT License. Created for MH-SET Computer Science aspirants.
