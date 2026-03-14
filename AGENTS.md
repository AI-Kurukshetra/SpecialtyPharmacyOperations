# Agent Instructions

This repository is designed for AI-assisted development.

AI agents must follow these steps before making changes.

## Step 1 — Understand the Product

Read:

* PRD.md
* ARCHITECTURE.md
* SKILL.md

before generating any code.

## Step 2 — Work Incrementally

Agents should:

* make small changes
* avoid rewriting entire files
* preserve existing functionality

## Step 3 — Respect Architecture

Follow folder structure:

/app
/components
/lib
/supabase

## Step 4 — Database Changes

When adding new entities:

* create SQL migration
* update schema
* update seed.sql

## Step 5 — UI Development

When building UI:

* maintain consistent layout
* use Tailwind CSS
* ensure mobile responsiveness

## Step 6 — Testing

After implementing features:

* verify pages render
* ensure authentication works
* confirm database operations succeed
