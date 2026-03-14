# AI Development Rules

This project uses AI-assisted development.

Agents must follow these rules.

## Tech Stack

* Next.js App Router
* Supabase
* Tailwind CSS
* TypeScript

## Environment Variables

Never hardcode secrets.

Always use:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

## Database Rules

* Always create SQL migrations for new tables
* Enable Row Level Security for every table
* Use auth.uid() for user relationships
* Create seed.sql with sample development data

## UI/UX Rules

* UI must be clean and modern
* Design must be responsive
* Mobile usability is required
* Include proper loading states
* Provide clear empty states

## Design Requirements

Application must include:

* professional logo
* favicon
* modern dashboard layout
* responsive design similar to native mobile apps

## Code Quality

* Use TypeScript
* Avoid duplicate components
* Follow modular component design
* Prefer reusable UI components
