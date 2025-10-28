# Architecture

This document provides an overview of the **GRE Study App** architecture, including its structure, data flow, and key technologies.

## Overview

The GRE Study App is built using **Next.js** with **TypeScript**, leveraging the **App Router** for modern, file-based routing.  
It follows a modular architecture that separates concerns between UI components, data management, and configuration.

## Project Structure

```
gre-study/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout and global styles
│   │   ├── page.tsx            # Home page
│   │   ├── question-bank/      # Question bank feature
│   │   │   └── page.tsx
│   ├── data/
│   │   ├── questions.ts        # Data loader and utilities
│   │   ├── gre_qbank_*.json    # Question bank data files
│   ├── app/globals.css         # Global styles
│
├── public/                     # Static assets
├── jest.config.ts              # Jest configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
└── mkdocs.yml                  # Documentation configuration
```

## Data Flow

1. **Data Source**  
   The app loads GRE question data from JSON files in `src/data/`.

2. **Data Layer**  
   `questions.ts` provides functions to fetch and manage question data.

3. **UI Layer**  
   The `question-bank` page renders questions dynamically using React components.

4. **Routing**  
   Next.js App Router handles navigation between pages.

## Technologies Used

- **Next.js** — React framework for server-side rendering and static generation  
- **TypeScript** — Type-safe development  
- **Jest** — Testing framework  
- **PostCSS** — CSS processing  
- **MkDocs** — Documentation generation for Backstage integration

## Future Enhancements

- Add user authentication and progress tracking  
- Integrate analytics for performance insights  
- Expand question categories and difficulty levels
