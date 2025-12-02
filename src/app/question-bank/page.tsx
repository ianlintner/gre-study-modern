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
      className="min-h-screen py-10 px-4"
      style={{ backgroundColor: "transparent" }}
    >
      <h1
        className="text-3xl font-bold text-center mb-8"
        style={{ color: "var(--color-text)" }}
      >
        Question Bank
      </h1>

      <div
        className="sticky top-16 z-10 flex flex-wrap justify-center gap-4 mb-8 p-4 shadow-sm rounded-md"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
          }}
        >
          <option value="all">All Categories</option>
          <option value="verbal">Verbal</option>
          <option value="quantitative">Quantitative</option>
          <option value="analytical">Analytical</option>
        </select>
      </div>

      <div className="max-w-4xl mx-auto grid gap-4">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <button
              type="button"
              onClick={() => setExpanded(expanded === q.id ? null : q.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setExpanded(expanded === q.id ? null : q.id);
                }
              }}
              className="w-full text-left px-6 py-4 text-lg font-semibold focus:outline-none"
              style={{ color: "var(--color-primary)" }}
            >
              {q.id}: {q.question}
            </button>
            {expanded === q.id && (
              <div className="px-6 pb-4 animate-fadeIn">
                <ul
                  className="list-disc pl-6 space-y-1"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {q.options.map((opt, i) => (
                    <li
                      key={`${q.id}-${opt}`}
                      style={{
                        color:
                          i === q.answer
                            ? "var(--color-accent)"
                            : "var(--color-text-secondary)",
                        fontWeight: i === q.answer ? 500 : 400,
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-2 font-semibold"
                  style={{ color: "var(--color-accent)" }}
                >
                  Correct Answer: {q.options[q.answer]}
                </p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p
            className="text-center"
            style={{ color: "var(--color-text-secondary)" }}
          >
            No questions found.
          </p>
        )}
      </div>
    </main>
  );
}
