# FetchAPI2.tsx - Pokémon Explorer

## Descripción

Componente React completamente **type-safe** que integra la PokéAPI de forma exhaustiva. Muestra información detallada de pokémons con sprites, estadísticas, habilidades y TODOS los movimientos.

## Características Principales

### 1. **Type Safety Completa**
- Interfaz `PokemonData` con tipos exactos de la API
- Todas las respuestas están tipadas correctamente
- TypeScript detecta errores en tiempo de compilación

### 2. **Datos Completos del Pokémon**
- ✅ ID y nombre
- ✅ Altura y peso (convertidos a unidades reales)
- ✅ Experiencia base
- ✅ Tipos (con colores de tipo)
- ✅ Estadísticas base con barras visuales
- ✅ Habilidades (incluyendo hidden abilities)
- ✅ Todos los movimientos agrupados por método de aprendizaje

### 3. **Sprites Múltiples**
- Front/Back (normal y shiny)
- Official Artwork
- Dream World Sprites
- Home Sprites

### 4. **Búsqueda Interactiva**
- Búsqueda por nombre de pokémon
- Validación de entrada
- Manejo de errores amigable

### 5. **Estados de Carga**
- Loading state mientras se obtienen datos
- Error handling elegante
- Mensajes claros al usuario

## Interfaz Completa

```typescript
interface PokemonData {
  id: number                    // ID del pokémon
  name: string                  // Nombre
  height: number                // Altura en decímetros
  weight: number                // Peso en hectogramos
  base_experience: number       // Experiencia base
  abilities: Ability[]          // Habilidades
  stats: Stat[]                 // Estadísticas base
  types: Type[]                 // Tipos
  moves: Move[]                 // Todos los movimientos
  sprites: Sprites              // Diferentes sprites
}
```

## Componentes de Movimientos

Los movimientos están organizados por método de aprendizaje:
- **level-up**: Movimientos aprendidos al subir de nivel
- **move-tutor**: Movimientos de tutor
- **machine**: Movimientos de máquinas (TM)
- **egg**: Movimientos hereditarios

Cada movimiento muestra:
- Nombre del movimiento
- Nivel aprendido (si es level-up)
- Agrupado por versión del juego

## Uso

### Básico (Pokémon por defecto: Ditto)
```jsx
<FetchAPI2 />
```

### Con Pokémon Específico
```jsx
<FetchAPI2 pokemonName="pikachu" />
<FetchAPI2 pokemonName="charizard" />
<FetchAPI2 pokemonName="mewtwo" />
```

## Estilos

El componente incluye:
- Gradiente púrpura elegante para el fondo principal
- Barras de estadísticas animadas
- Colores de tipo oficiales de Pokémon
- Diseño responsive (mobile-friendly)
- Animaciones suaves en hover
- GridLayout moderno

### Colores de Tipos
- Normal, Fighting, Flying, Poison, Ground, Rock, Bug, Ghost, Steel
- Fire, Water, Grass, Electric, Psychic, Ice, Dragon, Dark, Fairy

## Funcionalidades Avanzadas

### 1. Sprites Renderizados Inteligentemente
- Mostrada solo si están disponibles
- 5 fuentes diferentes de imágenes
- Fallback automático

### 2. Movimientos Agrupados
- Expandibles por método de aprendizaje
- Contadores de movimientos por categoría
- Información de nivel aprendido

### 3. Barras de Estadísticas
- Ancho proporcional al valor
- Gradiente de color (rojo a amarillo)
- Transición animada

### 4. Validación de Búsqueda
- Búsqueda insensible a mayúsculas/minúsculas
- Trim de espacios
- Mensajes de error claros

## Ejemplo de Uso en App.tsx

```tsx
import FetchAPI2 from './lab2/FetchAPI2'

function App() {
  return (
    <div className="App">
      <FetchAPI2 pokemonName="charizard" />
    </div>
  )
}

export default App
```

## Rendimiento

- **Fetch único**: Una sola solicitud por búsqueda
- **Optimizado**: useEffect con dependencia en `currentPokemon`
- **Eficiente**: Componentes funcionales con hooks

## Integración con PokéAPI

La API se consulta en: `https://pokeapi.co/api/v2/pokemon/{nombre}`

Respuesta completa con todos los datos:
- Abilities
- Stats (6 estadísticas base)
- Types
- Moves (cientos para algunos pokémons)
- Sprites (múltiples variantes)
- Game indices
- Y más...

## Notas Importantes

1. **Type-Safety**: Todos los tipos están completamente especificados
2. **Error Handling**: Captura errores de red y pokémons no encontrados
3. **Loading States**: UI responsiva con estados de carga
4. **Responsive Design**: Funciona en móvil y desktop
5. **Accesibilidad**: Semántica HTML correcta

## Dependencias

- React 18+
- TypeScript 4.0+
- PropTypes (para validación de props)

---

**Creado para TC3004B - Laboratorio 2**
Implementación completa de PokéAPI con React + TypeScript
