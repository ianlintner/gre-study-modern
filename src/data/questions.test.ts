import { questions } from "./questions";

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
});
