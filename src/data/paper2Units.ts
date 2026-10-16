import type { SyllabusUnit } from '../types';

export const paper2Units: SyllabusUnit[] = [
  // ==========================================
  // UNIT 4: Database Management Systems (DAY 1 FOCUS)
  // ==========================================
  {
    id: 4,
    title: 'Unit 4: Database Management Systems',
    codeName: 'DBMS (Focus #1)',
    paperType: 'paper2',
    priorityDay: 1,
    description: 'Relational models, ER diagrams, Normalization (1NF to BCNF), SQL, Transactions, ACID, Concurrency Control, Data Warehousing, and NoSQL.',
    topics: [
      {
        id: 'dbms-normalization',
        title: 'Database Normalization (1NF, 2NF, 3NF & BCNF)',
        unitId: 4,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 1,
        oneLineExplanation: 'Normalization decomposes relational tables to eliminate data redundancy and prevent insertion, update, and deletion anomalies.',
        mnemonicTrick: {
          title: 'The Key Mnemonic',
          trick: '"Every non-key attribute must depend on the key (1NF), the whole key (2NF), and nothing but the key (3NF), so help me Codd (BCNF)!"',
          meaning: '1NF = Atomic values (no multi-valued attributes). 2NF = 1NF + No partial dependency. 3NF = 2NF + No transitive dependency. BCNF = Every non-trivial determinant is a superkey.'
        },
        fillInBlanks: [
          {
            question: 'The normal form that eliminates partial functional dependency on a candidate key is ______.',
            answer: '2NF',
            hint: 'Second normal form',
            explanation: '2NF requires tables to be in 1NF and guarantees that no non-prime attribute depends on a proper subset of candidate key.'
          },
          {
            question: 'In BCNF, for every non-trivial functional dependency X -> Y, X must strictly be a ______.',
            answer: 'superkey',
            hint: 'A key that uniquely identifies tuples',
            explanation: 'Boyce-Codd Normal Form requires that the determinant X is always a candidate key or superkey.'
          },
          {
            question: 'The normal form that guarantees lossless join decomposition and dependency preservation simultaneously is ______.',
            answer: '3NF',
            hint: 'Third normal form',
            explanation: '3NF decomposition is always dependency preserving and lossless-join capable, whereas BCNF may lose dependencies.'
          }
        ],
        quickMcq: {
          question: 'If a relation schema R has functional dependencies where a non-prime attribute determines another non-prime attribute, which normal form is violated?',
          options: [
            { id: 'A', text: '1NF' },
            { id: 'B', text: '2NF' },
            { id: 'C', text: '3NF' },
            { id: 'D', text: '4NF' }
          ],
          correctOptionId: 'C',
          explanation: 'Non-prime -> Non-prime creates a transitive dependency, which directly violates 3NF.',
          examTag: 'MH-SET CS Core Pattern'
        },
        quickFacts: [
          '1NF prohibits composite and multivalued attributes; all domain values must be atomic.',
          '3NF allows X -> Y if X is a superkey OR Y is a prime attribute (part of any candidate key).',
          'BCNF is strictly stronger than 3NF; every relation in BCNF is also in 3NF, but not vice versa.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Insertion Anomaly: Cannot insert parent/independent record without creating dummy values in related fields.',
            'Deletion Anomaly: Deleting one entity instance unintentionally erases vital secondary data (e.g., deleting a student deletes course information).',
            'Update Anomaly: Inconsistent updates across duplicate tuples when changes are not executed universally.',
            'Canonical Cover (Minimal Cover): Finding the minimal set of FDs equivalent to original set F, with extraneous attributes removed and single right-hand sides.',
            'Lossless Join Decomposition: Schema R decomposed into R1 and R2 is lossless if (R1 ∩ R2) -> R1 OR (R1 ∩ R2) -> R2.'
          ],
          coreFormulas: [
            'Lossless Condition: (R1 ∩ R2) -> (R1 - R2) or (R1 ∩ R2) -> (R2 - R1)',
            '3NF Condition: For X -> Y, either X is a superkey OR Y is a prime attribute',
            'BCNF Condition: For X -> Y, X must be a superkey (no exceptions for prime attributes)',
            'Maximum Sub-relations: Testing 4NF addresses Multivalued Dependencies (MVD: X ->-> Y)'
          ],
          examTraps: [
            'Do not assume BCNF preserves all dependencies! 3NF always guarantees dependency preservation, but BCNF decomposition sometimes sacrifices functional dependencies.',
            'Partial dependency only occurs when candidate key is COMPOSITE. If primary key is a single attribute, 1NF is automatically in 2NF!'
          ],
          keyDefinitions: [
            { term: 'Prime Attribute', definition: 'An attribute that is a member of any candidate key of the relation schema.' },
            { term: 'Transitive Dependency', definition: 'Functional dependency X -> Z where X -> Y and Y -> Z hold, and Y is not a candidate key.' }
          ]
        },
        pyqs: [
          {
            id: 'pyq-dbms-norm-1',
            exam: 'MH-SET CS Paper-II',
            year: 2024,
            questionNumber: 42,
            questionText: 'Which normal form is considered adequate for normal relational database design because it guarantees lossless join and dependency preservation simultaneously?',
            options: ['2NF', '3NF', 'BCNF', '4NF'],
            correctAnswer: '3NF',
            explanation: '3NF always guarantees both lossless join decomposition and dependency preservation.'
          }
        ]
      },
      {
        id: 'dbms-transactions-acid',
        title: 'Transactions, ACID Properties & Concurrency Control',
        unitId: 4,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 1,
        oneLineExplanation: 'Transactions are atomic logical units of database execution governed by ACID properties, serializability, and 2-Phase Locking.',
        mnemonicTrick: {
          title: 'ACID Guarantee',
          trick: '"All Chemists Ingest Drugs = Atomicity, Consistency, Isolation, Durability"',
          meaning: 'Atomicity = All-or-nothing (Recovery Manager/WAL). Consistency = Preserves integrity constraints. Isolation = Concurrency control (2PL/Timestamp). Durability = Committed changes survive system crashes (WAL/Redo log).'
        },
        fillInBlanks: [
          {
            question: 'The transaction property that guarantees either all operations succeed or none are executed is ______.',
            answer: 'Atomicity',
            hint: 'All-or-nothing property',
            explanation: 'Atomicity is maintained by the transaction recovery manager using undo logs.'
          },
          {
            question: 'The write-ahead logging protocol states that log records must be flushed to non-volatile disk ______ the database page is modified.',
            answer: 'before',
            hint: 'Prior to buffer write',
            explanation: 'WAL ensures that undo/redo records exist on stable storage before modifying actual disk blocks.'
          },
          {
            question: 'Two-Phase Locking (2PL) guarantees ______ serializability, but does not prevent deadlocks.',
            answer: 'conflict',
            hint: 'Guarantees serializable schedules',
            explanation: 'Basic 2PL ensures conflict serializability, while Strict 2PL also prevents cascading aborts.'
          }
        ],
        quickMcq: {
          question: 'A schedule S of transactions is conflict serializable if and only if its precedence (serialization) graph contains:',
          options: [
            { id: 'A', text: 'At least one cycle' },
            { id: 'B', text: 'No cycles (is a DAG)' },
            { id: 'C', text: 'Only read-write conflicts' },
            { id: 'D', text: 'No abort actions' }
          ],
          correctOptionId: 'B',
          explanation: 'Absence of cycles in the precedence graph is a necessary and sufficient condition for conflict serializability.',
          examTag: 'MH-SET Concurrency'
        },
        quickFacts: [
          'Conflicting operations: Belong to different transactions, access the exact same data item, and at least one is a Write.',
          'Strict 2PL: All exclusive (X) locks held by a transaction are retained until the transaction commits or aborts.',
          'Timestamp Ordering Protocol: Ensures conflict serializability using Thomas Write Rule (obsolete writes are safely ignored).'
        ],
        detailedNotes: {
          summaryPoints: [
            'Transaction States: Active -> Partially Committed (after last statement) -> Committed; or Active -> Failed -> Aborted.',
            'Conflict Equivalence: Two schedules are conflict equivalent if the order of any two conflicting operations is identical in both.',
            'View Serializability: Weaker constraint than conflict serializability; allows blind writes; checking view serializability is NP-Complete.',
            'Dirty Read Problem (Temporary Write): Transaction T2 reads uncommitted value written by T1, which subsequently aborts.',
            'Unrepeatable Read: T1 reads an item, T2 updates/deletes it and commits; T1 re-reads item and observes altered value.'
          ],
          coreFormulas: [
            'Conflicting pairs on item Q: W1(Q)-R2(Q), R1(Q)-W2(Q), W1(Q)-W2(Q)',
            '2PL Rule: Once Growing Phase unlocks first item, transaction enters Shrinking Phase (no new locks allowed)',
            'Thomas Write Rule: If TS(T) < W-timestamp(Q), ignore write(Q) operation instead of aborting'
          ],
          examTraps: [
            '2PL guarantees conflict serializability, but does NOT prevent deadlocks! Two transactions in the growing phase can mutually block each other.',
            'Strict 2PL prevents cascading aborts (cascadeless schedules), whereas Rigorous 2PL holds BOTH Shared and Exclusive locks until commit.'
          ],
          keyDefinitions: [
            { term: 'Cascadeless Schedule', definition: 'A schedule where every transaction reads only values written by committed transactions.' },
            { term: 'Thomas Write Rule', definition: 'A modification of timestamp ordering where outdated write requests are silently discarded.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'dbms-relational-algebra-sql',
        title: 'Relational Algebra & SQL Query Optimization',
        unitId: 4,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 1,
        oneLineExplanation: 'Relational algebra is a procedural query language providing foundational operators (σ, π, ⨝, ρ, ÷) used by query optimizers.',
        mnemonicTrick: {
          title: 'Greek Symbols Trick',
          trick: '"Sigma selects Rows, Pi picks Columns, Rho Renames"',
          meaning: 'σ (Sigma) = Horizontal filtering of rows. π (Pi) = Vertical projection of columns. ρ (Rho) = Renaming relation/attributes. ⨝ = Natural Join.'
        },
        fillInBlanks: [
          {
            question: 'In relational algebra, the selection operator represented by the Greek symbol ______ filters rows satisfying a predicate.',
            answer: 'sigma',
            hint: 'σ symbol',
            explanation: 'Selection σ is unary and acts horizontally on tuples.'
          },
          {
            question: 'The relational algebra operation used for queries with "for all" or "every" conditions (e.g., students enrolled in every course) is ______.',
            answer: 'division',
            hint: 'Symbolized by ÷',
            explanation: 'Division operator (÷) selects tuples related to all tuples in the divisor relation.'
          },
          {
            question: 'The heuristic query optimization rule suggests pushing ______ operators down the query tree as early as possible.',
            answer: 'selection',
            hint: 'Filtering rows early',
            explanation: 'Applying selection (σ) early minimizes the size of intermediate tables before costly joins.'
          }
        ],
        quickMcq: {
          question: 'Which of the following is NOT a fundamental (primitive) operator in classical relational algebra?',
          options: [
            { id: 'A', text: 'Selection (σ)' },
            { id: 'B', text: 'Projection (π)' },
            { id: 'C', text: 'Cartesian Product (×)' },
            { id: 'D', text: 'Natural Join (⨝)' }
          ],
          correctOptionId: 'D',
          explanation: 'Natural Join is a derived operator defined as Projection of Selection on a Cartesian Product: π(σ(R × S)).',
          examTag: 'MH-SET Operator Theory'
        },
        quickFacts: [
          '5 Primitive Relational Algebra operators: Selection (σ), Projection (π), Union (∪), Set Difference (−), Cartesian Product (×).',
          'Outer Joins (Left ⟕, Right ⟖, Full ⟗) preserve non-matching tuples padded with NULL values.',
          'SQL Injection attacks are mitigated using Prepared Statements (Parameterized Queries).'
        ],
        detailedNotes: {
          summaryPoints: [
            'Relational Completeness: A query language is relationally complete if it is at least as expressive as first-order relational algebra.',
            'Tuple Relational Calculus (TRC) and Domain Relational Calculus (DRC) are non-procedural declarative query languages (Codd\'s Theorem proves equivalence).',
            'SQL Clauses Execution Order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.',
            'HAVING filters grouped aggregates; WHERE filters raw individual rows before grouping.',
            'Correlated Subquery: A subquery that depends on values from the outer query and re-evaluates for every row of the outer query.'
          ],
          coreFormulas: [
            'Natural Join equivalence: R ⨝ S = π (σ (R × S))',
            'Cross product degree & cardinality: Degree(R × S) = Degree(R) + Degree(S); Card(R × S) = Card(R) × Card(S)',
            'Cartesian join worst-case rows: |R| × |S|',
            'Division operator schema: If R(A, B) and S(B), then R ÷ S produces schema (A)'
          ],
          examTraps: [
            'Do NOT use aggregate functions (COUNT, SUM, AVG) inside a WHERE clause! They must be evaluated in HAVING or SELECT.',
            'COUNT(*) includes NULL rows, whereas COUNT(column_name) ignores NULL entries!'
          ],
          keyDefinitions: [
            { term: 'Equi-Join', definition: 'Theta join where the condition contains only equality comparisons (=).' },
            { term: 'Query Tree', definition: 'A tree data structure where leaf nodes are relations and internal nodes are relational algebra operations.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'dbms-er-schemas',
        title: 'ER Diagrams, Constraints & Three-Schema Architecture',
        unitId: 4,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 1,
        oneLineExplanation: 'ER modeling abstracts real-world entities into schemas across physical, logical, and external architectural layers.',
        mnemonicTrick: {
          title: '3-Levels of Abstraction',
          trick: '"PLEase Remember: Physical -> Logical -> External"',
          meaning: 'Physical = Internal storage, B-tree indexes, disk allocation. Logical = Conceptual tables, integrity rules, relationships. External = User views.'
        },
        fillInBlanks: [
          {
            question: 'The ability to alter the physical storage structure without changing the conceptual schema is ______ data independence.',
            answer: 'physical',
            hint: 'Physical vs Logical',
            explanation: 'Physical data independence decouples application logic and table schemas from disk indexing or partitioning.'
          },
          {
            question: 'In an Entity-Relationship (ER) diagram, a weak entity set is represented by a double ______.',
            answer: 'rectangle',
            hint: 'Double geometric box',
            explanation: 'Weak entities use double rectangles; their identifying relationships use double diamonds.'
          },
          {
            question: 'A multivalued attribute (such as Phone Numbers) is visually represented in an ER diagram as a double ______.',
            answer: 'ellipse',
            hint: 'Double oval/ellipse',
            explanation: 'Multivalued attributes are drawn as concentric double ellipses (or double ovals).'
          }
        ],
        quickMcq: {
          question: 'In ER diagram notation, how is a derived attribute (such as Age calculated from Date of Birth) represented?',
          options: [
            { id: 'A', text: 'Dashed ellipse' },
            { id: 'B', text: 'Double ellipse' },
            { id: 'C', text: 'Underlined text' },
            { id: 'D', text: 'Diamond box' }
          ],
          correctOptionId: 'A',
          explanation: 'Derived attributes that are computed dynamically are represented by dashed/dotted ellipses.',
          examTag: 'MH-SET ER Modeling'
        },
        quickFacts: [
          'Weak entities lack a primary key; they require a discriminator (partial key drawn with dashed underline) + owner primary key.',
          'Specialization/Generalization: Represented using "IS-A" triangle hierarchy (Disjoint vs Overlapping, Total vs Partial).',
          'Referential integrity constraint prevents orphaned foreign key references between tables.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Three-Schema Architecture: Designed to achieve program-data independence and support multiple customized user views.',
            'Cardinality Ratios: 1:1, 1:N, N:1, M:N describe the maximum number of relationship instances an entity can participate in.',
            'Participation Constraints: Total participation (double line) means every entity must be involved in the relationship; Partial (single line) does not.',
            'ER-to-Relational Mapping: 1:N relationship maps by adding foreign key of "1" side into the table on the "N" side.',
            'M:N relationship requires a separate relationship table containing primary keys of both participating entities.'
          ],
          coreFormulas: [
            'Mapping M:N relationships requires at least 3 tables: Table 1, Table 2, and Relationship Table(FK1, FK2)',
            'Weak Entity Schema: PK(Owner) + Partial_Discriminator',
            'Minimum tables for 1:N with Total participation on N side = 2 tables'
          ],
          examTraps: [
            'Identifying relationship for a weak entity set is drawn as a DOUBLE DIAMOND, while the weak entity set itself is a DOUBLE RECTANGLE.',
            'Logical data independence is harder to achieve than Physical data independence because application programs depend heavily on conceptual structure.'
          ],
          keyDefinitions: [
            { term: 'Discriminator (Partial Key)', definition: 'Set of attributes that uniquely identifies weak entities belonging to the same owner entity.' },
            { term: 'Total Participation', definition: 'Every entity in the entity set must participate in at least one relationship instance (drawn as double line).' }
          ]
        },
        pyqs: []
      },
      {
        id: 'dbms-data-mining-warehousing',
        title: 'Data Warehousing, OLAP Operations & Association Rules',
        unitId: 4,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 1,
        oneLineExplanation: 'Data warehousing organizes subject-oriented historic data into multidimensional cubes analyzed via OLAP and Apriori association algorithms.',
        mnemonicTrick: {
          title: 'OLAP Operations Mnemonic',
          trick: '"Roll UP to Year, Drill DOWN to Day, SLICE one page, DICE small cube, PIVOT rotate"',
          meaning: 'Roll-up = Summarize data (aggregation). Drill-down = Navigate from less detailed to more detailed data. Slice = Select 1 dimension. Dice = Select subcube across multiple dimensions. Pivot = Rotate axes.'
        },
        fillInBlanks: [
          {
            question: 'The OLAP navigation operation that moves from higher-level summary data to lower-level detailed data (e.g., Year to Month) is called ______.',
            answer: 'drill-down',
            hint: 'Going deeper into details',
            explanation: 'Drill-down introduces finer granularity by descending concept hierarchies.'
          },
          {
            question: 'In association rule mining, the metric defined as the proportion of transactions that contain both itemsets X and Y is called ______.',
            answer: 'support',
            hint: 'Support vs Confidence',
            explanation: 'Support(X -> Y) = Frequency(X ∪ Y) / Total_Transactions.'
          },
          {
            question: 'A data warehouse schema with a single centralized fact table connected directly to non-normalized dimension tables is a ______ schema.',
            answer: 'star',
            hint: 'Celestial shape',
            explanation: 'Star schema contains unnormalized dimension tables; snowflake schema normalizes dimensions into sub-dimension tables.'
          }
        ],
        quickMcq: {
          question: 'In the Apriori algorithm for frequent itemset mining, if an itemset is infrequent, then:',
          options: [
            { id: 'A', text: 'All its supersets must also be infrequent' },
            { id: 'B', text: 'All its subsets must be infrequent' },
            { id: 'C', text: 'Its support is equal to confidence' },
            { id: 'D', text: 'It generates maximum candidate pairs' }
          ],
          correctOptionId: 'A',
          explanation: 'The Apriori downward-closure property asserts: Any subset of a frequent itemset must be frequent; hence any superset of an infrequent itemset is infrequent.',
          examTag: 'MH-SET Data Mining'
        },
        quickFacts: [
          'Data Warehouse characteristics (Inmon): Subject-Oriented, Integrated, Non-Volatile, Time-Variant.',
          'Confidence(X -> Y) = Support(X ∪ Y) / Support(X).',
          'Snowflake schema normalizes dimension tables to save space, but increases query join cost compared to Star schema.'
        ],
        detailedNotes: {
          summaryPoints: [
            'OLTP vs OLAP: OLTP handles real-time transactional inserts/updates (normalized 3NF/BCNF). OLAP handles historical analytical read-only queries (star/snowflake multidimensional).',
            'ETL Process: Extraction, Transformation, and Loading into central enterprise warehouse.',
            'Data Mart: Subset of an enterprise data warehouse focused on a specific business line (e.g., Sales, Marketing).',
            'K-Means Clustering: Partition-based iterative clustering algorithm minimizing sum of squared distances to cluster centroids.',
            'Classification vs Clustering: Classification is Supervised (classes known beforehand); Clustering is Unsupervised (groups found naturally).'
          ],
          coreFormulas: [
            'Support(X -> Y) = P(X ∪ Y) = Count(X ∪ Y) / N',
            'Confidence(X -> Y) = P(Y | X) = Count(X ∪ Y) / Count(X)',
            'Lift(X -> Y) = Confidence(X -> Y) / Support(Y)',
            'K-Means Objective: Minimize J = Σ Σ ||x_i - μ_j||²'
          ],
          examTraps: [
            'Do not confuse Roll-up and Drill-down: Roll-up goes UP the concept hierarchy (e.g. city -> country) reducing details; Drill-down goes DOWN increasing details.',
            'Lift value: If Lift = 1, X and Y are independent! If Lift > 1, positive association exists.'
          ],
          keyDefinitions: [
            { term: 'Fact Table', definition: 'Central table in a multidimensional schema containing numerical quantitative measurements (metrics) and foreign keys.' },
            { term: 'Dimension Table', definition: 'Surrounding tables in warehouse schema describing business context attributes (Time, Store, Product).' }
          ]
        },
        pyqs: []
      },
      {
        id: 'dbms-nosql-bigdata',
        title: 'NoSQL Databases, CAP Theorem & Big Data (Hadoop HDFS)',
        unitId: 4,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 1,
        oneLineExplanation: 'NoSQL databases provide horizontal scaling for unstructured Big Data, constrained by Eric Brewer\'s CAP theorem trade-offs.',
        mnemonicTrick: {
          title: 'CAP Theorem Rule',
          trick: '"Pick Any TWO: Consistency, Availability, Partition Tolerance (Network partition is inevitable, so choose CP or AP!)"',
          meaning: 'Consistency = Every read receives most recent write. Availability = Every non-failing node returns a response. Partition tolerance = System continues operation despite network drops.'
        },
        fillInBlanks: [
          {
            question: 'Eric Brewer\'s theorem states that a distributed data store can simultaneously provide at most ______ of the three guarantees: Consistency, Availability, Partition Tolerance.',
            answer: 'two',
            hint: 'Pick two out of three',
            explanation: 'The CAP theorem proves it is impossible to simultaneously guarantee all three in distributed systems with unreliable networks.'
          },
          {
            question: 'MongoDB and CouchDB are popular examples of ______-oriented NoSQL database management systems.',
            answer: 'document',
            hint: 'JSON / BSON storage',
            explanation: 'Document stores store semi-structured data as JSON/BSON records.'
          },
          {
            question: 'In Apache Hadoop HDFS architecture, the master node managing file system metadata is the ______.',
            answer: 'NameNode',
            hint: 'Master node in HDFS',
            explanation: 'NameNode holds the directory tree and file block mappings, while DataNodes store actual data blocks.'
          }
        ],
        quickMcq: {
          question: 'Which category of NoSQL databases is best suited for modeling social networks, fraud detection, and recommendation engines?',
          options: [
            { id: 'A', text: 'Key-Value stores' },
            { id: 'B', text: 'Document stores' },
            { id: 'C', text: 'Column-Family stores' },
            { id: 'D', text: 'Graph databases' }
          ],
          correctOptionId: 'D',
          explanation: 'Graph databases (like Neo4j) use nodes and edges to model complex interconnected relationships efficiently without expensive joins.',
          examTag: 'MH-SET Big Data'
        },
        quickFacts: [
          '4 Major NoSQL categories: Key-Value (Redis), Document (MongoDB), Columnar (Cassandra, HBase), Graph (Neo4j).',
          'BASE model in NoSQL: Basically Available, Soft state, Eventual consistency (replaces strict ACID).',
          'Hadoop HDFS standard replication factor by default is 3 (1 local node, 1 same rack node, 1 remote rack node).'
        ],
        detailedNotes: {
          summaryPoints: [
            'HDFS Architecture: Single NameNode (Master) manages file system metadata; multiple DataNodes (Workers) store blocks (default 128 MB).',
            'MapReduce Framework: Map function processes inputs into intermediate (key, value) pairs; Shuffle & Sort groups identical keys; Reduce merges grouped values.',
            'Big Data 5 V\'s: Volume (vast size), Velocity (speed of generation), Variety (structured, semi, unstructured), Veracity (trustworthiness), Value.',
            'RDBMS vs NoSQL: RDBMS scales vertically (bigger CPU/RAM) using ACID; NoSQL scales horizontally (clustering commodity servers) using BASE.'
          ],
          coreFormulas: [
            'CAP Equation constraint: C + A + P ≤ 2 (in real networks, network failure P must be tolerated, leaving choice of CP vs AP)',
            'HDFS default block size = 128 MB (large block amortizes disk seek time)',
            'MapReduce pipeline: Input -> Map -> Partition -> Shuffle/Sort -> Reduce -> Output'
          ],
          examTraps: [
            'NameNode does NOT store user data! It only holds directory namespace, block locations, and file permissions in RAM.',
            'Cassandra is typically AP (high availability + partition tolerance), while HBase and MongoDB are CP (strong consistency + partition tolerance).'
          ],
          keyDefinitions: [
            { term: 'Eventual Consistency', definition: 'Informal guarantee that if no new updates are made to an item, all replicas will eventually return the latest value.' },
            { term: 'Sharding', definition: 'Horizontal partitioning of database tables across multiple independent physical database server nodes.' }
          ]
        },
        pyqs: []
      }
    ]
  },

  // ==========================================
  // UNIT 5: System Software and Operating System (DAY 2 FOCUS)
  // ==========================================
  {
    id: 5,
    title: 'Unit 5: System Software & Operating System',
    codeName: 'OS (Focus #2)',
    paperType: 'paper2',
    priorityDay: 2,
    description: 'Process management, Deadlocks (Banker\'s Algorithm), CPU scheduling, Paging, Virtual Memory, Disk Scheduling, Semaphores, and System Software.',
    topics: [
      {
        id: 'os-deadlocks',
        title: 'Deadlock: Characterization, Prevention, Avoidance & Banker\'s Algorithm',
        unitId: 5,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 8,
        dayAssigned: 2,
        oneLineExplanation: 'A deadlock is a permanent stall where processes wait for resources held by each other; resolved via prevention, Banker\'s avoidance, or detection.',
        mnemonicTrick: {
          title: 'Coffman 4 Conditions',
          trick: '"Men Must Hold Cycles = Mutual exclusion, Hold & wait, No preemption, Circular wait"',
          meaning: 'All 4 conditions must hold simultaneously for a deadlock to occur. Breaking any single one prevents deadlock entirely.'
        },
        fillInBlanks: [
          {
            question: 'The deadlock handling strategy that imposes a total ordering on all resource types to eliminate circular wait is deadlock ______.',
            answer: 'prevention',
            hint: 'Prevention vs Avoidance',
            explanation: 'Deadlock prevention invalidates at least one of the 4 Coffman conditions by system design.'
          },
          {
            question: 'Banker\'s algorithm ensures a system never enters an unsafe state by checking if: Need ≤ ______.',
            answer: 'Available',
            hint: 'Resource availability vector',
            explanation: 'A process can be allocated resources safely only if its maximum remaining need is less than or equal to current available resources.'
          },
          {
            question: 'In a single-instance Resource Allocation Graph (RAG), the existence of a cycle is a necessary and ______ condition for deadlock.',
            answer: 'sufficient',
            hint: 'Both necessary and sufficient',
            explanation: 'For single-instance resources, Cycle <=> Deadlock. For multi-instance, a cycle is necessary but NOT sufficient.'
          }
        ],
        quickMcq: {
          question: 'In Banker\'s Algorithm for deadlock avoidance, if a system is currently in an UNSAFE state, this implies:',
          options: [
            { id: 'A', text: 'A deadlock has already occurred' },
            { id: 'B', text: 'A deadlock is possible in the future if processes request max resources' },
            { id: 'C', text: 'All running processes will terminate immediately' },
            { id: 'D', text: 'CPU utilization has dropped to zero' }
          ],
          correctOptionId: 'B',
          explanation: 'An unsafe state is NOT necessarily a deadlocked state; it means the system cannot guarantee avoidance of deadlock if all processes demand maximum resources.',
          examTag: 'MH-SET Deadlock Fundamental'
        },
        quickFacts: [
          '4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
          'Safe state guarantees that there exists at least one Safe Sequence <P1, P2, ... Pn> where every process can complete.',
          'Ostrich Algorithm: Stick head in sand and ignore deadlocks (used by UNIX/Windows because prevention overhead is too high).'
        ],
        detailedNotes: {
          summaryPoints: [
            'Deadlock Characterization: Coffman\'s 4 conditions are simultaneous requirements. Invalidating Circular Wait is practical via strict global resource ordering.',
            'Hold & Wait Elimination: Require process to request and receive all resources before execution begins, or release current resources before requesting new ones.',
            'No Preemption Elimination: If a process holding resources requests an unavailable resource, all its currently allocated resources are preempted.',
            'Banker\'s Safety Algorithm: Uses vectors Available[m], Max[n][m], Allocation[n][m], and Need[n][m] where Need = Max - Allocation.',
            'Recovery from Deadlock: Process termination (abort all vs abort one-by-one until cycle broken) or Resource Preemption (rollback to checkpoint, avoiding starvation using aging).'
          ],
          coreFormulas: [
            'Need Matrix: Need[i][j] = Max[i][j] - Allocation[i][j]',
            'Safety Step: Find Pi such that Finish[i] == false and Need[i] ≤ Work; Work = Work + Allocation[i]; Finish[i] = true',
            'Minimum resources to guarantee NO deadlock for n processes each needing max m resources: R ≥ n × (m - 1) + 1'
          ],
          examTraps: [
            'A cycle in a Resource Allocation Graph guarantees deadlock ONLY if each resource has a single instance! For multi-instance resources, a cycle does not guarantee deadlock.',
            'Do NOT confuse Deadlock Avoidance (dynamic inspection like Banker\'s) with Deadlock Prevention (static rules invalidating Coffman conditions).'
          ],
          keyDefinitions: [
            { term: 'Safe Sequence', definition: 'An order of process execution where every process can satisfy its remaining resource needs using currently available resources plus released allocations of preceding processes.' },
            { term: 'Resource-Preemption Rollback', definition: 'Returning a deadlocked process to a previously saved checkpoint state and releasing its held resources.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'os-cpu-scheduling',
        title: 'CPU Scheduling Algorithms & Process Synchronization',
        unitId: 5,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 2,
        oneLineExplanation: 'CPU schedulers maximize throughput and minimize turnaround/waiting times using preemptive and non-preemptive queuing algorithms.',
        mnemonicTrick: {
          title: 'SJF Minimizes Waiting',
          trick: '"Shortest Job First gives the Lowest Average Waiting Time, but Starves Long Tasks"',
          meaning: 'SJF (and its preemptive version SRTF) is mathematically optimal for minimizing average waiting time. Long processes may experience starvation.'
        },
        fillInBlanks: [
          {
            question: 'The preemptive version of Shortest Job First (SJF) scheduling is known as Shortest ______ Time First (SRTF).',
            answer: 'Remaining',
            hint: 'SRTF acronym',
            explanation: 'SRTF preempts the running process if a newly arrived process has a shorter remaining burst time.'
          },
          {
            question: 'In Round Robin scheduling, if the time quantum q is extremely large (approaching infinity), it behaves identically to ______.',
            answer: 'FCFS',
            hint: 'First Come First Served',
            explanation: 'When quantum exceeds all burst times, processes run to completion in arrival order without preemption.'
          },
          {
            question: 'The technique used in Priority scheduling to gradually increase the priority of long-waiting processes to prevent starvation is called ______.',
            answer: 'aging',
            hint: 'Growing older',
            explanation: 'Aging increments process priority over time, ensuring eventually every waiting job runs.'
          }
        ],
        quickMcq: {
          question: 'Which CPU scheduling algorithm exhibits the Convoy Effect, where small processes wait for one long CPU-bound process to release the CPU?',
          options: [
            { id: 'A', text: 'Round Robin' },
            { id: 'B', text: 'First-Come First-Served (FCFS)' },
            { id: 'C', text: 'Shortest Remaining Time First (SRTF)' },
            { id: 'D', text: 'Multilevel Feedback Queue' }
          ],
          correctOptionId: 'B',
          explanation: 'FCFS suffers from the Convoy Effect, dragging down overall CPU and I/O device utilization.',
          examTag: 'MH-SET Scheduling'
        },
        quickFacts: [
          'Turnaround Time (TAT) = Completion Time - Arrival Time.',
          'Waiting Time (WT) = Turnaround Time - Burst Time.',
          'Round Robin is preemptive and optimal for time-sharing interactive systems; performance depends heavily on time quantum q.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Process States: New -> Ready -> Running -> Waiting (Blocked) -> Terminated.',
            'Context Switch: Saving state of current process in its PCB (Process Control Block) and loading saved state of next process (pure overhead, no useful work done).',
            'Preemptive vs Non-Preemptive: Preemptive algorithms (Round Robin, SRTF, Priority-preemptive) forcibly take CPU away; non-preemptive (FCFS, Non-preemptive SJF) let process run until it yields or terminates.',
            'Multilevel Queue (MLQ): Partitions ready queue into separate foreground (interactive, Round Robin) and background (batch, FCFS) queues with fixed priority.',
            'Multilevel Feedback Queue (MLFQ): Allows processes to move between priority levels based on CPU burst history (I/O bound jobs stay in high priority; CPU bound jobs sink).'
          ],
          coreFormulas: [
            'Turnaround Time: TAT = Completion_Time - Arrival_Time',
            'Waiting Time: WT = TAT - Burst_Time',
            'Response Time: Time from Arrival to First CPU grant',
            'Exponential Smoothing (Predicting Burst): τ_{n+1} = α · t_n + (1 - α) · τ_n'
          ],
          examTraps: [
            'Waiting time is NOT simply Completion - Burst! If arrival time is > 0, you must subtract Arrival Time: WT = Completion - Arrival - Burst.',
            'If time quantum q in Round Robin is too small, context switch overhead severely degrades throughput.'
          ],
          keyDefinitions: [
            { term: 'Throughput', definition: 'The number of completed processes executed per unit time.' },
            { term: 'Convoy Effect', definition: 'Substantial slowdown caused by short processes queuing behind a long CPU-intensive process in FCFS scheduling.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'os-virtual-memory-paging',
        title: 'Virtual Memory, Paging, Page Replacement & Thrashing',
        unitId: 5,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 8,
        dayAssigned: 2,
        oneLineExplanation: 'Virtual memory decouples logical address space from physical RAM via paging, demand loading, and page replacement policies.',
        mnemonicTrick: {
          title: 'Belady’s FIFO Trap',
          trick: '"FIFO Fools You: More Frames can cause MORE Page Faults (Belady\'s Anomaly)"',
          meaning: 'Belady\'s Anomaly occurs in FIFO where increasing physical page frames increases page faults. Stack algorithms (LRU, Optimal) NEVER suffer from Belady\'s Anomaly.'
        },
        fillInBlanks: [
          {
            question: 'The unexpected phenomenon where allocating more physical page frames results in an increased number of page faults under FIFO is called ______ Anomaly.',
            answer: 'Belady\'s',
            hint: 'Named after Laszlo Belady',
            explanation: 'Belady discovered that FIFO page replacement can experience increased page fault frequency when given more frames.'
          },
          {
            question: 'The page replacement algorithm that replaces the page that will not be used for the longest period of future time is the ______ algorithm.',
            answer: 'Optimal',
            hint: 'Theoretical benchmark (OPT / MIN)',
            explanation: 'Optimal (OPT/Belady\'s MIN) replacement produces the theoretical minimum page fault rate but requires impossible future knowledge.'
          },
          {
            question: 'When an operating system spends more time servicing page faults and swapping pages than executing user processes, the system is ______.',
            answer: 'thrashing',
            hint: 'Thrashing state',
            explanation: 'Thrashing collapses CPU utilization toward zero; resolved by reducing degree of multiprogramming via Working Set model.'
          }
        ],
        quickMcq: {
          question: 'Which of the following page replacement algorithms does NOT suffer from Belady’s anomaly?',
          options: [
            { id: 'A', text: 'FIFO (First-In, First-Out)' },
            { id: 'B', text: 'LRU (Least Recently Used)' },
            { id: 'C', text: 'Second Chance Algorithm' },
            { id: 'D', text: 'Random Replacement' }
          ],
          correctOptionId: 'B',
          explanation: 'LRU belongs to the class of Stack Algorithms (where set of pages in n frames is always a subset of n+1 frames) and is immune to Belady’s anomaly.',
          examTag: 'MH-SET Memory Classic'
        },
        quickFacts: [
          'Logical address divided into: Page Number (p) and Page Offset (d). Physical address: Frame Number (f) and Offset (d).',
          'Translation Lookaside Buffer (TLB): Fast associative hardware cache storing recently translated virtual-to-physical page mappings.',
          'Paging eliminates External Fragmentation completely, but incurs Internal Fragmentation within the final allocated page.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Virtual Memory Concept: Execution of processes that are not completely in physical memory, allowing logical addresses to far exceed physical RAM.',
            'Effective Memory Access Time (EMAT): EMAT = h × (t_tlb + t_mem) + (1 - h) × (t_tlb + 2 × t_mem) for a single-level page table.',
            'Segmentation vs Paging: Paging is fixed-size hardware-managed (internal fragmentation); Segmentation is variable-size programmer-oriented (external fragmentation).',
            'Inverted Page Table: One entry for each physical memory frame rather than each logical page, dramatically shrinking page table size for 64-bit systems.',
            'Working Set Model (Denning): Allocates frames based on locality of reference W(t, Δ); prevents thrashing by ensuring sum of working sets ≤ total RAM.'
          ],
          coreFormulas: [
            'Page Address Split: Virtual Address Space = 2^m bytes, Page Size = 2^n bytes -> Offset = n bits, Page Number = m - n bits',
            'Number of Pages: Total_Logical_Address_Space / Page_Size',
            'EMAT (TLB Hit Rate h): EMAT = h(tlb + m) + (1 - h)(tlb + 2m)',
            'Working Set Condition: D = Σ WSS_i ≤ Total Physical Frames available'
          ],
          examTraps: [
            'Do NOT confuse Internal and External fragmentation! Paging suffers ONLY from Internal fragmentation (on average 0.5 page per process). Segmentation suffers from External fragmentation.',
            'Increasing multiprogramming improves CPU utilization ONLY up to the thrashing threshold; beyond that, CPU utilization plunges!'
          ],
          keyDefinitions: [
            { term: 'Page Fault', definition: 'Hardware trap generated by MMU when an accessed virtual page has its valid-invalid bit set to invalid (not resident in physical RAM).' },
            { term: 'Thrashing', definition: 'Severe performance collapse where CPU spends virtually all time swapping pages into and out of swap space rather than executing instructions.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'os-disk-scheduling-raid',
        title: 'Disk Scheduling (SSTF, SCAN, C-SCAN) & RAID Architecture',
        unitId: 5,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 2,
        oneLineExplanation: 'Disk scheduling minimizes arm seek movement across magnetic cylinders, while RAID levels provide striping, mirroring, and parity fault tolerance.',
        mnemonicTrick: {
          title: 'Elevator vs Circle',
          trick: '"SCAN is the Elevator (services both ways). C-SCAN is Circular (services ONE way, dashes back to start)"',
          meaning: 'SCAN reverses direction at disk ends and services tracks in both directions. C-SCAN services cylinders in only one direction, offering more uniform wait times.'
        },
        fillInBlanks: [
          {
            question: 'The disk scheduling algorithm that services requests nearest to current head position but may cause starvation of distant tracks is ______.',
            answer: 'SSTF',
            hint: 'Shortest Seek Time First',
            explanation: 'SSTF selects the pending request with the minimum seek distance from current head position.'
          },
          {
            question: 'In RAID architecture, RAID level ______ provides block-level striping with distributed parity across all disks.',
            answer: '5',
            hint: 'Distributed parity level',
            explanation: 'RAID 5 requires minimum 3 disks and distributes parity blocks evenly across all drives to eliminate parity bottlenecks.'
          },
          {
            question: 'The disk scheduling algorithm that functions like an elevator but only travels as far as the final request in each direction is ______.',
            answer: 'LOOK',
            hint: 'LOOK / C-LOOK',
            explanation: 'LOOK checks ahead and reverses immediately at the last pending request without travelling all the way to disk edges.'
          }
        ],
        quickMcq: {
          question: 'In C-SCAN disk scheduling, how does the disk arm behave after reaching the last cylinder?',
          options: [
            { id: 'A', text: 'It stops immediately' },
            { id: 'B', text: 'It reverses direction and services requests on the way back' },
            { id: 'C', text: 'It returns directly to the opposite end without servicing requests on return' },
            { id: 'D', text: 'It switches to FCFS mode' }
          ],
          correctOptionId: 'C',
          explanation: 'C-SCAN (Circular SCAN) moves in one direction servicing tracks, then jumps straight back to the beginning without servicing requests on the return sweep.',
          examTag: 'MH-SET Storage'
        },
        quickFacts: [
          'SSTF (Shortest Seek Time First) chooses requests closest to head; can cause starvation of distant tracks.',
          'LOOK and C-LOOK only travel as far as the final request in each direction, avoiding travel to disk boundaries.',
          'RAID 5 requires a minimum of 3 physical drives to store distributed parity blocks.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Disk Access Time Components: Seek Time (arm movement to cylinder) + Rotational Latency (disk rotation to sector) + Transfer Time.',
            'Seek Time is the dominant performance bottleneck; disk scheduling focuses primarily on minimizing total head seek distance.',
            'RAID 0 (Striping): Data split across disks; maximum throughput, ZERO fault tolerance (1 disk failure loses all data).',
            'RAID 1 (Mirroring): Complete duplicate copies of data; high reliability, 50% storage overhead.',
            'RAID 6: Dual distributed parity, tolerating up to TWO simultaneous disk failures (requires minimum 4 disks).'
          ],
          coreFormulas: [
            'Total Access Time = Seek Time + Rotational Latency + Transfer Time',
            'Average Rotational Latency = 1 / (2 × RPM) × 60 seconds',
            'RAID 5 Usable Capacity = (N - 1) × Disk_Capacity (where N is total number of drives)',
            'RAID 6 Usable Capacity = (N - 2) × Disk_Capacity'
          ],
          examTraps: [
            'SCAN travels all the way to cylinder 0 or Max_Cylinder, whereas LOOK reverses at the LAST request without touching the boundary cylinder!',
            'RAID 10 is a stripe of mirrors (RAID 1+0), offering superior rebuild performance and fault recovery compared to RAID 01.'
          ],
          keyDefinitions: [
            { term: 'Rotational Latency', definition: 'Time spent waiting for the target disk sector to rotate beneath the read-write magnetic head.' },
            { term: 'Disk Striping', definition: 'Segmenting logically contiguous data across multiple physical hard drives in round-robin fashion.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'os-process-synchronization-semaphores',
        title: 'Process Synchronization, Semaphores & Classical IPC',
        unitId: 5,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 2,
        oneLineExplanation: 'Synchronization prevents race conditions in shared memory using semaphores, mutexes, monitors, and Peterson\'s algorithm.',
        mnemonicTrick: {
          title: '3 Critical Section Rules',
          trick: '"Must Pass Both = Mutual Exclusion, Progress, Bounded Waiting"',
          meaning: '1. Mutual Exclusion: Only one process inside critical section at a time. 2. Progress: Selection cannot be postponed indefinitely if CS is free. 3. Bounded Waiting: Bound on requests before access is granted.'
        },
        fillInBlanks: [
          {
            question: 'The classic software solution to the critical section problem for two concurrent processes using flag and turn variables is ______ solution.',
            answer: 'Peterson\'s',
            hint: 'Named after Gary Peterson',
            explanation: 'Peterson\'s algorithm satisfies Mutual Exclusion, Progress, and Bounded Waiting for 2 processes.'
          },
          {
            question: 'A counting semaphore S initialized to value 10 will have a value of ______ after 6 Wait(P) and 2 Signal(V) operations.',
            answer: '6',
            hint: '10 - 6 + 2',
            explanation: 'Wait(P) decrements semaphore value by 1; Signal(V) increments semaphore value by 1. 10 - 6 + 2 = 6.'
          },
          {
            question: 'The condition where two or more processes execute in a loop continuously checking a lock variable without yielding the CPU is called ______ waiting (spinlock).',
            answer: 'busy',
            hint: 'Busy waiting / spinlock',
            explanation: 'Busy waiting wastes CPU cycles spinning in a while loop checking lock availability.'
          }
        ],
        quickMcq: {
          question: 'In the Dining Philosophers Problem, which of the following deadlock prevention strategies allows at most 4 philosophers to sit at the 5-chair table simultaneously?',
          options: [
            { id: 'A', text: 'Resource hierarchy solution' },
            { id: 'B', text: 'Limiting concurrent diners using a semaphore initialized to 4' },
            { id: 'C', text: 'Asymmetric philosopher rule' },
            { id: 'D', text: 'Chandy-Misra solution' }
          ],
          correctOptionId: 'B',
          explanation: 'Restricting concurrent diners to N-1 ensures at least one philosopher can pick up both chopsticks and eat, eliminating circular wait.',
          examTag: 'MH-SET Classical IPC'
        },
        quickFacts: [
          'Binary Semaphore (Mutex) takes values 0 or 1; Counting Semaphore takes unrestricted non-negative integer values.',
          'Wait(P) decrements semaphore; if value < 0, process blocks. Signal(V) increments semaphore and unblocks waiting processes.',
          'Producer-Consumer problem requires 3 semaphores: mutex (mutual exclusion), empty (counts empty buffer slots), full (counts filled slots).'
        ],
        detailedNotes: {
          summaryPoints: [
            'Race Condition: Outcome of execution depends on the exact order or timing in which concurrent threads/processes access shared variables.',
            'Critical Section Requirements: Mutual Exclusion (mandatory), Progress (mandatory), Bounded Waiting (mandatory to avoid starvation).',
            'Hardware Synchronization Primitives: TestAndSet() and Swap() atomic machine instructions used to construct spinlocks.',
            'Reader-Writer Problem: Multiple readers allowed concurrently; writer requires exclusive access. First solution starves writers; second solution starves readers.',
            'Monitors: High-level synchronization construct encapsulating shared variables and procedures with condition variables (wait and signal).'
          ],
          coreFormulas: [
            'Semaphore Final Value = S_initial - Total_P_ops + Total_V_ops',
            'Negative Semaphore Value: If S < 0, |S| equals the exact count of processes blocked in the semaphore queue',
            'Bounded Buffer Constraints: empty initialized to N, full initialized to 0, mutex initialized to 1'
          ],
          examTraps: [
            'Signal(V) on a semaphore NEVER blocks a process! It only increments the count or unblocks a waiting process.',
            'Peterson\'s solution works correctly on uniprocessors with strict memory consistency, but can fail on modern multicore CPUs with out-of-order execution without memory barriers.'
          ],
          keyDefinitions: [
            { term: 'Atomic Operation', definition: 'An indivisible instruction sequence that executes completely without possibility of interruption.' },
            { term: 'Binary Semaphore (Mutex)', definition: 'A synchronization variable restricted to values 0 (locked) and 1 (unlocked).' }
          ]
        },
        pyqs: []
      },
      {
        id: 'os-system-software-loaders-linkers',
        title: 'System Software: Compilers, Loaders, Linkers & Assemblers',
        unitId: 5,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 2,
        oneLineExplanation: 'System software bridges high-level code to hardware execution via multi-pass compilation, macro expansion, linking, and relocation.',
        mnemonicTrick: {
          title: 'Translation Pipeline',
          trick: '"Pre-Comp-As-Link-Load = Preprocessor -> Compiler -> Assembler -> Linker -> Loader"',
          meaning: 'Preprocessor handles #include/macros. Compiler generates assembly code. Assembler generates relocatable object code (.o/.obj). Linker combines object files and resolves external references. Loader places binary in memory for execution.'
        },
        fillInBlanks: [
          {
            question: 'The component of a two-pass assembler that scans source code during Pass 1 to assign memory addresses to labels is the ______ table.',
            answer: 'symbol',
            hint: 'Symbol table generator',
            explanation: 'Pass 1 of an assembler builds the Symbol Table (SYMTAB) by computing location counter (LC) values for each label.'
          },
          {
            question: 'The system software responsible for combining multiple independent object modules and resolving external symbol references is the ______.',
            answer: 'linker',
            hint: 'Link Editor',
            explanation: 'Linker resolves external references between modules and produces a single executable binary image.'
          },
          {
            question: 'A loader that places object code into fixed predetermined physical memory addresses specified at compile time is an ______ loader.',
            answer: 'absolute',
            hint: 'Opposite of relocatable',
            explanation: 'Absolute loaders load programs into fixed memory addresses without performing any address relocation.'
          }
        ],
        quickMcq: {
          question: 'What is the primary role performed by Pass 2 of a standard two-pass assembler?',
          options: [
            { id: 'A', text: 'Generate intermediate tokens and remove comments' },
            { id: 'B', text: 'Build the symbol table and determine storage size' },
            { id: 'C', text: 'Generate actual machine code instructions and object program records' },
            { id: 'D', text: 'Allocate heap memory frames' }
          ],
          correctOptionId: 'C',
          explanation: 'Pass 1 builds the symbol table and computes offsets; Pass 2 generates machine code by looking up symbols in the symbol table.',
          examTag: 'MH-SET System Software'
        },
        quickFacts: [
          'Two passes are required in assemblers to resolve Forward References (labels used as operands before they are defined).',
          'Dynamic Link Libraries (DLLs) are linked at runtime when functions are called, saving disk space and memory.',
          'Macro processor executes text substitution before compilation; does not evaluate data types or runtime values.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Assembler Data Structures: OPTAB (Operation Code Table, static), SYMTAB (Symbol Table, dynamic with hash index), LOCCTR (Location Counter).',
            'Forward Reference Problem: Branching forward to a label not yet encountered during sequential scanning; solved by 2-pass assembly or backpatching.',
            'Loader Functions: Allocation (allocate memory space), Linking (resolve cross-module references), Relocation (adjust address-dependent locations), Loading (physically place bytes into RAM).',
            'Dynamic Linking vs Static Linking: Static linking includes library code inside the executable; Dynamic linking resolves libraries at runtime (shared memory savings).',
            'Lexical Analyzer (Scanner): Converts source character stream into tokens (keywords, identifiers, literals) using Regular Expressions and DFAs.'
          ],
          coreFormulas: [
            'Relocation Offset: Actual_Load_Address - Program_Original_Origin_Address',
            'Assembler Record Format: Header Record, Text Record (actual object code), End Record (execution start address)'
          ],
          examTraps: [
            'A macro call is expanded at compile time into inline code, whereas a function call incurs call/return stack overhead at runtime!',
            'Linker resolves cross-file external references; Loader handles final memory address binding and binary execution start.'
          ],
          keyDefinitions: [
            { term: 'Relocatable Code', definition: 'Machine code formatted with relocation bits so it can be loaded and executed at any arbitrary memory start address.' },
            { term: 'Forward Reference', definition: 'Reference to an identifier or label that is defined later in the source program sequence.' }
          ]
        },
        pyqs: []
      }
    ]
  },

  // ==========================================
  // UNIT 6: Software Engineering (DAY 3 FOCUS)
  // ==========================================
  {
    id: 6,
    title: 'Unit 6: Software Engineering',
    codeName: 'SE (Focus #3)',
    paperType: 'paper2',
    priorityDay: 3,
    description: 'SDLC models, Agile Scrum, Modularity (Coupling & Cohesion), Software Testing, COCOMO Cost Estimation, and Quality ISO standards.',
    topics: [
      {
        id: 'se-sdlc-agile',
        title: 'SDLC Models: Waterfall, Spiral & Agile Scrum',
        unitId: 6,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 3,
        oneLineExplanation: 'SDLC frameworks dictate development phases; Waterfall suits fixed requirements, Spiral prioritizes risk analysis, and Agile favors iterative sprint delivery.',
        mnemonicTrick: {
          title: 'Spiral = Risk King',
          trick: '"Spiral Swirls Around Risk: Quadrant 2 is Explicit Risk Analysis!"',
          meaning: 'Boehm\'s Spiral Model is a meta-model incorporating prototyping and waterfall; its defining feature is formal Risk Analysis in every loop.'
        },
        fillInBlanks: [
          {
            question: 'The SDLC process model whose defining operational phase in every cycle is formal risk assessment and analysis is the ______ model.',
            answer: 'Spiral',
            hint: 'Boehm\'s iterative model',
            explanation: 'Boehm\'s Spiral Model is risk-driven, evaluating technical and management risks in every radial iteration.'
          },
          {
            question: 'In Scrum Agile methodology, the timeboxed iteration period (typically 2 to 4 weeks) during which a deliverable product increment is completed is called a ______.',
            answer: 'Sprint',
            hint: 'Fast running burst',
            explanation: 'Sprints are fixed-length iterative cycles in Scrum where team develops and ships features.'
          },
          {
            question: 'The extreme programming (XP) agile practice where two software engineers work together at a single workstation on the same code is ______ programming.',
            answer: 'pair',
            hint: 'Two developers together',
            explanation: 'Pair programming involves a Driver (writes code) and a Navigator (reviews logic in real time).'
          }
        ],
        quickMcq: {
          question: 'Which software development lifecycle model is most suitable for projects where initial requirements are stable, well-understood, and unlikely to change during development?',
          options: [
            { id: 'A', text: 'Classic Waterfall Model' },
            { id: 'B', text: 'Agile Scrum' },
            { id: 'C', text: 'Evolutionary Prototyping' },
            { id: 'D', text: 'Extreme Programming (XP)' }
          ],
          correctOptionId: 'A',
          explanation: 'Classical Waterfall is a linear-sequential model ideal when requirements are locked down, precise, and completely specified upfront.',
          examTag: 'MH-SET SDLC Pattern'
        },
        quickFacts: [
          'Waterfall model is linear-sequential; cannot easily accommodate mid-project requirement changes.',
          'Spiral model 4 quadrants: Planning, Risk Analysis, Engineering/Development, Customer Evaluation.',
          'Agile Manifesto priorities: Working software over comprehensive documentation; customer collaboration over contract negotiation.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Prototyping Model: Builds quick throwaway prototype to elicit and clarify fuzzy user requirements before committing to full architecture.',
            'Incremental Model: Breaks system into standalone functional increments; delivers partial operating software early to stakeholders.',
            'RAD (Rapid Application Development): High-speed adaptation using component-based construction within strict 60-90 day timeboxes.',
            'Scrum Roles: Product Owner (manages backlog priorities), Scrum Master (removes blockers and enforces process), Scrum Team (cross-functional builders).',
            'Scrum Ceremonies: Sprint Planning, Daily Standup (15 mins), Sprint Review (demo), Sprint Retrospective (process improvement).'
          ],
          coreFormulas: [
            'Sprint Velocity = Sum of User Story Points successfully completed in a sprint',
            'Burndown Chart: X-axis = Time (days in sprint), Y-axis = Remaining Work (hours/story points)'
          ],
          examTraps: [
            'Waterfall does NOT support overlapping phases in its pure classical definition (each phase must finish before the next begins).',
            'In Scrum, the Product Backlog is dynamic and owned strictly by the Product Owner, while the Sprint Backlog is owned by the Development Team.'
          ],
          keyDefinitions: [
            { term: 'Sprint Backlog', definition: 'The subset of highest-priority product backlog items committed for completion during the current sprint.' },
            { term: 'Definition of Done (DoD)', definition: 'Agreed-upon checklist of quality criteria that code must meet before being deemed deliverable.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'se-coupling-cohesion-design',
        title: 'Modularity: Coupling, Cohesion & Design Principles',
        unitId: 6,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 3,
        oneLineExplanation: 'Good software design achieves high cohesion (elements inside a module closely relate) and low coupling (minimal module interdependency).',
        mnemonicTrick: {
          title: 'High-Co Low-Cou Rule',
          trick: '"Cohesion inside the house: TIGHT! Coupling between neighbors: LOOSE!"',
          meaning: 'Cohesion: Functional Cohesion (BEST) > Sequential > Communicational > Procedural > Temporal > Logical > Coincidental (WORST). Coupling: Data Coupling (BEST/LOWEST) > Stamp > Control > Common > Content (WORST/HIGHEST).'
        },
        fillInBlanks: [
          {
            question: 'The worst and most undesirable form of coupling where one module directly modifies the internal code or private data of another module is ______ coupling.',
            answer: 'content',
            hint: 'Internal code tampering',
            explanation: 'Content coupling violates information hiding by modifying or relying on another module\'s internal implementation.'
          },
          {
            question: 'The best and highest form of cohesion where all elements of a module contribute to executing a single well-defined task is ______ cohesion.',
            answer: 'functional',
            hint: 'Single focused function',
            explanation: 'Functional cohesion represents ideal module design with one dedicated responsibility.'
          },
          {
            question: 'Coupling where two modules communicate via shared global memory variables is known as ______ coupling.',
            answer: 'common',
            hint: 'Common / Global data',
            explanation: 'Common coupling binds modules to shared global structures, making changes risky and error-prone.'
          }
        ],
        quickMcq: {
          question: 'Which of the following lists levels of module cohesion ranked in order from the BEST (most desirable) to the WORST (least desirable)?',
          options: [
            { id: 'A', text: 'Functional > Sequential > Communicational > Procedural > Temporal > Logical > Coincidental' },
            { id: 'B', text: 'Coincidental > Logical > Temporal > Procedural > Functional' },
            { id: 'C', text: 'Content > Common > Control > Stamp > Data' },
            { id: 'D', text: 'Communicational > Functional > Logical > Temporal' }
          ],
          correctOptionId: 'A',
          explanation: 'Functional is highest/best; Coincidental is lowest/worst. Complete hierarchy: Functional > Sequential > Communicational > Procedural > Temporal > Logical > Coincidental.',
          examTag: 'MH-SET Design Ranking'
        },
        quickFacts: [
          'Best Coupling: Data Coupling (modules exchange only primitive parameters like integers/floats).',
          'Worst Coupling: Content Coupling (pathological coupling; directly reading/writing another module\'s private state).',
          'Fan-In: Number of incoming calls to a module (high fan-in is good, indicates reuse); Fan-Out: Number of modules invoked by a module (high fan-out indicates high complexity).'
        ],
        detailedNotes: {
          summaryPoints: [
            'Cohesion Types in Detail: Coincidental (unrelated tasks grouped arbitrarily), Logical (grouped by category e.g. all print functions), Temporal (executed at same startup time), Procedural (grouped by loop order), Communicational (operate on same input data), Sequential (output of one is input to next), Functional (executes single goal).',
            'Coupling Types in Detail: Data (primitive arguments), Stamp (pass entire data structure but only use parts), Control (pass flag controlling execution flow), External (bind to OS/hardware protocol), Common (shared global variables), Content (tampering with private internals).',
            'Information Hiding (Parnas Principle): Each module encapsulates a design decision hidden behind a clean public interface.',
            'SOLID Principles: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.'
          ],
          coreFormulas: [
            'Structural Complexity: S(i) = (Fan-Out(i))²',
            'Data Complexity: D(i) = v(i) / (Fan-Out(i) + 1)',
            'System Modularity Goal: Maximize Intramodule Binding (Cohesion) while Minimizing Intermodule Dependency (Coupling)'
          ],
          examTraps: [
            'Do not reverse the rankings! In Cohesion, Functional is TOP. In Coupling, Data Coupling is the LOWEST (BEST) and Content is the HIGHEST (WORST).',
            'Passing an entire student struct when a function only needs age is STAMP coupling, NOT data coupling!'
          ],
          keyDefinitions: [
            { term: 'Cohesion', definition: 'The degree to which the elements inside a single module belong together and are focused on a single responsibility.' },
            { term: 'Coupling', definition: 'The degree of interdependence and coupling interaction between two distinct software modules.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'se-testing-verification-validation',
        title: 'Software Testing: Verification vs Validation & Path Testing',
        unitId: 6,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 3,
        oneLineExplanation: 'Verification checks process correctness without code execution, while Validation assesses software against user requirements via execution.',
        mnemonicTrick: {
          title: 'Boehm\'s Golden Question',
          trick: '"Verification = Are we building the product RIGHT? Validation = Are we building the RIGHT product?"',
          meaning: 'Verification = Static reviews, inspections, walkthroughs (no execution). Validation = Dynamic black-box, white-box, unit, integration, and acceptance execution.'
        },
        fillInBlanks: [
          {
            question: 'Static reviews, walkthroughs, and code inspections performed without executing the program code fall under ______.',
            answer: 'verification',
            hint: 'Verification vs Validation',
            explanation: 'Verification evaluates artifacts and process compliance without running the binary.'
          },
          {
            question: 'Acceptance testing conducted at the developer\'s site by real end-users in a controlled internal environment is called ______ testing.',
            answer: 'alpha',
            hint: 'First Greek letter (before beta)',
            explanation: 'Alpha testing is performed in-house by users under developer supervision; Beta testing is done in the user\'s real environment.'
          },
          {
            question: 'Testing performed to ensure that code changes or bug fixes have not introduced new defects into previously verified features is ______ testing.',
            answer: 'regression',
            hint: 'Regression testing',
            explanation: 'Regression testing re-executes tests to verify stability after modifications.'
          }
        ],
        quickMcq: {
          question: 'A control flow graph has 10 edges, 8 nodes, and 1 connected component. What is its McCabe Cyclomatic Complexity?',
          options: [
            { id: 'A', text: '2' },
            { id: 'B', text: '4' },
            { id: 'C', text: '6' },
            { id: 'D', text: '8' }
          ],
          correctOptionId: 'B',
          explanation: 'V(G) = E - N + 2 = 10 - 8 + 2 = 4 independent basis paths.',
          examTag: 'MH-SET Numerical'
        },
        quickFacts: [
          'Black-box testing methods: Equivalence Class Partitioning, Boundary Value Analysis, Cause-Effect graphing.',
          'White-box testing methods: Basis Path testing, Condition coverage, Loop testing, Mutation testing.',
          'Regression testing verifies that new code edits have not broken previously verified functionalities.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Error, Fault, Bug, Failure: An Error is a human mistake; it creates a Fault (Defect/Bug) in code; when executed, the fault results in a runtime Failure.',
            'Boundary Value Analysis (BVA): Test inputs at borders (Min, Min+, Nominal, Max-, Max). Defects cluster disproportionately at boundary edges.',
            'Equivalence Class Partitioning (ECP): Divides input domain into valid and invalid classes, testing one representative input from each class.',
            'Integration Testing Strategies: Big Bang (integrate everything at once), Top-Down (requires Stubs to simulate lower modules), Bottom-Up (requires Drivers to simulate calling modules).',
            'Cyclomatic Complexity (McCabe): Defines the upper bound on the number of test cases required for branch/basis path coverage.'
          ],
          coreFormulas: [
            'McCabe Cyclomatic Complexity formula 1: V(G) = E - N + 2P (where E = Edges, N = Nodes, P = Connected Components)',
            'McCabe Cyclomatic Complexity formula 2: V(G) = Predicate_Nodes + 1',
            'McCabe Cyclomatic Complexity formula 3: V(G) = Total enclosed Regions + 1 (outer region)'
          ],
          examTraps: [
            'Top-down integration uses STUBS (dummy called subroutines); Bottom-up integration uses DRIVERS (dummy calling main routines). Do not flip these!',
            'Boundary Value Analysis tests 4n + 1 test cases for n input variables (or 6n + 1 for robust testing).'
          ],
          keyDefinitions: [
            { term: 'Stub', definition: 'A dummy subprogram used in top-down integration testing to simulate lower-level modules not yet integrated.' },
            { term: 'Driver', definition: 'A test harness program used in bottom-up integration testing to pass test cases to a lower-level module.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'se-cocomo-cost-estimation',
        title: 'Project Estimation: COCOMO Model & Function Point Analysis',
        unitId: 6,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 3,
        oneLineExplanation: 'Barry Boehm\'s COCOMO models estimate project effort and development time based on KLOC across Organic, Semidetached, and Embedded modes.',
        mnemonicTrick: {
          title: '3 COCOMO Modes',
          trick: '"Old Soldiers Excel: Organic (small team, easy), Semidetached (medium), Embedded (tight hardware, critical)"',
          meaning: 'Organic = Small teams, well-understood domain, flexible deadlines. Semidetached = Intermediate team, mixed experience. Embedded = Stringent constraints, flight control/banking.'
        },
        fillInBlanks: [
          {
            question: 'In Barry Boehm\'s Basic COCOMO model, software projects developed under strict hardware constraints with tightly coupled interfaces belong to the ______ mode.',
            answer: 'embedded',
            hint: 'Organic vs Embedded',
            explanation: 'Embedded systems (e.g., avionics, medical devices) have rigid requirements and tight hardware couplings.'
          },
          {
            question: 'In the Basic COCOMO model, the mathematical equation for estimating development effort in person-months is Effort = a × (KLOC)^______.',
            answer: 'b',
            hint: 'Exponent parameter',
            explanation: 'Effort = a × (KLOC)^b, where b > 1 reflects non-linear diseconomies of scale for larger projects.'
          },
          {
            question: 'In Function Point (FP) analysis, five Information Domain characteristics are evaluated: External Inputs, External Outputs, External Inquiries, Internal Logical Files, and External ______ Files.',
            answer: 'Interface',
            hint: 'EIF acronym',
            explanation: 'The 5 FP components: EI, EO, EQ, ILF, and EIF (External Interface Files).'
          }
        ],
        quickMcq: {
          question: 'In Function Point Analysis, the Value Adjustment Factor (VAF) is computed using 14 general system characteristics (GSC) using the formula:',
          options: [
            { id: 'A', text: 'VAF = 0.65 + 0.01 × Σ(F_i)' },
            { id: 'B', text: 'VAF = 1.0 + 0.05 × Σ(F_i)' },
            { id: 'C', text: 'VAF = 0.50 + 0.10 × Σ(F_i)' },
            { id: 'D', text: 'VAF = Σ(F_i) / 14' }
          ],
          correctOptionId: 'A',
          explanation: 'Function Points = Unadjusted Function Points (UFP) × (0.65 + 0.01 × Σ(F_i)), where each F_i is rated from 0 to 5.',
          examTag: 'MH-SET Cost Estimation'
        },
        quickFacts: [
          'Basic COCOMO effort exponents: Organic (b = 1.05), Semidetached (b = 1.12), Embedded (b = 1.20).',
          'Intermediate COCOMO incorporates 15 Cost Drivers (Effort Multipliers covering Product, Hardware, Personnel, Project).',
          'Function Point is programming language-independent, making it superior to raw LOC for early project estimation.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Lines of Code (LOC) Limitations: Highly language-dependent (100 LOC in Assembly != 100 LOC in Python); penalizes concise, expressive programming.',
            'Function Point Analysis (Albrecht): Measures software size based on functionality delivered to user rather than lines of source code.',
            '5 Function Point Components: External Inputs (EI, transactions), External Outputs (EO, reports), External Inquiries (EQ, on-line search), Internal Logical Files (ILF, user-maintained database tables), External Interface Files (EIF, files accessed from external systems).',
            'COCOMO II: Modern successor providing Application Composition, Early Design, and Post-Architecture models with scale factors.',
            'Development Time (Tdev): Calculated as Tdev = c × (Effort)^d months.'
          ],
          coreFormulas: [
            'Basic COCOMO Effort: Effort = a × (KLOC)^b (Person-Months)',
            'Basic COCOMO Tdev: Tdev = c × (Effort)^d (Calendar Months)',
            'Staff Size (People Needed): Staff = Effort / Tdev',
            'Function Points: FP = UFP × (0.65 + 0.01 × Σ F_i), where Σ F_i ranges from 0 to 70 (VAF from 0.65 to 1.35)'
          ],
          examTraps: [
            'Remember that b > 1 in the effort equation! This means effort grows faster than linear as KLOC increases.',
            'Unadjusted Function Points (UFP) count is multiplied by complexity weights (Simple, Average, Complex) before applying VAF.'
          ],
          keyDefinitions: [
            { term: 'KLOC', definition: 'Kilo (Thousands of) Lines of Code used as the traditional sizing unit in software cost estimation.' },
            { term: 'Person-Month', definition: 'The amount of work one software developer can deliver in one calendar month (typically 152 working hours).' }
          ]
        },
        pyqs: []
      },
      {
        id: 'se-quality-models-rmmm',
        title: 'Software Quality Models (ISO 9126, McCall) & Risk Management (RMMM)',
        unitId: 6,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 3,
        oneLineExplanation: 'Quality models standardize evaluation across usability, reliability, and maintainability, guided by proactive Risk Mitigation, Monitoring, and Management.',
        mnemonicTrick: {
          title: 'ISO 9126 Quality Pillars',
          trick: '"FRUMPE: Functionality, Reliability, Usability, Maintainability, Portability, Efficiency"',
          meaning: 'The 6 top-level software product quality characteristics defined in the international standard ISO/IEC 9126.'
        },
        fillInBlanks: [
          {
            question: 'In McCall\'s software quality model, quality factors are grouped into three perspectives: Product Operation, Product Revision, and Product ______.',
            answer: 'Transition',
            hint: 'Portability across environments',
            explanation: 'McCall\'s 3 categories: Operation (how it runs), Revision (how easily it is changed), Transition (how easily it moves to new environments).'
          },
          {
            question: 'The risk management strategy that details actions to reduce the probability or impact of a risk event is Risk ______.',
            answer: 'Mitigation',
            hint: 'Mitigation, Monitoring, Management (RMMM)',
            explanation: 'Risk Mitigation plans proactive preventive steps to lessen the likelihood or damage of anticipated risks.'
          },
          {
            question: 'The process of analyzing an existing software system to identify its components and create representations of the system at a higher level of abstraction is ______ engineering.',
            answer: 'reverse',
            hint: 'Opposite of forward engineering',
            explanation: 'Reverse engineering extracts design information and architecture from existing source code.'
          }
        ],
        quickMcq: {
          question: 'Under McCall’s Software Quality Model, which of the following quality factors belongs to the "Product Revision" category?',
          options: [
            { id: 'A', text: 'Correctness' },
            { id: 'B', text: 'Maintainability' },
            { id: 'C', text: 'Portability' },
            { id: 'D', text: 'Integrity' }
          ],
          correctOptionId: 'B',
          explanation: 'Product Revision encompasses Maintainability, Flexibility, and Testability (the factors associated with altering the software).',
          examTag: 'MH-SET Quality Standards'
        },
        quickFacts: [
          'McCall Product Operation factors: Correctness, Reliability, Efficiency, Integrity, Usability.',
          'McCall Product Transition factors: Portability, Reusability, Interoperability.',
          'RMMM Plan addresses Risk Mitigation (avoidance), Risk Monitoring (tracking probability), and Risk Management (contingency response if risk materializes).'
        ],
        detailedNotes: {
          summaryPoints: [
            'Software Reliability Metrics: Mean Time Between Failures (MTBF) = Mean Time To Failure (MTTF) + Mean Time To Repair (MTTR).',
            'Software Availability: Availability = MTTF / (MTTF + MTTR) = MTTF / MTBF.',
            'Capability Maturity Model Integration (CMMI) 5 Levels: 1. Initial (ad-hoc, chaotic), 2. Managed (project level), 3. Defined (organization standard), 4. Quantitatively Managed (measured), 5. Optimizing (continuous process improvement).',
            'Software Re-engineering vs Reverse Engineering: Reverse engineering inspects code to reconstruct high-level specifications; Re-engineering reconstructs and modernizes the system into a new implementation.',
            'Software Configuration Management (SCM): Base-lining, version control, change control boards (CCB), and audit tracking.'
          ],
          coreFormulas: [
            'MTBF = MTTF + MTTR',
            'Availability = MTTF / (MTTF + MTTR) × 100%',
            'Risk Exposure (Risk Impact): RE = Probability × Cost_of_Loss'
          ],
          examTraps: [
            'Portability is a Product TRANSITION factor in McCall\'s model, NOT a product operation factor!',
            'Do not confuse MTTF (Time to failure) with MTTR (Time to repair). High MTTF and low MTTR yield superior availability.'
          ],
          keyDefinitions: [
            { term: 'Software Availability', definition: 'The probability that a software system is operating correctly according to specifications at a given point in time.' },
            { term: 'CMMI Level 5 (Optimizing)', definition: 'The highest process maturity level where organization uses quantitative feedback to continuously improve processes.' }
          ]
        },
        pyqs: []
      }
    ]
  },

  // ==========================================
  // UNIT 9: Data Communication and Computer Networks (DAY 4 FOCUS)
  // ==========================================
  {
    id: 9,
    title: 'Unit 9: Data Communication & Networks',
    codeName: 'CN (Focus #4)',
    paperType: 'paper2',
    priorityDay: 4,
    description: 'OSI 7-layer hierarchy, IPv4/IPv6, Subnetting, Routing algorithms, TCP/UDP, Sliding Window, Error Detection (CRC), and Cryptography.',
    topics: [
      {
        id: 'cn-osi-layers-devices',
        title: 'OSI Reference Model & Network Interconnection Devices',
        unitId: 9,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 4,
        oneLineExplanation: 'The 7-layer ISO OSI model standardizes network communication from physical bit signaling up to end-user applications.',
        mnemonicTrick: {
          title: 'OSI Layer Mnemonic',
          trick: '"All People Seem To Need Data Processing (Layers 7 to 1: Application, Presentation, Session, Transport, Network, Data Link, Physical)"',
          meaning: 'Alternatively, Bottom-up: "Please Do Not Throw Sausage Pizza Away" (Physical -> Data Link -> Network -> Transport -> Session -> Presentation -> Application).'
        },
        fillInBlanks: [
          {
            question: 'The OSI layer responsible for dialog control, session checkpointing, and synchronization tokens is the ______ layer.',
            answer: 'Session',
            hint: 'Layer 5',
            explanation: 'Session Layer (Layer 5) manages dialog discipline and checkpoints long transfers.'
          },
          {
            question: 'A network bridge operates at the Data Link layer, whereas a network router operates at the ______ layer.',
            answer: 'Network',
            hint: 'Layer 3',
            explanation: 'Routers forward packets using logical (IP) addresses at the Network layer.'
          },
          {
            question: 'Data encryption, character code translation (ASCII to EBCDIC), and data compression are the responsibility of the ______ layer.',
            answer: 'Presentation',
            hint: 'Layer 6',
            explanation: 'Presentation layer formats syntax and semantics of transmitted data.'
          }
        ],
        quickMcq: {
          question: 'Which network interconnection device operates at Layer 3 of the OSI model and uses routing tables to forward packets across different subnets?',
          options: [
            { id: 'A', text: 'Repeater' },
            { id: 'B', text: 'Bridge' },
            { id: 'C', text: 'Router' },
            { id: 'D', text: 'Hub' }
          ],
          correctOptionId: 'C',
          explanation: 'Routers operate at the Network Layer (Layer 3) to route IP packets between distinct network segments.',
          examTag: 'MH-SET Network Devices'
        },
        quickFacts: [
          'Protocol Data Units (PDUs): Bits (Physical), Frames (Data Link), Packets (Network), Segments (Transport), Data (Session/Pres/App).',
          'Hub/Repeater = Layer 1; Switch/Bridge = Layer 2; Router = Layer 3; Gateway = Layer 7 (Protocol converter).',
          'Transport Layer (Layer 4) provides true end-to-end (process-to-process) communication using Port numbers.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Physical Layer (Layer 1): Transmits raw unstructured bit streams over physical transmission medium; handles pin layout, voltages, cable types, bit rate.',
            'Data Link Layer (Layer 2): Hop-to-hop (node-to-node) node delivery using 48-bit MAC addresses; framing, flow control, and error detection (CRC).',
            'Network Layer (Layer 3): Source-to-destination packet delivery, logical addressing (IPv4/IPv6), and path determination via routing algorithms.',
            'Transport Layer (Layer 4): Process-to-process delivery using 16-bit port addresses; segmentation, reassembly, connection control, flow control, and error recovery.',
            'Presentation Layer (Layer 6): Syntax translation, compression (lossy/lossless), and encryption/decryption (SSL/TLS concepts).'
          ],
          coreFormulas: [
            'Data Link MAC Address: 48 bits (6 bytes, displayed as 12 hexadecimal digits e.g. 00:1A:2B:3C:4D:5E)',
            'Transport Port Address: 16 bits (0 to 65535; Well-known ports: 0-1023, Registered: 1024-49151, Dynamic: 49152-65535)',
            'Maximum Transmission Unit (MTU) of standard Ethernet: 1500 bytes'
          ],
          examTraps: [
            'Data Link provides NODE-TO-NODE (hop-to-hop) delivery; Transport provides END-TO-END (process-to-process) delivery. Do not confuse their scopes!',
            'A switch is a Multiport Bridge operating at Layer 2; a hub is a Multiport Repeater operating at Layer 1.'
          ],
          keyDefinitions: [
            { term: 'PDU (Protocol Data Unit)', definition: 'Unit of data specified in an OSI layer protocol containing header metadata and payload data.' },
            { term: 'Gateway', definition: 'A protocol converter capable of operating across all 7 layers to interconnect completely dissimilar networks.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'cn-ipv4-subnetting-routing',
        title: 'IPv4 Addressing, Subnetting, CIDR & Routing Protocols',
        unitId: 9,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 8,
        dayAssigned: 4,
        oneLineExplanation: 'IPv4 addresses (32-bit) are partitioned via subnet masks and routed using interior (Distance Vector, Link State) and exterior protocols.',
        mnemonicTrick: {
          title: 'Classful IP Ranges',
          trick: '"A=0 to 127, B=128 to 191, C=192 to 223, D=224 to 239 (Multicast), E=240 to 255 (Research)"',
          meaning: 'Class A: /8 (Large orgs). Class B: /16 (Medium). Class C: /24 (Small). Class D: Multicast. Class E: Experimental.'
        },
        fillInBlanks: [
          {
            question: 'The total number of usable host addresses in an IPv4 subnet configured with a /26 prefix length (mask 255.255.255.192) is ______.',
            answer: '62',
            hint: '2^(32-26) - 2',
            explanation: '32 - 26 = 6 host bits. 2^6 - 2 (network & broadcast reserved) = 64 - 2 = 62 usable hosts.'
          },
          {
            question: 'The Distance Vector routing protocol (like RIP) uses the ______-Ford algorithm to compute shortest paths based on hop counts.',
            answer: 'Bellman',
            hint: 'Bellman-Ford algorithm',
            explanation: 'RIP relies on the Bellman-Ford algorithm and limits max hop count to 15 (16 = infinity).'
          },
          {
            question: 'Link State routing protocols (such as OSPF) utilize ______ algorithm to compute the shortest path tree from each router.',
            answer: 'Dijkstra\'s',
            hint: 'Dijkstra shortest path',
            explanation: 'OSPF floods link state advertisements (LSAs) and runs Dijkstra\'s algorithm locally on complete topology maps.'
          }
        ],
        quickMcq: {
          question: 'What is the network address for an IP address 192.168.10.138 with a subnet mask of 255.255.255.192 (/26)?',
          options: [
            { id: 'A', text: '192.168.10.0' },
            { id: 'B', text: '192.168.10.128' },
            { id: 'C', text: '192.168.10.64' },
            { id: 'D', text: '192.168.10.192' }
          ],
          correctOptionId: 'B',
          explanation: '138 in binary is 10001010. Mask 192 is 11000000. Bitwise AND gives 10000000 = 128. Network address is 192.168.10.128.',
          examTag: 'MH-SET Subnetting'
        },
        quickFacts: [
          'Usable hosts in /n subnet = 2^(32 - n) - 2 (all-0s is Network Address, all-1s is Directed Broadcast Address).',
          'Count-to-Infinity problem occurs in Distance Vector routing; mitigated using Split Horizon and Poison Reverse.',
          'Private IP ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Classless Inter-Domain Routing (CIDR): Eliminates rigid classes (A, B, C) using variable-length prefix notation (/n) to prevent IP address space exhaustion.',
            'Supernetting (Route Aggregation): Combines multiple contiguous class C network addresses into a single larger routing table entry (reduces routing table size).',
            'Distance Vector Routing: Routers share their entire routing table with immediate neighbors periodically; slow convergence; suffers from count-to-infinity.',
            'Link State Routing: Routers flood link information to all routers only when changes occur; rapid convergence; uses Dijkstra\'s shortest path tree.',
            'Border Gateway Protocol (BGP): The standard Path-Vector inter-autonomous system (AS) exterior gateway protocol powering internet routing.'
          ],
          coreFormulas: [
            'Host bits h = 32 - Prefix_Length',
            'Total IP addresses = 2^h; Usable Host addresses = 2^h - 2',
            'Subnet Mask bit calculation: 256 - Subnet_Block_Size',
            'RIP Max Hop Count = 15 (Hop 16 represents unreachable infinity)'
          ],
          examTraps: [
            'Always subtract 2 from total addresses when calculating USABLE host IPs (one for network ID, one for broadcast ID)!',
            'Loopback IP address range is 127.0.0.0/8 (commonly 127.0.0.1); packets addressed to loopback never touch the physical network wire.'
          ],
          keyDefinitions: [
            { term: 'CIDR (Classless Inter-Domain Routing)', definition: 'Method for allocating IP addresses and routing IP packets using variable-length subnet masks (/prefix).' },
            { term: 'Split Horizon', definition: 'Distance-vector routing rule preventing a router from advertising a route back along the interface from which it learned it.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'cn-tcp-udp-sliding-window',
        title: 'Transport Protocols: TCP vs UDP & Sliding Window Protocols',
        unitId: 9,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 4,
        oneLineExplanation: 'TCP provides reliable, connection-oriented byte streams with flow and congestion control, while UDP offers fast, connectionless datagram delivery.',
        mnemonicTrick: {
          title: 'TCP vs UDP Battle',
          trick: '"TCP = Total Control Protocol (Reliable, 3-Way Handshake, Flow Control). UDP = User Datagram Postcard (Fast, Fire-and-Forget, No ACK)"',
          meaning: 'TCP guarantees delivery, ordering, and congestion backoff. UDP has zero connection overhead (DNS, VoIP, video streaming).'
        },
        fillInBlanks: [
          {
            question: 'In the Go-Back-N sliding window protocol, if the sequence number field is k bits, the maximum sender window size is ______.',
            answer: '2^k - 1',
            hint: '2 to the power k minus 1',
            explanation: 'In Go-Back-N, Sender Window = 2^k - 1 and Receiver Window = 1 to prevent ambiguity.'
          },
          {
            question: 'In Selective Repeat sliding window protocol with k-bit sequence numbers, the maximum sender and receiver window sizes are both equal to ______.',
            answer: '2^(k-1)',
            hint: 'Half of 2^k',
            explanation: 'In Selective Repeat, W_sender = W_receiver = 2^(k-1) so sender and receiver windows do not overlap.'
          },
          {
            question: 'The minimum header size of a standard TCP segment is ______ bytes.',
            answer: '20',
            hint: '20 to 60 bytes',
            explanation: 'TCP header without options is 20 bytes; UDP is 8 bytes.'
          }
        ],
        quickMcq: {
          question: 'Which TCP congestion control mechanism triggers when 3 duplicate ACKs are received, indicating packet loss without timeout?',
          options: [
            { id: 'A', text: 'Slow Start' },
            { id: 'B', text: 'Fast Retransmit' },
            { id: 'C', text: 'Congestion Avoidance' },
            { id: 'D', text: 'Additive Decrease' }
          ],
          correctOptionId: 'B',
          explanation: '3 duplicate ACKs trigger Fast Retransmit without waiting for the retransmission timeout (RTO) to expire.',
          examTag: 'MH-SET Transport'
        },
        quickFacts: [
          'TCP header is 20 to 60 bytes; UDP header is fixed at 8 bytes.',
          'TCP 3-way handshake: SYN -> SYN-ACK -> ACK. Connection teardown: FIN -> ACK -> FIN -> ACK (4-way).',
          'In Go-Back-N, receiver uses cumulative ACKs; in Selective Repeat, receiver uses individual ACKs and buffers out-of-order packets.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Sliding Window Efficiency: Utilization η = N / (1 + 2a), where a = Propagation Delay / Transmission Delay (T_prop / T_tx).',
            'Stop-and-Wait is Sliding Window with Window Size N = 1; efficiency is η = 1 / (1 + 2a).',
            'TCP Congestion Control Phases: Slow Start (exponential growth of cwnd until ssthresh), Congestion Avoidance (linear growth by 1 MSS per RTT), Fast Recovery.',
            'Flow Control vs Congestion Control: Flow control protects the receiving host from buffer overflow (Receiver Window rwnd); Congestion control protects the network subnet (Congestion Window cwnd).',
            'Actual Transmission Window: Max_Window = min(cwnd, rwnd).'
          ],
          coreFormulas: [
            'Normalized Propagation Delay: a = T_prop / T_tx = (Distance / Propagation_Speed) / (Packet_Size / Bandwidth)',
            'Stop-and-Wait Efficiency: η = 1 / (1 + 2a)',
            'Go-Back-N Efficiency: η = N / (1 + 2a), where N ≤ 2^k - 1',
            'Selective Repeat Efficiency: η = N / (1 + 2a), where N ≤ 2^(k-1)'
          ],
          examTraps: [
            'In Go-Back-N, Receiver Window is strictly 1 (it discards out-of-order frames). In Selective Repeat, Receiver Window equals Sender Window = 2^(k-1).',
            'UDP header is 8 bytes; TCP header is minimum 20 bytes (maximum 60 bytes with options).'
          ],
          keyDefinitions: [
            { term: 'Piggybacking', definition: 'Delaying an outgoing acknowledgment so it can be hooked into an outgoing data frame travelling in the reverse direction.' },
            { term: 'Silly Window Syndrome', definition: 'Degraded transmission efficiency caused by sender transmitting data in tiny fragments when receiver advertises tiny window updates.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'cn-error-detection-channel-capacity',
        title: 'Error Detection (CRC, Hamming), Capacity & Multiple Access',
        unitId: 9,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 4,
        oneLineExplanation: 'Data link protocols govern physical channel limits (Nyquist/Shannon), error detection via polynomial CRC, and shared collision access (CSMA/CD).',
        mnemonicTrick: {
          title: 'Shannon vs Nyquist',
          trick: '"Nyquist = Noiseless (2B log2 M). Shannon = Signal/Noise (B log2(1 + SNR))"',
          meaning: 'Nyquist calculates theoretical maximum bit rate for noiseless channels. Shannon calculates channel capacity in the presence of thermal Gaussian noise.'
        },
        fillInBlanks: [
          {
            question: 'To guarantee detection of up to d bit errors, the minimum Hamming distance between any two valid codewords must be ______.',
            answer: 'd + 1',
            hint: 'd plus 1',
            explanation: 'To detect d errors, d + 1 distance is required; to correct d errors, 2d + 1 distance is required.'
          },
          {
            question: 'In Ethernet CSMA/CD, the minimum frame size L is determined by the formula: L ≥ 2 × Bandwidth × ______ delay.',
            answer: 'propagation',
            hint: 'Transmission must cover Round Trip Time (2 * T_prop)',
            explanation: 'To detect collisions before transmission completes, T_tx ≥ 2 × T_prop, so L ≥ 2 × B × T_prop.'
          },
          {
            question: 'Cyclic Redundancy Check (CRC) detects burst transmission errors by treating bit streams as polynomials and performing modulo-______ binary division.',
            answer: '2',
            hint: 'Modulo-2 arithmetic (XOR)',
            explanation: 'CRC uses modulo-2 arithmetic (XOR addition and subtraction without carry).'
          }
        ],
        quickMcq: {
          question: 'According to Shannon\'s Channel Capacity Theorem, what is the maximum data rate of a channel with a 3 kHz bandwidth and a Signal-to-Noise Ratio (SNR) of 1023 (approx 30 dB)?',
          options: [
            { id: 'A', text: '6 kbps' },
            { id: 'B', text: '30 kbps' },
            { id: 'C', text: '60 kbps' },
            { id: 'D', text: '120 kbps' }
          ],
          correctOptionId: 'B',
          explanation: 'C = B log2(1 + SNR) = 3000 × log2(1 + 1023) = 3000 × log2(1024) = 3000 × 10 = 30,000 bps = 30 kbps.',
          examTag: 'MH-SET Channel Numerical'
        },
        quickFacts: [
          'Nyquist Bit Rate: C = 2 × B × log2(M) for noiseless channels with M discrete signal levels.',
          'Shannon Capacity: C = B × log2(1 + SNR) for noisy channels.',
          'Pure ALOHA maximum channel efficiency = 18.4% (1 / 2e); Slotted ALOHA maximum efficiency = 36.8% (1 / e).'
        ],
        detailedNotes: {
          summaryPoints: [
            'Hamming Code: Error correcting code that places parity bits at powers of 2 positions (1, 2, 4, 8...).',
            'Cyclic Redundancy Check (CRC): Divides data frame augmented with r zeros by generator polynomial G(x) of degree r; remainder is the CRC checksum appended to frame.',
            'Multiple Access Protocols: Random Access (ALOHA, CSMA/CD, CSMA/CA), Controlled Access (Reservation, Polling, Token Passing), Channelization (FDMA, TDMA, CDMA).',
            'CSMA/CD: Carrier Sense Multiple Access with Collision Detection. When collision is detected, transmitting station sends Jam Signal and initiates Exponential Backoff.',
            'CSMA/CA: Collision Avoidance used in wireless 802.11 WiFi using RTS/CTS frames (Request to Send / Clear to Send) to solve Hidden Terminal Problem.'
          ],
          coreFormulas: [
            'Nyquist Bit Rate: BitRate = 2 × B × log2(M)',
            'Shannon Channel Capacity: C = B × log2(1 + SNR)',
            'SNR in dB: SNR_dB = 10 × log10(SNR)',
            'CSMA/CD Collision Detection: T_frame ≥ 2 × T_prop <=> Min_Frame_Size ≥ 2 × Bandwidth × T_prop'
          ],
          examTraps: [
            'If SNR is given in dB, convert it to a ratio before using Shannon\'s formula! For example, 30 dB = 10^(30/10) = 1000.',
            'CSMA/CD is used in wired Ethernet (802.3), but CANNOT be used in wireless WiFi (802.11) because wireless radios cannot transmit and listen concurrently; WiFi uses CSMA/CA.'
          ],
          keyDefinitions: [
            { term: 'Hamming Distance', definition: 'The number of bit positions in which two binary codewords of equal length differ.' },
            { term: 'Vulnerable Period in Pure ALOHA', definition: 'Time period equal to 2 × Frame_Transmission_Time during which another transmission will cause a collision.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'cn-network-layer-cryptography',
        title: 'Network Protocols (ARP, ICMP, IPv6) & Network Cryptography',
        unitId: 9,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 4,
        oneLineExplanation: 'Network support protocols resolve hardware addresses and monitor routes, protected by symmetric/asymmetric public-key cryptographic security.',
        mnemonicTrick: {
          title: 'ARP vs RARP Mnemonic',
          trick: '"ARP gives MAC from IP; RARP gives IP from MAC"',
          meaning: 'Address Resolution Protocol (ARP) dynamically resolves an IP address to a physical 48-bit MAC address. Reverse ARP (RARP) does the reverse for diskless systems.'
        },
        fillInBlanks: [
          {
            question: 'The network layer diagnostic protocol that powers network commands like ping and traceroute is ______.',
            answer: 'ICMP',
            hint: 'Internet Control Message Protocol',
            explanation: 'ICMP handles error reporting (Destination Unreachable) and queries (Echo Request/Reply).'
          },
          {
            question: 'An IPv6 address has a total address length of ______ bits, represented as eight groups of four hexadecimal digits.',
            answer: '128',
            hint: '4 times IPv4 length',
            explanation: 'IPv6 uses 128-bit addresses (e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334).'
          },
          {
            question: 'The asymmetric public-key cryptographic algorithm whose security relies on the computational difficulty of factoring the product of two large prime numbers is ______.',
            answer: 'RSA',
            hint: 'Rivest, Shamir, and Adleman',
            explanation: 'RSA public-key cryptography is based on prime integer factorization.'
          }
        ],
        quickMcq: {
          question: 'In asymmetric public-key cryptography, if Alice wants to send a confidential encrypted message to Bob that ONLY Bob can read, Alice encrypts the message using:',
          options: [
            { id: 'A', text: 'Alice’s Private Key' },
            { id: 'B', text: 'Alice’s Public Key' },
            { id: 'C', text: 'Bob’s Public Key' },
            { id: 'D', text: 'Bob’s Private Key' }
          ],
          correctOptionId: 'C',
          explanation: 'To ensure confidentiality, the sender encrypts with the recipient’s Public Key; only the recipient’s Private Key can decrypt it.',
          examTag: 'MH-SET Cryptography'
        },
        quickFacts: [
          'ARP request is Broadcast (FF:FF:FF:FF:FF:FF); ARP reply is Unicast.',
          'IPv6 eliminates Broadcast addresses entirely; replaces with Anycast, Unicast, and Multicast.',
          'Digital Signature achieves Non-Repudiation and Authenticity by having the sender encrypt a message hash with their Private Key.'
        ],
        detailedNotes: {
          summaryPoints: [
            'ARP Operation: Sender broadcasts ARP Request containing target IP; target replies with unicast ARP Reply containing its MAC address; cached in local ARP table.',
            'ICMP Functions: Error reporting (Destination Unreachable, Time Exceeded for TTL=0, Parameter Problem) and Query messages (Echo Request/Reply used by ping).',
            'IPv6 Features: 128-bit address space, fixed 40-byte base header (no header checksum to accelerate routing), built-in IPsec security, extension headers.',
            'Symmetric Encryption: Same secret key for encryption and decryption (DES, 3DES, AES); very fast, but requires secure key exchange.',
            'Asymmetric Encryption: Public key encrypts, private key decrypts (RSA, Diffie-Hellman, ECC); slower, solves key distribution problem.'
          ],
          coreFormulas: [
            'RSA Key Generation: Choose primes p, q; n = p × q; Euler totient φ(n) = (p - 1)(q - 1)',
            'RSA Public Exponent e: 1 < e < φ(n) and gcd(e, φ(n)) = 1',
            'RSA Private Exponent d: d × e ≡ 1 (mod φ(n))',
            'RSA Encryption / Decryption: Ciphertext C = M^e mod n; Plaintext M = C^d mod n'
          ],
          examTraps: [
            'To achieve Confidentiality, encrypt with Recipient\'s PUBLIC key. To create a Digital Signature, encrypt the message hash with Sender\'s PRIVATE key!',
            'Diffie-Hellman algorithm is used strictly for Key Exchange, NOT for direct message encryption.'
          ],
          keyDefinitions: [
            { term: 'Non-Repudiation', definition: 'Security service proving that a specific sender originated a message, preventing them from subsequently denying it.' },
            { term: 'Digital Certificate (X.509)', definition: 'An electronic credential digitally signed by a Certificate Authority (CA) binding a public key to an entity identity.' }
          ]
        },
        pyqs: []
      }
    ]
  },

  // ==========================================
  // UNIT 10: Artificial Intelligence (DAY 5 FOCUS)
  // ==========================================
  {
    id: 10,
    title: 'Unit 10: Artificial Intelligence',
    codeName: 'AI (Focus #5)',
    paperType: 'paper2',
    priorityDay: 5,
    description: 'Heuristic search (A*, Minimax, Alpha-Beta), Knowledge representation, Planning (STRIPS), Fuzzy Logic, Genetic Algorithms, and Neural Networks.',
    topics: [
      {
        id: 'ai-heuristic-search-astar',
        title: 'State Space Search: A* Algorithm, Minimax & Alpha-Beta Pruning',
        unitId: 10,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 8,
        dayAssigned: 5,
        oneLineExplanation: 'Informed search uses heuristic estimates f(n) = g(n) + h(n) to find optimal goals, while Alpha-Beta pruning eliminates unpromising game tree branches.',
        mnemonicTrick: {
          title: 'A* Evaluation Function',
          trick: '"f = g + h: Good Past Cost (g) + Hopeful Future Heuristic (h)"',
          meaning: 'g(n) = exact cost from start to node n. h(n) = estimated cost from n to goal. If h(n) never overestimates actual cost (admissible), A* is guaranteed to find the optimal path.'
        },
        fillInBlanks: [
          {
            question: 'An informed heuristic h(n) is said to be ______ if it never overestimates the true cost to reach the nearest goal state.',
            answer: 'admissible',
            hint: 'Admissible heuristic property',
            explanation: 'Admissibility guarantees A* tree search finds the optimal path without missing cheaper routes.'
          },
          {
            question: 'In the Alpha-Beta cutoff procedure for two-player game trees, alpha represents the best score found so far for the ______ player.',
            answer: 'MAX',
            hint: 'MAX vs MIN player',
            explanation: 'Alpha is the minimum score the MAX player is assured of; beta is the maximum score the MIN player is assured of.'
          },
          {
            question: 'Alpha-Beta pruning performs an alpha cutoff (prunes remaining child branches) whenever alpha is greater than or equal to ______.',
            answer: 'beta',
            hint: 'Alpha >= Beta',
            explanation: 'When α ≥ β, the parent node will never select this branch, so remaining child nodes are pruned.'
          }
        ],
        quickMcq: {
          question: 'If an evaluation heuristic function h(n) satisfies the triangle inequality condition h(n) ≤ c(n, a, n′) + h(n′) for every node n and successor n′, the heuristic is:',
          options: [
            { id: 'A', text: 'Admissible only' },
            { id: 'B', text: 'Consistent (Monotonic)' },
            { id: 'C', text: 'Complete but non-optimal' },
            { id: 'D', text: 'Inadmissible' }
          ],
          correctOptionId: 'B',
          explanation: 'Consistency (monotonicity) enforces the triangle inequality and guarantees that when A* expands a node, the path found to that node is already optimal.',
          examTag: 'MH-SET AI Core Search'
        },
        quickFacts: [
          'If h(n) = 0 for all nodes, A* degenerates into Dijkstra’s uniform-cost algorithm.',
          'Consistent heuristics are always admissible; an admissible heuristic is not necessarily consistent.',
          'With optimal node ordering, Alpha-Beta pruning reduces search complexity from O(b^d) down to O(b^(d/2)).'
        ],
        detailedNotes: {
          summaryPoints: [
            'Uninformed vs Informed Search: Uninformed (BFS, DFS, Uniform Cost) has no domain knowledge beyond problem definition. Informed (Greedy Best-First, A*) uses heuristics h(n) to prioritize nodes.',
            'Greedy Best-First Search: Uses evaluation function f(n) = h(n); fast, but neither complete nor optimal (can get trapped in loops).',
            'Iterative Deepening A* (IDA*): Combines memory efficiency of DFS with optimality of A* by cutting off search when f(n) exceeds a threshold.',
            'Hill Climbing Problems: Local Maxima (peaks lower than global peak), Plateaus (flat areas with equal values), Ridges (slopes with no single upward direction).',
            'Simulated Annealing: Escapes local maxima by allowing occasional downhill (worse) moves with probability e^(-ΔE / T) governed by temperature parameter T.'
          ],
          coreFormulas: [
            'A* Evaluation Function: f(n) = g(n) + h(n)',
            'Admissibility Condition: 0 ≤ h(n) ≤ h*(n) (where h*(n) is true minimum cost to goal)',
            'Consistency (Monotonicity) Condition: h(n) ≤ c(n, a, n′) + h(n′)',
            'Alpha-Beta Pruning Cutoff: Prune branch if α ≥ β'
          ],
          examTraps: [
            'Admissibility guarantees optimality for TREE search, but CONSISTENCY is required to guarantee optimality for GRAPH search without re-opening closed nodes!',
            'Alpha is updated ONLY by MAX nodes; Beta is updated ONLY by MIN nodes.'
          ],
          keyDefinitions: [
            { term: 'Admissible Heuristic', definition: 'A heuristic function that never overestimates the actual cost to reach the closest goal state.' },
            { term: 'Consistent Heuristic', definition: 'A heuristic where estimated cost from n to goal is no greater than step cost to successor n′ plus estimated cost from n′ to goal.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'ai-fuzzy-logic-inference',
        title: 'Fuzzy Sets, Membership Functions & Defuzzification',
        unitId: 10,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 5,
        oneLineExplanation: 'Fuzzy logic extends Boolean binary values (0 or 1) to continuous truth membership grades in the interval [0, 1].',
        mnemonicTrick: {
          title: 'Fuzzy Set Operations',
          trick: '"Union is MAX, Intersection is MIN, Complement is ONE MINUS"',
          meaning: 'μ(A ∪ B) = max(μA, μB). μ(A ∩ B) = min(μA, μB). μ(A′) = 1 - μA.'
        },
        fillInBlanks: [
          {
            question: 'In fuzzy set theory, the standard operation for fuzzy intersection (AND) between sets A and B calculates the ______ of their membership values.',
            answer: 'minimum',
            hint: 'min(μA, μB)',
            explanation: 'Fuzzy intersection calculates the minimum: μ(A ∩ B)(x) = min(μA(x), μB(x)).'
          },
          {
            question: 'The defuzzification method that computes the center of gravity of the fuzzy output distribution is the ______ method.',
            answer: 'Centroid',
            hint: 'Center of gravity / Centroid',
            explanation: 'Centroid defuzzification calculates the weighted average (center of area) of the membership function.'
          },
          {
            question: 'The height of a fuzzy set is defined as the ______ membership value achieved across its entire universe of discourse.',
            answer: 'maximum',
            hint: 'Supremum / Peak membership value',
            explanation: 'Height = sup_x(μA(x)). If height = 1, the fuzzy set is called a Normal fuzzy set.'
          }
        ],
        quickMcq: {
          question: 'Given two fuzzy sets A and B with membership values μA(x) = 0.7 and μB(x) = 0.4 for an element x, what is the membership value of x in the fuzzy set (A ∩ B′)?',
          options: [
            { id: 'A', text: '0.4' },
            { id: 'B', text: '0.6' },
            { id: 'C', text: '0.7' },
            { id: 'D', text: '0.3' }
          ],
          correctOptionId: 'B',
          explanation: 'μB′(x) = 1 - 0.4 = 0.6. μ(A ∩ B′) = min(μA, μB′) = min(0.7, 0.6) = 0.6.',
          examTag: 'MH-SET Fuzzy Numerical'
        },
        quickFacts: [
          'Law of Excluded Middle (A ∪ A′ = Universal) and Law of Contradiction (A ∩ A′ = ∅) do NOT hold in fuzzy logic!',
          'Common defuzzification methods: Centroid (Center of Gravity), Bisector, Mean of Maximum (MOM), First of Maximum (FOM).',
          'A fuzzy set is "Normal" if its height equals 1; otherwise it is subnormal.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Linguistic Variables: Variables whose values are words or sentences in natural language rather than numbers (e.g. Temperature = {Cold, Warm, Hot}).',
            'Fuzzification: The process of mapping crisp input values into corresponding linguistic fuzzy set membership grades.',
            'Fuzzy Inference Systems (FIS): Mamdani method (uses fuzzy sets as rule consequence; requires defuzzification) and Takagi-Sugeno method (uses mathematical functions/polynomials as consequence).',
            'Alpha-Cut (α-cut): A crisp set containing all elements whose membership degree is greater than or equal to threshold α: A_α = {x | μA(x) ≥ α}.',
            'Support of a fuzzy set: The crisp set of all points x where μA(x) > 0.'
          ],
          coreFormulas: [
            'Fuzzy Union: μ_{A ∪ B}(x) = max(μ_A(x), μ_B(x))',
            'Fuzzy Intersection: μ_{A ∩ B}(x) = min(μ_A(x), μ_B(x))',
            'Fuzzy Complement: μ_{A′}(x) = 1 - μ_A(x)',
            'Centroid Defuzzification: z* = (∫ z · μ(z) dz) / (∫ μ(z) dz) or (Σ z · μ(z)) / (Σ μ(z))'
          ],
          examTraps: [
            'In fuzzy logic, A ∪ A′ ≠ 1 and A ∩ A′ ≠ 0! For example, if μ = 0.6, then complement is 0.4. Min(0.6, 0.4) = 0.4 ≠ 0! This is a favorite MH-SET question.',
            'Support includes all points where membership is strictly > 0, while Core includes all points where membership equals exactly 1.'
          ],
          keyDefinitions: [
            { term: 'Core', definition: 'The crisp set of all points in the universe where membership grade is equal to 1: Core(A) = {x | μA(x) = 1}.' },
            { term: 'Fuzzy Relation', definition: 'A fuzzy subset of Cartesian product X × Y representing the degree of association between elements.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'ai-neural-networks-backprop',
        title: 'Neural Networks: Perceptrons, MLP & Backpropagation',
        unitId: 10,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 5,
        oneLineExplanation: 'Artificial Neural Networks model non-linear mappings using interconnected layers trained via gradient descent backpropagation.',
        mnemonicTrick: {
          title: 'Single Perceptron XOR Failure',
          trick: '"Single Line cannot separate XOR! You need a Multi-Layer Perceptron (MLP) for non-linear boundaries"',
          meaning: 'Minsky and Papert proved in 1969 that a single-layer perceptron can only learn linearly separable functions (AND, OR), failing completely on non-linear XOR.'
        },
        fillInBlanks: [
          {
            question: 'A single-layer perceptron with a threshold step activation function can only classify patterns that are ______ separable.',
            answer: 'linearly',
            hint: 'Separable by a straight hyper-plane',
            explanation: 'Single-layer perceptrons fail on non-linear problems like XOR.'
          },
          {
            question: 'The backpropagation learning algorithm adjusts network connection weights in the direction of the negative ______ of the loss function.',
            answer: 'gradient',
            hint: 'Gradient Descent optimization',
            explanation: 'Gradient descent minimizes the error by updating weights: Δw = -η × ∇E.'
          },
          {
            question: 'The activation function defined as f(x) = max(0, x), which mitigates the vanishing gradient problem in deep networks, is ______.',
            answer: 'ReLU',
            hint: 'Rectified Linear Unit',
            explanation: 'ReLU outputs x for x > 0 and 0 otherwise, providing constant gradient of 1 for positive inputs.'
          }
        ],
        quickMcq: {
          question: 'What is the activation function defined by f(x) = 1 / (1 + e^(-x)) which squashes real numbers into the range (0, 1)?',
          options: [
            { id: 'A', text: 'ReLU' },
            { id: 'B', text: 'Sigmoid' },
            { id: 'C', text: 'Tanh' },
            { id: 'D', text: 'Softmax' }
          ],
          correctOptionId: 'B',
          explanation: 'The Sigmoid (logistic) function maps any real number into an S-curve output in (0, 1).',
          examTag: 'MH-SET ANN'
        },
        quickFacts: [
          'Hopfield Network is a recurrent neural network with symmetric weights serving as associative content-addressable memory.',
          'Self-Organizing Map (SOM / Kohonen Network) is an unsupervised clustering neural architecture.',
          'Vanishing gradient problem occurs in deep networks using sigmoid or tanh activations as derivatives saturate toward zero.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Perceptron Structure: Inputs x_i, Synaptic Weights w_i, Bias b, Summing junction v = Σ(w_i · x_i) + b, Activation Function y = φ(v).',
            'Common Activation Functions: Sigmoid (0 to 1), Tanh (-1 to +1), ReLU (0 to x), Leaky ReLU, Softmax (probability distribution over classes).',
            'Backpropagation Algorithm: Two passes - Forward Pass computes activations and output error; Backward Pass propagates error gradients back using Chain Rule to update weights.',
            'Overfitting Solutions: Dropout (randomly disabling neurons during training), L1/L2 Regularization (weight decay), Early Stopping.',
            'Unsupervised Neural Networks: Self-Organizing Maps (SOM) use competitive Hebbian learning where neurons compete for excitation.'
          ],
          coreFormulas: [
            'Neuron Net Input: v = Σ (w_i · x_i) + b',
            'Sigmoid Function: σ(x) = 1 / (1 + e^(-x)); Derivative: σ′(x) = σ(x) · (1 - σ(x))',
            'Tanh Function: tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))',
            'Weight Update (Gradient Descent): w_new = w_old - η · (∂E / ∂w)'
          ],
          examTraps: [
            'A single-layer perceptron CAN learn AND, OR, and NAND, but CANNOT learn XOR or XNOR because they are not linearly separable.',
            'Sigmoid outputs are not zero-centered (range is 0 to 1), whereas Tanh is zero-centered (range is -1 to +1).'
          ],
          keyDefinitions: [
            { term: 'Epoch', definition: 'One complete forward and backward training pass of the entire dataset through the neural network.' },
            { term: 'Vanishing Gradient', definition: 'Problem where error gradients shrink exponentially as they propagate back through deep layers, stalling early layer learning.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'ai-knowledge-rep-planning',
        title: 'Knowledge Representation (Frames, Scripts) & Planning (STRIPS)',
        unitId: 10,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 5,
        oneLineExplanation: 'Knowledge representation models domain facts using structured graphs, frames, and scripts, executed by STRIPS state-space planners.',
        mnemonicTrick: {
          title: 'STRIPS Action Structure',
          trick: '"PAD: Preconditions, Add List, Delete List"',
          meaning: 'Every STRIPS operator defines: Preconditions (must be true before action can apply), Add List (predicates made true by action), Delete List (predicates made false by action).'
        },
        fillInBlanks: [
          {
            question: 'In Marvin Minsky\'s knowledge representation scheme, a data structure with labeled slots and default filler values for representing stereotypical situations is a ______.',
            answer: 'frame',
            hint: 'Minsky\'s structure',
            explanation: 'Frames organize knowledge into slots (attributes) and fillers (values or default values).'
          },
          {
            question: 'The classic automated planning system developed at Stanford that represents actions using Preconditions, Add list, and Delete list is ______.',
            answer: 'STRIPS',
            hint: 'Stanford Research Institute Problem Solver',
            explanation: 'STRIPS formalizes state transitions using preconditions and add/delete effects.'
          },
          {
            question: 'In Roger Schank\'s natural language understanding, a structure that describes a stereotypical sequence of events in a particular context (e.g., dining at a restaurant) is a ______.',
            answer: 'script',
            hint: 'Theatrical script metaphor',
            explanation: 'Scripts describe predetermined causal sequences of actions in familiar contexts.'
          }
        ],
        quickMcq: {
          question: 'In Goal Stack Planning for the Blocks World, the situation where solving sub-goal A first undoes sub-goal B, and solving B first undoes A (requiring non-linear planning) is known as:',
          options: [
            { id: 'A', text: 'Turing Paradox' },
            { id: 'B', text: 'Sussman’s Anomaly' },
            { id: 'C', text: 'Minsky Dilemma' },
            { id: 'D', text: 'Church-Turing Problem' }
          ],
          correctOptionId: 'B',
          explanation: 'Sussman\'s Anomaly demonstrates that simple linear goal-stack planning fails when subgoals interact destructively.',
          examTag: 'MH-SET Planning Classic'
        },
        quickFacts: [
          'Semantic Networks represent knowledge as graphs: Nodes represent concepts/objects; directed Arcs represent relationships (IS-A, HAS-A).',
          'Conceptual Dependency (CD) theory by Roger Schank models actions using 11 primitive ACTs (e.g. ATRANS, PTRANS, MTRANS, MBUILD).',
          'Non-linear Planning (Partial Order Planning - POP) constructs plans as search in the space of plans rather than states.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Predicate Logic Knowledge Representation: First-Order Logic (FOL) with universal (∀) and existential (∃) quantifiers provides unambiguous semantics.',
            'Frames: Inheritance hierarchy where child frames inherit attributes from parent frames via IS-A slots; support procedural attachments (if-needed, if-added daemons).',
            'Scripts Components: Entry Conditions, Results, Props (objects), Roles (participants), Track (environment context), Scenes (action sequence).',
            'Goal Stack Planning: Uses a stack containing subgoals and operators; pops goals and pushes matching operators whose preconditions become subgoals.',
            'Partial Order Planning (POP): Retains flexibility by leaving ordering of independent actions open until conflicts arise (Causal Links and Threat resolution).'
          ],
          coreFormulas: [
            'STRIPS Operator: Op(Action, Preconditions, Delete_List, Add_List)',
            'State Transition: S_{next} = (S_{current} - Delete_List) ∪ Add_List',
            'Sussman Anomaly: Illustrates failure of goal independence assumption'
          ],
          examTraps: [
            'Do NOT confuse Scripts with Frames: Frames represent stereotypical objects or situations; Scripts represent stereotypical SEQUENCES of events over time.',
            'In STRIPS, predicates in the Delete List are REMOVED from the current state; predicates in the Add List are ADDED.'
          ],
          keyDefinitions: [
            { term: 'Slot-and-Filler Structure', definition: 'Knowledge representation scheme where attributes are stored as slots and associated values as fillers.' },
            { term: 'Causal Link', definition: 'In partial order planning, a protected relationship indicating action A produces a condition needed by action B.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'ai-genetic-algorithms-expert-systems',
        title: 'Genetic Algorithms (GA) & Rule-Based Expert Systems',
        unitId: 10,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 6,
        dayAssigned: 5,
        oneLineExplanation: 'Genetic algorithms search complex solution spaces using natural selection mechanisms, while Expert Systems emulate human decision-making with inference engines.',
        mnemonicTrick: {
          title: 'GA Cycle Sequence',
          trick: '"Initial Pop -> Fitness -> Selection -> Crossover -> Mutation -> Next Generation"',
          meaning: 'GAs iterate through Selection (reproduce fittest), Crossover (recombine traits), and Mutation (random exploration) until convergence.'
        },
        fillInBlanks: [
          {
            question: 'The genetic operator in GAs that pairs parent chromosomes to swap segments and produce offspring chromosomes is ______.',
            answer: 'crossover',
            hint: 'Recombination operator',
            explanation: 'Crossover (single-point, two-point, uniform) combines genetic material from two fit parents.'
          },
          {
            question: 'In Rule-Based Expert Systems, the inference strategy that starts with known facts and applies rules to deduce new conclusions is ______ chaining.',
            answer: 'forward',
            hint: 'Data-driven chaining',
            explanation: 'Forward chaining is data-driven, matching premise conditions in IF-THEN rules to derive consequences.'
          },
          {
            question: 'The selection method in GAs where the probability of selecting an individual is directly proportional to its fitness score is ______ wheel selection.',
            answer: 'roulette',
            hint: 'Casino wheel selection',
            explanation: 'Roulette wheel (fitness-proportionate) selection assigns wheel slices proportional to individual fitness.'
          }
        ],
        quickMcq: {
          question: 'Backward chaining in an expert system’s inference engine is best described as:',
          options: [
            { id: 'A', text: 'Data-driven reasoning starting from input facts' },
            { id: 'B', text: 'Goal-driven reasoning working backward from a hypothesis' },
            { id: 'C', text: 'Random search without heuristics' },
            { id: 'D', text: 'Unsupervised pattern clustering' }
          ],
          correctOptionId: 'B',
          explanation: 'Backward chaining is goal-driven: it starts with a target hypothesis and checks if sub-facts supporting it can be proven.',
          examTag: 'MH-SET Inference Strategy'
        },
        quickFacts: [
          'John Holland developed Genetic Algorithms in the 1970s based on Darwinian survival of the fittest.',
          'Expert System core components: Knowledge Base (domain rules), Inference Engine (reasoning logic), User Interface, Explanation Facility.',
          'Conflict Resolution in Expert Systems: Decides which rule fires when multiple rules match (e.g. specificity, recency, priority).'
        ],
        detailedNotes: {
          summaryPoints: [
            'GA Biological Analogies: Chromosome = Candidate Solution; Gene = Decision Variable; Allele = Value of variable; Fitness = Objective function score.',
            'Crossover Techniques: Single-Point (cut at index k and swap tails), Two-Point (swap segment between k1 and k2), Uniform (each bit chosen randomly from parents).',
            'Mutation: Flips bits with small probability (e.g. 0.001 - 0.01) to introduce novel traits and prevent premature convergence to sub-optimal local extrema.',
            'Forward Chaining vs Backward Chaining: Forward chaining is data-driven (good for synthesis, design, and real-time monitoring); Backward chaining is goal-driven (good for diagnosis, debugging, and verification).',
            'Knowledge Acquisition Bottleneck: The primary challenge of extracting intuitive domain expertise from human experts and formalizing it into rules.'
          ],
          coreFormulas: [
            'Roulette Wheel Selection Probability: P_i = f_i / (Σ f_j)',
            'Holland\'s Schema Theorem: Short, low-order schemata with above-average fitness increase exponentially in frequency across generations'
          ],
          examTraps: [
            'Forward chaining is DATA-DRIVEN (starts with facts); Backward chaining is GOAL-DRIVEN (starts with hypothesis). Do not mix them up!',
            'Mutation rate should be kept very low! If mutation rate is too high (near 0.5), GA degenerates into random search.'
          ],
          keyDefinitions: [
            { term: 'Inference Engine', definition: 'The software brain of an expert system that applies logical rules to the knowledge base to infer new facts.' },
            { term: 'Fitness Function', definition: 'A mathematical objective function evaluating how close a given chromosome is to satisfying the optimization goal.' }
          ]
        },
        pyqs: []
      }
    ]
  },

  // ==========================================
  // UNIT 7: Data Structures and Algorithms (DAY 6 FOCUS)
  // ==========================================
  {
    id: 7,
    title: 'Unit 7: Data Structures and Algorithms',
    codeName: 'DSA (Focus #6)',
    paperType: 'paper2',
    priorityDay: 6,
    description: 'Asymptotic notation, Master Theorem, BSTs, AVL/B-trees, Sorting & Searching, Greedy vs Dynamic Programming, Graph algorithms, and NP-completeness.',
    topics: [
      {
        id: 'dsa-asymptotic-recurrences',
        title: 'Asymptotic Complexity Notations & Recurrence Relations',
        unitId: 7,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 8,
        dayAssigned: 6,
        oneLineExplanation: 'Asymptotic notations (O, Ω, Θ) bound algorithm growth rates, while Master Theorem solves divide-and-conquer recurrences T(n) = aT(n/b) + f(n).',
        mnemonicTrick: {
          title: 'Master Theorem Rule',
          trick: '"Compare f(n) to n^(log_b a): If smaller -> Case 1; If equal -> Case 2; If larger -> Case 3"',
          meaning: 'Case 1: f(n) = O(n^(log_b a - ε)) -> T(n) = Θ(n^(log_b a)). Case 2: f(n) = Θ(n^(log_b a) · log^k n) -> T(n) = Θ(n^(log_b a) · log^(k+1) n). Case 3: f(n) = Ω(n^(log_b a + ε)) -> T(n) = Θ(f(n)).'
        },
        fillInBlanks: [
          {
            question: 'The asymptotic notation that represents a tight, asymptotic bound (both upper and lower bound simultaneously) is ______ notation.',
            answer: 'Theta',
            hint: 'Θ notation',
            explanation: 'f(n) = Θ(g(n)) iff f(n) is both O(g(n)) and Ω(g(n)).'
          },
          {
            question: 'Using Master Theorem, the solution to the recurrence relation T(n) = 2T(n/2) + O(n) (Merge Sort) is Θ(______).',
            answer: 'n log n',
            hint: 'n times log n',
            explanation: 'a=2, b=2. n^(log_2 2) = n^1. Since f(n) = Θ(n), Case 2 applies: T(n) = Θ(n log n).'
          },
          {
            question: 'The recurrence relation for Binary Search on a sorted array of size n is T(n) = T(n/2) + O(1), which evaluates to Θ(______).',
            answer: 'log n',
            hint: 'Logarithmic time',
            explanation: 'a=1, b=2. n^(log_2 1) = n^0 = 1. Since f(n) = Θ(1), Case 2 gives Θ(log n).'
          }
        ],
        quickMcq: {
          question: 'What is the time complexity of solving the recurrence relation T(n) = 4T(n/2) + n² using the Master Theorem?',
          options: [
            { id: 'A', text: 'Θ(n²)' },
            { id: 'B', text: 'Θ(n² log n)' },
            { id: 'C', text: 'Θ(n³)' },
            { id: 'D', text: 'Θ(n log n)' }
          ],
          correctOptionId: 'B',
          explanation: 'a=4, b=2. n^(log_b a) = n^(log_2 4) = n². f(n) = n² = Θ(n²). Case 2 applies: T(n) = Θ(n^(log_b a) · log n) = Θ(n² log n).',
          examTag: 'MH-SET Recurrence Standard'
        },
        quickFacts: [
          'Big-O (O) = Asymptotic Upper Bound; Big-Omega (Ω) = Asymptotic Lower Bound; Big-Theta (Θ) = Tight Bound.',
          'Little-o (o) and Little-omega (ω) represent strictly loose bounds (f(n) is strictly strictly less than or greater than g(n)).',
          'Akra-Bazzi method extends Master Theorem to recurrences with unequal partition sizes like T(n) = T(n/3) + T(2n/3) + n.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Complexity Hierarchy: O(1) < O(log log n) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2^n) < O(n!).',
            'Master Theorem Pitfalls: Cannot be applied if a < 1, b ≤ 1, if f(n) is not a polynomial, or if the ratio between f(n) and n^(log_b a) is not polynomial (e.g. T(n) = 2T(n/2) + n/log n).',
            'Recursion Tree Method: Visualizes total work at each depth level of recursion; sum of all levels gives overall time complexity.',
            'Substitution Method: Guess the form of the mathematical solution and prove it using mathematical induction.'
          ],
          coreFormulas: [
            'Big-O: f(n) ≤ c · g(n) for all n ≥ n_0',
            'Big-Omega: f(n) ≥ c · g(n) for all n ≥ n_0',
            'Big-Theta: c_1 · g(n) ≤ f(n) ≤ c_2 · g(n) for all n ≥ n_0',
            'Master Theorem critical exponent: log_b a'
          ],
          examTraps: [
            'Do NOT use Master Theorem on T(n) = 2T(n/2) + n log n using Case 3! It is Case 2 with k = 1, giving Θ(n log² n).',
            'f(n) = O(g(n)) does not mean worst-case! It simply means an upper bound. Linear search worst case is Θ(n).'
          ],
          keyDefinitions: [
            { term: 'Asymptotic Efficiency', definition: 'The performance behavior of an algorithm as the input size n tends toward infinity.' },
            { term: 'Strict Bound (Little-o)', definition: 'f(n) = o(g(n)) means lim_{n->∞} (f(n) / g(n)) = 0.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'dsa-trees-avl-btree',
        title: 'Tree Data Structures: BST, AVL Trees, B-Trees & B+ Trees',
        unitId: 7,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 8,
        dayAssigned: 6,
        oneLineExplanation: 'Self-balancing trees (AVL, Red-Black) maintain O(log n) search bounds in RAM, while multi-way B-trees minimize disk block accesses.',
        mnemonicTrick: {
          title: 'AVL Balance Factor',
          trick: '"Balance Factor = Height(Left) - Height(Right) MUST be {-1, 0, +1}"',
          meaning: 'If balance factor exceeds ±1: LL insertion -> Single Right Rotation. RR insertion -> Single Left Rotation. LR insertion -> Left-Right Rotation. RL insertion -> Right-Left Rotation.'
        },
        fillInBlanks: [
          {
            question: 'An AVL tree is a self-balancing Binary Search Tree where the balance factor of every node is strictly restricted to the set {______}.',
            answer: '-1, 0, +1',
            hint: 'Minus 1, zero, or plus 1',
            explanation: 'Balance factor is Height(Left Subtree) - Height(Right Subtree).'
          },
          {
            question: 'In a B+ tree of order m, actual data record pointers are stored strictly in the ______ nodes.',
            answer: 'leaf',
            hint: 'Terminal bottom nodes',
            explanation: 'Internal nodes in B+ trees store only routing search keys; all actual data pointers reside in leaf nodes, linked sequentially.'
          },
          {
            question: 'The in-order traversal of any valid Binary Search Tree (BST) produces keys in strictly ______ order.',
            answer: 'sorted',
            hint: 'Ascending order',
            explanation: 'In-order traversal (Left, Root, Right) of a BST outputs elements in monotonically increasing sorted order.'
          }
        ],
        quickMcq: {
          question: 'What is the maximum number of keys that can be stored in a B-tree of order m and height h (where height of root is 0)?',
          options: [
            { id: 'A', text: 'm^(h+1) - 1' },
            { id: 'B', text: 'm^h - 1' },
            { id: 'C', text: '2^(h+1) - 1' },
            { id: 'D', text: 'm(h + 1)' }
          ],
          correctOptionId: 'A',
          explanation: 'Maximum keys occur when every node has m - 1 keys and m children: (m - 1) × Σ_{i=0}^h m^i = m^(h+1) - 1.',
          examTag: 'MH-SET Tree Properties'
        },
        quickFacts: [
          'AVL Trees are strictly height-balanced: height is bounded by 1.44 × log2(n), giving faster lookups than Red-Black trees.',
          'Red-Black Trees allow black height balance, requiring fewer rotations during insert/delete (faster for write-heavy workloads).',
          'B+ Tree leaf nodes are linked via a doubly linked list, enabling exceptionally efficient range queries (e.g. BETWEEN X AND Y).'
        ],
        detailedNotes: {
          summaryPoints: [
            'Binary Tree Properties: Maximum nodes at level i is 2^i (root at level 0); Maximum nodes in binary tree of height h is 2^(h+1) - 1.',
            'Complete vs Full Binary Tree: Full binary tree has every node with 0 or 2 children. Complete binary tree has all levels filled except possibly the last, which is filled from left to right.',
            'AVL Rotations: LL (Right rotation around root), RR (Left rotation around root), LR (Left rotation on child, then Right on root), RL (Right rotation on child, then Left on root).',
            'B-Tree Rules of Order m: Root has at least 2 children (unless leaf); Every internal node has between ⌈m/2⌉ and m children; Every node has between ⌈m/2⌉ - 1 and m - 1 keys.',
            'Threaded Binary Tree: Replaces NULL pointers with threads pointing to in-order predecessor/successor, enabling traversal without stack/recursion.'
          ],
          coreFormulas: [
            'Full Binary Tree relation: Leaf_Nodes L = Internal_Nodes_With_2_Children I + 1',
            'Minimum nodes in AVL tree of height h: N(h) = N(h-1) + N(h-2) + 1 (Fibonacci relation where N(0)=1, N(1)=2)',
            'Maximum height of AVL tree with n nodes: h < 1.44 log2(n)',
            'B-Tree internal node keys: ⌈m/2⌉ - 1 ≤ Keys ≤ m - 1'
          ],
          examTraps: [
            'In-order traversal of a BST gives elements in ASCENDING order; Pre-order gives Root-Left-Right; Post-order gives Left-Right-Root.',
            'In a B+ tree, search keys in internal nodes may be duplicated in the leaves; in a standard B-tree, keys appear exactly once throughout the tree.'
          ],
          keyDefinitions: [
            { term: 'Balance Factor', definition: 'The difference between the height of the left subtree and the height of the right subtree: BF = h_L - h_R.' },
            { term: 'B+ Tree', definition: 'An n-ary search tree where all data records are stored exclusively in leaf nodes, linked in sequential order.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'dsa-graph-algorithms',
        title: 'Graph Algorithms: MST (Kruskal/Prim) & Shortest Paths',
        unitId: 7,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 8,
        dayAssigned: 6,
        oneLineExplanation: 'Graphs represent network topologies; solved via BFS/DFS traversals, greedy Spanning Trees (Kruskal, Prim), and shortest path algorithms.',
        mnemonicTrick: {
          title: 'Kruskal vs Prim',
          trick: '"Kruskal sorts EDGES (Global Greedy via Disjoint Set Union). Prim grows a TREE (Local Greedy via Priority Queue)"',
          meaning: 'Kruskal works best on sparse graphs (O(E log E)). Prim works best on dense graphs (O(V²) or O(E + V log V) with Fibonacci heap).'
        },
        fillInBlanks: [
          {
            question: 'A Minimum Spanning Tree (MST) for a connected undirected graph with V vertices always contains exactly ______ edges.',
            answer: 'V - 1',
            hint: 'One less than vertices count',
            explanation: 'Any tree spanning V vertices without cycles must contain V - 1 edges.'
          },
          {
            question: 'The algorithm that finds all-pairs shortest paths using dynamic programming in O(V³) time is the ______-Warshall algorithm.',
            answer: 'Floyd',
            hint: 'Floyd-Warshall',
            explanation: 'Floyd-Warshall considers intermediate vertices k in 1..V to update path matrix D[i][j].'
          },
          {
            question: 'Dijkstra\'s single-source shortest path algorithm fails to compute correct distances if the graph contains edges with ______ weights.',
            answer: 'negative',
            hint: 'Sub-zero weights',
            explanation: 'Dijkstra assumes paths never decrease in cost once expanded; negative edges violate this greedy assumption.'
          }
        ],
        quickMcq: {
          question: 'Which algorithm is capable of finding single-source shortest paths in directed graphs containing negative edge weights (provided no negative cycle)?',
          options: [
            { id: 'A', text: 'Dijkstra’s Algorithm' },
            { id: 'B', text: 'Bellman-Ford Algorithm' },
            { id: 'C', text: 'Prim’s Algorithm' },
            { id: 'D', text: 'Kruskal’s Algorithm' }
          ],
          correctOptionId: 'B',
          explanation: 'Bellman-Ford relaxes all edges |V| - 1 times, correctly handling negative edges and detecting negative cycles.',
          examTag: 'MH-SET Graph Standard'
        },
        quickFacts: [
          'Breadth-First Search (BFS) uses a Queue; Depth-First Search (DFS) uses a Stack.',
          'Topological sort exists if and only if the directed graph is a Directed Acyclic Graph (DAG).',
          'Tarjan’s algorithm and Kosaraju’s algorithm find Strongly Connected Components in O(V + E) time.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Breadth-First Search (BFS): Explores graph level-by-level using a FIFO Queue; finds unweighted shortest paths in O(V + E) time.',
            'Depth-First Search (DFS): Explores as deep as possible before backtracking using a Stack / Recursion; classifies edges into Tree, Back, Forward, Cross edges.',
            'Cycle Detection: A directed graph has a cycle iff DFS encounters a BACK EDGE.',
            'Kruskal\'s Algorithm: Sorts edges by weight; adds edge if it does not form a cycle using Disjoint Set Union (DSU with Path Compression and Union by Rank).',
            'Bellman-Ford: Relaxes all |E| edges |V| - 1 times; a further relaxation step that reduces distance proves the presence of a Negative Weight Cycle.'
          ],
          coreFormulas: [
            'Kruskal Time Complexity: O(E log E) or O(E log V)',
            'Prim Time Complexity: O(E log V) with binary heap, O(E + V log V) with Fibonacci heap',
            'Bellman-Ford Complexity: O(V × E)',
            'Floyd-Warshall All-Pairs: D^{(k)}[i][j] = min(D^{(k-1)}[i][j], D^{(k-1)}[i][k] + D^{(k-1)}[k][j]) in O(V³) time'
          ],
          examTraps: [
            'Dijkstra DOES NOT work with negative weights! Bellman-Ford must be used when negative weights are present.',
            'MST is UNIQUE if all edge weights in the graph are distinct. If edge weights are identical, multiple distinct MSTs can exist.'
          ],
          keyDefinitions: [
            { term: 'Spanning Tree', definition: 'A subgraph that includes all vertices of the graph and is a connected tree with no cycles.' },
            { term: 'Topological Sort', definition: 'Linear ordering of vertices in a DAG such that for every directed edge u -> v, vertex u comes before v.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'dsa-sorting-searching-hashing',
        title: 'Sorting, Searching Complexities, Stability & Hashing Techniques',
        unitId: 7,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 6,
        oneLineExplanation: 'Comparison-based sorting has an Ω(n log n) lower bound; hash tables resolve collisions using separate chaining or open addressing.',
        mnemonicTrick: {
          title: 'Stable Sorts Mnemonic',
          trick: '"Most Insertion, Bubble & Merge are STABLE. Quick, Heap & Selection are UNSTABLE"',
          meaning: 'Stable algorithms preserve the relative order of duplicate elements. Quick Sort, Heap Sort, and Selection Sort can reorder equal elements.'
        },
        fillInBlanks: [
          {
            question: 'Any comparison-based sorting algorithm has a theoretical lower bound time complexity of Ω(______).',
            answer: 'n log n',
            hint: 'n times log n',
            explanation: 'Decision tree model shows any comparison sort requires at least log2(n!) = Ω(n log n) comparisons.'
          },
          {
            question: 'In open addressing hashing, the collision resolution technique that suffers from primary clustering is ______ probing.',
            answer: 'linear',
            hint: 'Checking index (h(k) + i) mod m',
            explanation: 'Linear probing builds contiguous blocks of occupied slots (primary clustering), degrading search performance.'
          },
          {
            question: 'Quick Sort achieves its worst-case time complexity of O(n²) when the chosen pivot is always the ______ or maximum element in an already sorted array.',
            answer: 'minimum',
            hint: 'Smallest element',
            explanation: 'Unbalanced partitions (0 and n-1 elements) cause recursive depth n, resulting in O(n²) time.'
          }
        ],
        quickMcq: {
          question: 'Which of the following sorting algorithms is in-place, NOT stable, and guarantees O(n log n) worst-case time complexity?',
          options: [
            { id: 'A', text: 'Merge Sort' },
            { id: 'B', text: 'Heap Sort' },
            { id: 'C', text: 'Quick Sort' },
            { id: 'D', text: 'Counting Sort' }
          ],
          correctOptionId: 'B',
          explanation: 'Heap Sort is in-place (O(1) extra space), guarantees O(n log n) in all cases, and is not stable.',
          examTag: 'MH-SET Sorting Classification'
        },
        quickFacts: [
          'Linear Sorts (Non-comparison): Counting Sort, Radix Sort, Bucket Sort can achieve O(n) time by exploiting key domain properties.',
          'Merge Sort is stable and guarantees O(n log n) in all cases, but requires O(n) auxiliary memory.',
          'Double Hashing probe function: h(k, i) = (h1(k) + i × h2(k)) mod m (eliminates both primary and secondary clustering).'
        ],
        detailedNotes: {
          summaryPoints: [
            'Stability in Sorting: A sorting algorithm is stable if two records with equal keys appear in the same relative order in the output as they appeared in the input.',
            'In-Place Sorting: Requires only a constant amount O(1) of additional auxiliary memory space (e.g. Heap Sort, Insertion Sort, Bubble Sort).',
            'Quick Sort Average Case: O(n log n) with tiny constant factor; randomized pivot selection mitigates O(n²) worst-case.',
            'Collision Resolution in Hashing: Separate Chaining (linked lists at each bucket) and Open Addressing (Linear Probing, Quadratic Probing, Double Hashing).',
            'Load Factor α: α = n / m (where n = number of keys stored, m = number of hash slots). In open addressing, α ≤ 1.'
          ],
          coreFormulas: [
            'Comparison Sort Lower Bound: Height of decision tree h ≥ log2(n!) = Ω(n log n)',
            'Linear Probing: h(k, i) = (h(k) + i) mod m',
            'Quadratic Probing: h(k, i) = (h(k) + c1 · i + c2 · i²) mod m',
            'Double Hashing: h(k, i) = (h1(k) + i · h2(k)) mod m (h2(k) must be relatively prime to m)'
          ],
          examTraps: [
            'Quick Sort worst-case is O(n²), NOT O(n log n)! Merge Sort and Heap Sort guarantee O(n log n) worst-case.',
            'Selection sort does the MINIMUM number of swaps (O(n) swaps), which is useful when write operations are extremely expensive.'
          ],
          keyDefinitions: [
            { term: 'Primary Clustering', definition: 'The tendency in linear probing for collision resolution to create long contiguous clusters of filled slots.' },
            { term: 'Load Factor', definition: 'The ratio of the number of elements in a hash table to the total number of available hash buckets: α = n / m.' }
          ]
        },
        pyqs: []
      },
      {
        id: 'dsa-dynamic-programming-greedy',
        title: 'Algorithm Design: Dynamic Programming, Greedy & NP-Completeness',
        unitId: 7,
        paperType: 'paper2',
        priority: 'A',
        estimatedMinutes: 7,
        dayAssigned: 6,
        oneLineExplanation: 'Greedy algorithms make locally optimal choices, Dynamic Programming resolves overlapping subproblems, and NP-completeness characterizes intractable problems.',
        mnemonicTrick: {
          title: 'Knapsack Rule',
          trick: '"Fractional = Greedy (cut the gold dust!). 0/1 Knapsack = Dynamic Programming (cannot split the laptop!)"',
          meaning: 'Fractional Knapsack has the greedy-choice property (sort by value/weight). 0/1 Knapsack lacks it and requires DP in O(n·W) pseudo-polynomial time.'
        },
        fillInBlanks: [
          {
            question: 'The knapsack problem variant where items cannot be broken into fractions and must either be taken entirely or left is the ______ Knapsack problem.',
            answer: '0/1',
            hint: 'Zero or one',
            explanation: '0/1 Knapsack requires Dynamic Programming and cannot be solved greedily.'
          },
          {
            question: 'A decision problem is in the complexity class ______ if a proposed solution can be verified in polynomial time by a deterministic Turing machine.',
            answer: 'NP',
            hint: 'Non-deterministic Polynomial',
            explanation: 'NP represents problems verifiable in polynomial time (or solvable in polynomial time by a non-deterministic Turing machine).'
          },
          {
            question: 'Stephen Cook\'s theorem proved that the Boolean ______ problem (SAT) is the first known NP-Complete problem.',
            answer: 'Satisfiability',
            hint: 'SAT problem',
            explanation: 'Cook proved SAT is NP-Complete, establishing polynomial-time reducibility.'
          }
        ],
        quickMcq: {
          question: 'If a problem X is in NP and every problem in NP can be reduced to X in polynomial time, then X is defined as:',
          options: [
            { id: 'A', text: 'P' },
            { id: 'B', text: 'NP-Complete' },
            { id: 'C', text: 'NP-Hard only' },
            { id: 'D', text: 'Tractable' }
          ],
          correctOptionId: 'B',
          explanation: 'A problem is NP-Complete if it is both in NP AND NP-Hard (all NP problems reduce to it in polynomial time).',
          examTag: 'MH-SET Complexity Classes'
        },
        quickFacts: [
          'Dynamic Programming requires two key properties: Optimal Substructure and Overlapping Subproblems.',
          'Memoization is Top-Down DP with caching; Tabulation is Bottom-Up DP building table from base cases.',
          'If any single NP-Complete problem can be solved in polynomial time, then P = NP.'
        ],
        detailedNotes: {
          summaryPoints: [
            'Complexity Classes: P = Problems solvable in polynomial time O(n^k). NP = Problems verifiable in polynomial time. NP-Hard = At least as hard as any problem in NP (may not be in NP). NP-Complete = In NP AND NP-Hard.',
            'Famous NP-Complete Problems: Circuit SAT, 3-SAT, Traveling Salesperson Problem (Decision version), Hamiltonian Cycle, Vertex Cover, Clique Problem, Subset Sum.',
            'Matrix Chain Multiplication: Multiplies chain of matrices A1, A2... An to minimize scalar multiplications using DP table m[i][j] in O(n³) time.',
            'Longest Common Subsequence (LCS): Finds longest subsequence present in both strings X and Y in O(m × n) time via DP.',
            'Huffman Coding: Greedy algorithm that constructs optimal prefix code tree by iteratively merging two smallest frequency nodes (used in lossless data compression).'
          ],
          coreFormulas: [
            '0/1 Knapsack DP Recurrence: V[i, w] = max(V[i-1, w], V[i-1, w - w_i] + v_i) for w ≥ w_i',
            'Matrix Chain Multiplication: m[i, j] = min_{i ≤ k < j} (m[i, k] + m[k+1, j] + p_{i-1} · p_k · p_j)',
            'NP-Completeness Requirement: X is NP-Complete iff (X ∈ NP) and (∀ Y ∈ NP, Y ≤_p X)'
          ],
          examTraps: [
            '0/1 Knapsack time complexity O(n·W) is PSEUDO-POLYNOMIAL, not polynomial! Because W (capacity) is exponential in the input length of bits.',
            'NP does NOT stand for "Non-Polynomial"! It stands for "Non-deterministic Polynomial time".'
          ],
          keyDefinitions: [
            { term: 'Optimal Substructure', definition: 'Property where an optimal solution to the overall problem incorporates optimal solutions to its subproblems.' },
            { term: 'Polynomial-Time Reduction (A ≤_p B)', definition: 'Transforming problem A to problem B in polynomial time such that answering B solves A.' }
          ]
        },
        pyqs: []
      }
    ]
  }
];
