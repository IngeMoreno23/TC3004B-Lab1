import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/FetchAPI2.css'

// ===================== INTERFACES TYPE-SAFE =====================

interface Ability {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

interface Stat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

interface Type {
  slot: number
  type: {
    name: string
    url: string
  }
}

interface Move {
  move: {
    name: string
    url: string
  }
  version_group_details: Array<{
    level_learned_at: number
    move_learn_method: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
  }>
}

interface Sprites {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
  other?: {
    dream_world?: {
      front_default: string | null
      front_female: string | null
    }
    home?: {
      front_default: string | null
      front_female: string | null
      front_shiny: string | null
      front_shiny_female: string | null
    }
    'official-artwork'?: {
      front_default: string | null
      front_shiny: string | null
    }
  }
}

interface PokemonData {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  abilities: Ability[]
  stats: Stat[]
  types: Type[]
  moves: Move[]
  sprites: Sprites
  game_indices: Array<{
    game_index: number
    version: {
      name: string
      url: string
    }
  }>
}

// ===================== COMPONENTE PRINCIPAL =====================

function FetchAPI2({ pokemonName = 'ditto' }: { pokemonName?: string }) {
  const [currentPokemon, setCurrentPokemon] = useState<string>(pokemonName.toLowerCase())
  const [searchInput, setSearchInput] = useState<string>(pokemonName.toLowerCase())
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const API_BASE = 'https://pokeapi.co/api/v2/pokemon/'

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE}${currentPokemon}`)
        if (!response.ok) {
          throw new Error(`Pokemon no encontrado: ${currentPokemon}`)
        }
        const data: PokemonData = await response.json()
        setPokemonData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al obtener datos')
        setPokemonData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonData()
  }, [currentPokemon])

  // Handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setCurrentPokemon(searchInput.toLowerCase())
    }
  }

  // Render functions
  const renderSprites = () => {
    if (!pokemonData?.sprites) return null

    const sprites = pokemonData.sprites
    const images = [
      { src: sprites.front_default, label: 'Front' },
      { src: sprites.back_default, label: 'Back' },
      { src: sprites.front_shiny, label: 'Front Shiny' },
      { src: sprites.back_shiny, label: 'Back Shiny' },
      { src: sprites.other?.['official-artwork']?.front_default, label: 'Official Art' },
    ]

    return (
      <div className="sprites-container">
        <h3>Sprites</h3>
        <div className="sprites-grid">
          {images.map((image, index) => (
            image.src && (
              <div key={index} className="sprite-item">
                <img src={image.src} alt={`${pokemonData.name} - ${image.label}`} />
                <p>{image.label}</p>
              </div>
            )
          ))}
        </div>
      </div>
    )
  }

  const renderStats = () => {
    if (!pokemonData?.stats) return null

    return (
      <div className="stats-container">
        <h3>Base Stats</h3>
        <div className="stats-list">
          {pokemonData.stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-name">{stat.stat.name.toUpperCase()}</span>
              <div className="stat-bar">
                <div
                  className="stat-value"
                  style={{ width: `${(stat.base_stat / 200) * 100}%` }}
                >
                  {stat.base_stat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderMoves = () => {
    if (!pokemonData?.moves || pokemonData.moves.length === 0) return null

    // Agrupar movimientos por método de aprendizaje
    const movesByMethod: Record<string, Move[]> = {}

    pokemonData.moves.forEach((move) => {
      const method = move.version_group_details[0]?.move_learn_method?.name || 'unknown'
      if (!movesByMethod[method]) {
        movesByMethod[method] = []
      }
      movesByMethod[method].push(move)
    })

    return (
      <div className="moves-container">
        <h3>Movimientos ({pokemonData.moves.length})</h3>
        <div className="moves-tabs">
          {Object.entries(movesByMethod).map(([method, moves], methodIndex) => (
            <details key={methodIndex} className="move-method">
              <summary>
                {method} ({moves.length} movimientos)
              </summary>
              <ul className="moves-list">
                {moves.map((move, moveIndex) => {
                  const levelLearned = move.version_group_details[0]?.level_learned_at || 0
                  return (
                    <li key={moveIndex} className="move-item">
                      <span className="move-name">{move.move.name}</span>
                      {levelLearned > 0 && <span className="move-level">Lvl {levelLearned}</span>}
                    </li>
                  )
                })}
              </ul>
            </details>
          ))}
        </div>
      </div>
    )
  }

  const renderAbilities = () => {
    if (!pokemonData?.abilities) return null

    return (
      <div className="abilities-container">
        <h3>Habilidades</h3>
        <ul className="abilities-list">
          {pokemonData.abilities.map((ability, index) => (
            <li key={index} className={ability.is_hidden ? 'hidden-ability' : ''}>
              <span className="ability-name">{ability.ability.name}</span>
              {ability.is_hidden && <span className="hidden-badge">Hidden</span>}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const renderTypes = () => {
    if (!pokemonData?.types) return null

    return (
      <div className="types-container">
        <h3>Tipos</h3>
        <div className="types-list">
          {pokemonData.types.map((type, index) => (
            <span key={index} className={`type-badge type-${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // Render main
  return (
    <div className="fetch-api-container">
      <h1>Pokémon Explorer</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Buscar pokémon por nombre..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      {/* Loading State */}
      {loading && <div className="loading">Cargando pokémon...</div>}

      {/* Error State */}
      {error && <div className="error-message">❌ {error}</div>}

      {/* Pokemon Data */}
      {pokemonData && !loading && (
        <div className="pokemon-data">
          <div className="pokemon-header">
            <h2>#{pokemonData.id} - {pokemonData.name.toUpperCase()}</h2>
            <div className="pokemon-info">
              <p>
                <strong>Altura:</strong> {(pokemonData.height / 10).toFixed(1)} m
              </p>
              <p>
                <strong>Peso:</strong> {(pokemonData.weight / 10).toFixed(1)} kg
              </p>
              <p>
                <strong>Experiencia Base:</strong> {pokemonData.base_experience}
              </p>
            </div>
          </div>

          {renderTypes()}
          {renderSprites()}
          {renderStats()}
          {renderAbilities()}
          {renderMoves()}
        </div>
      )}
    </div>
  )
}

FetchAPI2.propTypes = {
  pokemonName: PropTypes.string,
}

export default FetchAPI2
