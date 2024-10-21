import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditarHabilidad = () => {
    const { id } = useParams(); // Obtener el ID de la habilidad desde la URL
    const navigate = useNavigate();
    const [habilidad, setHabilidad] = useState({
        nombre: ''
    });

    useEffect(() => {
        // Obtener los datos de la habilidad al cargar el componente
        const fetchHabilidad = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/habilidades/${id}`);
                setHabilidad(response.data);
            } catch (error) {
                console.error('Error al cargar los datos de la habilidad:', error);
            }
        };

        fetchHabilidad();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabilidad({ ...habilidad, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Actualizar la habilidad en el backend
            const response = await axios.put(`http://localhost:3000/habilidades/${id}`, { nombre: habilidad.nombre });
            console.log('Habilidad actualizada:', response.data);
            // Redirigir al listado de habilidades después de la actualización
            navigate('/crudHabilidad');
        } catch (error) {
            console.error('Error al actualizar la habilidad:', error);
        }
    };

    return (
        <div className="container mt-5 p-4" style={{ maxWidth: '600px', backgroundColor: '#222', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)' }}>
            <h3 className="text-center text-white mb-4">Editar Habilidad Pokémon</h3>

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

                <button type="submit" className="btn btn-primary w-100">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditarHabilidad;
