# Architecture

This document provides a comprehensive overview of the **GRE Study App** architecture, including its structure, data flow, design patterns, and key technologies.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [Component Architecture](#component-architecture)
- [Routing](#routing)
- [State Management](#state-management)
- [Styling Architecture](#styling-architecture)
- [Testing Strategy](#testing-strategy)
- [Performance Optimizations](#performance-optimizations)

## Overview

The GRE Study App is built using **Next.js 16** with the **App Router**, leveraging modern React patterns including Server Components and Client Components. The application follows a modular architecture that separates concerns between UI, data management, and business logic.

### Key Design Principles

- **Server-First**: Use React Server Components by default for better performance
- **Client When Needed**: Use Client Components only for interactivity
- **Type Safety**: Full TypeScript coverage for reliability
- **Modularity**: Clear separation of concerns
- **Performance**: Optimized for fast loading and smooth interactions

## Technology Stack

### Core Framework
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **CSS Variables** - Custom theming and dark mode support
- **PostCSS** - CSS processing and optimization

### Testing
- **[Jest 30](https://jestjs.io/)** - Test runner and assertion library
- **[React Testing Library 16](https://testing-library.com/react)** - Component testing
- **[ts-jest](https://kulshekhar.github.io/ts-jest/)** - TypeScript support for Jest

### Code Quality
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **TypeScript Strict Mode** - Maximum type safety

### Documentation
- **[MkDocs](https://www.mkdocs.org/)** - Static site generator for docs
- **ReadTheDocs Theme** - Clean documentation theme

## Project Structure

```
gre-study-modern/
├── .github/              # GitHub Actions and workflows
├── .idea/                # IDE configuration
├── docs/                 # MkDocs documentation
│   ├── index.md
│   ├── getting-started.md
│   ├── architecture.md
│   ├── contributing.md
│   └── faq.md
├── public/               # Static assets
│   └── favicon.ico
├── src/                  # Application source code
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage (Server Component)
│   │   ├── pageClient.tsx # Homepage logic (Client Component)
│   │   ├── globals.css   # Global styles
│   │   ├── question-bank/
│   │   │   └── page.tsx  # Question bank feature
│   │   └── study-plans/
│   │       └── page.tsx  # Study plans feature
│   └── data/             # Data layer
│       ├── questions.ts  # Question loader and utilities
│       ├── questions.test.ts
│       ├── studyPlans.ts # Study plan definitions
│       ├── studyPlans.test.ts
│       ├── dynamicQuestions.ts # Dynamic question generation
│       ├── dynamicQuestions.test.ts
│       └── *.json        # Question bank data files
├── jest.config.ts        # Jest configuration
├── jest.setup.ts         # Jest setup
├── mkdocs.yml            # MkDocs configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
├── biome.json            # Biome configuration
└── README.md             # Project readme
```

### Directory Explanations

#### `/src/app/`
Contains all Next.js pages and routes using the App Router pattern. Each directory becomes a route, and `page.tsx` files define the page content.

- **Server Components**: Default for all components unless marked with `"use client"`
- **Client Components**: Used only when interactivity is needed (state, effects, event handlers)
- **Layouts**: Shared UI that wraps multiple pages

#### `/src/data/`
Data layer containing all question data, utilities, and business logic.

- **Type Definitions**: TypeScript interfaces for questions and study plans
- **Data Loaders**: Functions to load and filter questions
- **Generators**: Dynamic question generation logic
- **Test Files**: Unit tests for data utilities

## Data Flow

### Question Loading Flow

```
JSON Files → questions.ts → Page Components → User Interface
```

1. **Data Storage**: Questions stored in JSON files by category
2. **Data Loading**: `questions.ts` loads and exports all questions
3. **Component Access**: Pages import and use question data
4. **Rendering**: React components render questions to the UI

### Quiz Flow

```
User Selects Category → Filter Questions → Shuffle → Display → Track Progress
```

1. User clicks a category button (Verbal, Quantitative, or Analytical)
2. Questions are filtered by category
3. 10 random questions are selected
4. Questions displayed one at a time
5. User answers and receives feedback
6. Progress tracked through the quiz

### Study Plans Flow

```
Study Plan Definition → Load Plan → Display Topics → Navigate Lessons
```

## Component Architecture

### Component Types

#### Server Components (Default)
- Used for static content
- No interactivity needed
- Better performance
- Can fetch data directly

```typescript
// Example: Server Component
export default function Page() {
  return <div>Static content</div>;
}
```

#### Client Components
- Used for interactivity
- State management with hooks
- Event handlers
- Browser APIs

```typescript
// Example: Client Component
"use client";

import { useState } from "react";

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Key Components

#### Layout Component (`app/layout.tsx`)
- Defines the root HTML structure
- Provides global navigation
- Manages theme and metadata
- Wraps all pages

#### Homepage Client (`app/pageClient.tsx`)
- Manages quiz state
- Handles category selection
- Displays questions and feedback
- Tracks user progress

#### Question Bank (`app/question-bank/page.tsx`)
- Displays all available questions
- Provides search and filter functionality
- Allows browsing by category

#### Study Plans (`app/study-plans/page.tsx`)
- Shows structured learning paths
- Organizes content by topics
- Provides guided progression

## Routing

The app uses Next.js App Router with file-system based routing:

- `/` - Homepage with quiz interface
- `/question-bank` - Browse all questions
- `/study-plans` - View study plans

### Navigation

Navigation is handled through:
- Next.js `<Link>` components for client-side navigation
- Standard `<a>` tags for external links

## State Management

### Local State
- React `useState` for component-level state
- Used for quiz progress, form inputs, UI toggles

### No Global State Library
The app intentionally avoids global state management libraries (Redux, Zustand, etc.) because:
- State is mostly component-local
- Data is read-only and static
- Simple prop drilling is sufficient

## Styling Architecture

### Tailwind CSS
- Utility-first approach for rapid development
- Custom configuration in `tailwind.config.js`
- JIT (Just-In-Time) compilation for optimal bundle size

### CSS Variables
Custom properties defined in `globals.css`:

```css
:root {
  --color-primary: #4f46e5;
  --color-accent: #10b981;
  --color-error: #ef4444;
  /* ... more variables */
}
```

### Dark Mode
- Toggle between light and dark themes
- CSS variables adjusted for each theme
- Persistent user preference (future enhancement)

## Testing Strategy

### Unit Tests
- Test data utilities and business logic
- Located alongside source files (`*.test.ts`)
- Run with Jest

### Component Tests
- Test React components in isolation
- Use React Testing Library
- Focus on user behavior, not implementation

### Coverage
- Aim for high coverage on critical paths
- Data utilities and business logic: >80%
- UI components: >60%

## Performance Optimizations

### Next.js Optimizations
- **Static Generation**: Pages pre-rendered at build time
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component (future)
- **Font Optimization**: Automatic font optimization

### React Optimizations
- **Server Components**: Reduce client-side JavaScript
- **Lazy Loading**: Dynamic imports for heavy components
- **Memoization**: React.memo for expensive components (when needed)

### Bundle Size
- Tree shaking to remove unused code
- Minimal dependencies
- Tailwind CSS purging for production

## Data Structure

### Question Interface

```typescript
interface Question {
  id: string;
  category: string;
  type: string;
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}
```

### Study Plan Interface

```typescript
interface StudyPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: Topic[];
}
```

## Future Enhancements

### Planned Features
- User authentication and progress tracking
- Persistent user state (localStorage/database)
- Analytics and performance insights
- More question types and categories
- Adaptive difficulty based on performance

### Technical Improvements
- Server-side data fetching with caching
- Optimistic UI updates
- Progressive Web App (PWA) support
- Enhanced accessibility (WCAG AA compliance)

## Design Patterns

### Composition Over Inheritance
- Small, focused components
- Composable and reusable
- Easy to test and maintain

### Separation of Concerns
- Data layer separate from UI
- Business logic in utilities
- Presentation in components

### Type Safety
- Interfaces for all data structures
- Strict TypeScript configuration
- Type inference where possible

## Build Process

### Development Build
1. TypeScript compilation (incremental)
2. CSS processing with Tailwind
3. Hot module replacement
4. Source maps for debugging

### Production Build
1. TypeScript compilation (optimized)
2. Tree shaking and minification
3. CSS purging and optimization
4. Static page generation
5. Asset optimization

## Deployment

The app can be deployed to:
- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - Static site hosting
- **Any Node.js host** - Self-hosted option

### Environment Variables
No environment variables required for basic deployment.

## Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
