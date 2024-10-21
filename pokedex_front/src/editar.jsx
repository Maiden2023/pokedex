//import React from 'react';
import PokemonFormEdit from './editarFormulario';

function editarPokemon() {
    const handleCreate = (newPokemonData) => {
        console.log('Nuevo Pokémon editado :', newPokemonData);
        // Aquí puedes enviar los datos a la API o al servidor
    };

    return (
        <PokemonFormEdit onSubmit={handleCreate} />
    );
}

export default editarPokemon;
