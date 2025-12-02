"use client";

import { useState } from "react";
import { studyPlans } from "@/data/studyPlans";

export default function StudyPlansPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "verbal" | "quantitative" | "analytical"
  >("all");
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const filteredPlans =
    selectedCategory === "all"
      ? studyPlans
      : studyPlans.filter((plan) => plan.category === selectedCategory);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  return (
    <main
      className="min-h-screen py-10 px-4"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-4xl font-bold text-center mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Study Plans
        </h1>
        <p
          className="text-center mb-8 max-w-2xl mx-auto"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Structured learning paths with comprehensive topic outlines to help
          you master the GRE. Each plan includes detailed topics and subtopics
          to guide your preparation.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(["all", "quantitative", "verbal", "analytical"] as const).map(
            (cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-6 py-2 rounded-lg font-medium transition-all duration-200"
                style={{
                  backgroundColor:
                    selectedCategory === cat
                      ? "var(--color-primary)"
                      : "var(--color-surface)",
                  color:
                    selectedCategory === cat ? "#fff" : "var(--color-text)",
                  border: `1px solid ${selectedCategory === cat ? "var(--color-primary)" : "var(--color-border)"}`,
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ),
          )}
        </div>

        {/* Study Plans */}
        <div className="grid gap-6">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="card rounded-lg shadow-md overflow-hidden"
            >
              {/* Plan Header */}
              <button
                type="button"
                onClick={() =>
                  setExpandedPlan(expandedPlan === plan.id ? null : plan.id)
                }
                className="w-full text-left px-6 py-5 transition-colors duration-200 focus:outline-none"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor:
                            plan.category === "quantitative"
                              ? "rgba(59, 130, 246, 0.2)"
                              : plan.category === "verbal"
                                ? "rgba(16, 185, 129, 0.2)"
                                : "rgba(139, 92, 246, 0.2)",
                          color:
                            plan.category === "quantitative"
                              ? "var(--color-primary)"
                              : plan.category === "verbal"
                                ? "var(--color-accent)"
                                : "#a78bfa",
                        }}
                      >
                        {plan.category}
                      </span>
                      <h2
                        className="text-2xl font-bold"
                        style={{ color: "var(--color-text)" }}
                      >
                        {plan.title}
                      </h2>
                    </div>
                    <p style={{ color: "var(--color-text-secondary)" }}>
                      {plan.description}
                    </p>
                    <p
                      className="text-sm mt-2"
                      style={{
                        color: "var(--color-text-secondary)",
                        opacity: 0.8,
                      }}
                    >
                      {plan.topics.length} topics
                    </p>
                  </div>
                  <svg
                    className={`w-6 h-6 transition-transform duration-200 ${
                      expandedPlan === plan.id ? "transform rotate-180" : ""
                    }`}
                    style={{ color: "var(--color-text-secondary)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Plan Content */}
              {expandedPlan === plan.id && (
                <div
                  className="px-6 pb-6"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <div className="mt-4 space-y-3">
                    {plan.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="card rounded-lg overflow-hidden"
                      >
                        {/* Topic Header */}
                        <button
                          type="button"
                          onClick={() => toggleTopic(topic.id)}
                          className="w-full text-left px-5 py-4 transition-colors duration-200 focus:outline-none"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3
                                className="text-lg font-semibold mb-1"
                                style={{ color: "var(--color-text)" }}
                              >
                                {topic.title}
                              </h3>
                              <p
                                className="text-sm"
                                style={{ color: "var(--color-text-secondary)" }}
                              >
                                {topic.description}
                              </p>
                              {topic.subtopics && (
                                <p
                                  className="text-xs mt-2"
                                  style={{
                                    color: "var(--color-text-secondary)",
                                    opacity: 0.8,
                                  }}
                                >
                                  {topic.subtopics.length} subtopics
                                </p>
                              )}
                            </div>
                            <svg
                              className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ml-3 ${
                                expandedTopics.has(topic.id)
                                  ? "transform rotate-180"
                                  : ""
                              }`}
                              style={{ color: "var(--color-text-secondary)" }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </button>

                        {/* Topic Subtopics */}
                        {expandedTopics.has(topic.id) && topic.subtopics && (
                          <div
                            className="px-5 pb-4"
                            style={{
                              backgroundColor: "rgba(0,0,0,0.1)",
                              borderTop: "1px solid var(--color-border)",
                            }}
                          >
                            <ul className="mt-3 space-y-2">
                              {topic.subtopics.map((subtopic, index) => (
                                <li
                                  key={`${topic.id}-subtopic-${index}`}
                                  className="flex items-start"
                                >
                                  <svg
                                    className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                                    style={{ color: "var(--color-primary)" }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <span
                                    style={{
                                      color: "var(--color-text-secondary)",
                                    }}
                                  >
                                    {subtopic}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <p
                className="text-lg"
                style={{ color: "var(--color-text-secondary)" }}
              >
                No study plans found for this category.
              </p>
            </div>
          )}
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#fff",
            }}
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
