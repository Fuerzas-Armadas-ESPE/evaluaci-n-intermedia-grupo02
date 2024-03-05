import { useState } from 'react'
import { Button, Box, Drawer, List, ListItem } from '@mui/material'
import CursoComponent from './CursoComponent'
import TemaComponent from './TemaComponent'
import ActComponent from './ActComponent'
import AsignarCalificacion from './AsignarCalificacion'
import { obtenerDatos } from './generarReporte'

function ProfesorPanel({ handleLogout }) {
  const [formularioActual, setFormularioActual] = useState(null)

  const handleCrearCurso = () => {
    setFormularioActual('curso')
  }

  const handleGestionarTemas = () => {
    setFormularioActual('tema')
  }

  const handleCrearActividad = () => {
    setFormularioActual('actividad')
  }

  const handleAsignarCalificacion = () => {
    setFormularioActual('calificacion')
  }

  const handleGenerarReporte = () => {
    // Llama a la función 'obtenerDatos'
    obtenerDatos()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Drawer variant="permanent" open>
        <List>
          <ListItem><Button style={{ width: '200px', height: '50px' }} onClick={handleCrearCurso} variant="contained" color="primary">Crear Curso</Button></ListItem>
          <ListItem><Button style={{ width: '200px', height: '50px' }} onClick={handleGestionarTemas} variant="contained" color="primary">Gestionar Temas</Button></ListItem>
          <ListItem><Button style={{ width: '200px', height: '50px' }} onClick={handleCrearActividad} variant="contained" color="primary">Gestionar Actividades</Button></ListItem>
          <ListItem><Button style={{ width: '200px', height: '50px' }} onClick={handleAsignarCalificacion} variant="contained" color="primary">Asignar Calificación</Button></ListItem>
          <ListItem><Button style={{ width: '200px', height: '50px' }} onClick={handleGenerarReporte} variant="contained" color="primary">Generar Reporte</Button></ListItem>
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
        {formularioActual === 'curso' && <CursoComponent />}
        {formularioActual === 'tema' && <TemaComponent />}
        {formularioActual === 'actividad' && <ActComponent />}
        {formularioActual === 'calificacion' && <AsignarCalificacion />}
      </Box>
      
    </Box>
  )
}

export default ProfesorPanel






