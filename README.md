# GRE Study App

A modern, interactive web application built with **Next.js** and **TypeScript** to help students prepare for the GRE exam. Features include categorized question banks, interactive quizzes, study plans, and progress tracking.

![GRE Study Homepage](https://github.com/user-attachments/assets/c77e318a-a0cd-4521-a82b-1606e1bcbd97)

## ✨ Features

- **📚 Comprehensive Question Bank**: 1000+ GRE questions across multiple categories
  - Verbal Reasoning (Text Completion, Sentence Equivalence, Reading Comprehension)
  - Quantitative Reasoning (Quantitative Comparison, Multiple Choice, Numeric Entry)
  - Analytical Writing Assessment
  
- **🎯 Interactive Quiz Mode**: Practice with randomly selected questions from each category
- **🔍 Search & Filter**: Browse and filter questions by category and type
- **📊 Study Plans**: Structured learning paths for systematic preparation
- **🌓 Dark Mode**: Toggle between light and dark themes
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Fast Performance**: Built with Next.js 16 and optimized for speed

## 📸 Screenshots

### Homepage
![Homepage](https://github.com/user-attachments/assets/c77e318a-a0cd-4521-a82b-1606e1bcbd97)

### Question Bank
![Question Bank](https://github.com/user-attachments/assets/edee016c-9084-40a1-80cc-142a3ca5b7ca)

### Interactive Quiz
![Quiz Interface](https://github.com/user-attachments/assets/30ad7f14-5346-4fd3-89e2-e5ba0b0b9ba7)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

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

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The page will auto-reload when you make changes to the code.

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm test` - Run Jest tests with coverage

### Project Structure

```
gre-study-modern/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout with navigation
│   │   ├── page.tsx         # Homepage
│   │   ├── pageClient.tsx   # Client-side homepage logic
│   │   ├── question-bank/   # Question bank page
│   │   └── study-plans/     # Study plans page
│   ├── data/                # Data layer
│   │   ├── questions.ts     # Question data loader
│   │   ├── studyPlans.ts    # Study plan definitions
│   │   ├── dynamicQuestions.ts # Dynamic question generator
│   │   └── *.json           # Question bank JSON files
│   └── globals.css          # Global styles
├── docs/                    # Documentation (MkDocs)
├── public/                  # Static assets
├── tests/                   # Test files
└── package.json             # Dependencies and scripts
```

### Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/react)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Documentation**: [MkDocs](https://www.mkdocs.org/)

## 📖 Documentation

Comprehensive developer documentation is available in the `docs/` folder:

- [Getting Started](docs/getting-started.md) - Setup and installation guide
- [Architecture](docs/architecture.md) - Application structure and design
- [Contributing](docs/contributing.md) - How to contribute to the project
- [FAQ](docs/faq.md) - Frequently asked questions

To view the documentation locally with MkDocs:

```bash
mkdocs serve
```

Then visit [http://localhost:8000](http://localhost:8000)

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/contributing.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Question data generated for GRE exam preparation

## 📧 Contact

For questions or suggestions, please open an issue on [GitHub](https://github.com/ianlintner/gre-study-modern/issues).
