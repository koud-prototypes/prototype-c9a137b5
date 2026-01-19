"""
Aplicación principal FastAPI
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db, engine, SessionLocal, User
from app.routes import auth, random_numbers
from app.auth import get_password_hash

# Crear aplicación FastAPI
app = FastAPI(
    title="Sistema de Números Aleatorios",
    description="API para generar números aleatorios con autenticación",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth.router)
app.include_router(random_numbers.router)

@app.on_event("startup")
def on_startup():
    """Inicializar base de datos y datos de prueba"""
    init_db()
    
    # Crear usuario de prueba si no existe
    db = SessionLocal()
    try:
        existing_user = db.query(User).filter(User.username == "demo").first()
        if not existing_user:
            demo_user = User(
                username="demo",
                email="demo@example.com",
                hashed_password=get_password_hash("demo123")
            )
            db.add(demo_user)
            db.commit()
            print("✅ Usuario de prueba creado: username=demo, password=demo123")
    finally:
        db.close()

@app.get("/")
def root():
    """Endpoint raíz"""
    return {
        "message": "Sistema de Números Aleatorios API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    """Verificar estado de la API"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)