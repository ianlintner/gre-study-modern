"use client";

import { useState } from "react";
import { questions } from "@/data/questions";

export default function HomeClient() {
  const [currentSet, setCurrentSet] = useState<typeof questions>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const startCategory = (cat: string) => {
    const filtered = questions.filter((q) => q.category === cat);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
    setCurrentSet(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < currentSet.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCurrentSet([]);
    }
  };

  const question = currentSet[currentIndex];

  return (
    <main className="container" style={{ textAlign: "center" }}>
      <h1
        style={{
          fontSize: "var(--font-size-2xl)",
          marginBottom: "var(--space-lg)",
        }}
      >
        Welcome to GRE Study
      </h1>

      {currentSet.length === 0 ? (
        <section>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Select a question category to begin:
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "var(--space-md)",
              marginTop: "var(--space-md)",
            }}
          >
            {["verbal", "quantitative", "analytical"].map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => startCategory(cat)}
                className="card"
                style={{
                  minWidth: "150px",
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  cursor: "pointer",
                  transition: "transform var(--transition-fast)",
                }}
              >
                <h3 style={{ margin: 0 }}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </h3>
              </button>
            ))}
          </div>
          <div
            style={{
              marginTop: "var(--space-xl)",
              display: "flex",
              justifyContent: "center",
              gap: "var(--space-md)",
            }}
          >
            <a
              href="/study-plans"
              className="card"
              style={{
                minWidth: "200px",
                backgroundColor: "var(--color-primary)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
                display: "block",
                transition: "transform var(--transition-fast)",
              }}
            >
              <h3 style={{ margin: 0 }}>📚 Study Plans</h3>
              <p
                style={{
                  margin: "var(--space-xs) 0 0 0",
                  fontSize: "var(--font-size-sm)",
                  opacity: 0.9,
                }}
              >
                Structured learning paths
              </p>
            </a>
            <a
              href="/question-bank"
              className="card"
              style={{
                minWidth: "200px",
                backgroundColor: "var(--color-accent)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
                display: "block",
                transition: "transform var(--transition-fast)",
              }}
            >
              <h3 style={{ margin: 0 }}>🏦 Question Bank</h3>
              <p
                style={{
                  margin: "var(--space-xs) 0 0 0",
                  fontSize: "var(--font-size-sm)",
                  opacity: 0.9,
                }}
              >
                Browse all questions
              </p>
            </a>
          </div>
        </section>
      ) : (
        <section className="card" style={{ marginTop: "var(--space-xl)" }}>
          <h2 style={{ fontSize: "var(--font-size-xl)" }}>
            {question?.question}
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "var(--space-md)",
            }}
          >
            {question?.options.map((opt, index) => {
              const isCorrect = index === question.answer;
              const isSelected = index === selectedOption;
              const bgColor =
                isAnswered && isCorrect
                  ? "var(--color-accent)"
                  : isAnswered && isSelected
                    ? "var(--color-error)"
                    : "var(--color-surface)";
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  style={{
                    margin: "var(--space-xs) 0",
                    padding: "var(--space-sm) var(--space-lg)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    backgroundColor: bgColor,
                    color: "var(--color-text)",
                    width: "100%",
                    maxWidth: "400px",
                    transition: "background-color var(--transition-fast)",
                  }}
                  aria-pressed={isSelected}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {isAnswered && (
            <>
              <p
                style={{
                  marginTop: "var(--space-md)",
                  fontWeight: 500,
                  color:
                    selectedOption === question?.answer
                      ? "var(--color-accent)"
                      : "var(--color-error)",
                }}
              >
                {selectedOption === question?.answer
                  ? "✅ Correct!"
                  : "❌ Incorrect."}
              </p>
              <button
                type="button"
                onClick={handleNext}
                style={{
                  marginTop: "var(--space-md)",
                  backgroundColor: "var(--color-primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-sm) var(--space-lg)",
                  cursor: "pointer",
                }}
              >
                {currentIndex < currentSet.length - 1
                  ? "Next Question"
                  : "Finish"}
              </button>
            </>
          )}
          <p
            style={{
              marginTop: "var(--space-md)",
              color: "var(--color-text-secondary)",
            }}
          >
            Question {currentIndex + 1} of {currentSet.length}
          </p>
          <button
            type="button"
            onClick={() => setCurrentSet([])}
            style={{
              marginTop: "var(--space-lg)",
              backgroundColor: "var(--color-primary)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-sm) var(--space-lg)",
              cursor: "pointer",
              transition: "background-color var(--transition-fast)",
            }}
          >
            Back to Categories
          </button>
        </section>
      )}
    </main>
  );
}
