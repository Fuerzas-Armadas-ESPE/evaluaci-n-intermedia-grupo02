import { useState, useEffect } from 'react'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Alert, Switch } from '@mui/material'
import supabase from './supabaseClient'

function ActComponent() {
  const [actividades, setActividades] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [id_tema, setIdTema] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [message, setMessage] = useState('');
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    const obtenerActividades = async () => {
      let { data: actividadesData } = await supabase.from('Actividades').select('*');
      setActividades(actividadesData);
    };
    obtenerActividades();
  }, []);

  useEffect(() => {
    const obtenerTemas = async () => {
      let { data: temasData } = await supabase.from('Temas').select('*');
      setTemas(temasData);
    };
    obtenerTemas();
  }, []);

  const handleCrearActividad = async () => {
    const { error } = await supabase.from('Actividades').insert([
      { nombre, descripcion, estado, id_tema, observaciones },
    ]);
    if (error) {
      setMessage('Error al crear la actividad.');
    } else {
      setMessage('Actividad creada con éxito.');
    }
  };

  const handleModificarActividad = async (id, estadoActual) => {
    console.log(id_tema);
    const { error } = await supabase.from('Actividades').update({ nombre, descripcion, estado: estadoActual, id_tema, observaciones }).eq('id', id);
    if (error) {
      setMessage('Error al modificar la actividad.');
    } else {
      setMessage('Actividad modificada con éxito.');
    }
  };

  const handleEliminarActividad = async (id) => {
    const { error } = await supabase.from('Actividades').delete().eq('id', id);
    if (error) {
      setMessage('Error al eliminar la actividad.');
    } else {
      setMessage('Actividad eliminada con éxito.');
    }
  };

  const handleToggleEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'Realizada' ? 'Pendiente' : 'Realizada';
    const { error } = await supabase.from('Actividades').update({ estado: nuevoEstado }).eq('id', id);
    if (error) {
      setMessage('Error al actualizar la actividad.');
    } else {
      setMessage('Actividad actualizada con éxito.');
      // Actualiza el estado de las actividades en el componente
      setActividades(actividades.map((actividad) => {
        if (actividad.id === id) {
          return { ...actividad, estado: nuevoEstado };
        } else {
          return actividad;
        }
      }));
    }
  };
  
  return (
    <div>
      <h2>Gestión de Actividades</h2>
      {message && <Alert severity={message.startsWith('Error') ? 'error' : 'success'}>{message}</Alert>}
      <TextField value={nombre} onChange={(e) => setNombre(e.target.value)} label="Nombre" />
      <TextField value={descripcion} onChange={(e) => setDescripcion(e.target.value)} label="Descripción" />
      <FormControl>
        <InputLabel>Estado</InputLabel>
        <Select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="Realizada">Realizada</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
  <InputLabel>Nombre del Tema</InputLabel>
  <Select value={id_tema} onChange={(e) => setIdTema(e.target.value)}>
    {temas.map((tema) => (
      <MenuItem key={tema.id} value={tema.id}>{tema.titulo}</MenuItem>
    ))}
  </Select>
</FormControl>
      <TextField value={observaciones} onChange={(e) => setObservaciones(e.target.value)} label="Observaciones" />
      <Button onClick={handleCrearActividad} variant="contained" color="primary">Crear Actividad</Button>
      {actividades.map((actividad) => (
        <div key={actividad.id}>
          <h3>{actividad.nombre}</h3>
          <p>{actividad.descripcion}</p>
          <p>{actividad.estado}</p>
          <p>{actividad.observaciones}</p>
          <Switch
            checked={actividad.estado === 'Realizada'}
            onChange={() => handleToggleEstado(actividad.id, actividad.estado)}
          />
          <Button onClick={() => handleModificarActividad(actividad.id, actividad.estado)} variant="contained" color="primary">Modificar Actividad</Button>
          <Button onClick={() => handleEliminarActividad(actividad.id)} variant="contained" color="primary">Eliminar Actividad</Button>
        </div>
      ))}
    </div>
  );
}

export default ActComponent;




