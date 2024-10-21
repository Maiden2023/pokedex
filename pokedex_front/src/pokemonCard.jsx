import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import PropTypes from 'prop-types';  // <--- Importar PropTypes

function PokemonCard({ pokemon }) {
  return (
    <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardMedia
        component="img"
        height="140"
        image={pokemon.image || 'https://via.placeholder.com/150'} // Si no hay imagen
        alt={pokemon.nombre}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          N° Pokédex: {pokemon.nroPokedex}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          HP: {pokemon.hp} | Attack: {pokemon.attack} | Defense: {pokemon.defense}
        </Typography>
        {/* Muestra más atributos si es necesario */}
      </CardContent>
    </Card>
  );
}

// Validación de las propiedades con PropTypes
PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.string.isRequired,  // El id es requerido
    nombre: PropTypes.string.isRequired,  // nombre es requerido
    image: PropTypes.string,  // image es opcional
    nroPokedex: PropTypes.string.isRequired,  // nroPokedex es requerido
    hp: PropTypes.number.isRequired,  // hp es requerido
    attack: PropTypes.number.isRequired,  // attack es requerido
    defense: PropTypes.number.isRequired,  // defense es requerido
  }).isRequired,  // pokemon debe ser un objeto y es requerido
};

export default PokemonCard;
