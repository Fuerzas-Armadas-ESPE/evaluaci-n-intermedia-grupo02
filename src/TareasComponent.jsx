import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import supabase from './supabaseClient';

function TareasComponent() {
    const [tareas, setTareas] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('');
    const [id_tema, setIdTema] = useState('');
  
    // Obtén las tareas al cargar el componente
    useEffect(() => {
      const obtenerTareas = async () => {
        let { data: tareasData } = await supabase.from('Tareas').select('*');
        setTareas(tareasData);
      };
      obtenerTareas();
    }, []);
  
    const handleCrearTarea = async () => {
      const { error } = await supabase.from('Tareas').insert([
        { nombre, descripcion, estado, id_tema },
      ]);
      if (error) {
        console.error('Error al crear la tarea:', error.message);
      } else {
        alert('Tarea creada con éxito');
      }
    };
  
    const handleActualizarTarea = async (id) => {
      const { error } = await supabase.from('Tareas').update({ estado }).eq('id', id);
      if (error) {
        console.error('Error al actualizar la tarea:', error.message);
      } else {
        alert('Tarea actualizada con éxito');
      }
    };
  
    const handleEliminarTarea = async (id) => {
      const { error } = await supabase.from('Tareas').delete().eq('id', id);
      if (error) {
        console.error('Error al eliminar la tarea:', error.message);
      } else {
        alert('Tarea eliminada con éxito');
      }
    };
  
    return (
      <Container>
        <h1>Gestión de Tareas</h1>
        <TextField value={nombre} onChange={(e) => setNombre(e.target.value)} label="Nombre" fullWidth />
        <TextField value={descripcion} onChange={(e) => setDescripcion(e.target.value)} label="Descripción" fullWidth />
        <TextField value={estado} onChange={(e) => setEstado(e.target.value)} label="Estado" fullWidth />
        <TextField value={id_tema} onChange={(e) => setIdTema(e.target.value)} label="ID del Tema" fullWidth />
        <Button onClick={handleCrearTarea} variant="contained" color="primary">Crear Tarea</Button>
        {tareas.map((tarea) => (
          <Box key={tarea.id}>
            <h2>{tarea.nombre}</h2>
            <p>{tarea.descripcion}</p>
            <p>{tarea.estado}</p>
            <Button onClick={() => handleActualizarTarea(tarea.id)} variant="contained" color="primary">Actualizar Estado</Button>
            <Button onClick={() => handleEliminarTarea(tarea.id)} variant="contained" color="primary">Eliminar Tarea</Button>
          </Box>
        ))}
      </Container>
    );
  }
  
  export default TareasComponent;
  