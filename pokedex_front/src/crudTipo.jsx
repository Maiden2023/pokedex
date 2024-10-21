import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrudTipo = () => {
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shouldFetch, setShouldFetch] = useState(true); // Añadir estado para manejar la recarga
    const navigate = useNavigate();

    useEffect(() => {
        if (shouldFetch) {
            fetchTipos(); // Cargar los tipos de Pokémon
            setShouldFetch(false); // Evitar múltiples llamadas consecutivas
        }
    }, [shouldFetch]);

    // Función para obtener la lista de tipos
    const fetchTipos = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/tipos');
            setTipos(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener la lista de tipos:', error);
            setLoading(false);
        }
    };
    // Función para eliminar un tipo
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/tipos/${id}`);
            fetchTipos(); // Actualizar la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar el tipo:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/EditarTipo/${id}`);
        setShouldFetch(true); // Forzar la recarga de los datos al volver
    };

    const handleCreate = () => {
        navigate(`/crearTipo`);
        setShouldFetch(true); // Forzar la recarga de los datos al volver
    };

    return (
        <div className="container mt-5">
        <h2>CRUD de Tipo Pokémon</h2>

        <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-success" onClick={handleCreate}>
            Crear Tipo
            </button>
        </div>

        {loading ? (
            <p>Cargando tipos...</p>
        ) : tipos.length > 0 ? (
            <table className="table table-striped mt-4">
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tipos.map((tipo) => (
                <tr key={tipo.id}>
                    <td>{tipo.id}</td>
                    <td>{tipo.nombre}</td>
                    <td>
                    <button
                        className="btn btn-warning me-2"
                        onClick={() => handleEdit(tipo.id)}
                    >
                        Editar
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(tipo.id)}
                    >
                        Eliminar
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        ) : (
            <p>No hay tipos disponibles.</p>
        )}
        </div>
    );
};

export default CrudTipo;
