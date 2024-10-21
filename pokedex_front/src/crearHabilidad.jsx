import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearHabilidad = () => {
    const [habilidad, setHabilidad] = useState({
        nombre: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabilidad({ ...habilidad, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        // Enviar la nueva habilidad al backend
        const response = await axios.post('http://localhost:3000/habilidades', habilidad);
        console.log('Habilidad creada:', response.data);
        // Redirigir al listado de habilidades después de crear
        navigate('/crudHabilidad');
        } catch (error) {
        console.error('Error al crear la habilidad:', error);
        }
    };

    return (
        <div className="container mt-5 p-4" style={{ maxWidth: '600px', backgroundColor: '#222', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)' }}>
        <h3 className="text-center text-white mb-4">Crear Nueva Habilidad Pokémon</h3>

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label text-white">Nombre de la Habilidad</label>
            <input
                type="text"
                className="form-control"
                name="nombre"
                value={habilidad.nombre}
                onChange={handleChange}
                required
            />
            </div>

            <button type="submit" className="btn btn-success w-100">
            Crear Habilidad
            </button>
        </form>
        </div>
    );
};

export default CrearHabilidad;
