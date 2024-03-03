import { useState } from 'react'
import { Button, TextField, Container, Box } from '@mui/material'
import supabase from './supabaseClient'

function TemaComponent() {
  const [titulo, setTitulo] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [id_curso, setIdCurso] = useState('')

  const handleCrearTema = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('Temas')
      .insert([
        { titulo, objetivo, id_curso },
      ])

    if (error) {
      console.error('Error al crear el tema:', error.message)
    } else {
      console.log('Tema creado:', data[0])
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleCrearTema}
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Crear Tema</h2>
        <TextField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Objetivo"
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="ID del Curso"
          value={id_curso}
          onChange={(e) => setIdCurso(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Crear Tema</Button>
      </Box>
    </Container>
  )
}

export default TemaComponent
