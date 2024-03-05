import { useEffect, useState } from 'react';
import { Button, TextField, Container, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import supabase from './supabaseClient'

function AsignarCalificacion() {
    const [actividades, setActividades] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [actividadSeleccionada, setActividadSeleccionada] = useState('');
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState('');
    const [calificacion, setCalificacion] = useState('');
  
    // Obtén las actividades y los estudiantes al cargar el componente
    useEffect(() => {
      const obtenerDatos = async () => {
        let { data: actividadesData } = await supabase.from('Actividades').select('*');
        let { data: estudiantesData } = await supabase.from('Usuarios').select('*').eq('rol', 'Estudiante');
        setActividades(actividadesData);
        setEstudiantes(estudiantesData);
      };
      obtenerDatos();
    }, []);
  
    const handleCalificacion = async () => {
      const { error } = await supabase.from('Calificaciones').insert([
        { calificacion: parseFloat(calificacion), id_actividad: actividadSeleccionada, id_estudiante: estudianteSeleccionado }
      ]);
      if (error) {
        console.error('Error insertando la calificación', error);
      } else {
        alert('Calificación asignada con éxito');
      }
    };
  
    return (
      <Container>
        <h1>Asignar Calificación</h1>
        <FormControl fullWidth>
          <InputLabel>Actividad</InputLabel>
          <Select value={actividadSeleccionada} onChange={(e) => setActividadSeleccionada(e.target.value)}>
            {actividades.map((actividad) => (
              <MenuItem key={actividad.id} value={actividad.id}>{actividad.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Estudiante</InputLabel>
          <Select value={estudianteSeleccionado} onChange={(e) => setEstudianteSeleccionado(e.target.value)}>
            {estudiantes.map((estudiante) => (
              <MenuItem key={estudiante.id} value={estudiante.id}>{estudiante.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField type="number" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} label="Calificación" fullWidth />
        <Button onClick={handleCalificacion} variant="contained" color="primary">Asignar Calificación</Button>
      </Container>
    );
  }
  
  export default AsignarCalificacion;
