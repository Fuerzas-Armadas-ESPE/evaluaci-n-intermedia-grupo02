import { useState } from 'react'
import { Button, Box } from '@mui/material'
import CursoComponent from './CursoComponent'
import TemaComponent from './TemaComponent'
import ActComponent from './ActComponent'
import AsignarCalificacion from './AsignarCalificacion'
import { obtenerDatos } from './generarReporte'

function ProfesorPanel() {
  const [mostrarCursoForm, setMostrarCursoForm] = useState(false)
  const [mostrarTemaForm, setMostrarTemaForm] = useState(false)
  const [isCreatingActivity, setIsCreatingActivity] = useState(false)
  const [isAssigningGrade, setIsAssigningGrade] = useState(false)
  
  const handleCrearActividad = () => {
    setIsCreatingActivity(true)
  }

  const handleAsignarCalificacion = () => {
    setIsAssigningGrade(true)
  }

  const handleGenerarReporte = () => {
    // Llama a la función 'obtenerDatos'
    obtenerDatos()
  }

  if (isCreatingActivity) {
    return <ActComponent />
  }

  if (isAssigningGrade) {
    return <AsignarCalificacion />
  }

  return (
    <Box
      sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>Panel de Profesor</h2>
      <Button onClick={() => setMostrarCursoForm(true)} variant="contained" color="primary">Crear Curso</Button>
      <Button onClick={() => setMostrarTemaForm(true)} variant="contained" color="primary">Crear Tema</Button>
      <Button onClick={handleCrearActividad} variant="contained" color="primary">Gestionar Actividades</Button>
      <Button onClick={handleAsignarCalificacion} variant="contained" color="primary">Asignar Calificación</Button>
      <Button onClick={handleGenerarReporte} variant="contained" color="primary">Generar Reporte</Button>
      {mostrarCursoForm && <CursoComponent />}
      {mostrarTemaForm && <TemaComponent />}

    </Box>
  )
}

export default ProfesorPanel




