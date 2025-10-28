"use client";

import { useState } from "react";
import { questions } from "@/data/questions";

export default function QuestionBankPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = questions.filter((q) => {
    const matchesCategory = category === "all" || q.category === category;
    const matchesSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.id.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main
      className="container"
      style={{ padding: "2rem", textAlign: "center" }}
    >
      <h1 style={{ fontSize: "var(--font-size-2xl)", marginBottom: "1rem" }}>
        Question Bank
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            width: "250px",
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
          }}
        >
          <option value="all">All Categories</option>
          <option value="verbal">Verbal</option>
          <option value="quantitative">Quantitative</option>
          <option value="analytical">Analytical</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {filtered.map((q) => (
          <div
            key={q.id}
            className="card"
            style={{
              width: "100%",
              maxWidth: "700px",
              textAlign: "left",
              padding: "1rem",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <button
              type="button"
              onClick={() => setExpanded(expanded === q.id ? null : q.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setExpanded(expanded === q.id ? null : q.id);
                }
              }}
              style={{
                margin: "0 0 0.5rem 0",
                cursor: "pointer",
                color: "var(--color-primary)",
                background: "none",
                border: "none",
                textAlign: "left",
                fontSize: "1rem",
                fontWeight: 600,
                width: "100%",
              }}
            >
              {q.id}: {q.question}
            </button>
            {expanded === q.id && (
              <div style={{ marginTop: "0.5rem" }}>
                <ul>
                  {q.options.map((opt, i) => (
                    <li
                      key={`${q.id}-${opt}`}
                      style={{
                        color:
                          i === q.answer
                            ? "var(--color-accent)"
                            : "var(--color-text)",
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
                <p style={{ color: "var(--color-accent)", fontWeight: 500 }}>
                  Correct Answer: {q.options[q.answer]}
                </p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ color: "var(--color-text-secondary)" }}>
            No questions found.
          </p>
        )}
      </div>
    </main>
  );
}
