import { useState } from 'react'
import { Button, Box } from '@mui/material'
import CursoComponent from './CursoComponent'
import TemaComponent from './TemaComponent'
import ActComponent from './ActComponent'

function ProfesorPanel() {
  const [mostrarCursoForm, setMostrarCursoForm] = useState(false)
  const [mostrarTemaForm, setMostrarTemaForm] = useState(false)
  const [isCreatingActivity, setIsCreatingActivity] = useState(false)

  const handleCrearActividad = () => {
    setIsCreatingActivity(true)
  }

  if (isCreatingActivity) {
    return <ActComponent />
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
      <Button onClick={handleCrearActividad} variant="contained" color="primary">Crear Actividad</Button>
      {mostrarCursoForm && <CursoComponent />}
      {mostrarTemaForm && <TemaComponent />}
    </Box>
  )
}

export default ProfesorPanel

