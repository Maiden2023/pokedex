import { useState } from 'react';
import SearchBar from './SearchBar';
import PokemonCard from './pokemonCard';
import './App.css'; // Importa tu CSS aquí

function SearchPokemon() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      {/* Barra de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* Renderizamos las tarjetas de Pokémon con los resultados */}
      <div className="pokedex-container">
        {searchResults.length > 0 ? (
          searchResults.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
}

export default SearchPokemon;
