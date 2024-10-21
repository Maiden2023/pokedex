import PokemonForm from './crearFormulario';
import { useNavigate } from 'react-router-dom';

function Crear() {
  const navigate = useNavigate();

  const handleCreate = (newPokemonData) => {
    console.log('Nuevo Pokémon creado:', newPokemonData);
    navigate('/pokedex');
  };

  return <PokemonForm onSubmit={handleCreate} />;
}

export default Crear;
