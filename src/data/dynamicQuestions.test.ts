import { generateDynamicQuantQuestions } from "./dynamicQuestions";

describe("generateDynamicQuantQuestions", () => {
  it("should generate the requested number of questions", () => {
    const count = 5;
    const questions = generateDynamicQuantQuestions(count);
    expect(questions).toHaveLength(count);
  });

  it("should generate questions with required fields", () => {
    const questions = generateDynamicQuantQuestions(3);
    for (const q of questions) {
      expect(q).toHaveProperty("id");
      expect(q).toHaveProperty("category");
      expect(q).toHaveProperty("question");
      expect(q).toHaveProperty("options");
      expect(q).toHaveProperty("answer");
    }
  });

  it("should generate quantitative category questions", () => {
    const questions = generateDynamicQuantQuestions(5);
    for (const q of questions) {
      expect(q.category).toBe("quantitative");
    }
  });

  it("should have exactly 4 options per question", () => {
    const questions = generateDynamicQuantQuestions(5);
    for (const q of questions) {
      expect(q.options).toHaveLength(4);
    }
  });

  it("should have unique IDs for each question", () => {
    const questions = generateDynamicQuantQuestions(10);
    const ids = questions.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(questions.length);
  });

  it("should have valid answer index within options range", () => {
    const questions = generateDynamicQuantQuestions(10);
    for (const q of questions) {
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
    }
  });

  it("should generate questions with linear equation format", () => {
    const questions = generateDynamicQuantQuestions(5);
    for (const q of questions) {
      expect(q.question).toContain("Solve for x:");
      expect(q.question).toContain("x +");
      expect(q.question).toContain("=");
    }
  });

  it("should have correct answer that solves the equation", () => {
    const questions = generateDynamicQuantQuestions(10);
    for (const q of questions) {
      // Extract equation parts from question text
      const lines = q.question.split("\n");
      const equationLine = lines[lines.length - 1]; // Last line has equation
      const match = equationLine.match(/(\d+)x \+ (\d+) = (\d+)/);

      if (match) {
        const coefficient = Number.parseInt(match[1], 10);
        const constant = Number.parseInt(match[2], 10);
        const result = Number.parseInt(match[3], 10);

        // Get the answer option
        const answerValue = Number.parseInt(q.options[q.answer], 10);

        // Verify the equation: coefficient * x + constant = result
        expect(coefficient * answerValue + constant).toBe(result);
      }
    }
  });

  it("should always have at least 4 unique options", () => {
    const questions = generateDynamicQuantQuestions(20);
    for (const q of questions) {
      const uniqueOptions = new Set(q.options);
      expect(uniqueOptions.size).toBe(4);
    }
  });

  it("should handle edge cases with small correct answers", () => {
    // Test multiple times to ensure edge cases are handled
    const questions = generateDynamicQuantQuestions(50);
    for (const q of questions) {
      expect(q.options).toHaveLength(4);
      expect(q.options[q.answer]).toBeDefined();

      // Verify all options are valid numbers
      for (const opt of q.options) {
        const num = Number.parseInt(opt, 10);
        expect(num).toBeGreaterThan(0);
        expect(Number.isNaN(num)).toBe(false);
      }
    }
  });
});
