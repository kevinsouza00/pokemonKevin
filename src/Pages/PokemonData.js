import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PokemonData.css';

const PokemonData = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = response.data.results;
        setPokemonList(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemonList();
  }, []);

  const fetchPokemonDetails = async (pokemon) => {
    try {
      const response = await axios.get(pokemon.url);
      const data = response.data;
      setSelectedPokemon(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePokemonClick = (pokemon) => {
    fetchPokemonDetails(pokemon);
  };

  useEffect(() => {
    async function fetchPokemonSpecies() {
      try {
        if (selectedPokemon) {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.name}`);
          const data = response.data;
          setSelectedPokemon((prevSelectedPokemon) => ({ ...prevSelectedPokemon, species: data }));
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemonSpecies();
  }, [selectedPokemon]);

  return (
    <div className="pokemon-data-container" style={{ backgroundColor: 'lightblue' }}>
      <div className="pokemon-list-container">
        {pokemonList.map((pokemon) => (
          <div
            className={`pokemon-item ${selectedPokemon === pokemon ? 'active' : ''}`}
            key={pokemon.name}
            onClick={() => handlePokemonClick(pokemon)}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
              alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
            <Link to={`/pokemon/${pokemon.name}`}>Ver detalhes</Link>
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <div className="pokemon-details">
          <h3>{selectedPokemon.name}</h3>
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          <p>Abilities:</p>
          <ul>
            {selectedPokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
          {selectedPokemon.species && (
            <div>
              <h4>Species:</h4>
              <p>{selectedPokemon.species.name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonData;
