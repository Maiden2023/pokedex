import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Typography,
    Card,
    CardMedia,
    LinearProgress,
    } from '@mui/material';
    import './DetallesPokemon.css'; // Importamos los estilos

    function DetallesPokemon() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate(); // Asegúrate de usarlo

    useEffect(() => {
        const fetchPokemonDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pokemons/${id}`);
            setPokemon(response.data);
        } catch (error) {
            console.error('Error al obtener los detalles del Pokémon:', error);
        }
        };

        fetchPokemonDetails();
    }, [id]);

    if (!pokemon) {
        return <div>Cargando detalles del Pokémon...</div>;
    }

    // Función para navegar a los detalles del Pokémon de una evolución
    const handleNavigateToEvolution = (evolutionId) => {
        navigate(`/detalles/${evolutionId}`);
    };

    // Función para calcular los stats máximos y mínimos
    const calculateStats = (baseStat, level, isHp = false) => {
        const IV = 31; // Valores Individuales máximos
        const EV = 252; // Puntos de esfuerzo máximos
        if (isHp) {
        return Math.floor(((2 * baseStat + IV + Math.floor(EV / 4)) * level) / 100 + level + 10);
        }
        return Math.floor(((2 * baseStat + IV + Math.floor(EV / 4)) * level) / 100 + 5);
    };

    // Generamos las barras de estadísticas
    const renderStatBar = (statName, baseStat, isHp = false) => {
        const statMin = calculateStats(baseStat, 1, isHp); // Al nivel 1
        const statMax = calculateStats(baseStat, 100, isHp); // Al nivel 100
        const statValue = baseStat;
        const statPercentage = (baseStat / 255) * 100; // Asumiendo que 255 es el valor máximo posible

        return (
        <Box key={statName} className="stat-row">
            <Typography variant="body1" className="stat-name">
            {statName}
            </Typography>
            <Typography variant="body1" className="stat-value">
            {statValue}
            </Typography>
            <LinearProgress
            variant="determinate"
            value={statPercentage}
            className="stat-bar"
            />
            <Typography variant="body1" className="stat-min">
            {statMin} (min)
            </Typography>
            <Typography variant="body1" className="stat-max">
            {statMax} (max)
            </Typography>
        </Box>
        );
    };

    // Calculamos el total de estadísticas base
    const totalBaseStats =
        pokemon.hp +
        pokemon.attack +
        pokemon.defense +
        pokemon.spattack +
        pokemon.spdefense +
        pokemon.speed;

    return (
        <div className="pokemon-details">
        {/* Información del Pokémon */}
        <Box className="pokemon-info">
            <CardMedia
            component="img"
            image={pokemon.imageUrl ? `http://localhost:3000${pokemon.imageUrl}` : 'https://via.placeholder.com/150'}
            alt={pokemon.nombre}
            className="pokemon-image"
            />

            <Box className="pokemon-data">
            <Typography variant="h3">{pokemon.nombre}</Typography>
            <Typography variant="body1">Nº Pokedex: {pokemon.nroPokedex}</Typography>
            <br />
            <Typography variant="body1">Descripción: {pokemon.DetallesPokemon}</Typography>
            <br />
            <Typography variant="body1">Tipo 1: {pokemon.tipo1?.nombre}</Typography>
            {pokemon.tipo2 && (
                <Typography variant="body1">Tipo 2: {pokemon.tipo2?.nombre}</Typography>
            )}
            <Typography variant="body1">
                Habilidad 1: {pokemon.habilidad1?.nombre}
            </Typography>
            {pokemon.habilidad2 && (
                <Typography variant="body1">
                Habilidad 2: {pokemon.habilidad2?.nombre}
                </Typography>
            )}
            {pokemon.habilidad3 && (
                <Typography variant="body1">
                Habilidad Oculta: {pokemon.habilidad3?.nombre}
                </Typography>
            )}
            <Typography variant="body1">
                Nivel de Evolución: {pokemon.nivelEvolucion}
            </Typography>
            </Box>
        </Box>
        {/* Estadísticas */}
        <Box className="stats-container">
            <Typography variant="h4">Estadísticas Base</Typography>
            <Box className="stats-table">
            {renderStatBar('HP', pokemon.hp, true)}
            {renderStatBar('Ataque', pokemon.attack)}
            {renderStatBar('Defensa', pokemon.defense)}
            {renderStatBar('Ataque Esp.', pokemon.spattack)}
            {renderStatBar('Defensa Esp.', pokemon.spdefense)}
            {renderStatBar('Velocidad', pokemon.speed)}
            <Box className="stat-row total">
                <Typography variant="body1" className="stat-name">
                Total
                </Typography>
                <Typography variant="body1" className="stat-value">
                {totalBaseStats}
                </Typography>
            </Box>
            </Box>
        </Box>
        <Box className="evolutions-container">
            <Typography variant="h4">Evoluciones</Typography>
            <Box className="evolutions">
            {/* Evolución previa */}
            {pokemon.idEvPrevia && (
                <Card
                className="evolution-card"
                onClick={() => handleNavigateToEvolution(pokemon.idEvPrevia)}
                >
                <Typography variant="body1">Evolución Previa</Typography>
                <CardMedia
                    component="img"
                    image={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.idEvPrevia}.png`}
                    alt="Evolución Previa"
                    className="evolution-image"
                />
                </Card>
            )}

            <Card className="evolution-card current">
                <Typography variant="body1">Actual</Typography>
                <CardMedia
                component="img"
                image={pokemon.imageUrl ? `http://localhost:3000${pokemon.imageUrl}` : 'https://via.placeholder.com/150'}
                alt={pokemon.nombre}
                className="evolution-image"
                />
            </Card>

            {pokemon.idEvSiguiente && (
                <Card
                className="evolution-card"
                onClick={() => handleNavigateToEvolution(pokemon.idEvSiguiente)}
                >
                <Typography variant="body1">Evolución Siguiente</Typography>
                <CardMedia
                    component="img"
                    image={pokemon.imageUrl ? `http://localhost:3000${pokemon.imageUrl}` : 'https://via.placeholder.com/150'}
                    alt="Evolución Siguiente"
                    className="evolution-image"
                />
                </Card>
            )}
            </Box>
        </Box>
        </div>
    );
    }

    export default DetallesPokemon;
