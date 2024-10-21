import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrudHabilidad = () => {
    const [habilidades, setHabilidades] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchHabilidades();
    }, []);

    // Función para obtener la lista de habilidades
    const fetchHabilidades = async () => {
        try {
            const response = await axios.get('http://localhost:3000/habilidades');
            setHabilidades(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de habilidades:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/EditarHabilidad/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/habilidades/${id}`);
            fetchHabilidades(); // Actualizar la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar la habilidad:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>CRUD de Habilidades de Pokémon</h2>

            {habilidades.length > 0 ? (
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habilidades.map((habilidad) => (
                            <tr key={habilidad.id}>
                                <td>{habilidad.id}</td>
                                <td>{habilidad.nombre}</td>
                                <td>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => handleEdit(habilidad.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(habilidad.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay habilidades disponibles.</p>
            )}
        </div>
    );
};

export default CrudHabilidad;

