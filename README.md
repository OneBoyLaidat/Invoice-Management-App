# Invoice Management App

Welcome to the Invoice Management App! This is a complete, fully-functional web application designed to help users create, manage, and track their invoices efficiently. The app features a beautiful, responsive user interface with both dark and light modes.

link to live demo: [Invoice Management App](https://invoice-management-app-iota.vercel.app/)

## Introduction
The Invoice Management App allows users to:
- View a list of all their invoices with status indicators (Draft, Pending, Paid).
- Filter invoices by their current status.
- Create new invoices with a dynamic itemized list.
- Edit existing invoices or delete them.
- Mark invoices as paid.
- Switch between dark and light themes effortlessly.

This project focuses on delivering a high-quality user experience, maintaining robust data management, and ensuring a visually stunning interface across all devices.

## Setup Instructions

To run this project locally, follow these simple steps:

1. **Prerequisites**: Ensure you have Node.js installed (v18 or higher recommended).
2. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd "Invoice Management App"
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
5. **View the App**: Open your browser and navigate to `http://localhost:5173`.

## Architecture Explanation

This application is built as a Single Page Application (SPA) using modern frontend technologies. Here is a breakdown of the core architecture:

- **Framework**: React with TypeScript for robust, type-safe UI component development.
- **Build Tool**: Vite for incredibly fast development server and optimized production builds.
- **Styling**: Tailwind CSS is used for all styling. I utilize utility classes to create a highly responsive design system and easily manage the dark/light themes.
- **Routing**: `react-router-dom` handles page navigation. A neat architectural feature is the "background location" routing, which allows the main invoice list to remain rendered underneath the invoice creation/edit forms, acting like an immersive modal.
- **State Management**: A custom hook (`useInvoices`) abstracts the core business logic (CRUD operations for invoices). This keeps components clean and handles form submissions easily.
- **UI Components**: I leverage Radix UI primitives (via Shadcn UI) for complex interactive elements like Select dropdowns, Popovers, and Calendars to ensure they are accessible and reliable.

## Trade-offs

During development, a few trade-offs were made:

- **Local State vs. Backend**: Currently, the app's state is managed locally via React state/context (or Local Storage). While this is perfect for a frontend demonstration, a real-world application would require a dedicated backend database to persist data securely.
- **Prop Drilling vs. Global Store**: I passed the `useInvoices` hook down as props from `App.tsx` instead of using a heavy global state manager like Redux. This keeps the application lightweight and reduces boilerplate, but if the app scales significantly, a dedicated state manager might be necessary.
- **Component Libraries**: I opted to use Shadcn UI (Radix) for dropdowns and date pickers instead of building them entirely from scratch. This trades some absolute control over DOM structure in exchange for massive improvements in accessibility, speed of development, and reliability.

## Accessibility Notes

Accessibility (a11y) was a key consideration in this project:

- **Semantic HTML**: I used proper HTML tags (`<main>`, `<section>`, `<button>`, `<label>`) to ensure screen readers can easily navigate the page structure.
- **Keyboard Navigation**: Interactive elements, including the custom invoice form dropdowns and date pickers, are fully navigable using a keyboard. This is powered by Radix UI's accessible primitives.
- **Color Contrast**: The color palette in both light and dark modes is carefully chosen to meet WCAG contrast guidelines, ensuring text is highly readable against background colors.
- **Aria Attributes**: Crucial elements (like the theme toggle) use `aria-label` to clearly communicate their purpose to assistive technologies.
- **Focus Management**: Form inputs and dropdowns clearly display focus states (via highlighted rings) so users always know where they are on the page.

## Improvements Beyond Requirements

To make the app feel truly premium, i added several improvements that go beyond basic requirements:

- **Dynamic Form Validation**: The invoice form features real-time validation and clear, inline error messages with highlighted red borders, preventing users from submitting incomplete data.
- **Smooth Animations**: Transitions between light and dark modes, hover states, and dropdown animations are smoothed out using CSS transitions, making the app feel incredibly responsive and "alive".
- **Responsive Layout Adjustments**: The invoice item list transforms from a dense grid on desktop to an optimized stacked layout on mobile, ensuring a great experience on any screen size.
- **Pixel-Perfect Styling Adjustments**: Elements like the Calendar and Dropdowns were highly customized to stretch and align perfectly with standard form inputs, creating a unified and polished aesthetic.
