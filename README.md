# Event Management Wizard - Technical Assessment

A modular, type-safe multi-step wizard built with **Next.js 15**, **TypeScript**, and **Material UI**.

## 🚀 Overview
The focus was on creating a scalable architecture, maintaining a single source of truth for the state, and ensuring a polished User Experience.

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **UI Library:** Material UI (MUI)
- **Language:** TypeScript (Strict Mode)
- **Icons:** MUI Icons

## 🏗️ Architectural Decisions
- **State Lifting:** The form state is managed in the parent orchestrator (`page.tsx`) to ensure data consistency across steps.
- **Component Modularity:** Each step is a self-contained component, improving maintainability and testability.
- **Type Safety:** Heavily utilized TypeScript's `as const` and Indexed Access Types to eliminate hardcoded strings and runtime errors.
- **In-Memory Mocking:** Implemented a centralized `constants.ts` for users and locations to simulate real-world API data.

## 💡 Key Features
- **Smart Validation:** Prevents deleting the last Admin in the team section.
- **Location Logic:** Handles conditional rendering between existing and new locations.
- **Review Summary:** A read-only preview of all captured data before final submission.
- **Backdrop Feedback:** Custom overlay during the submission process for better UX.

## 🛠️ Setup & Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
3. Run the development server:
  ```bash
   npm run dev
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔮Future Scalability
- **Validation:** Integration of Zod for schema-based runtime validation.
- **State Management:** Migration to Zustand if the wizard grows into a complex multi-page flow.
- **Testing:** Unit tests for business logic (e.g., coordinator rules) and E2E tests with Playwright.