<div>
  <h1 align="center">Next.js AI Chatbot</h1>
</div>

<p align="center">
  An Open-Source File and Folder Management
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [Drizzle](https://orm.drizzle.team)
  - ORM that you can rely on
- [TRPC](https://trpc.io)
  - End to End typesafe apis
- [tailwind](https://tailwindcss.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
- [singlestore](https://singlestore.com)
  - [Single store](https://singlestore.com) for saving files and folders metadata
- [Clerk](https://clerk.com/docs)
  - Simple and secure authentication

## Deploy Your Own

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

## TODO

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run my-bucket. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various file and authentication provider accounts.

```bash
npm install
npm run db:push
npm run dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).
