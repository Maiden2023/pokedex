import  { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios'; // Importamos axios
import './Pokedex.css'; // Estilos de la Pokédex
import { useNavigate } from 'react-router-dom'; // Para navegación

function Pokedex() {
  const [pokemonData, setPokemonData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar lista de Pokémon desde la API
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pokemons'); // Reemplaza por la URL correcta
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error al obtener los Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/pokemons/${id}`);
      setPokemonData(pokemonData.filter(pokemon => pokemon.id !== id));
    } catch (error) {
      console.error('Error al eliminar el Pokémon:', error);
    }
  };

  return (
    <div className="pokedex-container">
      {pokemonData.map((pokemon) => (
        <Card key={pokemon.id} className="pokemon-card">
          <CardMedia
            component="img"
            image={pokemon.imageUrl ? `http://localhost:3000${pokemon.imageUrl}` : 'https://via.placeholder.com/150'}
            alt={pokemon.nombre}
            className="pokemon-image"
          />
          <CardContent>
            <Typography variant="caption" className="pokemon-id">#{pokemon.nroPokedex}</Typography>
            <Typography variant="h6" component="div">
              {pokemon.nombre}
            </Typography>
            <Box className="pokemon-type"></Box>
            <Button
              variant="contained"
              color="primary"
              className="pokemon-button"
              onClick={() => navigate(`/detalles/${pokemon.id}`)}
            >
              Ver detalles
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="pokemon-button"
              onClick={() => handleDelete(pokemon.id)}
            >
              Eliminar
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="pokemon-button"
              onClick={() => navigate(`/editar/${pokemon.id}`)} // Navega a la ruta de edición
            >
              Editar
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Pokedex;
