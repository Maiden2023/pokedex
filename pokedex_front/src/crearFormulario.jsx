import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // Importamos axios
import 'bootstrap/dist/css/bootstrap.min.css';

const PokemonForm = ({ initialData = {}, onSubmit }) => {
  const [pokemon, setPokemon] = useState({
    id: initialData.id || '',
    nombre: initialData.nombre || '',
    nroPokedex: initialData.nroPokedex || '',
    idHabilidad1: initialData.idHabilidad1 || '',
    idHabilidad2: initialData.idHabilidad2 || '',
    idHabilidad3: initialData.idHabilidad3 || '',
    idTipo1: initialData.idTipo1 || '',
    idTipo2: initialData.idTipo2 || '',
    descripcion: initialData.descripcion || '',
    hp: initialData.hp || '',
    attack: initialData.attack || '',
    defense: initialData.defense || '',
    spattack: initialData.spattack || '',
    spdefense: initialData.spdefense || '',
    speed: initialData.speed || '',
    nivelEvolucion: initialData.nivelEvolucion || '',
    idEvPrevia: initialData.idEvPrevia || '',
    idEvSiguiente: initialData.idEvSiguiente || '',
    imagen: null // Inicializamos la imagen como null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokemon({ ...pokemon, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPokemon({ ...pokemon, imagen: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData para incluir la imagen y demás datos
    const formData = new FormData();
    for (const key in pokemon) {
      formData.append(key, pokemon[key]);
    }

    try {
      // Realizamos la solicitud POST con axios
      const response = await axios.post('http://localhost:3000/pokemons', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Pokemon creado:', response.data);
      onSubmit(response.data); // Puedes usar esta función para hacer algo después de enviar
    } catch (error) {
      console.error('Error creando el Pokémon:', error);
    }
  };

  const tipos = [
    { value: '1', label: 'Acero' },
    { value: '2', label: 'Bicho' },
    { value: '3', label: 'Dragón' },
    { value: '4', label: 'Eléctrico' },
    { value: '5', label: 'Fantasma' },
    { value: '6', label: 'Fuego' },
    { value: '7', label: 'Hada' },
    { value: '8', label: 'Hielo' },
    { value: '9', label: 'Lucha' },
    { value: '10', label: 'Normal' },
    { value: '11', label: 'Planta' },
    { value: '12', label: 'Psíquico' },
    { value: '13', label: 'Roca' },
    { value: '14', label: 'Siniestro' },
    { value: '15', label: 'Tierra' },
    { value: '16', label: 'Volador' },
    { value: '17', label: 'Agua' },
  ];

  return (
    <div className="container mt-5 p-4" style={{ maxWidth: '600px', backgroundColor: '#222', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)' }}>
      <h3 className="text-center text-white mb-4">
        {initialData.id ? 'Editar Pokémon' : 'Crear Pokémon'}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-white">Nombre</label>
          <input
            type="text"
            className="form-control form-control-lg"
            name="nombre"
            value={pokemon.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Número Pokedex</label>
          <input
            type="number"
            className="form-control form-control-lg"
            name="nroPokedex"
            value={pokemon.nroPokedex}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Tipo 1</label>
          <select
            className="form-select form-select-lg"
            name="idTipo1"
            value={pokemon.idTipo1}
            onChange={handleChange}
            required
          >
            {tipos.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Tipo 2 (opcional)</label>
          <select
            className="form-select form-select-lg"
            name="idTipo2"
            value={pokemon.idTipo2}
            onChange={handleChange}
          >
            {tipos.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Habilidad 1</label>
          <input
            type="text"
            className="form-control form-control-lg"
            name="idHabilidad1"
            value={pokemon.idHabilidad1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Habilidad 2</label>
          <input
            type="text"
            className="form-control form-control-lg"
            name="idHabilidad2"
            value={pokemon.idHabilidad2}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">HP</label>
          <input
            type="number"
            className="form-control form-control-lg"
            name="hp"
            value={pokemon.hp}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Ataque</label>
          <input
            type="number"
            className="form-control form-control-lg"
            name="attack"
            value={pokemon.attack}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Defensa</label>
          <input
            type="number"
            className="form-control form-control-lg"
            name="defense"
            value={pokemon.defense}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Ataque Especial</label>
          <input
            type="number"
            className="form-control form-control-lg"
            name="spattack"
            value={pokemon.spattack}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Defensa Especial</label>
          <input
            type="number"
            className="form-control form-control-lg"
            name="spdefense"
            value={pokemon.spdefense}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Velocidad</label>
          <input
            type="number"
            className="form-control form-control-lg"
            name="speed"
            value={pokemon.speed}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Nivel de Evolución</label>
          <input
            type="number"
            className="form-control form-control-lg"
            name="nivelEvolucion"
            value={pokemon.nivelEvolucion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Evolución Previa</label>
          <input
            type="text"
            className="form-control form-control-lg"
            name="idEvPrevia"
            value={pokemon.idEvPrevia}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Evolución Siguiente</label>
          <input
            type="text"
            className="form-control form-control-lg"
            name="idEvSiguiente"
            value={pokemon.idEvSiguiente}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-white">Descripción</label>
          <textarea
            className="form-control form-control-lg"
            name="descripcion"
            value={pokemon.descripcion}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Imagen del Pokémon</label>
          <input
            type="file"
            className="form-control"
            name="imagen"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 btn-lg">
          {initialData.id ? 'Guardar cambios' : 'Crear Pokémon'}
        </button>
      </form>
    </div>
  );
};

PokemonForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default PokemonForm;
