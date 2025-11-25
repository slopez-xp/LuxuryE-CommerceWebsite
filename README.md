# Rolex

This is a modern web application built with React, TypeScript, Vite, and styled using Tailwind CSS. It leverages Supabase for backend services, including authentication and database management.

## Project Structure

- `src/`: Contains the main application source code.
  - `src/components/`: Reusable React components.
  - `src/context/`: React Context API for global state management (e.g., AuthContext, StoreContext).
  - `src/lib/`: Utility functions and third-party integrations (e.g., `supabase.ts`).
  - `src/pages/`: Top-level page components.
  - `src/styles/`: Global styles and Tailwind CSS configuration.
  - `src/types/`: TypeScript type definitions (e.g., `database.types.ts`).
- `public/`: Static assets.
- `schema.sql`: Supabase database schema definition.
- `vite.config.ts`: Vite build configuration.
- `tailwind.config.js`: Tailwind CSS configuration.
- `postcss.config.js`: PostCSS configuration.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed superset of JavaScript that builds into plain JavaScript.
- **Vite**: A fast build tool that provides a lightning-fast development experience.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Supabase**: An open-source Firebase alternative providing database, authentication, and storage.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Rolex
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env` file in the project root and add your Supabase credentials:

```
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open your browser to `http://localhost:5173` (or the port indicated in your terminal).

### Building for Production

To build the project for production:

```bash
npm run build
# or
yarn build
```

This will generate the production-ready static files in the `dist` directory.

## Database Setup

The `schema.sql` file contains the SQL commands to set up your Supabase database. You can run this script in your Supabase project's SQL Editor to initialize your database tables and functions.
