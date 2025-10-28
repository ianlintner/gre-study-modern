# FAQ

This section answers common questions about the **GRE Study App**.

---

## General

### What is the GRE Study App?

The GRE Study App is a web-based tool built with **Next.js** and **TypeScript** to help students prepare for the GRE exam.  
It provides a question bank, progress tracking, and a clean, responsive interface.

### Is the app free to use?

Yes! The app is open-source and free to use under the MIT license.

---

## Setup and Usage

### How do I run the app locally?

Follow the steps in the [Getting Started](getting-started.md) guide to install dependencies and start the development server.

### What Node.js version is required?

You’ll need **Node.js v18 or later** to run the app.

### How do I run tests?

Run the following command:

```bash
npm test
```

---

## Development

### How can I contribute?

See the [Contributing](contributing.md) guide for details on how to fork, branch, and submit pull requests.

### How is the documentation generated?

Documentation is built using **MkDocs** with the **Material** theme.  
You can preview it locally by running:

```bash
mkdocs serve
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## Troubleshooting

### I get a “module not found” error when running the app.

Make sure you’ve installed all dependencies:

```bash
npm install
```

If the issue persists, delete `node_modules` and reinstall:

```bash
rm -rf node_modules
npm install
```

### The documentation doesn’t render correctly in Backstage.

Ensure that your `mkdocs.yml` file and `docs/` folder are located in the project root.  
Backstage expects this structure for proper integration.

---

## Contact

For questions or suggestions, open an issue on [GitHub](https://github.com/ianlintner/gre-study-modern/issues).
