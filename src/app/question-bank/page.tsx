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
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Question Bank
      </h1>

      <div className="sticky top-0 bg-gray-50 z-10 flex flex-wrap justify-center gap-4 mb-8 p-4 shadow-sm rounded-md">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <button
              type="button"
              onClick={() => setExpanded(expanded === q.id ? null : q.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setExpanded(expanded === q.id ? null : q.id);
                }
              }}
              className="w-full text-left px-6 py-4 text-lg font-semibold text-blue-700 hover:text-blue-800 focus:outline-none"
            >
              {q.id}: {q.question}
            </button>
            {expanded === q.id && (
              <div className="px-6 pb-4 animate-fadeIn">
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  {q.options.map((opt, i) => (
                    <li
                      key={`${q.id}-${opt}`}
                      className={
                        i === q.answer
                          ? "text-green-600 font-medium"
                          : "text-gray-700"
                      }
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-green-600 font-semibold">
                  Correct Answer: {q.options[q.answer]}
                </p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500">No questions found.</p>
        )}
      </div>
    </main>
  );
}
