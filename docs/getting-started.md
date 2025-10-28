# Getting Started

This guide will help you set up and run the **GRE Study App** locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- Git

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ianlintner/gre-study-modern.git
   cd gre-study-modern
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

You should now see the GRE Study App running locally.

## Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Running Tests

The app uses **Jest** for testing. To run tests:

```bash
npm test
```

## Next Steps

- Learn about the app’s [Architecture](architecture.md)
- Explore how to [Contribute](contributing.md)
