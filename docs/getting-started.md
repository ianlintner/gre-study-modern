# Getting Started

This guide will help you set up and run the **GRE Study App** locally for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v18 or later) - JavaScript runtime
- **[npm](https://www.npmjs.com/)**, **[yarn](https://yarnpkg.com/)**, **[pnpm](https://pnpm.io/)**, or **[bun](https://bun.sh/)** - Package manager
- **[Git](https://git-scm.com/)** - Version control

### Verify Installation

Check that you have the correct versions installed:

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
git --version
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ianlintner/gre-study-modern.git
cd gre-study-modern
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

This will install all required dependencies including Next.js, React, TypeScript, and development tools.

### 3. Start the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

The development server will start on **http://localhost:3000**

### 4. Open the Application

Open your browser and navigate to:

```
http://localhost:3000
```

You should now see the GRE Study App running locally! 🎉

## Development Workflow

### Hot Reloading

The app supports hot module replacement (HMR). When you make changes to any file in the `src/` directory, the page will automatically reload to reflect your changes.

### File Structure Overview

```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with header/footer
│   ├── page.tsx      # Homepage (server component)
│   ├── pageClient.tsx # Homepage client logic
│   ├── question-bank/ # Question bank feature
│   └── study-plans/   # Study plans feature
├── data/             # Data layer and utilities
│   ├── questions.ts   # Question data loader
│   ├── studyPlans.ts  # Study plan definitions
│   └── *.json         # Question bank data files
└── globals.css       # Global styles and CSS variables
```

## Building for Production

### Create a Production Build

To create an optimized production build:

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Optimize and bundle all code
- Generate static pages where possible
- Create optimized CSS

### Start the Production Server

After building, start the production server:

```bash
npm start
```

The production build will be available at **http://localhost:3000**

## Running Tests

The app uses **Jest** and **React Testing Library** for testing.

### Run All Tests

```bash
npm test
```

This runs all tests with coverage reporting.

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Specific Tests

```bash
npm test questions.test.ts
```

### View Coverage Report

After running tests, open the coverage report:

```bash
open coverage/lcov-report/index.html
```

## Linting and Formatting

The project uses **Biome** for linting and formatting.

### Check Code Quality

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

### Auto-fix Issues

Most linting issues can be automatically fixed:

```bash
npm run lint --fix
```

## Common Development Tasks

### Adding New Questions

1. Navigate to `src/data/`
2. Edit the appropriate JSON file (e.g., `gre_qbank_verbal.json`)
3. Follow the existing question format
4. Test the new questions in the app

### Adding a New Feature

1. Create a new directory in `src/app/` for the feature
2. Add a `page.tsx` file for the route
3. Implement the feature using React Server Components or Client Components
4. Add tests in a `*.test.ts` or `*.test.tsx` file
5. Update documentation as needed

### Debugging

- Use Chrome DevTools for client-side debugging
- Check the terminal for server-side errors
- Use `console.log()` for quick debugging
- Use React DevTools browser extension for component inspection

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Use a different port
PORT=3001 npm run dev
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript Errors

```bash
# Restart TypeScript server in VS Code
# Press Cmd/Ctrl + Shift + P
# Type "TypeScript: Restart TS Server"
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Next Steps

Now that you have the app running locally, explore:

- 📖 [Architecture](architecture.md) - Understand the app structure
- 🤝 [Contributing](contributing.md) - Learn how to contribute
- ❓ [FAQ](faq.md) - Common questions and answers

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
