# Development Guide

This guide covers advanced development topics and best practices for working on the GRE Study App.

## Table of Contents

- [Development Environment](#development-environment)
- [Working with Data](#working-with-data)
- [Component Development](#component-development)
- [Adding New Features](#adding-new-features)
- [Testing Strategies](#testing-strategies)
- [Performance Optimization](#performance-optimization)
- [Debugging](#debugging)
- [Common Patterns](#common-patterns)

## Development Environment

### Recommended IDE Setup

**Visual Studio Code** with these extensions:

- **ES7+ React/Redux/React-Native snippets** - React code snippets
- **Prettier - Code formatter** - Code formatting (if not using Biome exclusively)
- **TypeScript Error Translator** - Better TypeScript errors
- **Tailwind CSS IntelliSense** - Tailwind class autocompletion
- **Jest Runner** - Run tests from the editor

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

### Environment Variables

Currently, no environment variables are required for development. For future API integrations:

1. Create `.env.local` file (not committed)
2. Add variables with `NEXT_PUBLIC_` prefix for client-side access
3. Document in `.env.example`

## Working with Data

### Question Data Structure

Questions are stored in JSON files in `src/data/`:

```json
{
  "id": "QC-000001",
  "category": "quantitative",
  "type": "quantitative-comparison",
  "question": "Compare the two quantities...",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": 2,
  "explanation": "The correct answer is..."
}
```

### Adding New Questions

1. Choose the appropriate JSON file based on category
2. Add questions following the exact format
3. Ensure unique IDs
4. Validate JSON syntax

```typescript
// Load and validate questions
import { questions } from "@/data/questions";

// Filter by category
const verbalQuestions = questions.filter((q) => q.category === "verbal");
```

### Question Types

- **TC1** - Text Completion (1 blank)
- **TC2** - Text Completion (2 blanks)
- **SE** - Sentence Equivalence
- **RC** - Reading Comprehension
- **QC** - Quantitative Comparison
- **QMCS** - Multiple Choice Single Answer
- **QMCM** - Multiple Choice Multiple Answers
- **QNE** - Numeric Entry
- **AWA** - Analytical Writing Assessment
- **DYN-EQ** - Dynamic Equations

### Data Utilities

```typescript
// Get questions by category
export function getQuestionsByCategory(category: string) {
  return questions.filter((q) => q.category === category);
}

// Get random questions
export function getRandomQuestions(count: number, category?: string) {
  const pool = category ? getQuestionsByCategory(category) : questions;
  return pool.sort(() => Math.random() - 0.5).slice(0, count);
}
```

## Component Development

### Server vs Client Components

**Use Server Components** (default) when:
- Displaying static content
- Fetching data
- No interactivity needed
- Better performance desired

**Use Client Components** when:
- Using React hooks (useState, useEffect, etc.)
- Handling events
- Using browser APIs
- Managing local state

### Component Template

```typescript
// Server Component (default)
import type { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
}

export default function ServerComponent({ title, children }: Props) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

// Client Component
"use client";

import { useState } from "react";

interface Props {
  initialCount?: number;
}

export default function ClientComponent({ initialCount = 0 }: Props) {
  const [count, setCount] = useState(initialCount);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Component Composition

Break down complex components into smaller, reusable pieces:

```typescript
// ❌ Bad: Monolithic component
export default function QuestionPage() {
  return (
    <div>
      {/* 500 lines of code */}
    </div>
  );
}

// ✅ Good: Composed components
export default function QuestionPage() {
  return (
    <div>
      <QuestionHeader />
      <QuestionContent />
      <QuestionActions />
    </div>
  );
}
```

## Adding New Features

### Step-by-Step Process

1. **Plan the Feature**
   - Define requirements
   - Design the UI
   - Identify data needs
   - Consider edge cases

2. **Create the Route** (if needed)
   ```bash
   mkdir src/app/my-feature
   touch src/app/my-feature/page.tsx
   ```

3. **Implement the Component**
   ```typescript
   export default function MyFeaturePage() {
     return <div>My Feature</div>;
   }
   ```

4. **Add Data Logic**
   - Create data utilities in `src/data/`
   - Add TypeScript interfaces
   - Write data tests

5. **Add Tests**
   - Component tests
   - Integration tests
   - E2E tests (if applicable)

6. **Update Navigation**
   - Add links in `layout.tsx`
   - Update metadata

7. **Document the Feature**
   - Update README.md
   - Add to docs/
   - Include examples

### Example: Adding a Timer Feature

1. Create a timer component:

```typescript
"use client";

import { useState, useEffect } from "react";

export default function QuizTimer({ duration }: { duration: number }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return <div>Time Left: {timeLeft}s</div>;
}
```

2. Integrate into quiz page:

```typescript
import QuizTimer from "./QuizTimer";

export default function QuizPage() {
  return (
    <div>
      <QuizTimer duration={60} />
      {/* Quiz content */}
    </div>
  );
}
```

## Testing Strategies

### Unit Testing

Test individual functions and utilities:

```typescript
import { getQuestionsByCategory } from "./questions";

describe("getQuestionsByCategory", () => {
  it("should return only verbal questions", () => {
    const result = getQuestionsByCategory("verbal");
    expect(result.every((q) => q.category === "verbal")).toBe(true);
  });

  it("should return empty array for invalid category", () => {
    const result = getQuestionsByCategory("invalid");
    expect(result).toEqual([]);
  });
});
```

### Component Testing

Test component behavior, not implementation:

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import QuizButton from "./QuizButton";

describe("QuizButton", () => {
  it("should call onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<QuizButton onClick={handleClick}>Click me</QuizButton>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing

Test multiple components working together:

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import QuizPage from "./page";

describe("QuizPage", () => {
  it("should display question after selecting category", () => {
    render(<QuizPage />);

    fireEvent.click(screen.getByText("Verbal"));
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
```

## Performance Optimization

### Code Splitting

Use dynamic imports for heavy components:

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <p>Loading...</p>,
});
```

### Memoization

Use React.memo for expensive components:

```typescript
import { memo } from "react";

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Expensive rendering
  return <div>{/* ... */}</div>;
});
```

### Avoid Unnecessary Re-renders

```typescript
// ❌ Bad: Creates new object on every render
<Component style={{ color: "red" }} />

// ✅ Good: Define outside or use useMemo
const style = { color: "red" };
<Component style={style} />
```

## Debugging

### React DevTools

1. Install React DevTools browser extension
2. Open DevTools and select "Components" or "Profiler" tab
3. Inspect component props, state, and hierarchy

### Next.js Debugging

Enable source maps for better debugging:

```typescript
// next.config.ts
const config = {
  productionBrowserSourceMaps: true,
};
```

### Common Issues

**Issue**: Page not updating after data change
```typescript
// Solution: Ensure you're using state
const [data, setData] = useState(initialData);
```

**Issue**: "use client" not working
```typescript
// Solution: Must be at the very top
"use client";

import { useState } from "react";
```

**Issue**: TypeScript errors
```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

## Common Patterns

### Loading States

```typescript
"use client";

import { useState } from "react";

export default function DataLoader() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  async function loadData() {
    setLoading(true);
    try {
      const response = await fetch("/api/data");
      setData(await response.json());
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!data) return <button onClick={loadData}>Load Data</button>;

  return <div>{/* Render data */}</div>;
}
```

### Error Boundaries

```typescript
"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### Form Handling

```typescript
"use client";

import { useState, type FormEvent } from "react";

export default function SearchForm() {
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("Searching for:", query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

## Best Practices

1. **Keep components small** - Single responsibility principle
2. **Use TypeScript** - Type everything
3. **Write tests** - Test behavior, not implementation
4. **Document complex logic** - Add comments where needed
5. **Follow conventions** - Consistent naming and structure
6. **Optimize later** - Don't premature optimize
7. **Review before committing** - Check your own code first

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library Docs](https://testing-library.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
