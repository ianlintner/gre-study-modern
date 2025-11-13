import { generateDynamicQuantQuestions } from "./dynamicQuestions";
import qbank1 from "./gre_qbank_1.json";
import qbank2 from "./gre_qbank_2.json";
import qbank3 from "./gre_qbank_3.json";
import qbank4 from "./gre_qbank_4.json";
import qbank5 from "./gre_qbank_5.json";

export type Question = {
  id: string;
  category: "verbal" | "quantitative" | "analytical";
  question: string;
  options: string[];
  answer: number; // index of correct answer
  tags?: string[]; // Tags for linking to study plan topics
  studyPlanTopics?: string[]; // IDs of study plan topics this question relates to
};

export type BankItem = {
  id: string;
  section: string;
  question: string;
  choices?: (string | number)[];
  correct_answer?: (string | number)[];
  tags?: string[]; // Tags from source data
};

const normalizeBank = (bank: { items?: BankItem[] }): Question[] => {
  if (!bank?.items) return [];
  const items: BankItem[] = bank.items ?? [];
  return items
    .map((item) => {
      const section = item.section?.toLowerCase() || "";
      let category: "verbal" | "quantitative" | "analytical" | null = null;
      if (section.includes("verbal")) category = "verbal";
      else if (section.includes("quant")) category = "quantitative";
      else if (section.includes("analytical")) category = "analytical";
      if (!category) return null;

      const options =
        item.choices?.map((c: string | number) => String(c)) ?? [];
      const correct = item.correct_answer?.[0];
      const answerIndex = options.findIndex(
        (o: string) => o === String(correct),
      );

      return {
        id: item.id,
        category,
        question: item.question,
        options,
        answer: answerIndex >= 0 ? answerIndex : 0,
        tags: item.tags || [], // Preserve tags from source data
      } as Question;
    })
    .filter((item): item is Question => item !== null);
};

export const questions: Question[] = [
  ...normalizeBank(qbank1),
  ...normalizeBank(qbank2),
  ...normalizeBank(qbank3),
  ...normalizeBank(qbank4),
  ...normalizeBank(qbank5),
  ...generateDynamicQuantQuestions(10), // Add 10 dynamic quantitative questions
];

/**
 * Get questions related to a specific study plan topic
 * Links questions to topics based on tags and category
 */
export function getQuestionsForTopic(
  topicId: string,
  category: "verbal" | "quantitative" | "analytical",
): Question[] {
  // Map topic IDs to relevant tags
  const topicTagMap: Record<string, string[]> = {
    // Quantitative topics
    "order-of-operations": ["algebra", "arithmetic"],
    "linear-equations": ["algebra", "equations"],
    "exponents-roots": ["algebra", "exponents"],
    "fractions-decimals": ["arithmetic", "fractions"],
    percentages: ["arithmetic", "percent"],
    "ratios-proportions": ["arithmetic", "ratio"],
    "algebra-fundamentals": ["algebra"],
    inequalities: ["algebra", "inequality"],
    "geometry-basics": ["geometry"],
    "data-interpretation": ["statistics", "data"],
    // Verbal topics
    "vocabulary-building": ["verbal", "vocabulary"],
    "text-completion": ["verbal", "text_completion"],
    "sentence-equivalence": ["verbal", "sentence_equivalence"],
    "reading-comprehension": ["verbal", "reading"],
    "critical-reasoning": ["verbal", "reasoning"],
    // Analytical topics
    "analyze-issue": ["analytical", "issue"],
    "analyze-argument": ["analytical", "argument"],
    "writing-mechanics": ["analytical", "writing"],
    "time-management": ["analytical"],
    "high-scoring-strategies": ["analytical"],
  };

  const relevantTags = topicTagMap[topicId] || [];

  return questions.filter((q) => {
    // Must match category
    if (q.category !== category) return false;

    // Check if question has any relevant tags
    if (q.tags && q.tags.length > 0) {
      return q.tags.some((tag) =>
        relevantTags.some((topicTag) =>
          tag.toLowerCase().includes(topicTag.toLowerCase()),
        ),
      );
    }

    return false;
  });
}

/**
 * Get all questions for a study plan category
 */
export function getQuestionsForCategory(
  category: "verbal" | "quantitative" | "analytical",
): Question[] {
  return questions.filter((q) => q.category === category);
}
