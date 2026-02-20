import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

interface Pokemon {
    abilities: {
        ability: {
            name: string,
            url: string
        },
        is_hidden: boolean,
        slot: number
    }[],
    sprites: {
        front_default: string
    },
    weight: number,
    height: number

}
function FetchAPI({ pokemonName = "ditto" }: { pokemonName: string }) {
    const [pokemon, setPokemon] = useState<String>(pokemonName)
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null)

    const api = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    useEffect(() => {
        fetch(api)
            .then(response => response.json())
            .then(data => setPokemonData(data))
            .catch(error => console.error('Error fetching data:', error))
    }, [pokemon])


    return (
        <div>
            <h1>Fetch API</h1>
            {pokemonData && (
                <div>
                    <h2>{pokemonName.toUpperCase()}</h2>
                    <img src={pokemonData.sprites.front_default} alt={pokemonName} />
                    <p>Weight: {pokemonData.weight}</p>
                    <p>Height: {pokemonData.height}</p>
                    <h3>Abilities:</h3>
                    <ul>
                        {pokemonData.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

FetchAPI.propTypes = {
    nameString: PropTypes.string.isRequired
}

export default FetchAPI