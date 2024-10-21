import { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TravelExplore } from '@mui/icons-material';
import axios from 'axios';
import PropTypes from 'prop-types'; // Importamos PropTypes
import './App.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;
    try {
      const response = await axios.get(`http://localhost:3000/pokemons/search?q=${searchTerm}`);
      onSearch(response.data); // Pasamos los resultados al componente padre
    } catch (error) {
      console.error('Error al buscar Pokémon:', error);
    }
  };

  return (
    <div className="search-bar-container">
      <TextField
        variant="outlined"
        placeholder="Buscar por nombre o número"
        value={searchTerm}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          className: 'search-bar-input'
        }}
      />
      <Button
        variant="contained"
        startIcon={<TravelExplore />}
        className="search-bar-button"
        onClick={handleSearch}
      >
        Buscar
      </Button>
    </div>
  );
}

// Validación de las propiedades con PropTypes
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // 'onSearch' es requerido y debe ser una función
};

export default SearchBar;
