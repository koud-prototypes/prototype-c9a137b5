# Multi-stage build: Frontend + Backend
FROM node:20 AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias Python
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar backend
COPY backend/ .

# Copiar frontend construido al static folder del backend
COPY --from=frontend-builder /app/frontend/dist ./static

# Puerto configurable por Railway
ENV PORT=8000
EXPOSE 8000

# FastAPI servira los archivos estaticos del frontend
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT
