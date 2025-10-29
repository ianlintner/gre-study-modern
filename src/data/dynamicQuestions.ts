import type { Question } from "./questions";

/**
 * Generates dynamic quantitative comparison questions with linear equations
 * Example: "2x + 1 = 11" or "2x + 5 = 16"
 */
export function generateDynamicQuantQuestions(count: number): Question[] {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    // Generate random coefficients and constants
    const coefficient = Math.floor(Math.random() * 9) + 2; // 2-10
    const constant = Math.floor(Math.random() * 20) + 1; // 1-20
    const xValue = Math.floor(Math.random() * 10) + 1; // 1-10
    const result = coefficient * xValue + constant;

    // Create the question
    const question = `Solve for x:\n\n${coefficient}x + ${constant} = ${result}`;

    // Calculate correct answer
    const correctAnswer = xValue;

    // Generate wrong answer options
    const wrongAnswers = new Set<number>();
    let attempts = 0;
    const maxAttempts = 100;
    while (wrongAnswers.size < 3 && attempts < maxAttempts) {
      attempts++;
      const offset = Math.floor(Math.random() * 10) - 5; // -5 to 4
      const wrongAnswer = correctAnswer + offset;
      if (
        wrongAnswer !== correctAnswer &&
        wrongAnswer > 0 &&
        wrongAnswer < 100
      ) {
        wrongAnswers.add(wrongAnswer);
      }
    }

    // Ensure we have exactly 3 wrong answers (safety fallback)
    while (wrongAnswers.size < 3) {
      const fallback = correctAnswer + wrongAnswers.size + 1;
      if (fallback > 0 && fallback < 100 && fallback !== correctAnswer) {
        wrongAnswers.add(fallback);
      } else {
        wrongAnswers.add(correctAnswer + 10 + wrongAnswers.size);
      }
    }

    // Create options array with correct answer - Fisher-Yates shuffle
    const allAnswers = [correctAnswer, ...Array.from(wrongAnswers)];
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    const correctIndex = allAnswers.indexOf(correctAnswer);

    questions.push({
      id: `DYN-EQ-${String(i).padStart(6, "0")}`,
      category: "quantitative",
      question,
      options: allAnswers.map(String),
      answer: correctIndex,
    });
  }

  return questions;
}
