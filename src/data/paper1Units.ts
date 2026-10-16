import { SyllabusUnit } from '../types';

export const paper1Units: SyllabusUnit[] = [
  {
    id: 101,
    title: 'Unit 1: Teaching Aptitude',
    codeName: 'P1-U1',
    paperType: 'paper1',
    description: 'Levels of teaching, learner characteristics, evaluation systems, and modern digital initiatives like SWAYAM.',
    topics: [
      {
        id: 'p1-levels-of-teaching',
        title: 'Levels of Teaching (Memory, Understanding & Reflective)',
        unitId: 101,
        paperType: 'paper1',
        priority: 'A',
        estimatedMinutes: 5,
        dayAssigned: 1,
        oneLineExplanation: 'Memory level focuses on rote recall of facts, Understanding level focuses on grasping concepts, and Reflective level develops critical problem-solving and deep insight.',
        mnemonicTrick: {
          title: 'MUR Hierarchy',
          trick: 'M-U-R (Memory = Memorize, Understanding = Underlying logic, Reflective = Real problem solving)',
          meaning: 'Memory level (Herbart) drills factual recall; Understanding level (Morrison) builds insight into relationships; Reflective level (Hunt) empowers independent problem-solving.'
        },
        fillInBlanks: [
          {
            question: 'Teaching at the memory level gives students tremendous power for the acquisition of ______ information.',
            answer: 'factual',
            hint: 'Recall without deep reasoning',
            explanation: 'Memory level of teaching (Herbart) primarily equips learners with the acquisition of factual information and rote retention.'
          },
          {
            question: 'The highest level of teaching that fosters creative problem-solving and critical evaluation is known as the ______ level.',
            answer: 'reflective',
            hint: 'Hunt\'s level',
            explanation: 'Reflective level of teaching develops open-ended, problem-solving, and critical thinking capabilities.'
          }
        ],
        quickMcq: {
          question: 'If taught at the memory level of teaching, what do students primarily acquire tremendous power for?',
          options: [
            { id: 'A', text: 'Generalized insight' },
            { id: 'B', text: 'Factual information' },
            { id: 'C', text: 'Problem solving abilities' },
            { id: 'D', text: 'Critical evaluation' }
          ],
          correctOptionId: 'B',
          explanation: 'Memory level teaching emphasizes the rote acquisition and retention of factual information.',
          examTag: 'MH-SET APR-2024 Paper-I Q.1'
        },
        quickFacts: [
          'Memory level proposed by Herbart; focuses on pure recall of facts.',
          'Understanding level proposed by Morrison; focuses on comprehension and generalization.',
          'Reflective level proposed by Hunt; focuses on problem formulation and solving.'
        ],
        pyqs: [
          {
            id: 'pyq-p1-apr24-1',
            exam: 'MH-SET APR-2024 Paper-I',
            year: 2024,
            bookletCode: 'A',
            questionNumber: 1,
            questionText: 'If taught on memory level of teaching, the students get tremendous power for acquisition of:\n(i) factual information\n(ii) generalized insight\n(iii) problem solving abilities',
            options: ['Only (ii)', 'Only (i)', '(i) and (ii)', '(ii) and (iii)'],
            correctAnswer: 'Only (i)',
            explanation: 'Memory level instruction strictly trains the learner to retain factual information.'
          },
          {
            id: 'pyq-p1-jun25-1',
            exam: 'MH-SET JUN-2025 Paper-I',
            year: 2025,
            bookletCode: 'A',
            questionNumber: 1,
            questionText: 'If taught on reflective level of teaching, the students get tremendous power for acquisition of:\n(i) Factual information\n(ii) Generalized insight\n(iii) Problem solving abilities',
            options: ['(i) and (ii)', '(i) and (iii)', '(ii) and (iii)', '(i), (ii) and (iii)'],
            correctAnswer: '(ii) and (iii)',
            explanation: 'Reflective level develops generalized insight together with creative problem solving abilities.'
          }
        ]
      },
      {
        id: 'p1-evaluation-systems',
        title: 'Evaluation Systems (Formative, Summative, Diagnostic & Placement)',
        unitId: 101,
        paperType: 'paper1',
        priority: 'A',
        estimatedMinutes: 5,
        dayAssigned: 1,
        oneLineExplanation: 'Formative evaluation guides ongoing learning during instruction, whereas Summative evaluation judges overall terminal achievement at the end.',
        mnemonicTrick: {
          title: 'Chef vs Guest Tasting',
          trick: 'Formative = Cook tasting the soup while cooking; Summative = Guest judging the soup at dinner.',
          meaning: 'Formative provides continuous feedback during instruction; Summative provides final grading/certification; Diagnostic identifies specific persistent learning difficulties.'
        },
        fillInBlanks: [
          {
            question: 'Evaluation conducted during the instructional process to provide continuous student feedback is called ______ evaluation.',
            answer: 'formative',
            hint: 'Occurs during learning',
            explanation: 'Formative evaluation is developmental and monitors learning progress during instruction.'
          },
          {
            question: 'Evaluation that gives a clear idea about a student\'s specific learning gaps and misconceptions is ______ evaluation.',
            answer: 'diagnostic',
            hint: 'Like a medical diagnosis',
            explanation: 'Diagnostic evaluation pinpoints underlying learning difficulties and conceptual gaps.'
          }
        ],
        quickMcq: {
          question: 'Summative evaluation is primarily characterized as being ______ in nature.',
          options: [
            { id: 'A', text: 'Judgemental' },
            { id: 'B', text: 'Developmental' },
            { id: 'C', text: 'Diagnostic' },
            { id: 'D', text: 'Formative' }
          ],
          correctOptionId: 'A',
          explanation: 'Summative evaluation assesses end-of-course performance to award grades or certificates, making it judgmental.',
          examTag: 'MH-SET JUN-2025 Paper-I Q.4'
        },
        quickFacts: [
          'Placement evaluation determines entry-level knowledge before instruction starts.',
          'Formative evaluation provides ongoing corrective feedback to learners and teachers.',
          'Summative evaluation evaluates terminal competence and is judgmental in nature.'
        ],
        pyqs: [
          {
            id: 'pyq-p1-apr24-5',
            exam: 'MH-SET APR-2024 Paper-I',
            year: 2024,
            bookletCode: 'A',
            questionNumber: 5,
            questionText: '______ evaluation gives a clear idea about understanding of the student regarding particular content.',
            options: ['Placement', 'Formative', 'Summative', 'Diagnostic'],
            correctAnswer: 'Diagnostic',
            explanation: 'Diagnostic assessment identifies specific strengths and weaknesses in understanding particular content.'
          }
        ]
      },
      {
        id: 'p1-digital-initiatives-swayam',
        title: 'Digital Initiatives: SWAYAM & SWAYAMPRABHA',
        unitId: 101,
        paperType: 'paper1',
        priority: 'A',
        estimatedMinutes: 5,
        dayAssigned: 1,
        oneLineExplanation: 'SWAYAM is an indigenous online MOOC platform with credit transfers, while SWAYAMPRABHA is a consortium of 24x7 DTH educational TV channels.',
        mnemonicTrick: {
          title: 'Web vs Dish',
          trick: 'SWAYAM = Web Portal (MOOCs & Credits); PRABHA = Prabhat/Light from Dish Satellite (DTH Channels)',
          meaning: 'SWAYAM hosts interactive web courses for credit; SWAYAMPRABHA broadcasts high quality educational programs on television via GSAT-15.'
        },
        fillInBlanks: [
          {
            question: 'SWAYAMPRABHA is a group of educational DTH channels telecasting high-quality programs using the ______ satellite.',
            answer: 'GSAT-15',
            hint: 'ISRO communications satellite',
            explanation: 'SWAYAMPRABHA transmits 24/7 educational TV broadcasts via GSAT-15 transponders.'
          },
          {
            question: 'CAI in computer-supported pedagogy stands for Computer Assisted ______.',
            answer: 'Instruction',
            hint: 'Teaching guidance',
            explanation: 'CAI stands for Computer Assisted Instruction.'
          }
        ],
        quickMcq: {
          question: 'Which of the following institutes has NOT been appointed as a National Coordinator for SWAYAM?',
          options: [
            { id: 'A', text: 'Indian Institute of Science (IISc)' },
            { id: 'B', text: 'National Institute of Open Schooling (NIOS)' },
            { id: 'C', text: 'Indian Institute of Management, Bangalore (IIMB)' },
            { id: 'D', text: 'Consortium for Educational Communication (CEC)' }
          ],
          correctOptionId: 'A',
          explanation: 'There are 9 National Coordinators (AICTE, NPTEL, UGC, CEC, NCERT, NIOS, IGNOU, IIMB, NITTTR). IISc Bangalore is not one of them.',
          examTag: 'MH-SET APR-2024 Paper-I Q.39'
        },
        quickFacts: [
          'SWAYAM has 9 designated National Coordinators to ensure course quality.',
          'SWAYAM courses provide UGC-recognized credit transfer into university transcripts.',
          'CAI (Computer Assisted Instruction) customizes pace and feedback for individual learners.'
        ],
        pyqs: [
          {
            id: 'pyq-p1-jun25-3',
            exam: 'MH-SET JUN-2025 Paper-I',
            year: 2025,
            bookletCode: 'A',
            questionNumber: 3,
            questionText: '(i) "SWAYAMPRABHA" is a name given to a group of DTH channels devoted to telecasting educational content.\n(ii) "SWAYAM" provides online MOOC courses with a provision of certificate/credit-transfer.',
            options: ['(i) is correct but (ii) is wrong', '(i) is wrong but (ii) is correct', 'Both (i) and (ii) are correct', 'Both (i) and (ii) are wrong'],
            correctAnswer: 'Both (i) and (ii) are correct',
            explanation: 'Both statements accurately define the official Mandates of SWAYAM and SWAYAMPRABHA.'
          }
        ]
      }
    ]
  },
  {
    id: 102,
    title: 'Unit 2: Research Aptitude',
    codeName: 'P1-U2',
    paperType: 'paper1',
    description: 'Research methods, positivism vs post-positivism, research ethics, citations, DOI, and reference management.',
    topics: [
      {
        id: 'p1-research-types-positivism',
        title: 'Qualitative vs Quantitative Research & Positivism',
        unitId: 102,
        paperType: 'paper1',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 2,
        oneLineExplanation: 'Quantitative research relies on measurable empirical numbers and statistics, while Qualitative research explores deep subjective meanings, experiences, and contexts.',
        mnemonicTrick: {
          title: 'Numbers vs Narratives',
          trick: 'Quantitative = Quantities & Graphs; Qualitative = Quality of Life & Deep Narratives',
          meaning: 'Positivism applies natural science methods to social phenomena, but its main limitation is oversimplifying complex social realities.'
        },
        fillInBlanks: [
          {
            question: 'An in-depth exploration of human meanings, social contexts and lived experiences is the hallmark of ______ research.',
            answer: 'qualitative',
            hint: 'Non-numeric exploration',
            explanation: 'Qualitative research aims to understand social reality through subjective perspectives and deep descriptions.'
          },
          {
            question: 'A critical limitation of positivism is that it tends to ______ complex social phenomena into rigid numbers.',
            answer: 'oversimplify',
            hint: 'Reduce to bare facts',
            explanation: 'Positivism often overlooks cultural nuance and oversimplifies dynamic human behaviors.'
          }
        ],
        quickMcq: {
          question: 'What is a major acknowledged limitation of positivism in social research?',
          options: [
            { id: 'A', text: 'It ignores the importance of empirical evidence' },
            { id: 'B', text: 'It tends to oversimplify complex social phenomenon' },
            { id: 'C', text: 'It places too much emphasis on subjective interpretations' },
            { id: 'D', text: 'It encourages personal bias in research' }
          ],
          correctOptionId: 'B',
          explanation: 'Positivism reduces complex human experiences into mechanical variables, causing oversimplification.',
          examTag: 'MH-SET APR-2024 Paper-I Q.7'
        },
        quickFacts: [
          'Positivism uses deductive reasoning and objective measurement.',
          'Post-positivism recognizes that researcher background affects observations (probabilistic objectivity).',
          'Qualitative methods include ethnography, case studies, grounded theory, and phenomenology.'
        ],
        pyqs: [
          {
            id: 'pyq-p1-apr24-6',
            exam: 'MH-SET APR-2024 Paper-I',
            year: 2024,
            bookletCode: 'A',
            questionNumber: 6,
            questionText: '______ is the characteristic of qualitative research.',
            options: ['Emphasis on numerical data', 'Focus on statistical analysis', 'In-depth exploration of meanings and experiences', 'Strict adherence to experimental designs'],
            correctAnswer: 'In-depth exploration of meanings and experiences',
            explanation: 'Qualitative research focuses on deep semantic understanding rather than quantitative measurements.'
          }
        ]
      },
      {
        id: 'p1-research-ethics-citation',
        title: 'Research Ethics, Misconduct (FFP), Citations & DOI',
        unitId: 102,
        paperType: 'paper1',
        priority: 'A',
        estimatedMinutes: 5,
        dayAssigned: 2,
        oneLineExplanation: 'Research integrity requires acknowledging sources via citations and avoiding FFP: Fabrication (making up data), Falsification (manipulating data), and Plagiarism (stealing words).',
        mnemonicTrick: {
          title: 'The FFP Trap',
          trick: 'F-F-P = Fabricate (Fake data), Falsify (Forge data), Plagiarize (Pirate ideas)',
          meaning: 'DOI (Digital Object Identifier) uniquely IDs academic papers; Zotero/Mendeley are reference management tools.'
        },
        fillInBlanks: [
          {
            question: 'The research misconduct that involves making up fake results or artificial data is called ______.',
            answer: 'fabrication',
            hint: 'Manufacturing from thin air',
            explanation: 'Fabrication is creating fictitious data; Falsification is manipulating real data or results.'
          },
          {
            question: 'In academic research publishing, DOI stands for Digital Object ______.',
            answer: 'Identifier',
            hint: 'Persistent unique string',
            explanation: 'DOI stands for Digital Object Identifier.'
          }
        ],
        quickMcq: {
          question: 'Which software type is specifically designed for creating and managing bibliographies and citations in academic papers?',
          options: [
            { id: 'A', text: 'Statistical software' },
            { id: 'B', text: 'Reference management software' },
            { id: 'C', text: 'Spreadsheet software' },
            { id: 'D', text: 'Project management software' }
          ],
          correctOptionId: 'B',
          explanation: 'Reference management software (e.g., Zotero, Mendeley, EndNote) organizes bibliographic metadata and citations.',
          examTag: 'MH-SET APR-2024 Paper-I Q.10'
        },
        quickFacts: [
          'Fabrication is inventing data; Falsification is altering experiment records.',
          'Plagiarism is taking someone else’s work without proper citation or credit.',
          'Reference managers (Mendeley, Zotero) automatically format APA/MLA/IEEE citations.'
        ],
        pyqs: [
          {
            id: 'pyq-p1-jun25-9',
            exam: 'MH-SET JUN-2025 Paper-I',
            year: 2025,
            bookletCode: 'A',
            questionNumber: 9,
            questionText: 'The term "DOI" stands for ______ in academic writing and referencing.',
            options: ['Document of interest', 'Directory of information', 'Digital object identifier', 'Database of integration'],
            correctAnswer: 'Digital object identifier',
            explanation: 'DOI = Digital Object Identifier, providing permanent web persistence for articles.'
          }
        ]
      }
    ]
  },
  {
    id: 104,
    title: 'Unit 4: Communication',
    codeName: 'P1-U4',
    paperType: 'paper1',
    description: 'Types of communication (Intra, Inter, Group, Mass), non-verbal cues, silence, and Indian broadcasting history.',
    topics: [
      {
        id: 'p1-comm-types-models',
        title: 'Types of Communication & Non-Verbal Signals',
        unitId: 104,
        paperType: 'paper1',
        priority: 'A',
        estimatedMinutes: 5,
        dayAssigned: 3,
        oneLineExplanation: 'Communication is categorized by participant scale (Intrapersonal = self, Interpersonal = 2 people, Group = small collective, Mass = anonymous public).',
        mnemonicTrick: {
          title: 'I-I-G-M Ladder',
          trick: 'Intra (Inside self) -> Inter (In-between two) -> Group (Gathering) -> Mass (Media broadcast)',
          meaning: 'Classified purely by the "number of participants" involved.'
        },
        fillInBlanks: [
          {
            question: 'The criterion that classifies communication into Intra, Inter, Group, and Mass is the number of ______ in the communication process.',
            answer: 'participants',
            hint: 'People involved',
            explanation: 'Classification is strictly based on the participant headcount.'
          },
          {
            question: 'India\'s state-owned autonomous public service broadcaster established in 1997 is ______ Bharati.',
            answer: 'Prasar',
            hint: 'Encompassing Doordarshan and AIR',
            explanation: 'Prasar Bharati is India\'s statutory autonomous public service broadcaster comprising DD and AIR.'
          }
        ],
        quickMcq: {
          question: 'In the context of non-verbal communication, which statement is INCORRECT?',
          options: [
            { id: 'A', text: 'Silence is a means of communication' },
            { id: 'B', text: 'Non-verbal cues and messages are easy to control' },
            { id: 'C', text: 'Non-verbal messages are culture-sensitive and relative' },
            { id: 'D', text: 'In case of confusion, people tend to trust non-verbal cues over verbal cues' }
          ],
          correctOptionId: 'B',
          explanation: 'Non-verbal cues (pupil dilation, nervous twitching, micro-expressions) are involuntary and extremely difficult to control consciously.',
          examTag: 'MH-SET APR-2024 Paper-I Q.18'
        },
        quickFacts: [
          'Intrapersonal: meditation, self-reflection, internal dialogue.',
          'Non-verbal communication includes kinesics (body movement), proxemics (distance), and paralanguage.',
          'Iconic signs (visual pictograms) transcend linguistic barriers most reliably.'
        ],
        pyqs: [
          {
            id: 'pyq-p1-jun25-18',
            exam: 'MH-SET JUN-2025 Paper-I',
            year: 2025,
            bookletCode: 'A',
            questionNumber: 18,
            questionText: 'Which criterion produces "Intra", "Inter", "Group" and "Mass" as four types of communication?',
            options: ['Effectiveness of communication', 'Medium used in communication', 'Number of participants in communication', 'Nature of message of communication'],
            correctAnswer: 'Number of participants in communication',
            explanation: 'The categorization is based strictly on the number of participating communicators.'
          }
        ]
      }
    ]
  },
  {
    id: 108,
    title: 'Unit 8: Information and Communication Technology (ICT)',
    codeName: 'P1-U8',
    paperType: 'paper1',
    description: 'Cloud computing, internet protocols, file formats, Unicode encoding, and Web 2.0 participatory platforms.',
    topics: [
      {
        id: 'p1-cloud-unicode-web2',
        title: 'Cloud Computing, Unicode & Web 2.0 Concepts',
        unitId: 108,
        paperType: 'paper1',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 4,
        oneLineExplanation: 'Web 2.0 transformed users from passive readers into active creators of User Generated Content (UGC), while Unicode unifies global character encodings.',
        mnemonicTrick: {
          title: 'Web Evolution & UGC',
          trick: 'Web 1.0 = Read-only library; Web 2.0 = Read-Write-Share UGC; Unicode = Universal Code for every character.',
          meaning: 'In Web 2.0, UGC stands for User Generated Content. HTTPS ensures encrypted secure communication via SSL/TLS.'
        },
        fillInBlanks: [
          {
            question: 'In the context of the Web 2.0 ecosystem, the acronym UGC stands for User Generated ______.',
            answer: 'Content',
            hint: 'Content created by users',
            explanation: 'UGC refers to user-generated media, posts, blogs, and videos.'
          },
          {
            question: 'The international character encoding standard that assigns a unique number to every character across all languages is ______.',
            answer: 'Unicode',
            hint: 'Universal character encoding',
            explanation: 'Unicode provides a universal code point for all world scripts.'
          }
        ],
        quickMcq: {
          question: 'What is the primary meaning when a website URL begins with "https://" instead of "http://"?',
          options: [
            { id: 'A', text: 'You are accessing a high speed fiber connection' },
            { id: 'B', text: 'You are accessing a secure encrypted communication channel' },
            { id: 'C', text: 'You are accessing a smartphone friendly mobile website' },
            { id: 'D', text: 'You are accessing single date line transfer' }
          ],
          correctOptionId: 'B',
          explanation: 'HTTPS encrypts data in transit between the browser and web server using TLS/SSL cryptography.',
          examTag: 'MH-SET APR-2024 Paper-I Q.37'
        },
        quickFacts: [
          'Cloud computing provides on-demand internet delivery of computing power, storage, and databases.',
          'JPEG is Image; PPTX is Presentation; FLV is Video; MP3/WAV is Audio (WPT is not standard audio).',
          'Web 2.0 features rich user interactivity, social collaboration, and dynamic user contribution.'
        ],
        pyqs: [
          {
            id: 'pyq-p1-jun25-38',
            exam: 'MH-SET JUN-2025 Paper-I',
            year: 2025,
            bookletCode: 'A',
            questionNumber: 38,
            questionText: 'What is the name of the international encoding standard for use with different languages and scripts by which each letter, digit or symbol is assigned a unique numeric value?',
            options: ['Multicode', 'Unicode', 'Hypercode', 'Metacode'],
            correctAnswer: 'Unicode',
            explanation: 'Unicode assigns unique universal numeric codepoints for characters in any written language.'
          }
        ]
      }
    ]
  },
  {
    id: 109,
    title: 'Unit 9: People, Development and Environment',
    codeName: 'P1-U9',
    paperType: 'paper1',
    description: 'Millennium Development Goals (MDGs), SDGs (2030), Paris Agreement (COP21), Photochemical smog, and ISA.',
    topics: [
      {
        id: 'p1-mdg-sdg-pollution',
        title: 'MDGs, SDGs, Climate Treaties & Environmental Hazards',
        unitId: 109,
        paperType: 'paper1',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 5,
        oneLineExplanation: 'The UN adopted 8 MDGs in the year 2000 (target 2015), succeeded by 17 Sustainable Development Goals (SDGs) targeting 2030.',
        mnemonicTrick: {
          title: '2000 vs 2030 Milestones',
          trick: 'MDG = 2000 to 2015 (8 goals); SDG = 2015 to 2030 (17 goals)',
          meaning: 'ISA (International Solar Alliance) headquarters is at Gurugram (Haryana), India. Photochemical smog causes severe eye and respiratory irritation.'
        },
        fillInBlanks: [
          {
            question: 'The United Nations target year for achieving all 17 Sustainable Development Goals (SDGs) is ______.',
            answer: '2030',
            hint: 'Fifteen years from 2015',
            explanation: 'SDGs were adopted in 2015 with a global target completion year of 2030.'
          },
          {
            question: 'The global headquarters of the International Solar Alliance (ISA) is situated in the state of ______ in India.',
            answer: 'Haryana',
            hint: 'Gurugram',
            explanation: 'ISA headquarters is located at Gurugram, Haryana, India.'
          }
        ],
        quickMcq: {
          question: 'In which city was the United Nations Climate Change Conference (COP21) held where the landmark Paris Agreement was negotiated and adopted?',
          options: [
            { id: 'A', text: 'Geneva' },
            { id: 'B', text: 'New York' },
            { id: 'C', text: 'Paris' },
            { id: 'D', text: 'Kyoto' }
          ],
          correctOptionId: 'C',
          explanation: 'COP21 was hosted in Paris in December 2015, resulting in the Paris Agreement on climate mitigation.',
          examTag: 'MH-SET JUN-2025 Paper-I Q.42'
        },
        quickFacts: [
          'MDGs: 8 goals adopted in September 2000 at the UN Millennium Summit.',
          'SDGs: 17 goals, 169 targets adopted under the 2030 Agenda for Sustainable Development.',
          'Bioaugmentation: the inoculation of cultured microorganisms into soil or contaminated sites to clean pollutants.'
        ],
        pyqs: [
          {
            id: 'pyq-p1-apr24-41',
            exam: 'MH-SET APR-2024 Paper-I',
            year: 2024,
            bookletCode: 'A',
            questionNumber: 41,
            questionText: 'When were Millennium Development Goals (MDGs) adopted by the United Nations?',
            options: ['1990', '1995', '2000', '2010'],
            correctAnswer: '2000',
            explanation: 'MDGs were officially adopted in the year 2000.'
          }
        ]
      }
    ]
  },
  {
    id: 110,
    title: 'Unit 10: Higher Education System',
    codeName: 'P1-U10',
    paperType: 'paper1',
    description: 'Ancient Indian education traditions (Vedic, Buddhist, Jain), colonial reforms, and the modern university system.',
    topics: [
      {
        id: 'p1-ancient-colonial-higher-ed',
        title: 'Ancient Indian Learning Traditions & Colonial Education Commissions',
        unitId: 110,
        paperType: 'paper1',
        priority: 'A',
        estimatedMinutes: 5,
        dayAssigned: 5,
        oneLineExplanation: 'Ancient education followed Gurukul and monastic orders; the British era established formal universities following Wood\'s Despatch (1854) and Sadler Commission (1917).',
        mnemonicTrick: {
          title: 'Buddhist Hierarchy & Sadler Focus',
          trick: 'Shraman (Novice) -> Bhikkhu (Monk) -> Upadhyaya (Guru). Sadler = Calcutta University reform.',
          meaning: 'In Buddhist monastic universities (Nalanda/Taxila), promotion followed Shraman -> Bhikkhu -> Upadhyaya. The Sadler Commission (1917) investigated Calcutta University.'
        },
        fillInBlanks: [
          {
            question: 'The Sanskrit word "Upanishad" literally translates to "sitting ______ to learn".',
            answer: 'near',
            hint: 'Close proximity to the teacher',
            explanation: 'Upa (near) + ni (down) + shad (sit) = sitting near the Guru to receive esoteric wisdom.'
          },
          {
            question: 'The first Open University in the world was established in 1969 at Milton Keynes in ______.',
            answer: 'England',
            hint: 'United Kingdom',
            explanation: 'The UK Open University was established in 1969 at Milton Keynes, England.'
          }
        ],
        quickMcq: {
          question: 'The historic Sadler Commission (1917) was specifically set up to inquire into the conditions and problems of which university?',
          options: [
            { id: 'A', text: 'The University of Calcutta' },
            { id: 'B', text: 'Problems of all universities in India' },
            { id: 'C', text: 'Issues in evaluation of higher education' },
            { id: 'D', text: 'Issues in curriculum of higher education' }
          ],
          correctOptionId: 'A',
          explanation: 'The Sadler Commission (Calcutta University Commission) was created to resolve issues at Calcutta University and recommended intermediate college separation.',
          examTag: 'MH-SET JUN-2025 Paper-I Q.47'
        },
        quickFacts: [
          'In the Medieval Muslim education system, Maktab was for primary while Madarsa was for higher education.',
          'Lord Curzon organized the Simla Educational Conference in 1901.',
          'In Jain tradition, Deshana Shravan (careful listening of teachings) is the initial method of learning.'
        ],
        pyqs: [
          {
            id: 'pyq-p1-apr24-49',
            exam: 'MH-SET APR-2024 Paper-I',
            year: 2024,
            bookletCode: 'A',
            questionNumber: 49,
            questionText: 'The First Open University was started in 1969 at:\n(A) Chicago in America\n(B) Milton Kenis in England\n(C) Paris in France\n(D) Delhi in India',
            options: ['Chicago in America', 'Milton Kenis in England', 'Paris in France', 'Delhi in India'],
            correctAnswer: 'Milton Kenis in England',
            explanation: 'The Open University UK was founded in 1969 at Milton Keynes (spelled Milton Kenis in MH-SET question paper).'
          }
        ]
      }
    ]
  },
  {
    id: 105,
    title: 'Unit 5 & 6: Mathematical & Logical Reasoning',
    codeName: 'P1-U5U6',
    paperType: 'paper1',
    description: 'Syllogisms, average formulas, divisibility shortcuts, direction tests, and clock arithmetic.',
    topics: [
      {
        id: 'p1-arithmetic-logic-tricks',
        title: 'Quick Arithmetic Mean, Divisibility Rules & Time Arithmetic',
        unitId: 105,
        paperType: 'paper1',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 6,
        oneLineExplanation: 'Solve competitive math rapidly using arithmetic progression midpoints, factor divisibility tests, and 24-hour modular arithmetic.',
        mnemonicTrick: {
          title: 'Consecutive Average & 24h Clock',
          trick: 'Mean of 1 to N = (1 + N) / 2. For 1 to 51: (1 + 51)/2 = 26!',
          meaning: 'Divisibility by 18 requires two tests: number must be EVEN (last digit even) and sum of digits divisible by 9.'
        },
        fillInBlanks: [
          {
            question: 'The arithmetic mean of consecutive integers from 1 to 51 equals ______.',
            answer: '26',
            hint: '(1 + 51) / 2',
            explanation: 'For an arithmetic progression, Mean = (First + Last) / 2 = 52 / 2 = 26.'
          },
          {
            question: 'For a positive integer to be divisible by 18, it must simultaneously be divisible by 2 and ______.',
            answer: '9',
            hint: 'Sum of digits rule',
            explanation: '18 = 2 x 9, where gcd(2, 9) = 1. So it must be even and have digit sum divisible by 9.'
          }
        ],
        quickMcq: {
          question: 'A watch indicates Monday 1:00 PM. What time and day will it indicate after 101 hours have passed?',
          options: [
            { id: 'A', text: 'Monday, 1:00 AM' },
            { id: 'B', text: 'Tuesday, 4:00 AM' },
            { id: 'C', text: 'Thursday, 5:00 PM' },
            { id: 'D', text: 'Friday, 6:00 PM' }
          ],
          correctOptionId: 'D',
          explanation: '101 hours = (4 x 24 hours) + 5 hours. 4 days from Monday 1 PM is Friday 1 PM. Adding 5 more hours gives Friday 6:00 PM.',
          examTag: 'MH-SET JUN-2025 Paper-I Q.22'
        },
        quickFacts: [
          'Average of 1 to N is always (N + 1) / 2.',
          '101 hours modulo 24 = 4 full days + 5 hours.',
          'In syllogisms, "Some A are B" does NOT logically imply "Some A are not B" with certainty.'
        ],
        pyqs: [
          {
            id: 'pyq-p1-apr24-21',
            exam: 'MH-SET APR-2024 Paper-I',
            year: 2024,
            bookletCode: 'A',
            questionNumber: 21,
            questionText: 'What is the arithmetic mean of the integers from 1 to 51?',
            options: ['24', '25', '26', '27'],
            correctAnswer: '26',
            explanation: 'Mean = (1 + 51)/2 = 26.'
          }
        ]
      }
    ]
  }
];
