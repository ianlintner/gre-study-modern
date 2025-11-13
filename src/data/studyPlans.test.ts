import { studyPlans } from "./studyPlans";

describe("Study Plans Data", () => {
  test("should have study plans defined", () => {
    expect(studyPlans).toBeDefined();
    expect(Array.isArray(studyPlans)).toBe(true);
    expect(studyPlans.length).toBeGreaterThan(0);
  });

  test("should have plans for all three categories", () => {
    const categories = studyPlans.map((plan) => plan.category);
    expect(categories).toContain("quantitative");
    expect(categories).toContain("verbal");
    expect(categories).toContain("analytical");
  });

  test("each study plan should have required fields", () => {
    studyPlans.forEach((plan) => {
      expect(plan.id).toBeDefined();
      expect(typeof plan.id).toBe("string");
      expect(plan.id.length).toBeGreaterThan(0);

      expect(plan.category).toBeDefined();
      expect(["verbal", "quantitative", "analytical"]).toContain(plan.category);

      expect(plan.title).toBeDefined();
      expect(typeof plan.title).toBe("string");
      expect(plan.title.length).toBeGreaterThan(0);

      expect(plan.description).toBeDefined();
      expect(typeof plan.description).toBe("string");

      expect(plan.topics).toBeDefined();
      expect(Array.isArray(plan.topics)).toBe(true);
      expect(plan.topics.length).toBeGreaterThan(0);
    });
  });

  test("each topic should have required fields", () => {
    studyPlans.forEach((plan) => {
      plan.topics.forEach((topic) => {
        expect(topic.id).toBeDefined();
        expect(typeof topic.id).toBe("string");
        expect(topic.id.length).toBeGreaterThan(0);

        expect(topic.title).toBeDefined();
        expect(typeof topic.title).toBe("string");
        expect(topic.title.length).toBeGreaterThan(0);

        expect(topic.description).toBeDefined();
        expect(typeof topic.description).toBe("string");

        // Subtopics are optional
        if (topic.subtopics) {
          expect(Array.isArray(topic.subtopics)).toBe(true);
        }
      });
    });
  });

  test("quantitative plan should have math topics", () => {
    const quantPlan = studyPlans.find((p) => p.category === "quantitative");
    expect(quantPlan).toBeDefined();

    const topicTitles = quantPlan?.topics.map((t) => t.title.toLowerCase());
    expect(topicTitles).toBeDefined();

    // Check for specific math topics mentioned in the issue
    const hasMathTopics =
      topicTitles?.some((t) => t.includes("order of operations")) ||
      topicTitles?.some((t) => t.includes("equation")) ||
      topicTitles?.some((t) => t.includes("exponent"));

    expect(hasMathTopics).toBe(true);
  });

  test("topic IDs should be unique within each plan", () => {
    studyPlans.forEach((plan) => {
      const topicIds = plan.topics.map((t) => t.id);
      const uniqueIds = new Set(topicIds);
      expect(uniqueIds.size).toBe(topicIds.length);
    });
  });

  test("plan IDs should be unique", () => {
    const planIds = studyPlans.map((p) => p.id);
    const uniqueIds = new Set(planIds);
    expect(uniqueIds.size).toBe(planIds.length);
  });

  test("quantitative plan should include order of operations topic", () => {
    const quantPlan = studyPlans.find((p) => p.category === "quantitative");
    const orderTopic = quantPlan?.topics.find((t) =>
      t.id.includes("order-of-operations"),
    );

    expect(orderTopic).toBeDefined();
    expect(orderTopic?.title).toContain("Order of Operations");
    expect(orderTopic?.subtopics).toBeDefined();
    expect(orderTopic?.subtopics?.length).toBeGreaterThan(0);
  });

  test("quantitative plan should include equations topic", () => {
    const quantPlan = studyPlans.find((p) => p.category === "quantitative");
    const equationsTopic = quantPlan?.topics.find((t) =>
      t.id.includes("equation"),
    );

    expect(equationsTopic).toBeDefined();
    expect(equationsTopic?.subtopics).toBeDefined();
  });

  test("quantitative plan should include exponents topic", () => {
    const quantPlan = studyPlans.find((p) => p.category === "quantitative");
    const exponentsTopic = quantPlan?.topics.find((t) =>
      t.id.includes("exponent"),
    );

    expect(exponentsTopic).toBeDefined();
    expect(exponentsTopic?.title).toContain("Exponents");
  });
});
