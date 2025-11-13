"use client";

import { useState } from "react";
import { getQuestionsForTopic } from "@/data/questions";
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
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Study Plans
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
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
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600"
                }`}
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
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              {/* Plan Header */}
              <button
                type="button"
                onClick={() =>
                  setExpandedPlan(expandedPlan === plan.id ? null : plan.id)
                }
                className="w-full text-left px-6 py-5 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          plan.category === "quantitative"
                            ? "bg-blue-100 text-blue-700"
                            : plan.category === "verbal"
                              ? "bg-green-100 text-green-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {plan.category}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {plan.title}
                      </h2>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {plan.topics.length} topics
                    </p>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                      expandedPlan === plan.id ? "transform rotate-180" : ""
                    }`}
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
                <div className="px-6 pb-6 border-t border-gray-200 bg-gray-50">
                  <div className="mt-4 space-y-3">
                    {plan.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                      >
                        {/* Topic Header */}
                        <button
                          type="button"
                          onClick={() => toggleTopic(topic.id)}
                          className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {topic.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {topic.description}
                              </p>
                              {topic.subtopics && (
                                <p className="text-xs text-gray-500 mt-2">
                                  {topic.subtopics.length} subtopics
                                </p>
                              )}
                            </div>
                            <svg
                              className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-3 ${
                                expandedTopics.has(topic.id)
                                  ? "transform rotate-180"
                                  : ""
                              }`}
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
                          <div className="px-5 pb-4 border-t border-gray-100 bg-gray-50">
                            <ul className="mt-3 space-y-2">
                              {topic.subtopics.map((subtopic, index) => (
                                <li
                                  key={`${topic.id}-subtopic-${index}`}
                                  className="flex items-start"
                                >
                                  <svg
                                    className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5"
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
                                  <span className="text-gray-700">
                                    {subtopic}
                                  </span>
                                </li>
                              ))}
                            </ul>

                            {/* Linked Questions */}
                            {(() => {
                              const linkedQuestions = getQuestionsForTopic(
                                topic.id,
                                plan.category,
                              );
                              return linkedQuestions.length > 0 ? (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-sm font-semibold text-gray-700">
                                      Practice Questions
                                    </h4>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                      {linkedQuestions.length} questions
                                    </span>
                                  </div>
                                  <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {linkedQuestions.slice(0, 5).map((q) => (
                                      <div
                                        key={q.id}
                                        className="p-3 bg-white rounded border border-gray-200 hover:border-blue-300 transition-colors"
                                      >
                                        <div className="flex items-start justify-between gap-2">
                                          <p className="text-sm text-gray-700 line-clamp-2 flex-1">
                                            {q.question}
                                          </p>
                                          <span className="text-xs text-gray-500 flex-shrink-0">
                                            {q.id}
                                          </span>
                                        </div>
                                        {q.tags && q.tags.length > 0 && (
                                          <div className="flex flex-wrap gap-1 mt-2">
                                            {q.tags.map((tag) => (
                                              <span
                                                key={tag}
                                                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                                              >
                                                {tag}
                                              </span>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                    {linkedQuestions.length > 5 && (
                                      <p className="text-xs text-gray-500 text-center py-2">
                                        + {linkedQuestions.length - 5} more
                                        questions
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <p className="text-xs text-gray-500 italic">
                                    No practice questions tagged for this topic
                                    yet
                                  </p>
                                </div>
                              );
                            })()}
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
              <p className="text-gray-500 text-lg">
                No study plans found for this category.
              </p>
            </div>
          )}
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
