# GEMINI.md - Stitch Dashboard de Gestão ESG

## Project Overview
The **Stitch Dashboard de Gestão ESG** (also known as **Guia ESG Brasil**) is a gamified platform designed to democratize corporate sustainability. It transforms complex ESG (Environmental, Social, and Governance) metrics into a visual journey of progress, encouraging companies to measure, manage, and improve their socio-environmental impact through game elements like XP, Levels, Rankings, and Missions.

The repository is structured into two main parts:
1.  **Main Application (`stitch-esg-dashboard/`):** A functional React 19 + Vite application using Firebase for authentication and data storage.
2.  **Design Assets & Prototypes:** Multiple directories (e.g., `dashboard_gamificado_esg_1`, `diagnostico_divertido_esg_1`) containing static HTML/CSS/Image assets used during the design and prototyping phase.

## Technical Stack (Main App)
-   **Frontend:** React 19, TypeScript, Vite.
-   **Styling:** Tailwind CSS v4 (Modern, Responsive, support for Dark Mode).
-   **Backend/Database:** Firebase (Authentication, Cloud Firestore, Storage).
-   **Icons:** Lucide React & Google Material Symbols.
-   **Data Visualization:** Recharts.
-   **Forms & Validation:** React Hook Form + Zod.
-   **Routing:** React Router Dom v7.

## Getting Started

### Building and Running
All application-specific commands should be executed within the `stitch-esg-dashboard/` directory.

1.  **Navigate to the app directory:**
    ```powershell
    cd stitch-esg-dashboard
    ```
2.  **Install dependencies:**
    ```powershell
    npm install
    ```
3.  **Run in development mode:**
    ```powershell
    npm run dev
    ```
4.  **Build for production:**
    ```powershell
    npm run build
    ```
5.  **Lint the codebase:**
    ```powershell
    npm run lint
    ```

### Environment Configuration
The application requires a Firebase project. Ensure the Firebase SDK is properly configured in `src/firebase.ts`. You may need to create a `.env` file with the following variables (referencing the Firebase Console):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Project Structure (Main App)
-   `src/components/`: Reusable UI components (`ui/`), layouts (`layout/`), and feature-specific components (`dashboard/`).
-   `src/context/`: Authentication context using Firebase.
-   `src/pages/`: Main application views (Dashboard, Diagnostic, Profile, etc.).
-   `src/types/`: TypeScript interfaces and types.
-   `src/data/`: Static data and configurations (e.g., diagnostic questions).
-   `src/firebase.ts`: Firebase SDK initialization and configuration.

## Development Conventions
-   **Language:** Use TypeScript for all new components and logic.
-   **Styling:** Follow the Design System defined in `APP_DESCRIPTION.md`. Use Tailwind utility classes for styling.
-   **Components:** Prefer functional components with React Hooks.
-   **State Management:** Use React Context for global state (like Auth) and local state for component-specific logic.
-   **Forms:** Use `react-hook-form` with `zod` for validation.
-   **Icons:** Prefer `lucide-react` for application icons and `Google Material Symbols` for specific gamified elements as outlined in the description.

## Key Documentation Files
-   `APP_DESCRIPTION.md`: Detailed overview of the vision, design system, and gamification logic.
-   `IMPLEMENTATION_PLAN.md`: Current progress and future roadmap for development.
-   `README.md`: Basic project introduction and setup instructions.
