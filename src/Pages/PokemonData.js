import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PokemonData.css';

const PokemonData = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`
        );
        const data = response.data.results;
        setPokemonList(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemonList();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    async function fetchTotalPokemonCount() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const totalCount = response.data.count;
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      } catch (error) {
        console.log(error);
      }
    }

    fetchTotalPokemonCount();
  }, [itemsPerPage]);

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

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    const maxPageRange = totalPages > maxPageButtons ? maxPageButtons : totalPages;

    if (currentPage <= Math.ceil(maxPageRange / 2)) {
      
      for (let i = 1; i <= maxPageRange; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage >= totalPages - Math.floor(maxPageRange / 2)) {
      
      for (let i = totalPages - maxPageRange + 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      
      const startPage = currentPage - Math.floor(maxPageRange / 2);
      const endPage = currentPage + Math.floor(maxPageRange / 2);
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

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
            <Link to={`/pokemon/${pokemon.name}`}>Detalhes</Link>
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

      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={handlePreviousPage}>
          Anterior
        </button>
        {getPageNumbers().map((number) => (
          <button
            key={number}
            className={number === currentPage ? 'active' : ''}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </button>
        ))}
        <button disabled={currentPage >= totalPages} onClick={handleNextPage}>
          Proximo
        </button>
      </div>
    </div>
  );
};

export default PokemonData;
