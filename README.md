# Owl Nest - Frontend

<p align="center">
  <img src="public/logo-owl.png" alt="Owl Nest Logo" width="200" />
</p>

A personal digital sanctuary and creative laboratory where useful web utilities, interactive "useless" experiments, and a diverse engineering portfolio converge. From 3D visualizations to hardware projects, this is the central hub for my technical journey and custom-built tools.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![MUI](https://img.shields.io/badge/MUI-7.x-007FFF?style=flat-square&logo=mui)
![Dependabot](https://img.shields.io/badge/dependabot-enabled-blue.svg?logo=dependabot)
![Status](https://img.shields.io/badge/Status-Work--in--Progress-orange?style=flat-square)
![CI Status](https://github.com/nadi3/owl-nest/actions/workflows/ci.yml/badge.svg)

## Goal and features

### Project Goal
Owl Nest is my personal digital headquarters, a "living" laboratory where I consolidate my technical world. This isn't just a landing page; it's a modular ecosystem designed for:
-   **Infrastructure Management**: A centralized hub to access and monitor my self-hosted private services.
-   **The "Useless" Lab**: A creative playground for purely visual or interactive experiments. It’s a space to explore frontend libraries and creative coding just for the sake of it.
-   **Public Toolbox**: Providing small, efficient web utilities (text cleaners, secure password sharing, 3D audio visualizers) for myself and the community.
-   **Engineering Log**: A transparent portfolio showcasing my journey through software development, hardware hacking, and robotics.

### Current Features

The project is growing. Here is what is currently available:

#### Public Toolbox
Small, efficient web utilities for daily use:
- **Wheel of Destiny**: A fully customizable spinning wheel for random choices.
- **3D Audio Visualizer**: An immersive 3D environment to visualize your MP3 files in real-time.

#### The Lab
A creative playground for interactive frontend experiments:
- **The Sensitive Button**: An exercise in digital empathy (or cruelty) where a button reacts to your clicks.
- **Fleeing Mouse**: A physics-based game where you must try to click a mouse that desperately avoids your cursor.
- **Infinite Wait**: A social experiment tracking how long you can hold a button while facing the void.
- **Hexadecimal Time Tracker**: A unique visual clock where time progression dictates the UI's color spectrum.

#### Core Capabilities
- **Multi-language Support**: Fully localized in English and French.
- **Hidden Interactions**: Includes an Impatience Detector and Konami Code support for technical easter eggs.


## Tech Stack
The Owl Nest frontend is built with a modern, performant, and type-safe stack. Every dependency is chosen to balance developer productivity with a high-quality end-user experience.
-   **[React 19](https://react.dev/)**: The core library for building the user interface, leveraging the latest features for improved performance and a streamlined development workflow.
-   **[Vite](https://vite.dev/)**: Used as the build tool and development server for its blazing-fast HMR (Hot Module Replacement) and optimized production builds.
-   **[TypeScript](https://www.typescriptlang.org/)**: Ensures code reliability and maintainability across the entire project through strict static typing.
-   **[Material UI (MUI) v7](https://mui.com/material-ui/)**: Provides the  foundation for the design system. It is heavily customized via a central theme to achieve a professional and structured aesthetic.
-   **[Zustand](https://zustand-demo.pmnd.rs/)**: A small, fast, and scalable barebones state-management solution used for global application state without the boilerplate of Redux.
-   **[TanStack Query v5](https://tanstack.com/query/latest)**: Manages asynchronous data fetching, caching, and synchronization, ensuring a smooth experience when interacting with service APIs.
    
-   **[React Router v7](https://reactrouter.com/)**: Handles internal navigation and deep linking within the modular architecture of the project.
-   **[React Hook Form](https://react-hook-form.com/)** & **[Zod](https://zod.dev/)**: Paired together for robust, type-safe form management and schema validation.
-   **[Lucide React](https://lucide.dev/)**: A library of beautiful, consistent icons used throughout the dashboard and experiments.
-   **[i18next](https://www.i18next.com/)**: Powers the internationalization framework, allowing the project to be fully bilingual (FR/EN) from the ground up.

## Getting Started

Follow these steps to get your development environment up and running.

### Prerequisites
-   **Node.js**: Version 20.x or higher is recommended.
-   **npm**: Version 10.x or higher.

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/nadi3/owl-nest.git
    cd owl-nest
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Development

To launch the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

Once started, the application is typically accessible at `http://localhost:5173`.

> For detailed contribution guidelines, coding standards, and advanced commands, please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Deployment

The Owl Nest frontend is designed to be containerized and served via Nginx. The repository includes a `dockerfile` and a `docker-compose.yml` configured for a professional production environment.

### Infrastructure Integration

By default, the deployment configuration is tailored for an automated infrastructure managed by **Traefik** as a reverse proxy.

-   **Network**: It expects an external Docker network named `web-proxy`.
-   **Labels**: Traefik labels are pre-configured to handle routing and TLS certificates.

For a complete overview of the infrastructure (including the Traefik setup and global orchestration), please refer to the [owl-infra](https://www.google.com/search?q=https://github.com/nadi3/owl-infra) repository.

### Standalone Docker Deployment
If you wish to run the container without a global reverse proxy or the `web-proxy` network, you must adapt the `docker-compose.yml`:
1.  **Remove the external network**: Change the `networks` section to use a local driver instead of `external: true`.
2.  **Expose ports**: Add a `ports` mapping to access Nginx directly (e.g., `- "8080:80"`).
3.  **Remove Traefik labels**: The labels are ignored if Traefik is not present, but can be cleaned up for clarity.

### Build Process
The `dockerfile` uses a multi-stage build:
1.  **Build Stage**: Uses Node 20 to compile the React application and generate the `dist/` folder.
2.  **Production Stage**: Uses a lightweight Nginx image to serve the static files using a custom `nginx.conf`.

## Roadmap

I use **GitHub Projects** and **Issues** to track the evolution of Owl Nest. 

To see what's currently being developed or to suggest a new feature/experiment, please visit: **[Owl Nest Project Board](https://github.com/users/nadi3/projects/2)**

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
