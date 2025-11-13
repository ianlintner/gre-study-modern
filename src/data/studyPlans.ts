export type StudyPlanTopic = {
  id: string;
  title: string;
  description: string;
  subtopics?: string[];
};

export type StudyPlan = {
  id: string;
  category: "verbal" | "quantitative" | "analytical";
  title: string;
  description: string;
  topics: StudyPlanTopic[];
};

export const studyPlans: StudyPlan[] = [
  {
    id: "quant-fundamentals",
    category: "quantitative",
    title: "Quantitative Fundamentals",
    description:
      "Master essential math concepts needed for the GRE Quantitative section",
    topics: [
      {
        id: "order-of-operations",
        title: "Order of Operations",
        description:
          "Learn and practice PEMDAS/BODMAS - the fundamental order for solving mathematical expressions",
        subtopics: [
          "Parentheses and Brackets",
          "Exponents and Roots",
          "Multiplication and Division (left to right)",
          "Addition and Subtraction (left to right)",
          "Nested expressions",
        ],
      },
      {
        id: "linear-equations",
        title: "Linear Equations",
        description: "Solve single and multiple variable linear equations",
        subtopics: [
          "One-variable equations",
          "Two-variable systems",
          "Three-variable systems",
          "Substitution method",
          "Elimination method",
          "Word problems",
        ],
      },
      {
        id: "exponents-roots",
        title: "Exponents and Roots",
        description: "Master exponential expressions and radical operations",
        subtopics: [
          "Laws of exponents",
          "Negative exponents",
          "Fractional exponents",
          "Square roots and cube roots",
          "Simplifying radicals",
          "Rationalizing denominators",
        ],
      },
      {
        id: "fractions-decimals",
        title: "Fractions and Decimals",
        description: "Work efficiently with fractions and decimal numbers",
        subtopics: [
          "Adding and subtracting fractions",
          "Multiplying and dividing fractions",
          "Mixed numbers",
          "Decimal to fraction conversion",
          "Fraction to decimal conversion",
          "Comparing fractions and decimals",
        ],
      },
      {
        id: "percentages",
        title: "Percentages",
        description: "Calculate and apply percentages in various contexts",
        subtopics: [
          "Percent calculations",
          "Percent increase and decrease",
          "Compound interest",
          "Percent change",
          "Finding the original value",
          "Percentage word problems",
        ],
      },
      {
        id: "ratios-proportions",
        title: "Ratios and Proportions",
        description: "Understand and solve ratio and proportion problems",
        subtopics: [
          "Simplifying ratios",
          "Part-to-part and part-to-whole ratios",
          "Direct proportion",
          "Inverse proportion",
          "Scale and maps",
          "Rate problems",
        ],
      },
      {
        id: "algebra-fundamentals",
        title: "Algebraic Expressions",
        description: "Manipulate and simplify algebraic expressions",
        subtopics: [
          "Combining like terms",
          "Distributive property",
          "Factoring",
          "Expanding expressions",
          "Polynomials",
          "Quadratic expressions",
        ],
      },
      {
        id: "inequalities",
        title: "Inequalities",
        description: "Solve and graph linear and compound inequalities",
        subtopics: [
          "Linear inequalities",
          "Compound inequalities",
          "Absolute value inequalities",
          "Graphing on number lines",
          "Word problems with inequalities",
        ],
      },
      {
        id: "geometry-basics",
        title: "Geometry Basics",
        description: "Essential geometric concepts and formulas",
        subtopics: [
          "Angles and parallel lines",
          "Triangles (area, perimeter, types)",
          "Quadrilaterals (rectangles, squares, parallelograms)",
          "Circles (circumference, area, sectors)",
          "3D shapes (volume, surface area)",
          "Pythagorean theorem",
        ],
      },
      {
        id: "data-interpretation",
        title: "Data Interpretation",
        description: "Analyze charts, graphs, and statistical data",
        subtopics: [
          "Reading tables and charts",
          "Bar graphs and histograms",
          "Line graphs",
          "Pie charts",
          "Mean, median, mode",
          "Range and standard deviation",
        ],
      },
    ],
  },
  {
    id: "verbal-fundamentals",
    category: "verbal",
    title: "Verbal Fundamentals",
    description:
      "Build vocabulary and master reading comprehension for the GRE Verbal section",
    topics: [
      {
        id: "vocabulary-building",
        title: "Vocabulary Building",
        description: "Expand your vocabulary with high-frequency GRE words",
        subtopics: [
          "Common GRE word roots",
          "Prefixes and suffixes",
          "Context clues",
          "Synonyms and antonyms",
          "Word families",
          "Academic vocabulary",
        ],
      },
      {
        id: "text-completion",
        title: "Text Completion",
        description: "Master single-blank and multi-blank sentence completion",
        subtopics: [
          "Single-blank questions",
          "Two-blank questions",
          "Three-blank questions",
          "Signal words and transitions",
          "Contrast and support clues",
          "Elimination strategies",
        ],
      },
      {
        id: "sentence-equivalence",
        title: "Sentence Equivalence",
        description: "Find pairs of words that create equivalent meanings",
        subtopics: [
          "Identifying sentence meaning",
          "Finding true synonyms",
          "Avoiding trap answers",
          "Context analysis",
          "Common word pairs",
        ],
      },
      {
        id: "reading-comprehension",
        title: "Reading Comprehension",
        description: "Develop strategies for understanding complex passages",
        subtopics: [
          "Main idea questions",
          "Detail questions",
          "Inference questions",
          "Author's purpose and tone",
          "Vocabulary in context",
          "Passage structure",
        ],
      },
      {
        id: "critical-reasoning",
        title: "Critical Reasoning",
        description: "Analyze arguments and identify logical patterns",
        subtopics: [
          "Identifying premises and conclusions",
          "Strengthening arguments",
          "Weakening arguments",
          "Assumptions",
          "Logical fallacies",
          "Parallel reasoning",
        ],
      },
    ],
  },
  {
    id: "analytical-fundamentals",
    category: "analytical",
    title: "Analytical Writing Fundamentals",
    description:
      "Master essay structure and argumentation for the GRE Analytical Writing section",
    topics: [
      {
        id: "analyze-issue",
        title: "Analyze an Issue",
        description: "Develop and support a position on a given issue",
        subtopics: [
          "Understanding the task",
          "Brainstorming positions",
          "Thesis statement development",
          "Supporting arguments",
          "Addressing counterarguments",
          "Essay organization",
        ],
      },
      {
        id: "analyze-argument",
        title: "Analyze an Argument",
        description: "Critique the logical soundness of an argument",
        subtopics: [
          "Identifying assumptions",
          "Finding logical flaws",
          "Evaluating evidence",
          "Alternative explanations",
          "Strengthening the argument",
          "Essay structure",
        ],
      },
      {
        id: "writing-mechanics",
        title: "Writing Mechanics",
        description: "Improve grammar, style, and clarity in academic writing",
        subtopics: [
          "Grammar and syntax",
          "Sentence variety",
          "Transitions and flow",
          "Precise word choice",
          "Avoiding redundancy",
          "Proofreading strategies",
        ],
      },
      {
        id: "time-management",
        title: "Time Management",
        description: "Efficiently plan and execute essays within time limits",
        subtopics: [
          "Planning (5 minutes)",
          "Writing (20 minutes)",
          "Reviewing (5 minutes)",
          "Outlining techniques",
          "Pacing strategies",
        ],
      },
      {
        id: "high-scoring-strategies",
        title: "High-Scoring Strategies",
        description:
          "Techniques for achieving top scores on analytical writing",
        subtopics: [
          "Sophisticated vocabulary",
          "Complex sentence structures",
          "Compelling examples",
          "Logical organization",
          "Strong introductions and conclusions",
          "Coherence and cohesion",
        ],
      },
    ],
  },
];
