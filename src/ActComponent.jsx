import { useState, useEffect } from 'react'
import { Button, TextField, Container, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import supabase from './supabaseClient'

function TemaComponent() {
  const [titulo, setTitulo] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [id_curso, setIdCurso] = useState('')
  const [cursos, setCursos] = useState([])

  useEffect(() => {
    fetchCursos()
  }, [])

  const fetchCursos = async () => {
    const { data, error } = await supabase
      .from('Cursos')
      .select('*')

    if (error) {
      console.error('Error al obtener los cursos:', error.message)
    } else {
      setCursos(data)
    }
  }

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
        <FormControl fullWidth margin="normal">
          <InputLabel id="curso-label">Curso</InputLabel>
          <Select
            labelId="curso-label"
            value={id_curso}
            onChange={(e) => setIdCurso(e.target.value)}
          >
            {cursos.map((curso) => (
              <MenuItem key={curso.id} value={curso.id}>{curso.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>Crear Tema</Button>
      </Box>
    </Container>
  )
}

export default TemaComponent


