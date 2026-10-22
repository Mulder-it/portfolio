# portfolio
Personal portfolio website built with Django Ninja, PostgreSQL and React.

Showcase website presenting my projects, skills and background. This project
is also a learning ground: I am building it as a real professional project,
from UX/UI analysis all the way to deployment.

## Tech stack

- **Backend**: Python, Django, Django Ninja
- **Database**: PostgreSQL
- **Frontend**: React, Vite, React Router
- **Infrastructure**: Docker, Docker Compose, Nginx
- **Design**: Figma (dark mode, cyan-blue accent, Inter + JetBrains Mono)

## Features

- REST API built with Django Ninja (projects, technologies, contact), with
  interactive documentation at `/api/docs`
- Project carousel and project detail pages, fed by the API
- Skills section grouped by category, managed from Django admin
- Contact from stored in the database, with a honeypot field against basic bots
- Responsive layout with a mobile navigation menu

## Project structure

```
backend/    Django project (config/, projects/, contact/)
frontend/   React application (Vite)
docs/       Wireframes and design documents
```

## Getting started

### Requirements

- Python 3.12 or later
- Node.js 24 (see `frontend/.nvmrc`)
- PostgreSQL

### Backend

Create a PostgreSQL database and a user first, matching the `DB_*` values
you will put in `.env`.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env # then fill in the values
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
-API documentation : http://127.0.0.1:8000/api/docs
-Admin interface: http://127.0.0.1:8000/admin/

### Frontend

```bash
cd frontend
nvm use
npm install
cp .env.example .env
npm run dev
```

The site is served at http://localhost:5173

## Tests

```bash
cd backend
pytest
```

## Methodology

- Requirements and wireframes in 'docs/'
- Simplified Git flow ('main' / 'develop' / 'feature/*'), with a Pull Request
  for every change
- Conventional Commits
- Automated tests for the API (pytest)

## Run with Docker

1. Copy `.env.example` to `.env` and fill in the values.
2. Start everything:

```
docker compose up --build
```

3. Create an admin account:

```
docker compose exec backend python manage.py createsuperuser
```

The site is served on http://localhost:8080 and the admin on http://localhost:8080/admin/.

## Status

- Phase 1: complete     - backend (Django Ninja API, PostgreSQL, tests).
- Phase 2: complete     - React frontend.
- Phase 3: complete     - Docker (Compose, PostgreSQL, Nginx)

The contact form still needs server-side rate limiting and Cloudflare Turnstile
before any public deployment.