## Lucky Global Website

This project is a bilingual Next.js landing page for Lucky Global with:

- Japanese as the default language at `/ja`
- Khmer at `/km`
- A Supabase-backed contact form API
- Empty image placeholders so you can add your own visuals later

## Getting Started

Install dependencies and run the app:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root path redirects to `/ja`.

## Supabase Setup

Create a local environment file named `.env.local` in the project root with these keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The contact API uses the service role key only on the server.

Create this table in Supabase:

```sql
create table if not exists public.contact_inquiries (
	id bigint generated always as identity primary key,
	created_at timestamp with time zone default timezone('utc', now()) not null,
	locale text not null,
	name text not null,
	company text,
	email text not null,
	message text not null
);
```

## Content Editing

- Main bilingual copy lives in `src/lib/site-content.ts`
- Contact form submissions are handled in `src/app/api/contact/route.ts`
- Page layout lives in `src/app/[locale]/page.tsx`

## Deployment

Before deploying, add the same environment variables to your hosting platform.
