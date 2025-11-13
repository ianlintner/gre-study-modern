import {
  getQuestionsForCategory,
  getQuestionsForTopic,
  questions,
} from "./questions";

describe("questions data", () => {
  it("should be an array", () => {
    expect(Array.isArray(questions)).toBe(true);
  });

  it("should contain objects with required fields", () => {
    for (const q of questions) {
      expect(q).toHaveProperty("id");
      expect(q).toHaveProperty("question");
      expect(q).toHaveProperty("options");
      expect(q).toHaveProperty("answer");
    }
  });

  it("should have non-empty question text", () => {
    for (const q of questions) {
      expect(q.question).not.toBe("");
    }
  });

  it("should preserve tags from source data", () => {
    const questionsWithTags = questions.filter(
      (q) => q.tags && q.tags.length > 0,
    );
    expect(questionsWithTags.length).toBeGreaterThan(0);
  });
});

describe("getQuestionsForCategory", () => {
  it("should return only quantitative questions", () => {
    const quantQuestions = getQuestionsForCategory("quantitative");
    expect(quantQuestions.every((q) => q.category === "quantitative")).toBe(
      true,
    );
  });

  it("should return only verbal questions", () => {
    const verbalQuestions = getQuestionsForCategory("verbal");
    expect(verbalQuestions.every((q) => q.category === "verbal")).toBe(true);
  });

  it("should return only analytical questions", () => {
    const analyticalQuestions = getQuestionsForCategory("analytical");
    expect(analyticalQuestions.every((q) => q.category === "analytical")).toBe(
      true,
    );
  });
});

describe("getQuestionsForTopic", () => {
  it("should return questions linked to algebra topic", () => {
    const algebraQuestions = getQuestionsForTopic(
      "linear-equations",
      "quantitative",
    );
    expect(Array.isArray(algebraQuestions)).toBe(true);
  });

  it("should return questions linked to text completion topic", () => {
    const textCompletionQuestions = getQuestionsForTopic(
      "text-completion",
      "verbal",
    );
    expect(Array.isArray(textCompletionQuestions)).toBe(true);
  });

  it("should only return questions matching the category", () => {
    const questions = getQuestionsForTopic("linear-equations", "quantitative");
    expect(questions.every((q) => q.category === "quantitative")).toBe(true);
  });

  it("should return empty array for non-existent topic", () => {
    const questions = getQuestionsForTopic("non-existent", "quantitative");
    expect(questions).toEqual([]);
  });
});
