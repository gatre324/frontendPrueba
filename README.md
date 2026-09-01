# SI2 Nutricionista Frontend

Angular 22 standalone application for CU-01 registration, CU-02 login and CU-04 logout. It consumes the FastAPI API and never connects directly to PostgreSQL/Supabase.

## Requirements

Node 22.22.3+ is required by Angular 22. The project is configured with Angular 22.0.0.

## Run

```bash
npm install
npm start
```

Development API: `http://localhost:8000/api/v1`. Production URL is configured in `src/app/core/config/environment.production.ts`.

## Tests and build

```bash
npm test -- --watch=false
npm run build
```

The app uses Standalone Components, Reactive Forms, Signals, functional interceptors, a route guard and `sessionStorage` for the short-lived access token.
