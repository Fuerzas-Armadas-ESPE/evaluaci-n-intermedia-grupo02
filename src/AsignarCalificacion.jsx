import { useEffect, useState } from 'react';
import { Button, TextField, Container, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import supabase from './supabaseClient'

function AsignarCalificacion() {
    const [actividades, setActividades] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [actividadSeleccionada, setActividadSeleccionada] = useState('');
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [message, setMessage] = useState('');
  
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
        setMessage('Error insertando la calificación');
      } else {
        setMessage('Calificación asignada con éxito');
      }
    };
  
    return (
      <Container>
        <h1>Asignar Calificación</h1>
        {message && <Alert severity={message.startsWith('Error') ? 'error' : 'success'}>{message}</Alert>} 
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
