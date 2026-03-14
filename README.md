# RxConnect

RxConnect is a Next.js MVP for specialty pharmacy operations. The current scaffold includes Supabase email/password authentication, a protected dashboard shell, and placeholder pages for patients, prescriptions, prior authorizations, and tasks.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file and add your Supabase project values:

```bash
cp .env.example .env.local
```

Required variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Apply the database files in your Supabase project:

- Run the migration in [supabase/migrations/202603140001_initial_mvp.sql](/home/bacancy/Krunal/Hackathon/rxconnect/supabase/migrations/202603140001_initial_mvp.sql)
- Reference the baseline schema in [supabase/schema.sql](/home/bacancy/Krunal/Hackathon/rxconnect/supabase/schema.sql)
- Load sample data from [supabase/seed.sql](/home/bacancy/Krunal/Hackathon/rxconnect/supabase/seed.sql) if needed

4. Start the development server:

```bash
npm run dev
```

5. Open `http://localhost:3000`

## Included routes

- `/login`
- `/signup`
- `/dashboard`
- `/patients`
- `/prescriptions`
- `/prior-authorizations`
- `/tasks`

## Notes

- Authenticated routes are protected through Supabase-aware middleware.
- Resource pages use reusable placeholder tables and CTA buttons for the MVP.
- Advanced workflow automation and live data fetching are intentionally deferred.
