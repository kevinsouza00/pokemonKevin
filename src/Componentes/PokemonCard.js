import React from 'react';
import { Link } from 'react-router-dom';
import '../Componentes/PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const { id, name, image } = pokemon;

  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${id}`}>
        <img src={image} alt={name} />
        <h3>{name}</h3>
      </Link>
    </div>
  );
};

export default PokemonCard;
