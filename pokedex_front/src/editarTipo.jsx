import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditarTipo = () => {
  const { id } = useParams(); // Obtener el ID del tipo desde la URL
    const navigate = useNavigate();
    const [tipo, setTipo] = useState({
        nombre: ''
    });

    useEffect(() => {
        // Obtener los datos del tipo al cargar el componente
        const fetchTipo = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/tipos/${id}`);
            setTipo(response.data);
        } catch (error) {
            console.error('Error al cargar los datos del tipo:', error);
        }
        };

        fetchTipo();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTipo({ ...tipo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Actualizar el tipo en el backend
            const response = await axios.put(`http://localhost:3000/tipos/${id}`, { nombre: tipo.nombre });
            console.log('Tipo actualizado:', response.data);
            // Redirigir al listado de tipos después de la actualización
            navigate('/crudTipo');
        } catch (error) {
            console.error('Error al actualizar el tipo:', error);
        }
    };

    return (
        <div className="container mt-5 p-4" style={{ maxWidth: '600px', backgroundColor: '#222', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)' }}>
        <h3 className="text-center text-white mb-4">Editar Tipo Pokémon</h3>

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

            <button type="submit" className="btn btn-primary w-100">
            Guardar Cambios
            </button>
        </form>
        </div>
    );
};

export default EditarTipo;
