This is the admin dashboard to go with my e-commerce sites

Tech stack
NextJS 14.0.2
Tailwind
Typescript
Can use PlanetScale (free) but this is setup with Azure - SQL flexible server

Clerk - Authentication - https://clerk.com/docs/quickstarts/nextjs
Shadcn - UI - Includes lucide-react icons - 
zustand - state management -https://docs.pmnd.rs/zustand/getting-started/introduction
react-hook-form - Forms - https://react-hook-form.com/docs
ZOD - Validation - https://zod.dev/
Prisma - ORM for DB management -https://www.prisma.io/docs
Axios - fetches - https://axios-http.com/docs/intro
React-hot-toast - Notifications - https://react-hot-toast.com/docs
Cloudinary - Image uploads - https://console.cloudinary.com/


Useful commands:
npx prisma studio - to view data in sql db

Reset db:
npx prisma migrate reset - resets database completely
npx prisma generate - rebuilds the types
npx prisma db push - syncs local db to azure db