export type Question = {
  id: string;
  category: "verbal" | "quantitative" | "analytical";
  question: string;
  options: string[];
  answer: number; // index of correct answer
};

export const questions: Question[] = [
  {
    id: "v1",
    category: "verbal",
    question:
      "Select the word that is most similar in meaning to 'aberration'.",
    options: ["Deviation", "Harmony", "Consistency", "Normality"],
    answer: 0,
  },
  {
    id: "q1",
    category: "quantitative",
    question: "If 3x + 2 = 11, what is the value of x?",
    options: ["2", "3", "4", "5"],
    answer: 1,
  },
  {
    id: "a1",
    category: "analytical",
    question:
      "All roses are flowers. Some flowers fade quickly. Therefore, some roses fade quickly. Is the conclusion logically valid?",
    options: ["Yes", "No"],
    answer: 1,
  },
];
