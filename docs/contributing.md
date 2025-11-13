# Contributing

We welcome contributions to the **GRE Study App**!  
This guide explains how to set up your environment, follow coding standards, and submit changes.

## 🚀 Quick Start

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your feature
4. Make your changes
5. Run tests and linting
6. Submit a pull request

## Development Setup

### 1. Fork and Clone

First, fork the repository on GitHub, then clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/gre-study-modern.git
cd gre-study-modern
```

### 2. Add Upstream Remote

Add the original repository as an upstream remote:

```bash
git remote add upstream https://github.com/ianlintner/gre-study-modern.git
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/my-new-feature
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `test/` - Test additions or changes
- `refactor/` - Code refactoring

### 5. Start Development

Start the development server:

```bash
npm run dev
```

## Code Standards

### TypeScript

- **Use TypeScript** for all new files
- **Define types/interfaces** for all data structures
- **Avoid `any` type** - use proper typing
- **Use type inference** where appropriate

Example:

```typescript
// ✅ Good
interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

// ❌ Bad
interface Question {
  id: any;
  question: any;
  options: any;
  answer: any;
}
```

### React Components

- **Use functional components** with hooks
- **Prefer Server Components** by default
- **Use Client Components** only when needed (interactivity, state, effects)
- **Keep components small and focused**

Example:

```typescript
// Server Component (default)
export default function StaticPage() {
  return <div>Static content</div>;
}

// Client Component (when needed)
"use client";

import { useState } from "react";

export default function InteractivePage() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Naming Conventions

- **Files**: `camelCase.tsx` for components, `camelCase.ts` for utilities
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Interfaces/Types**: `PascalCase`

### Code Style

This project uses **Biome** for linting and formatting.  
Before committing, ensure your code passes lint checks:

```bash
npm run lint
```

Auto-format your code:

```bash
npm run format
```

### Commit Messages

Use clear, descriptive commit messages following this format:

```
<type>: <description>

[optional body]
```

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:

```
feat: add dark mode toggle to header

fix: resolve quiz navigation bug on mobile devices

docs: update architecture documentation with new diagrams
```

## Testing

We use **Jest** and **React Testing Library** for testing.

### Writing Tests

1. Create test files alongside source files:
   - `component.tsx` → `component.test.tsx`
   - `utility.ts` → `utility.test.ts`

2. Test user behavior, not implementation details

3. Use descriptive test names:

```typescript
describe("Question Loader", () => {
  it("should load all questions from JSON files", () => {
    // Test implementation
  });

  it("should filter questions by category", () => {
    // Test implementation
  });
});
```

### Running Tests

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm test -- --coverage
```

### Test Coverage

Aim for these coverage targets:
- **Data utilities**: >80%
- **Components**: >60%
- **Overall**: >70%

## Making Changes

### 1. Write Your Code

- Follow the code standards above
- Keep changes focused and minimal
- Add comments for complex logic
- Update types as needed

### 2. Add Tests

- Write tests for new features
- Update existing tests if behavior changes
- Ensure tests pass locally

### 3. Update Documentation

If your change affects:
- **Setup/Installation**: Update `docs/getting-started.md`
- **Architecture**: Update `docs/architecture.md`
- **Features**: Update `README.md` and `docs/index.md`
- **API/Data**: Document in code and update relevant docs

### 4. Run Quality Checks

Before committing, run:

```bash
# Run linter
npm run lint

# Run tests
npm test

# Build to check for errors
npm run build
```

## Submitting Changes

### 1. Commit Your Changes

Stage and commit your changes:

```bash
git add .
git commit -m "feat: add new feature description"
```

### 2. Push to Your Fork

```bash
git push origin feature/my-new-feature
```

### 3. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template:
   - **Title**: Clear, descriptive title
   - **Description**: What changes were made and why
   - **Testing**: How you tested the changes
   - **Screenshots**: Include if UI changes were made

### 4. Respond to Feedback

- Address reviewer comments
- Make requested changes
- Push updates to your branch
- Request re-review when ready

## Pull Request Guidelines

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Commit messages are clear
- [ ] PR description is complete

### What Makes a Good PR

- **Focused**: Addresses one feature or bug
- **Small**: Easier to review (<500 lines preferred)
- **Tested**: Includes tests and they pass
- **Documented**: Updates docs if needed
- **Clear**: Has descriptive title and description

## Adding Features

### New Question Types

To add a new question type:

1. Update the `Question` interface in `src/data/questions.ts`
2. Add question data to appropriate JSON file
3. Update question rendering logic
4. Add tests for the new type
5. Document the new type

### New Pages

To add a new page:

1. Create directory in `src/app/`
2. Add `page.tsx` file
3. Implement the page component
4. Add tests if needed
5. Update navigation if needed
6. Document the new page

### New Data Sources

To add new data:

1. Create JSON file in `src/data/`
2. Update data loader in `questions.ts`
3. Add TypeScript interfaces
4. Write tests for data loading
5. Document the data structure

## Code of Conduct

### Our Standards

- **Be respectful** and inclusive
- **Be constructive** in feedback
- **Be collaborative** and supportive
- **Be professional** in all interactions

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Publishing private information

## Getting Help

### Questions?

- Check the [FAQ](faq.md)
- Review [Architecture documentation](architecture.md)
- Open a discussion on GitHub

### Found a Bug?

1. Check if it's already reported
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Feature Requests

1. Check existing feature requests
2. Create a new issue describing:
   - What problem it solves
   - Proposed solution
   - Alternative approaches considered

## Development Tips

### Working with JSON Data

Questions are stored in JSON files in `src/data/`. To modify:

1. Open the relevant JSON file
2. Follow the existing format
3. Validate JSON syntax
4. Test in the app

### Debugging

- Use browser DevTools for client-side debugging
- Check terminal for server-side errors
- Use React DevTools extension
- Add `console.log` for quick debugging

### Performance

- Use React Server Components when possible
- Avoid unnecessary state
- Memoize expensive calculations
- Profile with React DevTools Profiler

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Thank You!

Thank you for contributing to the GRE Study App! Your efforts help students prepare for the GRE exam. 🎓
