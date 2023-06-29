import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = response.data;
        setPokemon(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemonDetails();
  }, [name]);

  if (!pokemon) {
    return <div>Carregando...</div>;
  }

  const handleGoBack = () => {
    window.history.back(); // Voltar para a página anterior
  };

  return (
    <div style={{ backgroundColor: "#e6e6fa", textAlign: "center" }}>
      <h2>{pokemon.name}</h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
        style={{ width: "200px", height: "200px", margin: "auto" }}
      />
      <p>
        <strong>Height:</strong> {pokemon.height}
      </p>
      <p>
        <strong>Weight:</strong> {pokemon.weight}
      </p>
      <p>
        <strong>Abilities:</strong>
      </p>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <button onClick={handleGoBack}>Voltar</button>
    </div>
  );
};

export default PokemonDetails;
