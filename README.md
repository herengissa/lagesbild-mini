# Lagesbild Mini

Fullstack-projekt med FastAPI + SQLite i backend och React (Vite) i frontend.

## Struktur
- `main.py` – FastAPI‑app och API‑endpoints
- `database.py` – SQLite/SQLAlchemy‑modell och session
- `lagesbild.db` – lokal databas
- `frontend/dashboard` – React + Vite + Tailwind + Flowbite

## Krav
- Python 3.13+
- Node.js 18+

## Backend (FastAPI)
1) Aktivera venv och installera paket:
   - `source venv/bin/activate`
   - `pip install -r requirements.txt` (om du har en requirements‑fil)
2) Starta servern:
   - `uvicorn main:app --reload`

Backend körs på `http://127.0.0.1:8000`.

### Endpoints
- `GET /` – hälsokoll
- `POST /status` – spara status (`status`, `plats`, `tid`)
- `GET /all` – hämta alla statusrader

Exempel:
```
curl -X POST http://127.0.0.1:8000/status \
  -H "Content-Type: application/json" \
  -d '{"status":"Brand","plats":"Stockholm","tid":"12:30"}'
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
