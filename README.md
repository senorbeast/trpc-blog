### Trying out tRPC

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

#### Initial Setup

- Backend

1. Create context, pass the type defn to router
2. Create routes on backend
3. Router info is send to `trpc` for custom typed hooks (`trpc.useQuery`) and client is wrapped for Context Provider

- Frontend

1. Setup tRPC handler, with tRPC handler for your frontend stack
2. Wrap you frontend in `withTRPC` HOC for Context Provider.
3. Access those hooks on client for fetching. 

<!--  -->

#### Bootstrap App
`yarn create next-app trpc-blog --typescript`

`yarn add @trpc/client @trpc/server @trpc/react @trpc/next zod react-query superjson jotai @prisma/client react-hook-form jsonwebtoken cookie`
#### Prisma

- `npx prisma init`
- `npx prisma migrate dev --name`
- `npx prisma format` Formats the schema file

##### Create Schema for DB with Prisma

##### Create Schema with zod for tRPC, and convert to normal types for Typescript use cases.

- Zod is a schema builder for typescript

##### Helps us to:

- input arguments for our queries and mutations
- validate the input arguments
- generate typescript types from the schema
-

#### Endpoints

> users.register-user

- Register: Adds user to db, redirects to Login page

> users.request-otp

- LoginCreates base64 encoded token with info of tokenId and email.
- Email verification link with encoded token to email id.
- If user uses the link with token.

> users.verify-otp

- Use the base64 encoded token (decode it) to get email id and id of token,
- Verify with db, if verified, create jwt token, add to cookie (header), redirect to initial page.

> users.me

- Once verified, add user to context.
- Authentication Done.

Credits: 
- https://trpc.io/docs/v9/quickstart
- https://github.com/TomDoesTech
- https://github.com/t3-oss/create-t3-app

