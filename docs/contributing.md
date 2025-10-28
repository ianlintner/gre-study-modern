# Contributing

We welcome contributions to the **GRE Study App**!  
This guide explains how to set up your environment, follow coding standards, and submit changes.

## Development Setup

1. Fork the repository on GitHub.
2. Clone your fork locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/gre-study-modern.git
   cd gre-study-modern
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Code Style

This project uses **TypeScript** and **Biome** for linting and formatting.  
Before committing, ensure your code passes lint checks:

```bash
npm run lint
```

## Testing

We use **Jest** for unit testing. Run tests with:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

## Submitting Changes

1. Create a new branch for your feature or fix:

   ```bash
   git checkout -b feature/my-new-feature
   ```

2. Commit your changes with a clear message:

   ```bash
   git commit -m "Add new feature: question timer"
   ```

3. Push your branch and open a Pull Request on GitHub.

## Documentation

If your change affects functionality or setup, update the relevant documentation in the `docs/` folder.

## Code of Conduct

Please be respectful and collaborative.  
We aim to maintain a positive and inclusive environment for all contributors.
