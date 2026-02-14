# Lagesbild Mini

Fullstack-projekt med FastAPI + Postgres i backend och React (Vite) i frontend.

## Struktur
- `main.py` – FastAPI‑app och API‑endpoints
- `database.py` – Postgres/SQLAlchemy‑koppling och session
- `frontend/dashboard` – React + Vite + Tailwind + Flowbite

## Krav
- Python 3.13+
- Node.js 18+

## Backend (FastAPI)
1) Aktivera venv och installera paket:
   - `source venv/bin/activate`
   - `pip install -r requirements.txt` (om du har en requirements‑fil)
2) Skapa en `.env`‑fil (eller kopiera `env.example`) och sätt `DATABASE_URL`:
   - `DATABASE_URL="postgresql://postgres:1311@localhost:5432/lagesbild-mini"`
3) Starta servern:
   - `uvicorn main:app --reload`

Backend körs på `http://127.0.0.1:8000`.

### Endpoints
- `GET /` – hälsokoll
- `POST /cases` – skapa ärende (`name`, `phone`, `type`, `description`)
- `GET /cases` – hämta alla ärenden

Exempel:
```
curl -X POST http://127.0.0.1:8000/cases \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex","phone":"070-123 45 67","type":"Brand","description":"Rök syns"}'
```

## Frontend (React + Vite)
1) Installera dependencies:
   - `cd frontend/dashboard`
   - `npm install`
2) Starta dev‑server:
   - `npm run dev`

Frontend körs vanligtvis på `http://127.0.0.1:5173`.

## Noteringar
- CORS är öppet för alla origin i dev.
- API‑anrop i `App.jsx` pekar mot `http://127.0.0.1:8000/`.
