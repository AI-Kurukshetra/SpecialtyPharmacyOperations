# RxConnect Architecture

## System Overview

RxConnect is built as a modern SaaS application using a serverless architecture.

Frontend communicates directly with Supabase for authentication and database operations.

## Architecture Diagram

Frontend (Next.js)
|
|
Supabase Auth + Database
|
|
PostgreSQL

## Frontend Layer

Framework:

* Next.js App Router
* React
* TypeScript

UI:

* Tailwind CSS

State Management:

* React Query

Forms:

* React Hook Form

## Backend Layer

Supabase provides:

* Authentication
* Database
* Row Level Security
* API access

## Database

Primary database: PostgreSQL

Core tables:

* patients
* prescriptions
* prior_authorizations
* tasks
* documents

## Authentication

Supabase email/password authentication for pharmacy staff.

## Deployment

Frontend hosted on Vercel.

Supabase hosts backend infrastructure.

## Security

* Row Level Security enabled
* API keys stored in environment variables
* No sensitive data stored in client code
