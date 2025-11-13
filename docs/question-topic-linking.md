# Question-to-Study-Plan Linking Feature

## Overview

Questions in the GRE Study App are now linked to study plan topics through a tag-based system. This allows students to practice questions that are specifically relevant to the topics they are studying.

## How It Works

### Tag-Based Linking

1. **Questions have tags**: Each question in the question bank includes tags that describe its content (e.g., "algebra", "equations", "verbal", "text_completion")

2. **Topics map to tags**: Study plan topics are mapped to relevant tags through a tag mapping system

3. **Dynamic filtering**: When viewing a topic in a study plan, the app automatically finds and displays questions with matching tags

### Architecture

#### Data Structure

```typescript
// Question type with tags
export type Question = {
  id: string;
  category: "verbal" | "quantitative" | "analytical";
  question: string;
  options: string[];
  answer: number;
  tags?: string[]; // Tags for linking to topics
  studyPlanTopics?: string[]; // Optional: explicit topic IDs
};
```

#### Linking Function

The `getQuestionsForTopic()` function links questions to topics:

```typescript
export function getQuestionsForTopic(
  topicId: string,
  category: "verbal" | "quantitative" | "analytical",
): Question[];
```

## Topic Tag Mappings

### Quantitative Topics

- **order-of-operations**: `algebra`, `arithmetic`
- **linear-equations**: `algebra`, `equations`
- **exponents-roots**: `algebra`, `exponents`
- **fractions-decimals**: `arithmetic`, `fractions`
- **percentages**: `arithmetic`, `percent`
- **ratios-proportions**: `arithmetic`, `ratio`
- **algebra-fundamentals**: `algebra`
- **inequalities**: `algebra`, `inequality`
- **geometry-basics**: `geometry`
- **data-interpretation**: `statistics`, `data`

### Verbal Topics

- **vocabulary-building**: `verbal`, `vocabulary`
- **text-completion**: `verbal`, `text_completion`
- **sentence-equivalence**: `verbal`, `sentence_equivalence`
- **reading-comprehension**: `verbal`, `reading`
- **critical-reasoning**: `verbal`, `reasoning`

### Analytical Topics

- **analyze-issue**: `analytical`, `issue`
- **analyze-argument**: `analytical`, `argument`
- **writing-mechanics**: `analytical`, `writing`
- **time-management**: `analytical`
- **high-scoring-strategies**: `analytical`

## User Experience

### Study Plans Page

1. Navigate to `/study-plans`
2. Select a study plan (e.g., "Quantitative Fundamentals")
3. Expand the plan to see topics
4. Click on a topic (e.g., "Linear Equations")
5. View:
   - Topic description
   - Subtopics list
   - **Practice Questions** section showing linked questions
   - Question count badge
   - First 5 questions with their IDs and tags
   - Indication of additional questions if more than 5 exist

### Features

- **Dynamic filtering**: Questions are filtered in real-time based on tags
- **Category matching**: Only questions from the same category are shown
- **Visual feedback**: Badge shows total count of linked questions
- **Tag display**: Each question shows its tags for transparency
- **Scrollable list**: Up to 5 questions displayed, with count of remaining

## Benefits

1. **Targeted practice**: Students can practice questions specifically related to the topic they're studying
2. **Better learning**: Direct connection between theory (topics) and practice (questions)
3. **Transparent system**: Tags are visible so students understand the connections
4. **Scalable**: New questions automatically link to topics based on their tags
5. **Flexible**: Tag mapping can be easily updated to refine connections

## Adding New Mappings

To add or update topic-to-tag mappings:

1. Edit `src/data/questions.ts`
2. Find the `topicTagMap` object in the `getQuestionsForTopic()` function
3. Add or modify mappings:

```typescript
const topicTagMap: Record<string, string[]> = {
  "your-topic-id": ["tag1", "tag2", "tag3"],
  // ...
};
```

## Testing

Tests are included to verify the linking functionality:

```bash
npm test
```

Test coverage includes:
- Questions preserve tags from source data
- Category filtering works correctly
- Topic-based filtering returns appropriate questions
- Empty results for non-existent topics

## Future Enhancements

Potential improvements:

1. **Manual linking**: Allow questions to specify explicit `studyPlanTopics` IDs
2. **Relevance scoring**: Rank questions by relevance to topic
3. **Coverage analysis**: Show which topics have sufficient question coverage
4. **Practice mode**: Start a focused practice session with topic-linked questions
5. **Progress tracking**: Track completion of questions by topic
6. **Recommendations**: Suggest questions based on weak areas
