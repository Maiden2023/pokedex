import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CatchingPokemon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Crear from './crear';
import Pokedex from './Pokedex';
import SearchBar from './SearchBar';
import Editar from './editarFormulario';
import DetallesPokemon from './DetallesPokemon';
import CrudTipo from './crudTipo';
import CrudHabilidad from './crudHabilidad';
import CrearTipo from './crearTipo';
import CrearHabilidad from './crearHabilidad';
import EditarHabilidad from './editarHabilidad';
import EditarTipo from './editarTipo';


function App() {
  return (
    <Router>
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-around', backgroundColor: '#222' }}>
          <NavButton icon={<CatchingPokemon />} label="Busca tu Pokémon" link="/" />
          <NavButton icon={<CatchingPokemon />} label="Pokédex" link="/pokedex" />
          <NavButton icon={<CatchingPokemon />} label="Crear un Pokémon" link="/crear" />
          <NavButton icon={<CatchingPokemon />} label="Crud Tipo Pokemon" link="/CrudTipo" />
          <NavButton icon={<CatchingPokemon />} label="Crud Habilidad Pokemon" link="/CrudHabilidad" />
        </Toolbar>
      </AppBar>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/editar/:id" element={<Editar />} />
        <Route path="/detalles/:id" element={<DetallesPokemon />} />
        <Route path="/CrudTipo" element={<CrudTipo/>} />
        <Route path="/CrudHabilidad" element={<CrudHabilidad />} />
        <Route path="/CrearTipo" element={<CrearTipo/>} />
        <Route path="/CrearHabilidad" element={<CrearHabilidad/>} />
        <Route path="/EditarTipo/:id" element={<EditarTipo/>} />
        <Route path="/EditarHabilidad/:id" element={<EditarHabilidad/>} />
      </Routes>
    </Router>
  );
}

// Componente de la página de inicio
function Home({ onSearch }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1 style={{ color: 'white' }}>Bienvenidos al pokedex de Analia</h1>
      <p style={{ color: 'white' }}>Selecciona una opción en el menú o usa la barra de búsqueda.</p>
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

// Botón de navegación
function NavButton({ icon, label, link }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <IconButton color="inherit" size="large" component={Link} to={link}>
        {icon}
      </IconButton>
      <Typography variant="caption">{label}</Typography>
    </Box>
  );
}

// Validación de PropTypes
NavButton.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

Home.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default App;
