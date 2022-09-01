This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Notes

- Backend

1. Create context, pass the type defn to router
2. Create routes on backend
3. Router info is send to `trpc` for custom typed hooks (`trpc.useQuery`) and client is wrapped for Context Provider

- Frontend

1. Setup tRPC handler, with tRPC handler for your frontend stack
2. Wrap you frontend in `withTRPC` HOC for Context Provider.
3. Access those hooks on client for fetching. 

<!--  -->