/**
 * BCA Department Portal - Academic Seed Data
 * Contains comprehensive, structured data for all 8 Semesters, Subjects,
 * Notes, PYQs, Faculty Members, Announcements, and Student Resources.
 */

export const INITIAL_DATA = {
  department: {
    name: "Department of Computer Applications",
    shortName: "BCA Dept",
    degree: "Bachelor of Computer Applications (BCA)",
    duration: "4 Years (8 Semesters) / NEP Aligned",
    university: "State University of Technology & Sciences",
    accreditation: "NBA Accredited | NAAC 'A+' Grade",
    tagline: "Empowering Future Software Engineers & Computational Leaders",
    intro: "The Department of Computer Applications offers a premier four-year undergraduate curriculum combining foundational computer science, modern software engineering, artificial intelligence, cloud architectures, and hands-on laboratory experiences to prepare students for top technology careers and higher research.",
    headOfDept: "Mrs. Prakriti Pradhan",
    contactEmail: "bca.department@university.edu",
    phone: "+91 (0) 11-2856-4321",
    officeLocation: "Computing Sciences Block, 3rd Floor, Tech Campus",
    stats: {
      semesters: 8,
      subjects: 38,
      facultyCount: 3,
      studentsCount: 360,
      placementRate: "94.8%",
      activeResources: 180
    }
  },

  // 8 Semesters with realistic core subjects, labs, credits, and syllabus units
  semesters: [
    {
      semNumber: 1,
      name: "Semester 1",
      academicYear: "1st Year",
      totalCredits: 22,
      description: "Foundations of Computer Programming, Computational Mathematics, and Digital Fundamentals.",
      subjects: [
        {
          code: "BCA-101",
          name: "Programming Fundamentals using C",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Problem solving algorithms, flowcharts, C syntax, pointers, structures, file handling.",
          units: [
            { unit: "Unit 1", title: "Problem Solving & C Basics", topics: "Algorithms, Flowcharts, Data Types, Operators, Control Structures" },
            { unit: "Unit 2", title: "Functions & Arrays", topics: "Functions, Recursion, Parameter Passing, 1D & 2D Arrays, String Manipulation" },
            { unit: "Unit 3", title: "Pointers & Memory Management", topics: "Pointer Arithmetic, Pointers with Arrays/Functions, Dynamic Memory (malloc, calloc, free)" },
            { unit: "Unit 4", title: "Structures, Unions & File I/O", topics: "Structures, Nested Structures, File Pointers, fopen, fread, fwrite, fclose" }
          ],
          textbooks: ["Programming in ANSI C - E. Balagurusamy", "Let Us C - Yashavant Kanetkar"]
        },
        {
          code: "BCA-102",
          name: "Discrete Mathematics",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Set theory, relations, propositional logic, graph theory, combinatorics, Boolean algebra.",
          units: [
            { unit: "Unit 1", title: "Set Theory & Relations", topics: "Sets, Venn Diagrams, Equivalence Relations, Partial Orderings" },
            { unit: "Unit 2", title: "Mathematical Logic", topics: "Propositions, Truth Tables, Tautologies, Predicates & Quantifiers" },
            { unit: "Unit 3", title: "Combinatorics & Recurrence", topics: "Permutations, Combinations, Pigeonhole Principle, Recurrence Relations" },
            { unit: "Unit 4", title: "Graph Theory", topics: "Graphs, Trees, Euler & Hamiltonian Paths, Planar Graphs, Graph Coloring" }
          ],
          textbooks: ["Discrete Mathematics and Its Applications - Kenneth H. Rosen"]
        },
        {
          code: "BCA-103",
          name: "Digital Electronics & Logic Design",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Number systems, Boolean algebra, logic gates, combinational and sequential circuits.",
          units: [
            { unit: "Unit 1", title: "Number Systems & Codes", topics: "Binary, Octal, Hexadecimal, 1's and 2's Complement, BCD, Gray Code" },
            { unit: "Unit 2", title: "Logic Gates & Simplification", topics: "Basic Gates, Universal Gates, K-Maps up to 4 variables, Quine-McCluskey" },
            { unit: "Unit 3", title: "Combinational Circuits", topics: "Adders, Subtractors, Multiplexers, De-multiplexers, Encoders, Decoders" },
            { unit: "Unit 4", title: "Sequential Circuits", topics: "Flip-Flops (SR, JK, D, T), Counters (Asynchronous & Synchronous), Shift Registers" }
          ],
          textbooks: ["Digital Design - M. Morris Mano"]
        },
        {
          code: "BCA-104",
          name: "Communication Skills & Professional Ethics",
          type: "Allied",
          credits: 3,
          ltp: "3-0-0",
          description: "Business communication, technical report writing, presentation skills, digital ethics.",
          units: [
            { unit: "Unit 1", title: "Technical Communication", topics: "Forms of Communication, Barriers, Active Listening, Body Language" },
            { unit: "Unit 2", title: "Business Writing", topics: "Email Etiquette, Technical Reports, Resume Writing, Meeting Minutes" },
            { unit: "Unit 3", title: "Professional Presentation", topics: "Structuring Presentations, Public Speaking, Group Discussions" },
            { unit: "Unit 4", title: "Ethics in Computing", topics: "Intellectual Property Rights, Plagiarism, Cyber Ethics, Code of Conduct" }
          ],
          textbooks: ["Technical Communication - Meenakshi Raman & Sangeeta Sharma"]
        },
        {
          code: "BCA-105",
          name: "C Programming Laboratory",
          type: "Lab",
          credits: 3,
          ltp: "0-0-4",
          description: "Hands-on implementation of algorithms in C, pointer exercises, file handling programs.",
          units: [
            { unit: "Lab Cycle 1", title: "Control Flow & Functions", topics: "Prime tests, Fibonacci series, matrix arithmetic, recursive operations" },
            { unit: "Lab Cycle 2", title: "Pointers & Files", topics: "String tokenizers, dynamic arrays, student record filing system" }
          ],
          textbooks: ["Practical C Programming - Steve Oualline"]
        }
      ]
    },
    {
      semNumber: 2,
      name: "Semester 2",
      academicYear: "1st Year",
      totalCredits: 22,
      description: "Data Structures, Object-Oriented Concepts, Computer Organization and Web Basics.",
      subjects: [
        {
          code: "BCA-201",
          name: "Data Structures using C++",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Linear and non-linear data structures, stacks, queues, linked lists, trees, graphs, sorting algorithms.",
          units: [
            { unit: "Unit 1", title: "Arrays & Linked Lists", topics: "Singly, Doubly and Circular Linked Lists, Memory Representation" },
            { unit: "Unit 2", title: "Stacks & Queues", topics: "Stack ADT, Infix to Postfix conversion, Circular Queue, Priority Queue" },
            { unit: "Unit 3", title: "Trees & Binary Search Trees", topics: "Binary Trees, Traversals (Pre, In, Post), BST Operations, AVL Trees basics" },
            { unit: "Unit 4", title: "Searching, Sorting & Hashing", topics: "Quick Sort, Merge Sort, Heap Sort, Hash tables, Collision resolution" }
          ],
          textbooks: ["Data Structures and Algorithm Analysis in C++ - Mark Allen Weiss"]
        },
        {
          code: "BCA-202",
          name: "Object-Oriented Programming with C++",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Classes, objects, inheritance, polymorphism, templates, exception handling, STL containers.",
          units: [
            { unit: "Unit 1", title: "OOP Principles & Classes", topics: "Encapsulation, Constructors & Destructors, this pointer, Friend functions" },
            { unit: "Unit 2", title: "Inheritance & Polymorphism", topics: "Single, Multiple, Hierarchical Inheritance, Virtual functions, Abstract classes" },
            { unit: "Unit 3", title: "Operator Overloading & Templates", topics: "Unary/Binary overloading, Function & Class Templates, Standard Template Library (STL)" },
            { unit: "Unit 4", title: "File Streams & Exceptions", topics: "ifstream, ofstream, try-catch blocks, Custom exception classes" }
          ],
          textbooks: ["Object-Oriented Programming with C++ - E. Balagurusamy"]
        },
        {
          code: "BCA-203",
          name: "Computer Architecture & Organization",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Instruction cycles, CPU design, arithmetic logic units, cache memory, I/O organization.",
          units: [
            { unit: "Unit 1", title: "Register Transfer & Micro-operations", topics: "Bus Architecture, Arithmetic Logic Shift Unit, Instruction Formats" },
            { unit: "Unit 2", title: "Central Processing Unit", topics: "General Register Organization, Stack Organization, Addressing Modes, RISC vs CISC" },
            { unit: "Unit 3", title: "Memory Hierarchy", topics: "Main Memory, Auxiliary Memory, Cache Memory Mapping, Virtual Memory" },
            { unit: "Unit 4", title: "Input-Output Organization", topics: "Peripheral Devices, I/O Interface, Asynchronous Data Transfer, DMA Controller" }
          ],
          textbooks: ["Computer System Architecture - M. Morris Mano"]
        },
        {
          code: "BCA-204",
          name: "Web Designing Fundamentals (HTML5/CSS3)",
          type: "Core",
          credits: 3,
          ltp: "2-0-2",
          description: "Semantic HTML5, CSS Grid, Flexbox, responsive web design principles, UI layout design.",
          units: [
            { unit: "Unit 1", title: "HTML5 Semantic Elements", topics: "Document structure, semantic tags, forms, media elements, tables" },
            { unit: "Unit 2", title: "CSS3 Styling & Box Model", topics: "Selectors, Cascading rules, Box model, Margins, Borders, Padding" },
            { unit: "Unit 3", title: "Modern Layouts (Flexbox & Grid)", topics: "Flex container/items, Grid tracks, responsive breakpoints, media queries" },
            { unit: "Unit 4", title: "Web Accessibility & Best Practices", topics: "ARIA attributes, semantic navigation, responsive typography, performance" }
          ],
          textbooks: ["HTML and CSS: Design and Build Websites - Jon Duckett"]
        },
        {
          code: "BCA-205",
          name: "Data Structures & OOP Lab",
          type: "Lab",
          credits: 3,
          ltp: "0-0-4",
          description: "Hands-on implementation of linked lists, trees, sorting routines, and OOP projects.",
          units: [
            { unit: "Cycle 1", title: "Linear Structures", topics: "List implementations, stack applications, queue simulators" },
            { unit: "Cycle 2", title: "Trees & Polymorphism", topics: "BST search/deletion, virtual function billing system" }
          ],
          textbooks: ["Data Structures Lab Manual - University Press"]
        }
      ]
    },
    {
      semNumber: 3,
      name: "Semester 3",
      academicYear: "2nd Year",
      totalCredits: 23,
      description: "Database Systems, Java Programming, Operating Systems, and Discrete Algorithms.",
      subjects: [
        {
          code: "BCA-301",
          name: "Database Management Systems (DBMS)",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Relational model, SQL queries, ER diagrams, Normalization (1NF to BCNF), Transaction processing (ACID).",
          units: [
            { unit: "Unit 1", title: "Introduction & ER Modeling", topics: "DBMS vs File Systems, 3-Schema Architecture, Entity-Relationship Models" },
            { unit: "Unit 2", title: "Relational Model & SQL", topics: "Relational Algebra, DDL, DML, DCL, Complex Joins, Subqueries, Views" },
            { unit: "Unit 3", title: "Relational Database Design", topics: "Functional Dependencies, Normalization: 1NF, 2NF, 3NF, BCNF, Lossless Decomposition" },
            { unit: "Unit 4", title: "Transaction & Concurrency Control", topics: "ACID properties, Serializability, 2-Phase Locking, Deadlock Management" }
          ],
          textbooks: ["Database System Concepts - Silberschatz, Korth, Sudarshan"]
        },
        {
          code: "BCA-302",
          name: "Core Java Programming",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "JVM architecture, packages, interfaces, multithreading, collections framework, JDBC connectivity.",
          units: [
            { unit: "Unit 1", title: "Java Fundamentals & OOP", topics: "JVM, JRE, Bytecode, Classes, Inheritance, Interfaces, Packages" },
            { unit: "Unit 2", title: "Exception Handling & Multithreading", topics: "Checked/Unchecked exceptions, Thread life cycle, Synchronization, Inter-thread comms" },
            { unit: "Unit 3", title: "Java Collections Framework", topics: "List, Set, Map, ArrayList, HashMap, Generics, Iterators" },
            { unit: "Unit 4", title: "JDBC & File I/O", topics: "JDBC Drivers, Connection, Statement, PreparedStatement, ResultSet, Streams" }
          ],
          textbooks: ["Java: The Complete Reference - Herbert Schildt"]
        },
        {
          code: "BCA-303",
          name: "Operating System Principles",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Process scheduling, synchronization, deadlocks, virtual memory management, file systems.",
          units: [
            { unit: "Unit 1", title: "Operating System Architecture", topics: "OS Services, System Calls, Monolithic vs Microkernels, Dual-Mode Operation" },
            { unit: "Unit 2", title: "Process & CPU Scheduling", topics: "Process states, PCB, Context Switch, FCFS, SJF, Round Robin, Priority Scheduling" },
            { unit: "Unit 3", title: "Process Synchronization & Deadlocks", topics: "Critical Section, Semaphores, Monitors, Banker's Algorithm, Deadlock Recovery" },
            { unit: "Unit 4", title: "Memory & Storage Management", topics: "Paging, Segmentation, Page Replacement (FIFO, LRU, Optimal), Disk Scheduling" }
          ],
          textbooks: ["Operating System Concepts - Silberschatz, Galvin, Gagne"]
        },
        {
          code: "BCA-304",
          name: "Computer Networks & Data Communication",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "OSI and TCP/IP models, IP addressing, subnetting, routing protocols, transport layer TCP/UDP.",
          units: [
            { unit: "Unit 1", title: "Network Reference Models", topics: "OSI 7-Layer model, TCP/IP Suite, Transmission Media, Topologies" },
            { unit: "Unit 2", title: "Data Link Layer & MAC", topics: "Framing, Error Detection (CRC), Sliding Window Protocols, CSMA/CD, Ethernet" },
            { unit: "Unit 3", title: "Network Layer & Routing", topics: "IPv4/IPv6 Addressing, Subnetting, CIDR, Distance Vector Routing, Link State (OSPF)" },
            { unit: "Unit 4", title: "Transport & Application Protocols", topics: "TCP 3-Way Handshake, UDP, Congestion Control, DNS, HTTP/HTTPS, FTP, SMTP" }
          ],
          textbooks: ["Computer Networks - Andrew S. Tanenbaum"]
        },
        {
          code: "BCA-305",
          name: "Database & Java Laboratory",
          type: "Lab",
          credits: 3,
          ltp: "0-0-4",
          description: "Hands-on SQL schema design, triggers, stored procedures, Java desktop applications with JDBC.",
          units: [
            { unit: "Cycle 1", title: "SQL & Relational Queries", topics: "DDL/DML operations, complex joins, triggers, PL/SQL blocks" },
            { unit: "Cycle 2", title: "Java & Database Connectivity", topics: "CRUD GUI applications using Java Swing and JDBC connection pool" }
          ],
          textbooks: ["SQL, PL/SQL: The Programming Language of Oracle - Ivan Bayross"]
        }
      ]
    },
    {
      semNumber: 4,
      name: "Semester 4",
      academicYear: "2nd Year",
      totalCredits: 22,
      description: "Python Programming, Software Engineering, Modern JavaScript, and Design & Analysis of Algorithms.",
      subjects: [
        {
          code: "BCA-401",
          name: "Python Programming & Applications",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Python syntax, lists, dictionaries, modules, object-oriented Python, file processing, data scraping.",
          units: [
            { unit: "Unit 1", title: "Python Foundations", topics: "Data types, control flow, functions, lambdas, list comprehensions, generators" },
            { unit: "Unit 2", title: "OOP in Python", topics: "Classes, inheritance, magic methods (__init__, __str__), encapsulation" },
            { unit: "Unit 3", title: "Modules & File Handling", topics: "Standard libraries, os, sys, math, json handling, CSV parsing, regular expressions" },
            { unit: "Unit 4", title: "NumPy & Pandas Essentials", topics: "NumPy arrays, slicing, Pandas DataFrames, basic data filtering and visualization" }
          ],
          textbooks: ["Python Crash Course - Eric Matthes", "Learning Python - Mark Lutz"]
        },
        {
          code: "BCA-402",
          name: "Design & Analysis of Algorithms",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Asymptotic notation, Divide and Conquer, Greedy algorithms, Dynamic Programming, Backtracking, NP-Completeness.",
          units: [
            { unit: "Unit 1", title: "Asymptotic Analysis & Divide-and-Conquer", topics: "Big-O, Omega, Theta, Master Theorem, Merge Sort, Quick Sort analysis" },
            { unit: "Unit 2", title: "Greedy Algorithms", topics: "Fractional Knapsack, Huffman Coding, Kruskal's & Prim's Minimum Spanning Tree" },
            { unit: "Unit 3", title: "Dynamic Programming", topics: "0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication" },
            { unit: "Unit 4", title: "Backtracking & Complexity Classes", topics: "N-Queens problem, Graph Coloring, P vs NP, NP-Complete reductions" }
          ],
          textbooks: ["Introduction to Algorithms - Cormen, Leiserson, Rivest, Stein (CLRS)"]
        },
        {
          code: "BCA-403",
          name: "Software Engineering & Agile Methodologies",
          type: "Core",
          credits: 3,
          ltp: "3-0-0",
          description: "SDLC models, Waterfall vs Agile Scrum, SRS documentation, UML modeling, software testing techniques.",
          units: [
            { unit: "Unit 1", title: "SDLC & Process Models", topics: "Waterfall, Spiral, V-Model, Agile Manifesto, Scrum Sprint cycles" },
            { unit: "Unit 2", title: "Requirements & SRS", topics: "Functional & Non-Functional requirements, IEEE 830 SRS standard, User Stories" },
            { unit: "Unit 3", title: "Software Design & UML", topics: "Architectural design, Use Case diagrams, Class diagrams, Sequence diagrams" },
            { unit: "Unit 4", title: "Software Testing & Quality", topics: "White-box & Black-box testing, Unit, Integration, System testing, CI/CD basics" }
          ],
          textbooks: ["Software Engineering: A Practitioner's Approach - Roger S. Pressman"]
        },
        {
          code: "BCA-404",
          name: "Modern JavaScript & Client-Side Technologies",
          type: "Core",
          credits: 4,
          ltp: "3-0-2",
          description: "ES6+ standards, DOM manipulation, asynchronous programming, Promises, Fetch API, Single Page App patterns.",
          units: [
            { unit: "Unit 1", title: "Modern JavaScript (ES6+)", topics: "let/const, arrow functions, destructuring, spread/rest, template literals" },
            { unit: "Unit 2", title: "DOM & Event Architecture", topics: "Query selectors, Event delegation, bubbling/capturing, form validations" },
            { unit: "Unit 3", title: "Async JavaScript", topics: "Call stack, Event Loop, Callbacks, Promises, async/await, Fetch API" },
            { unit: "Unit 4", title: "Modern Web APIs & State", topics: "LocalStorage, SessionStorage, History API, modular JS architecture" }
          ],
          textbooks: ["Eloquent JavaScript - Marijn Haverbeke", "You Don't Know JS - Kyle Simpson"]
        },
        {
          code: "BCA-405",
          name: "Python & Algorithms Lab",
          type: "Lab",
          credits: 3,
          ltp: "0-0-4",
          description: "Implementation of algorithmic benchmarks, data wrangling scripts, and software testing suites.",
          units: [
            { unit: "Cycle 1", title: "Algorithms Implementation", topics: "Knapsack problems, Dijkstra's algorithm, sorting benchmarks" },
            { unit: "Cycle 2", title: "Python Projects", topics: "Automated report generation, CSV data analysis, web scraper" }
          ],
          textbooks: ["Problem Solving with Algorithms and Data Structures using Python - Miller & Ranum"]
        }
      ]
    },
    {
      semNumber: 5,
      name: "Semester 5",
      academicYear: "3rd Year",
      totalCredits: 22,
      description: "Artificial Intelligence, Cloud Computing, Cyber Security, and Mobile App Development.",
      subjects: [
        {
          code: "BCA-501",
          name: "Artificial Intelligence & Machine Learning Fundamentals",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "State-space search, heuristic search (A*), Supervised and Unsupervised ML, Linear Regression, Decision Trees.",
          units: [
            { unit: "Unit 1", title: "Search Strategies in AI", topics: "BFS, DFS, Uniform Cost Search, Heuristic Search, A* Algorithm, Minimax Search" },
            { unit: "Unit 2", title: "Knowledge Representation & Logic", topics: "First-Order Logic, Inference rules, Resolution, Expert systems introduction" },
            { unit: "Unit 3", title: "Supervised Learning", topics: "Linear Regression, Logistic Regression, Decision Trees, Evaluation Metrics (Accuracy, F1)" },
            { unit: "Unit 4", title: "Unsupervised Learning & Neural Nets", topics: "K-Means Clustering, PCA dimension reduction, Perceptron, Multilayer Perceptron" }
          ],
          textbooks: ["Artificial Intelligence: A Modern Approach - Russell & Norvig", "Hands-On Machine Learning - Aurélien Géron"]
        },
        {
          code: "BCA-502",
          name: "Cloud Computing & Distributed Services",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Cloud service models (IaaS, PaaS, SaaS), virtualization, AWS/Azure fundamentals, containerization with Docker.",
          units: [
            { unit: "Unit 1", title: "Cloud Architecture Models", topics: "NIST definition, Cloud deployment models (Public, Private, Hybrid), IaaS, PaaS, SaaS" },
            { unit: "Unit 2", title: "Virtualization & Hypervisors", topics: "Type 1 & Type 2 Hypervisors, Full vs Paravirtualization, VM management" },
            { unit: "Unit 3", title: "Cloud Infrastructure (AWS/GCP)", topics: "Compute instances (EC2), Object storage (S3), Virtual Private Clouds (VPC), IAM" },
            { unit: "Unit 4", title: "Containers & Serverless", topics: "Docker architecture, Dockerfile, Container orchestration basics, Serverless (AWS Lambda)" }
          ],
          textbooks: ["Cloud Computing: Concepts, Technology & Architecture - Thomas Erl"]
        },
        {
          code: "BCA-503",
          name: "Information Security & Cryptography",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Symmetric and asymmetric ciphers (AES, RSA), hashing (SHA-256), digital signatures, network security, ethical hacking.",
          units: [
            { unit: "Unit 1", title: "Security Principles & Classical Ciphers", topics: "CIA Triad, Attacks, Caesar cipher, Substitution/Transposition ciphers" },
            { unit: "Unit 2", title: "Modern Symmetric & Asymmetric Cryptography", topics: "DES, AES, Diffie-Hellman Key Exchange, RSA algorithm, ECC basics" },
            { unit: "Unit 3", title: "Integrity & Authentication", topics: "Cryptographic hash functions (MD5, SHA-256), HMAC, Digital Signatures, X.509" },
            { unit: "Unit 4", title: "Network Defense & Vulnerability", topics: "Firewalls, IDS/IPS, SQL Injection, Cross-Site Scripting (XSS), Penetration testing" }
          ],
          textbooks: ["Cryptography and Network Security - William Stallings"]
        },
        {
          code: "BCA-504",
          name: "Mobile Application Development",
          type: "Core",
          credits: 3,
          ltp: "2-0-2",
          description: "Cross-platform mobile frameworks, UI layout, intents, state management, SQLite integration, API consumption.",
          units: [
            { unit: "Unit 1", title: "Mobile OS Architecture", topics: "Android / iOS architecture, App lifecycles, SDK setup, Activity / View controllers" },
            { unit: "Unit 2", title: "UI Components & Layouts", topics: "Constraint layouts, RecyclerView, navigation drawers, theme styling" },
            { unit: "Unit 3", title: "Persistence & Data Storage", topics: "SharedPreferences, SQLite/Room database, offline-first caching" },
            { unit: "Unit 4", title: "Networking & Publishing", topics: "REST API integration, Retrofit/Fetch, Push Notifications, App Store submission" }
          ],
          textbooks: ["Android Programming: The Big Nerd Ranch Guide - Bill Phillips"]
        },
        {
          code: "BCA-505",
          name: "AI & Cloud Computing Lab",
          type: "Lab",
          credits: 3,
          ltp: "0-0-4",
          description: "Hands-on Scikit-Learn machine learning pipelines, cloud deployment of microservices, Docker container setups.",
          units: [
            { unit: "Cycle 1", title: "ML Model Pipelines", topics: "Regression and Classification models, cross-validation, model persistence" },
            { unit: "Cycle 2", title: "Docker & Cloud Deployments", topics: "Containerizing web services, deploying to cloud VMs, AWS S3 storage scripts" }
          ],
          textbooks: ["Hands-On Machine Learning with Scikit-Learn - Aurélien Géron"]
        }
      ]
    },
    {
      semNumber: 6,
      name: "Semester 6",
      academicYear: "3rd Year",
      totalCredits: 22,
      description: "Full Stack Web Engineering, Big Data Analytics, DevOps, and Departmental Mini-Project.",
      subjects: [
        {
          code: "BCA-601",
          name: "Full Stack Web Engineering (MERN / Node.js)",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Node.js runtime, Express REST APIs, MongoDB NoSQL, authentication (JWT), React/Vue concepts.",
          units: [
            { unit: "Unit 1", title: "Node.js & Asynchronous Architecture", topics: "Node runtime, Event Loop, Streams, File System, NPM ecosystem" },
            { unit: "Unit 2", title: "Express.js & REST APIs", topics: "Routing, Middleware, Request/Response pipelines, Controller architecture" },
            { unit: "Unit 3", title: "NoSQL with MongoDB", topics: "Document store model, Mongoose schemas, CRUD, Aggregation framework, Indexing" },
            { unit: "Unit 4", title: "Authentication & Security", topics: "JWT tokens, Bcrypt password hashing, CORS, rate limiting, secure cookies" }
          ],
          textbooks: ["Node.js Design Patterns - Mario Casciaro", "Full Stack Development with MongoDB and Node - Greg Lim"]
        },
        {
          code: "BCA-602",
          name: "Big Data Technologies & Analytics",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Characteristics of Big Data (5 V's), Hadoop ecosystem, HDFS, MapReduce, Apache Spark fundamentals.",
          units: [
            { unit: "Unit 1", title: "Introduction to Big Data", topics: "Volume, Velocity, Variety, Veracity, Value, Distributed computing concepts" },
            { unit: "Unit 2", title: "Hadoop Architecture & HDFS", topics: "NameNode, DataNode, Block replication, MapReduce programming paradigm" },
            { unit: "Unit 3", title: "Apache Spark Framework", topics: "Spark Core, Resilient Distributed Datasets (RDDs), Transformations & Actions" },
            { unit: "Unit 4", title: "NoSQL & Streaming Basics", topics: "HBase, Cassandra wide-column store, Kafka message streaming introduction" }
          ],
          textbooks: ["Hadoop: The Definitive Guide - Tom White"]
        },
        {
          code: "BCA-603",
          name: "DevOps & Continuous Delivery",
          type: "Elective",
          credits: 3,
          ltp: "3-0-0",
          description: "Version control workflows (Git), automated CI/CD pipelines (GitHub Actions), Infrastructure as Code (IaC).",
          units: [
            { unit: "Unit 1", title: "DevOps Philosophy & Git Workflow", topics: "Agile to DevOps transition, Branching strategies, Git rebase/merge, Pull requests" },
            { unit: "Unit 2", title: "Continuous Integration (CI)", topics: "Automated testing, Linting, Build automation, GitHub Actions workflows" },
            { unit: "Unit 3", title: "Continuous Deployment (CD)", topics: "Deployment pipelines, Blue-Green deployments, Canary releases, Monitoring" },
            { unit: "Unit 4", title: "Infrastructure as Code", topics: "Config management, Terraform overview, Ansible basics, CloudFormation" }
          ],
          textbooks: ["The DevOps Handbook - Gene Kim, Jez Humble"]
        },
        {
          code: "BCA-604",
          name: "Mini Project & Technical Seminar",
          type: "Project",
          credits: 4,
          ltp: "0-0-8",
          description: "Complete team-based development of an academic or industry-grade software product with SRS, code, and viva.",
          units: [
            { unit: "Phase 1", title: "SRS & System Architecture", topics: "Problem statement, feasibility study, UI mockups, database ER diagrams" },
            { unit: "Phase 2", title: "Implementation & Viva", topics: "Core system coding, integration testing, final presentation, code defense" }
          ],
          textbooks: ["Guide to Software Project Management - University Press"]
        }
      ]
    },
    {
      semNumber: 7,
      name: "Semester 7",
      academicYear: "4th Year (Honours)",
      totalCredits: 20,
      description: "Advanced Distributed Systems, Internet of Things (IoT), Deep Learning, and Major Capstone Phase I.",
      subjects: [
        {
          code: "BCA-701",
          name: "Distributed Systems & Microservices",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "CAP theorem, RPC/gRPC, consensus algorithms (Raft, Paxos), microservices decomposition, API gateways.",
          units: [
            { unit: "Unit 1", title: "Distributed System Foundations", topics: "Transparency, Scalability, Fault Tolerance, CAP Theorem, Fallacies of Distributed Computing" },
            { unit: "Unit 2", title: "Inter-Process Communication", topics: "RPC, gRPC with Protocol Buffers, Message Queues (RabbitMQ, SQS)" },
            { unit: "Unit 3", title: "Consensus & Coordination", topics: "Clock Synchronization, Lamport Timestamps, Mutual Exclusion, Raft Consensus" },
            { unit: "Unit 4", title: "Microservices Architecture", topics: "Monolith to Microservices, Service Discovery, API Gateways, Circuit Breaker pattern" }
          ],
          textbooks: ["Designing Data-Intensive Applications - Martin Kleppmann"]
        },
        {
          code: "BCA-702",
          name: "Internet of Things (IoT) & Embedded Computing",
          type: "Core",
          credits: 4,
          ltp: "3-1-0",
          description: "Sensors, microcontrollers (ESP32, Raspberry Pi), MQTT protocol, edge computing, IoT cloud platforms.",
          units: [
            { unit: "Unit 1", title: "IoT Architecture & Sensors", topics: "Sensors, Actuators, Microcontrollers, Raspberry Pi, ESP32 architecture" },
            { unit: "Unit 2", title: "IoT Protocols", topics: "MQTT, CoAP, WebSockets, Bluetooth Low Energy (BLE), LoRaWAN" },
            { unit: "Unit 3", title: "Edge Computing & Cloud Integration", topics: "Data collection at edge, AWS IoT Core, Node-RED visual programming" },
            { unit: "Unit 4", title: "IoT Security & Applications", topics: "Device security, smart city applications, industrial automation, healthcare IoT" }
          ],
          textbooks: ["Internet of Things: A Hands-On Approach - Arshdeep Bahga & Vijay Madisetti"]
        },
        {
          code: "BCA-703",
          name: "Deep Learning & Neural Architectures",
          type: "Elective",
          credits: 4,
          ltp: "3-1-0",
          description: "Convolutional Neural Networks (CNNs), Recurrent Networks (RNN, LSTM), Transformers, and Generative AI intro.",
          units: [
            { unit: "Unit 1", title: "Deep Neural Networks", topics: "Backpropagation, Activation functions (ReLU, Sigmoid), Optimization (Adam), Regularization (Dropout)" },
            { unit: "Unit 2", title: "Computer Vision with CNNs", topics: "Convolution layers, Pooling, ResNet, Transfer Learning with pre-trained weights" },
            { unit: "Unit 3", title: "Sequence Models & NLP", topics: "RNNs, Vanishing Gradient problem, LSTMs, Attention Mechanism, Transformers intro" },
            { unit: "Unit 4", title: "Generative Models & Prompting", topics: "Autoencoders, GANs overview, Large Language Models (LLMs), Prompt Engineering" }
          ],
          textbooks: ["Deep Learning - Ian Goodfellow, Yoshua Bengio, Aaron Courville"]
        },
        {
          code: "BCA-704",
          name: "Major Capstone Project (Phase 1)",
          type: "Project",
          credits: 8,
          ltp: "0-0-16",
          description: "In-depth industrial or research project inception: literature review, problem formulation, prototype development.",
          units: [
            { unit: "Stage 1", title: "Project Synopsis & Literature Survey", topics: "Domain selection, IEEE paper reviews, architecture design" },
            { unit: "Stage 2", title: "Prototype & Interim Viva", topics: "Proof-of-concept delivery, design reviews, milestone 1 sign-off" }
          ],
          textbooks: ["Software Project Management Guide - ACM Curriculum Guidelines"]
        }
      ]
    },
    {
      semNumber: 8,
      name: "Semester 8",
      academicYear: "4th Year (Honours)",
      totalCredits: 20,
      description: "Industry Internship / Full-Semester Corporate Training, Final Capstone Defense, and Research Seminar.",
      subjects: [
        {
          code: "BCA-801",
          name: "Industry Internship / Corporate Practicum",
          type: "Internship",
          credits: 12,
          ltp: "Full-Time",
          description: "16-week immersive industry internship at tech companies, startups, or research laboratories.",
          units: [
            { unit: "Sprint 1", title: "Corporate Onboarding & Feature Planning", topics: "Agile team participation, tech stack training, sprint backlog commitments" },
            { unit: "Sprint 2", title: "Production Deliverables & Evaluation", topics: "Code reviews, CI/CD deployment, client demo, industry mentor evaluation" }
          ],
          textbooks: ["Professional Software Engineering Practices - IEEE Standards"]
        },
        {
          code: "BCA-802",
          name: "Major Capstone Defense & Project Phase 2",
          type: "Project",
          credits: 6,
          ltp: "0-0-12",
          description: "Final comprehensive production release, scalability testing, user testing, and public department defense.",
          units: [
            { unit: "Phase 1", title: "Full System Deployment", topics: "Production hardening, security audit, user acceptance testing (UAT)" },
            { unit: "Phase 2", title: "Final Dissertation & Public Viva", topics: "Hardbound dissertation submission, project showcase demonstration, external viva" }
          ],
          textbooks: ["Writing for Computer Science - Justin Zobel"]
        },
        {
          code: "BCA-803",
          name: "Technical Paper Seminar & Emerging Tech",
          type: "Seminar",
          credits: 2,
          ltp: "1-0-2",
          description: "Research paper presentation on breakthrough topics such as Quantum Computing, Web3, Edge AI, or Green Computing.",
          units: [
            { unit: "Unit 1", title: "Research Paper Methodologies", topics: "Reading scientific papers, critical analysis, bibliography management" },
            { unit: "Unit 2", title: "Presentation & Peer Review", topics: "Conference slide preparation, presentation delivery, answering Q&A sessions" }
          ],
          textbooks: ["Research Methodology: Methods and Techniques - C.R. Kothari"]
        }
      ]
    }
  ],

  // Comprehensive, realistic Notes categorized by Semester, Subject, and Topic
  notes: [
    {
      id: "note-101",
      title: "Mastering Pointers & Dynamic Memory in C",
      subjectCode: "BCA-101",
      subjectName: "Programming Fundamentals using C",
      semester: 1,
      topic: "Pointers & Dynamic Memory Allocation",
      author: "Prof. Rajesh Verma",
      date: "2025-10-14",
      fileSize: "2.4 MB",
      format: "PDF",
      summary: "Comprehensive lecture notes covering pointer arithmetic, double pointers, malloc(), calloc(), realloc(), memory leak prevention, and practical code examples with memory layout diagrams.",
      contentSample: `# Chapter 3: Pointers & Memory Management in C\n\n## 1. What is a Pointer?\nA pointer is a variable whose value is the address of another variable in system memory.\n\n### Code Demonstration:\n\`\`\`c\nint num = 42;\nint *ptr = &num;\nprintf("Value: %d, Address: %p\\n", *ptr, (void*)ptr);\n\`\`\`\n\n## 2. Dynamic Memory Functions\n- **malloc(size)**: Allocates raw contiguous bytes without initialization.\n- **calloc(n, size)**: Allocates memory and sets all bytes to zero.\n- **free(ptr)**: Deallocates memory block to prevent memory leaks.\n\n## 3. Best Practices:\nAlways set deallocated pointers to \`NULL\` to eliminate dangling pointer hazards.`
    },
    {
      id: "note-102",
      title: "Discrete Math: Set Theory & Relations Handbook",
      subjectCode: "BCA-102",
      subjectName: "Discrete Mathematics",
      semester: 1,
      topic: "Equivalence Relations & Hasse Diagrams",
      author: "Dr. Meenakshi Sundaram",
      date: "2025-09-28",
      fileSize: "1.8 MB",
      format: "PDF",
      summary: "Complete formulas and solved proofs for reflexive, symmetric, transitive relations, equivalence classes, and partial order relation Hasse diagrams.",
      contentSample: `# Discrete Mathematics: Relations & Posets\n\n## 1. Equivalence Relations\nA relation R on set A is an equivalence relation if and only if:\n1. **Reflexive**: For all a in A, (a, a) ∈ R\n2. **Symmetric**: If (a, b) ∈ R then (b, a) ∈ R\n3. **Transitive**: If (a, b) ∈ R and (b, c) ∈ R then (a, c) ∈ R\n\n## 2. Partial Orderings (Posets)\nA relation is a partial order if it is Reflexive, Anti-symmetric, and Transitive.`
    },
    {
      id: "note-201",
      title: "Data Structures: Binary Search Trees & AVL Balancing",
      subjectCode: "BCA-201",
      subjectName: "Data Structures using C++",
      semester: 2,
      topic: "Tree Traversals & AVL Rotations",
      author: "Dr. Arvind S. Sharma",
      date: "2025-11-05",
      fileSize: "3.1 MB",
      format: "PDF",
      summary: "Detailed step-by-step algorithms and C++ code for Binary Search Tree insertion, deletion with 3 cases, and LL/RR/LR/RL AVL rotations with complexity breakdowns.",
      contentSample: `# Data Structures: BST & Self-Balancing Trees\n\n## 1. Binary Search Tree Property\nFor every node X:\n- All values in the left subtree of X < X->data\n- All values in the right subtree of X > X->data\n\n## 2. AVL Rotations\nBalance Factor = Height(LeftSubtree) - Height(RightSubtree)\nAllowed values: {-1, 0, +1}\n- **LL Case**: Single Right Rotation\n- **RR Case**: Single Left Rotation\n- **LR Case**: Left rotation on child, then Right rotation on node`
    },
    {
      id: "note-202",
      title: "Object-Oriented Programming: Virtual Functions & Polymorphism",
      subjectCode: "BCA-202",
      subjectName: "Object-Oriented Programming with C++",
      semester: 2,
      topic: "Virtual Functions & VTABLE Internals",
      author: "Prof. Priya Nair",
      date: "2025-11-20",
      fileSize: "2.1 MB",
      format: "PDF",
      summary: "Under the hood look at runtime polymorphism in C++, virtual tables (vtable), virtual pointers (vptr), pure virtual functions, and abstract base classes.",
      contentSample: `# OOP in C++: Polymorphism & VTABLEs\n\n## 1. Runtime Polymorphism\nAchieved using Base class pointers and virtual member functions.\n\`\`\`cpp\nclass Shape {\npublic:\n    virtual void draw() = 0; // Pure virtual function\n};\n\`\`\`\n\n## 2. VTABLE Mechanism\nThe compiler creates a table of function pointers for every class with virtual methods. Each instance receives a hidden _vptr pointer.`
    },
    {
      id: "note-301",
      title: "DBMS: Normalization from 1NF to BCNF with Solved Examples",
      subjectCode: "BCA-301",
      subjectName: "Database Management Systems (DBMS)",
      semester: 3,
      topic: "Normalization & Functional Dependencies",
      author: "Dr. Arvind S. Sharma",
      date: "2025-10-18",
      fileSize: "2.9 MB",
      format: "PDF",
      summary: "Guide with 10 real-world decomposition exercises: determining candidate keys, identifying partial & transitive dependencies, and normalizing to Boyce-Codd Normal Form.",
      contentSample: `# Database Normalization Guide\n\n## 1. Normal Forms Hierarchy\n- **1NF**: Atomic attribute values, no repeating groups.\n- **2NF**: In 1NF and no non-prime attribute is partially dependent on any candidate key.\n- **3NF**: In 2NF and no transitive dependency exists (X -> A where X is not a superkey and A is non-prime).\n- **BCNF**: For every functional dependency X -> A, X must be a superkey.`
    },
    {
      id: "note-302",
      title: "Core Java: Concurrency & Multithreading Architecture",
      subjectCode: "BCA-302",
      subjectName: "Core Java Programming",
      semester: 3,
      topic: "Thread Synchronization & Lock Mechanisms",
      author: "Prof. Priya Nair",
      date: "2025-10-30",
      fileSize: "3.4 MB",
      format: "PDF",
      summary: "Detailed explanations of Java Memory Model, volatile keyword, synchronized blocks, wait/notify, ReentrantLock, and ThreadPoolExecutor usage.",
      contentSample: `# Java Multithreading Deep Dive\n\n## 1. Thread Creation\n- Extending \`Thread\`\n- Implementing \`Runnable\`\n- Using \`Callable<V>\` with \`ExecutorService\`\n\n## 2. Synchronization\n\`\`\`java\npublic synchronized void updateBalance(double amt) {\n    this.balance += amt;\n}\n\`\`\`\nEnsures mutual exclusion across multiple concurrent threads.`
    },
    {
      id: "note-303",
      title: "Operating Systems: Process Synchronization & Banker's Algorithm",
      subjectCode: "BCA-303",
      subjectName: "Operating System Principles",
      semester: 3,
      topic: "Deadlocks & Semaphores",
      author: "Prof. Rajesh Verma",
      date: "2025-11-12",
      fileSize: "2.6 MB",
      format: "PDF",
      summary: "Detailed study notes on Critical Section problem, Peterson's solution, counting semaphores, and complete step-by-step Banker's algorithm safe sequence calculations.",
      contentSample: `# Operating Systems: Deadlock & Banker's Algorithm\n\n## 1. Four Conditions for Deadlock\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\n\n## 2. Banker's Algorithm Data Structures\n- Allocation Matrix [n x m]\n- Max Matrix [n x m]\n- Need Matrix = Max - Allocation\n- Available Vector [m]`
    },
    {
      id: "note-401",
      title: "Python for Computer Applications: Modules, Lambdas & Generators",
      subjectCode: "BCA-401",
      subjectName: "Python Programming & Applications",
      semester: 4,
      topic: "Functional Python & Advanced Data Structures",
      author: "Prof. Priya Nair",
      date: "2025-09-15",
      fileSize: "2.2 MB",
      format: "PDF",
      summary: "Complete cheat sheet and notes on list comprehensions, decorators, generators with yield, context managers (with statement), and file processing.",
      contentSample: `# Advanced Python Concepts\n\n## 1. Generators vs Iterators\nGenerators save memory by computing values on the fly:\n\`\`\`python\ndef fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\`\`\`\n\n## 2. Decorators\nDecorators wrap another function to extend behavior without modifying source code.`
    },
    {
      id: "note-402",
      title: "Design & Analysis of Algorithms: Dynamic Programming Essentials",
      subjectCode: "BCA-402",
      subjectName: "Design & Analysis of Algorithms",
      semester: 4,
      topic: "Dynamic Programming: 0/1 Knapsack & LCS",
      author: "Dr. Arvind S. Sharma",
      date: "2025-10-04",
      fileSize: "3.7 MB",
      format: "PDF",
      summary: "Derivations of optimal substructure and overlapping subproblems for 0/1 Knapsack, Longest Common Subsequence (LCS), and Bellman-Ford shortest paths.",
      contentSample: `# Dynamic Programming Algorithms\n\n## 1. 0/1 Knapsack Recurrence\n\`\`\`\nK(i, w) = K(i-1, w) if weight[i] > w\nK(i, w) = max(K(i-1, w), value[i] + K(i-1, w - weight[i])) otherwise\n\`\`\`\nTime Complexity: O(n * W), Space: O(n * W)`
    },
    {
      id: "note-501",
      title: "Artificial Intelligence: State-Space Search & A* Algorithm",
      subjectCode: "BCA-501",
      subjectName: "Artificial Intelligence & Machine Learning Fundamentals",
      semester: 5,
      topic: "Informed Search & Heuristics",
      author: "Dr. Arvind S. Sharma",
      date: "2025-10-22",
      fileSize: "4.0 MB",
      format: "PDF",
      summary: "Comprehensive mathematical guide on admissibility and consistency of heuristics, A* search traces on graphs, and 8-puzzle problem formulations.",
      contentSample: `# AI Search Strategies\n\n## 1. A* Evaluation Function\n\`\`\`\nf(n) = g(n) + h(n)\n\`\`\`\n- **g(n)**: Exact cost from start node to node n.\n- **h(n)**: Estimated cost from node n to the goal state.\n\nCondition for Optimality: h(n) must be admissible (never overestimates the true cost to goal).`
    },
    {
      id: "note-502",
      title: "Cloud Computing: Architecture, Virtualization & AWS Services",
      subjectCode: "BCA-502",
      subjectName: "Cloud Computing & Distributed Services",
      semester: 5,
      topic: "AWS Core Services & Hypervisor Architecture",
      author: "Prof. Rajesh Verma",
      date: "2025-11-18",
      fileSize: "3.2 MB",
      format: "PDF",
      summary: "Study notes on hypervisor classifications, AWS EC2 compute types, VPC subnet architectures, S3 bucket storage classes, and IAM security best practices.",
      contentSample: `# Cloud Computing Architecture\n\n## 1. Cloud Service Layers\n- **IaaS**: Infrastructure as a Service (EC2, Google Compute Engine)\n- **PaaS**: Platform as a Service (Heroku, AWS Elastic Beanstalk)\n- **SaaS**: Software as a Service (Google Workspace, Office 365)\n\n## 2. Virtualization Types\nType-1 (Bare Metal): ESXi, Xen\nType-2 (Hosted): VirtualBox, VMware Workstation`
    },
    {
      id: "note-601",
      title: "Full Stack Web: REST API Design & Node.js Middleware Patterns",
      subjectCode: "BCA-601",
      subjectName: "Full Stack Web Engineering (MERN / Node.js)",
      semester: 6,
      topic: "Express.js Architecture & JWT Authentication",
      author: "Prof. Priya Nair",
      date: "2025-09-29",
      fileSize: "2.8 MB",
      format: "PDF",
      summary: "Guide to building scalable production APIs: status codes, controller-service pattern, error handling middlewares, JWT authorization, and MongoDB indexing.",
      contentSample: `# Full Stack Web Engineering\n\n## 1. Express Middleware Lifecycle\n\`\`\`javascript\nconst authenticate = (req, res, next) => {\n  const authHeader = req.headers['authorization'];\n  // Verify JWT token\n  next();\n};\n\`\`\`\n\n## 2. RESTful Conventions\n- GET: Retrieve resources (Idempotent)\n- POST: Create resources\n- PUT/PATCH: Update existing resource\n- DELETE: Remove resource`
    },
    {
      id: "note-701",
      title: "Distributed Systems: CAP Theorem & Consensus Algorithms",
      subjectCode: "BCA-701",
      subjectName: "Distributed Systems & Microservices",
      semester: 7,
      topic: "CAP Theorem, Vector Clocks & Raft Consensus",
      author: "Dr. Arvind S. Sharma",
      date: "2025-10-15",
      fileSize: "3.5 MB",
      format: "PDF",
      summary: "Theoretical and systems analysis of consistency vs availability during network partitions, vector clock event ordering, and the Raft consensus state machine.",
      contentSample: `# Distributed Systems Principles\n\n## 1. CAP Theorem (Brewer's Theorem)\nIn an asynchronous network subject to partitions (P), a distributed system can guarantee at most two of:\n- **C (Consistency)**: Every read receives the most recent write.\n- **A (Availability)**: Every non-failing node returns a response.\n- **P (Partition Tolerance)**: The system continues to operate despite dropped messages.`
    },
    {
      id: "note-801",
      title: "Industry Practicum Guidelines & Technical Dissertation Standard",
      subjectCode: "BCA-801",
      subjectName: "Industry Internship / Corporate Practicum",
      semester: 8,
      topic: "Internship Logbook & Dissertation IEEE Format",
      author: "Dr. Arvind S. Sharma",
      date: "2026-01-10",
      fileSize: "1.5 MB",
      format: "PDF",
      summary: "Official department guidelines for corporate internship logs, bi-weekly supervisor signoffs, final dissertation structure, and citation standards.",
      contentSample: `# BCA Final Year Practicum Guide\n\n## 1. Dissertation Structure\n1. Title Page & Certificate\n2. Abstract & Keywords\n3. System Requirements Specification (SRS)\n4. Architecture & Database Design\n5. Implementation & Code Artifacts\n6. Test Cases & Verification Results\n7. Conclusion & Future Roadmap`
    }
  ],

  // Comprehensive Previous Year Questions (PYQs)
  pyqs: [
    {
      id: "pyq-101",
      subjectCode: "BCA-101",
      subjectName: "Programming Fundamentals using C",
      semester: 1,
      year: 2024,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.2 MB",
      questionsOverview: [
        "Q1 (Compulsory): Differentiate between calloc() and malloc(); Explain storage classes.",
        "Q2: Write a complete C program to perform matrix multiplication using dynamic pointers.",
        "Q3: Explain file opening modes with error handling syntax (fopen, perror, feof).",
        "Q4: Write short notes on recursive functions and stack frame overhead."
      ]
    },
    {
      id: "pyq-102",
      subjectCode: "BCA-101",
      subjectName: "Programming Fundamentals using C",
      semester: 1,
      year: 2023,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.1 MB",
      questionsOverview: [
        "Q1: Define bitwise operators and demonstrate their application in flag toggling.",
        "Q2: Explain passing structures to functions by value versus by reference.",
        "Q3: Write an algorithm and C code to reverse a singly linked list in-place."
      ]
    },
    {
      id: "pyq-103",
      subjectCode: "BCA-102",
      subjectName: "Discrete Mathematics",
      semester: 1,
      year: 2024,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.4 MB",
      questionsOverview: [
        "Q1: Prove by mathematical induction that 1^2 + 2^2 + ... + n^2 = n(n+1)(2n+1)/6.",
        "Q2: Define transitive closure and find Warshall's algorithm result for the given matrix.",
        "Q3: State and prove Pigeonhole principle with two computational examples."
      ]
    },
    {
      id: "pyq-201",
      subjectCode: "BCA-201",
      subjectName: "Data Structures using C++",
      semester: 2,
      year: 2024,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.3 MB",
      questionsOverview: [
        "Q1: Convert given Infix expression into Postfix notation using an explicit stack trace.",
        "Q2: Write C++ code for AVL tree insertion with LR rotation step-by-step.",
        "Q3: Compare Quick Sort vs Merge Sort time and auxiliary space complexity in worst case."
      ]
    },
    {
      id: "pyq-202",
      subjectCode: "BCA-202",
      subjectName: "Object-Oriented Programming with C++",
      semester: 2,
      year: 2023,
      examType: "Mid-Semester",
      totalMarks: 40,
      duration: "1.5 Hours",
      fileSize: "850 KB",
      questionsOverview: [
        "Q1: Differentiate between early binding and late binding with sample program.",
        "Q2: Demonstrate multiple inheritance ambiguity and the use of virtual base classes.",
        "Q3: Write a template class for a generic Stack capable of handling ints and floats."
      ]
    },
    {
      id: "pyq-301",
      subjectCode: "BCA-301",
      subjectName: "Database Management Systems (DBMS)",
      semester: 3,
      year: 2024,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.5 MB",
      questionsOverview: [
        "Q1: Given relation R(A,B,C,D,E) and FDs {A->BC, CD->E, B->D, E->A}, find candidate keys.",
        "Q2: Explain 2-Phase Locking (2PL) protocol and prove that it guarantees serializability.",
        "Q3: Write SQL queries using Correlated Subquery and Windowing functions."
      ]
    },
    {
      id: "pyq-302",
      subjectCode: "BCA-302",
      subjectName: "Core Java Programming",
      semester: 3,
      year: 2024,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.2 MB",
      questionsOverview: [
        "Q1: Explain Java Memory Model: Heap, Stack, Metaspace, and Garbage Collector phases.",
        "Q2: Write a multi-threaded producer-consumer problem using wait() and notify().",
        "Q3: Demonstrate JDBC transactions with commit() and rollback() on error."
      ]
    },
    {
      id: "pyq-303",
      subjectCode: "BCA-303",
      subjectName: "Operating System Principles",
      semester: 3,
      year: 2023,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.3 MB",
      questionsOverview: [
        "Q1: Given 5 processes with arrival and burst times, draw Gantt charts for Round Robin (q=2) and SJF.",
        "Q2: Explain how virtual memory paging handles page faults with a detailed step diagram.",
        "Q3: Discuss disk scheduling algorithms: SCAN, C-SCAN, and SSTF with head movements."
      ]
    },
    {
      id: "pyq-401",
      subjectCode: "BCA-401",
      subjectName: "Python Programming & Applications",
      semester: 4,
      year: 2024,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.2 MB",
      questionsOverview: [
        "Q1: Explain Python GIL (Global Interpreter Lock) and how multiprocessing circumvents it.",
        "Q2: Write a Python program to read a JSON dataset, filter records, and write to a CSV file.",
        "Q3: Illustrate class methods versus static methods using @classmethod and @staticmethod."
      ]
    },
    {
      id: "pyq-402",
      subjectCode: "BCA-402",
      subjectName: "Design & Analysis of Algorithms",
      semester: 4,
      year: 2023,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.4 MB",
      questionsOverview: [
        "Q1: Solve recurrence T(n) = 2T(n/2) + n using Master Theorem.",
        "Q2: Trace Bellman-Ford algorithm on the given directed graph containing negative edge weights.",
        "Q3: Explain NP-Completeness and prove that 3-SAT reduces to CLIQUE."
      ]
    },
    {
      id: "pyq-501",
      subjectCode: "BCA-501",
      subjectName: "Artificial Intelligence & Machine Learning Fundamentals",
      semester: 5,
      year: 2024,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.6 MB",
      questionsOverview: [
        "Q1: Trace A* algorithm on given 8-puzzle configuration using Manhattan distance heuristic.",
        "Q2: Derive gradient descent update formulas for Multiple Linear Regression.",
        "Q3: Differentiate between Bagging and Boosting with reference to Random Forest and XGBoost."
      ]
    },
    {
      id: "pyq-502",
      subjectCode: "BCA-502",
      subjectName: "Cloud Computing & Distributed Services",
      semester: 5,
      year: 2024,
      examType: "Mid-Semester",
      totalMarks: 40,
      duration: "1.5 Hours",
      fileSize: "920 KB",
      questionsOverview: [
        "Q1: Differentiate between bare-metal hypervisors and containerization overhead.",
        "Q2: Design a multi-AZ fault-tolerant architecture on AWS with an Application Load Balancer.",
        "Q3: Explain Amazon S3 storage classes and lifecycle transition rules."
      ]
    },
    {
      id: "pyq-601",
      subjectCode: "BCA-601",
      subjectName: "Full Stack Web Engineering (MERN / Node.js)",
      semester: 6,
      year: 2024,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.3 MB",
      questionsOverview: [
        "Q1: Explain Node.js Event Loop phases: timers, I/O callbacks, idle/prepare, poll, check, close.",
        "Q2: Write an Express middleware to verify JWT authorization headers with refresh tokens.",
        "Q3: Design a MongoDB schema for an e-commerce platform using embedding vs referencing."
      ]
    },
    {
      id: "pyq-701",
      subjectCode: "BCA-701",
      subjectName: "Distributed Systems & Microservices",
      semester: 7,
      year: 2024,
      examType: "End-Semester",
      totalMarks: 75,
      duration: "3 Hours",
      fileSize: "1.5 MB",
      questionsOverview: [
        "Q1: Explain Raft consensus leader election and log replication under network partition.",
        "Q2: Discuss the Saga pattern for managing distributed transactions across microservices.",
        "Q3: Explain Circuit Breaker pattern with Closed, Open, and Half-Open states."
      ]
    }
  ],

  // Faculty Directory - Exactly three members of the BCA Department
  faculty: [
    {
      id: "fac-1",
      name: "Mrs. Prakriti Pradhan",
      designation: "Professor & Head of Department (HOD)",
      qualifications: [
        "Bachelor in Computer Applications (BCA), Cluny Women's College",
        "MCA (Master of Computer Applications)"
      ],
      description: "Mrs. Prakriti Pradhan is the Professor and Head of the Department of BCA. With her academic background in Computer Applications and MCA, she contributes to the academic activities and overall development of the department.",
      avatarColor: "#0F172A",
      gender: "female"
    },
    {
      id: "fac-2",
      name: "Mr. Dhiraj Gautam",
      designation: "Professor",
      qualifications: [
        "Bachelor in Computer Science",
        "MCA (Master of Computer Applications)"
      ],
      description: "Mr. Dhiraj Gautam is a Professor in the BCA Department. With an academic background in Computer Science and MCA, he contributes to teaching, learning and the academic environment of the department.",
      avatarColor: "#1E3A8A",
      gender: "male"
    },
    {
      id: "fac-3",
      name: "Mr. Arpan Pradhan",
      designation: "Faculty Member",
      qualifications: [
        "B.Sc. in Computer Science",
        "M.Sc. (Master of Science)"
      ],
      description: "Mr. Arpan Pradhan is a faculty member of the BCA Department with an academic background in Computer Science and a Master's degree in Science. He contributes to the learning and academic activities of the department.",
      avatarColor: "#334155",
      gender: "male"
    }
  ],

  // Announcements with categories, important tags, and dates
  announcements: [
    {
      id: "ann-1",
      title: "End-Semester Examinations Schedule (Spring 2026)",
      category: "Examination Notice",
      date: "2026-03-15",
      isImportant: true,
      description: "Official timetable for Semesters 2, 4, 6, and 8 End-Semester Examinations has been published. Theory papers begin from April 20, 2026. Students must download admit cards from the student portal before April 15.",
      fullDetails: "Theory exams will be held in morning (09:30 AM - 12:30 PM) and afternoon (02:00 PM - 05:00 PM) shifts. Practical examinations will precede theory exams from April 08 to April 16. Carry college ID and verified hall ticket. Electronic devices are strictly prohibited.",
      author: "Office of the Controller of Examinations"
    },
    {
      id: "ann-2",
      title: "Mid-Term Internal Assessment 2 Timetable",
      category: "Internal Assessment",
      date: "2026-03-10",
      isImportant: true,
      description: "Mid-Term Test 2 for all BCA semesters will take place from March 28 to March 31, 2026. Syllabus includes Units 2 and 3 of all enrolled courses.",
      fullDetails: "Tests will be 1.5 hours in duration with 40 maximum marks. Attendance is mandatory for internal evaluation calculation. Rescheduling is only permitted upon prior medical certification.",
      author: "Academic Committee"
    },
    {
      id: "ann-3",
      title: "Annual BCA Hackathon: 'CodeVortex 2026' Registrations Open",
      category: "Department Event",
      date: "2026-03-05",
      isImportant: false,
      description: "Join the 36-hour flagship software hackathon on April 3-4, 2026. Themes include Generative AI, Sustainable Tech, Smart Campus, and FinTech. Cash prize pool worth $2,500.",
      fullDetails: "Teams of 3 to 4 students from any semester are eligible. Mentorship provided by industry engineers from leading software firms. Food, drinks, and hackathon kits provided on-site.",
      author: "BCA Tech Club & Coding Society"
    },
    {
      id: "ann-4",
      title: "Semester 8 Capstone Project Final Defense Guidelines",
      category: "Assignment",
      date: "2026-02-28",
      isImportant: true,
      description: "Final year students must submit 3 hardbound copies of their Capstone Project Dissertation and demo videos to the department office by April 12, 2026.",
      fullDetails: "Project reports must follow standard IEEE formatting with similarity index (plagiarism) strictly below 15%. External viva panel will evaluate live demos and code architectures.",
      author: "Capstone Review Committee"
    },
    {
      id: "ann-5",
      title: "Guest Seminar on 'Building Production Cloud Architectures with AWS'",
      category: "Seminar",
      date: "2026-02-22",
      isImportant: false,
      description: "Distinguished seminar by Mr. Saurabh Rastogi, Principal Cloud Architect at Amazon Web Services, on March 25, 2026 at CS Auditorium.",
      fullDetails: "Topics covered include microservice resilience, serverless architectures, cost optimization, and AWS certifications roadmap. All 3rd and 4th-year students must attend.",
      author: "Industry Interaction Cell"
    },
    {
      id: "ann-6",
      title: "Holiday Notice: Department Closed for Holi Celebrations",
      category: "Holiday",
      date: "2026-02-18",
      isImportant: false,
      description: "The department and laboratories will remain closed on March 18 and 19, 2026 in observance of Holi. Classes resume normally on March 20.",
      fullDetails: "Regular schedule resumes Friday, March 20. Library facilities will remain accessible via digital student portal.",
      author: "Department Administrative Office"
    },
    {
      id: "ann-7",
      title: "Hands-on Workshop: 'Docker & Kubernetes for Developers'",
      category: "Workshop",
      date: "2026-02-12",
      isImportant: false,
      description: "A two-day weekend bootcamp on containerizing multi-tier applications, cluster deployment, and ingress controllers on March 14-15, 2026.",
      fullDetails: "Conducted in Lab 1. Participants should bring laptops with Docker Desktop pre-installed. Certificate of completion will be awarded to attendees submitting the lab challenge.",
      author: "DevOps & Cloud Student SIG"
    }
  ],

  // Student Resources & Academic Materials
  studentResources: [
    {
      id: "res-1",
      title: "Department Academic Calendar 2025-2026",
      category: "Academic Calendar",
      fileSize: "1.4 MB",
      format: "PDF",
      description: "Official schedule of semester instructional days, mid-terms, practicals, end-semester examinations, and gazetted university holidays."
    },
    {
      id: "res-2",
      title: "BCA Capstone Project & Dissertation IEEE Template",
      category: "Project Guidelines",
      fileSize: "680 KB",
      format: "DOCX / ZIP",
      description: "Standard document template adhering to IEEE referencing, font guidelines, chapter hierarchies, and plagiarism declaration forms."
    },
    {
      id: "res-3",
      title: "Lab Manual: C & C++ Programming Lab",
      category: "Lab Manual",
      fileSize: "3.8 MB",
      format: "PDF",
      description: "Detailed step-by-step problem statements, sample outputs, viva questions, and memory model tracing for BCA-105 and BCA-205."
    },
    {
      id: "res-4",
      title: "Lab Manual: Database Systems & SQL Workbench",
      category: "Lab Manual",
      fileSize: "4.2 MB",
      format: "PDF",
      description: "Hands-on exercises for table schemas, nested queries, triggers, stored procedures, and JDBC Java integration for BCA-305."
    },
    {
      id: "res-5",
      title: "Recommended Online Coding Platforms & Student Packs",
      category: "External Resources",
      fileSize: "Web Link",
      format: "LINK",
      description: "Curated collection of developer tools including GitHub Student Developer Pack, LeetCode, HackerRank, MDN Web Docs, and Kaggle datasets."
    },
    {
      id: "res-6",
      title: "Anti-Plagiarism & Code of Academic Conduct Manual",
      category: "Policy",
      fileSize: "950 KB",
      format: "PDF",
      description: "Mandatory guidelines regarding research integrity, ethical software generation, and citation requirements for all BCA candidates."
    }
  ]
};
