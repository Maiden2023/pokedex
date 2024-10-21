import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearTipo = () => {
    const [tipo, setTipo] = useState({
        nombre: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTipo({ ...tipo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        // Enviar el nuevo tipo al backend
        const response = await axios.post('http://localhost:3000/tipos', tipo);
        console.log('Tipo creado:', response.data);
        // Redirigir al listado de tipos después de crear
        navigate('/crudTipo');
        } catch (error) {
        console.error('Error al crear el tipo:', error);
        }
    };

    return (
        <div className="container mt-5 p-4" style={{ maxWidth: '600px', backgroundColor: '#222', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)' }}>
        <h3 className="text-center text-white mb-4">Crear Nuevo Tipo de Pokémon</h3>

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label text-white">Nombre del Tipo</label>
            <input
                type="text"
                className="form-control"
                name="nombre"
                value={tipo.nombre}
                onChange={handleChange}
                required
            />
            </div>

            <button type="submit" className="btn btn-success w-100">
            Crear Tipo
            </button>
        </form>
        </div>
    );
};

export default CrearTipo;
