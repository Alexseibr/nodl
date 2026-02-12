# NODL MVP Order OS

## Local run (API)

```bash
cd apps/api
npm install
npm run build
npm run start:dev
```

Base URL: `http://localhost:3000/api/v1`

Auth for MVP uses request header:
- `x-user-id: usr_owner` (seeded owner)

## Seed fixture

On app start service seeds:
- Company `cmp_demo` (DEALER)
- Owner user `usr_owner`

## Environment variables

MVP does not require mandatory env vars.
Optional:
- `PORT` (default 3000)

## Smoke scenario

```bash
cd apps/api
npm run test:smoke
```

This runs `lead -> convert -> order -> item -> offer -> transitions -> export package` flow.
