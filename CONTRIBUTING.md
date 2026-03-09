# Contributing & Standards
To maintain the high quality and modularity of the Owl Nest, all contributions must adhere to the following standards.

## Branching & Commits

We follow a structured approach to version control:
-   **Branch Naming**: Use descriptive prefixes:
    -   `feat/feature-name` for new features or experiments.
    -   `fix/bug-name` for bug fixes.
    -   `docs/changes` for documentation updates.
    -   `refactor/change-name` for code improvements without functional changes.
-   **Conventional Commits**: Commit messages must be clear and prefixed following the [conventional commits conventions](https://www.conventionalcommits.org/en/v1.0.0/). This keeps the history readable and allows for automated changelogs.

## Development Rules

-   **Naming Conventions**:
    -   **Components**: Use `PascalCase` for files and component names (e.g., `NestButton.tsx`).
    -   **Hooks/Utilities/Services**: Use `camelCase` (e.g., `uselessService.ts`).
-   **No Hardcoded Values**: Always use the design tokens from `src/theme/theme.ts` via the `sx` prop or `styled` components. Avoid hardcoding colors, spacing, or font sizes.
-   **Internationalization (i18n)**: Never hardcode user-facing strings in components. Add keys to `src/i18n/locales/en.json` and `fr.json` and use the `useTranslation` hook.

### Quality Standards
Before submitting a Pull Request, ensure your code passes our quality checks:
- **Linting**: `npm run lint`
- **Formatting**: `npm run format` (Note: Husky is configured to run these checks automatically on pre-commit).

## Automated quality assurance (CI/CD)
The project uses GitHub Actions to enforce standards:
- **CI**: Every push triggers linting, type-checking, and a Docker build test.
- **Deployment**: To deploy a change to the production Raspberry Pi, add the `deploy` label to a Pull Request.

## Project Structure

The project follows a modular and strictly typed architecture to ensure scalability and maintainability.
```text
src/
├── components/          # Reusable UI components
│   └── common/          # Atomic components (Buttons, Cards, Sidebar)
├── constants/           # Static data and configuration constants
├── i18n/                # Internationalization config and translation files
├── layouts/             # Page templates
├── pages/               # Page components and sub-modules
├── services/            # Business logic and data fetching
├── theme/               # Centralized MUI theme and design tokens
├── types/               # TypeScript interfaces and type definitions
├── utils/               # Helper functions and technical utilities
├── App.tsx              # Main application entry point
├── routes.tsx           # Centralized routing configuration
└── main.tsx             # React DOM rendering and providers setup
```

### Key Directories

-   **`src/components/common`**: This is the heart of the Design System. Every generic element lives here to ensure visual consistency.
-   **`src/pages`**: Each major section of the site has its own directory or file. For complex services, we use a sub-directory containing the index and specific sub-pages.
-   **`src/layouts`**: We decouple the navigation and global structure from the page content. This allows us to have different layouts (e.g., a standard one for services and a specific one for "useless" experiments).
-   **`src/services`**: Logic for retrieving data (currently from constants, later from APIs) is isolated here to keep components focused on the UI.
-   **`src/theme`**: A single source of truth for colors, shadows, and typography. No hardcoded CSS values should exist outside this folder.

## Recommended Practices

-   **Type Safety**: Avoid using `any`. Define interfaces in `src/types/` for all data structures and service responses.
-   **Documentation**: Use brief JSDoc comments (in English) for complex logic or specific component props to explain the "why" behind the implementation.
-   **Imports Organization**: Keep imports tidy by grouping them:
    1.  React and third-party libraries.
    2.  Internal components and layouts.
    3.  Types, services, and constants.
    4.  Styles and theme.




