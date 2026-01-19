"""
Rutas para generación de números aleatorios
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
import random
from typing import List
from app.database import get_db, User, RandomNumberHistory
from app.models import RandomNumberResponse, RandomNumberHistoryResponse
from app.auth import get_current_user

router = APIRouter(prefix="/random", tags=["Random Numbers"])

# Paleta de colores para los números aleatorios
COLORS = [
    "#FF6B6B",  # Rojo coral
    "#4ECDC4",  # Turquesa
    "#45B7D1",  # Azul cielo
    "#FFA07A",  # Salmón claro
    "#98D8C8",  # Verde menta
    "#F7DC6F",  # Amarillo suave
    "#BB8FCE",  # Púrpura lavanda
    "#85C1E2",  # Azul claro
    "#F8B195",  # Melocotón
    "#A8E6CF",  # Verde pastel
    "#FFD3B6",  # Naranja pastel
    "#FFAAA5",  # Rosa coral
    "#FF8B94",  # Rosa salmón
    "#A0E7E5",  # Aguamarina
    "#B4F8C8",  # Verde menta claro
]

def get_random_color() -> str:
    """Obtener color aleatorio de la paleta"""
    return random.choice(COLORS)

@router.get("/generate", response_model=RandomNumberResponse)
def generate_random_number(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generar un número aleatorio con color asociado"""
    # Generar número aleatorio entre 1 y 1000
    random_number = random.randint(1, 1000)
    
    # Obtener color aleatorio
    color = get_random_color()
    
    # Guardar en el historial
    history_entry = RandomNumberHistory(
        user_id=current_user.id,
        number=random_number,
        color=color
    )
    db.add(history_entry)
    db.commit()
    
    return {
        "number": random_number,
        "color": color,
        "timestamp": datetime.utcnow()
    }

@router.get("/history", response_model=List[RandomNumberHistoryResponse])
def get_history(
    limit: int = 10,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Obtener historial de números generados por el usuario"""
    history = db.query(RandomNumberHistory)\
        .filter(RandomNumberHistory.user_id == current_user.id)\
        .order_by(RandomNumberHistory.created_at.desc())\
        .limit(limit)\
        .all()
    
    return history

@router.get("/stats")
def get_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Obtener estadísticas de los números generados"""
    numbers = db.query(RandomNumberHistory.number)\
        .filter(RandomNumberHistory.user_id == current_user.id)\
        .all()
    
    if not numbers:
        return {
            "total_generated": 0,
            "average": 0,
            "min": 0,
            "max": 0
        }
    
    number_list = [n[0] for n in numbers]
    
    return {
        "total_generated": len(number_list),
        "average": sum(number_list) / len(number_list),
        "min": min(number_list),
        "max": max(number_list)
    }