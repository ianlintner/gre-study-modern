"use client";

import { useState } from "react";
import { questions } from "../data/questions";

export default function HomeClient() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelectQuestion = (id: string) => {
    setSelectedQuestion(id);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const question = questions.find((q) => q.id === selectedQuestion);

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

      {!selectedQuestion ? (
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
                onClick={() => {
                  const q = questions.find((q) => q.category === cat);
                  if (q) handleSelectQuestion(q.id);
                }}
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
          )}
          <button
            type="button"
            onClick={() => setSelectedQuestion(null)}
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
