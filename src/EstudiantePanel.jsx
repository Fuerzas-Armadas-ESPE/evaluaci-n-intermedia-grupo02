import { useState, useEffect } from 'react'
import { Button, Box, Drawer, List, ListItem } from '@mui/material'
import supabase from './supabaseClient'
import obtenerActividades from './obtenerActividades.jsx';

function EstudiantePanel({ handleLogout }) {
  const [actividades, setActividades] = useState([])
  const [calificaciones, setCalificaciones] = useState([])  // Agrega esto

  useEffect(() => {
    const fetchData = async () => {
      // Aquí debes proporcionar el id del estudiante actualmente autenticado
      const id_estudiante = localStorage.getItem('usuario_id')
  
      const { actividades, calificaciones } = await obtenerActividades(id_estudiante)  // Modifica esto
  
      if (actividades) {
        setActividades(actividades)
      }
      if (calificaciones) {  // Agrega esto
        setCalificaciones(calificaciones)
      }
    }
  
    fetchData()
  }, [])
  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
        <Drawer variant="permanent" open>
        <List>
          <ListItem><Button style={{ width: '200px', height: '50px' }} onClick={handleLogout} variant="contained" color="primary">Cerrar sesión</Button></ListItem>
        </List>
      </Drawer>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
          marginLeft: '300px', // Ajusta este valor según sea necesario
        }}
      >
      <h2>Panel de Estudiante</h2>
      {/* Muestra las actividades del estudiante */}
      {actividades.map(actividad => (
        <div key={actividad.id}>
          <h3>{actividad.nombre}</h3>
          <p>{actividad.descripcion}</p>
          {/* ... */}
          {/* Muestra más detalles de la actividad */}
          {/* ... */}
        </div>
      ))}
      {/* Muestra las calificaciones del estudiante */}
      {calificaciones.map(calificacion => (
        <div key={calificacion.id}>
          <h3>Calificación: {calificacion.calificacion}</h3>
          <p>Actividad ID: {calificacion.id_actividad}</p>
          {/* ... */}
          {/* Muestra más detalles de la calificación */}
          {/* ... */}
        </div>
      ))}
      </Box>
    </Box>
  )
}

export default EstudiantePanel


