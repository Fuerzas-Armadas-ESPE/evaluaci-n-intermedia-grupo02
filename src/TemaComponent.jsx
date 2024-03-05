import { useState, useEffect } from 'react'
import { Button, TextField, Container, Box, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material'
import supabase from './supabaseClient'

function TemaComponent() {
  const [titulo, setTitulo] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [id_curso, setIdCurso] = useState('')
  const [cursos, setCursos] = useState([])
  const [temas, setTemas] = useState([])
  const [message, setMessage] = useState('')
  const [temaSeleccionado, setTemaSeleccionado] = useState(null) // Nuevo estado para el tema seleccionado

  useEffect(() => {
    getCursos().then(setCursos)
    getTemas().then(setTemas)
  }, [])

  useEffect(() => { // Nuevo efecto para rellenar el formulario con los datos del tema seleccionado
    if (temaSeleccionado) {
      setTitulo(temaSeleccionado.titulo);
      setObjetivo(temaSeleccionado.objetivo);
      setIdCurso(temaSeleccionado.id_curso);
    }
  }, [temaSeleccionado]);

  const getCursos = async () => {
    const { data, error } = await supabase
      .from('Cursos')
      .select('*')

    if (error) {
      console.error('Error al obtener los cursos:', error.message)
    } else {
      return data
    }
  }

  const getTemas = async () => {
    const { data, error } = await supabase
      .from('Temas')
      .select('*')

    if (error) {
      console.error('Error al obtener los temas:', error.message)
    } else {
      return data
    }
  }


  const handleCrearTema = async (e) => {
    e.preventDefault();
  
    if (temaSeleccionado) {
      // Actualizar el tema existente
      const { data, error } = await handleModificarTema(temaSeleccionado.id);
      if (data) {
        setMessage('Tema modificado con éxito.')
        setTemas(temas.map((tema) => tema.id === temaSeleccionado.id ? data[0] : tema))
        setTemaSeleccionado(null) // Resetea el tema seleccionado
        setTitulo('') // Limpia el campo del título
        setObjetivo('') // Limpia el campo del objetivo
        setIdCurso('') // Limpia el campo del id_curso
      } else if (error) {
        setMessage('Error al modificar el tema.')
      }
    } else {
      // Crear un nuevo tema
      const { data, error } = await supabase
        .from('Temas')
        .insert([
          { titulo, objetivo, id_curso },
        ])
      
      if (error) {
        setMessage('Error al crear el tema.')
      } else {
        setMessage('Tema creado con éxito.')
        setTemas(oldTemas => [...oldTemas, data ? data[0] : { titulo, objetivo, id_curso }])
      }
    }
  }
  
  const handleModificarTema = async (id) => {
    const { data, error } = await supabase
      .from('Temas')
      .update({ titulo, objetivo, id_curso })
      .eq('id', id)
    return { data, error };
  }
  

  const handleEliminarTema = async (id) => {
    if (id === undefined) {
      console.error('Error: el ID del tema es undefined.')
      return
    }
  
    const { data, error } = await supabase
      .from('Temas')
      .delete()
      .eq('id', id)
  
    if (error) {
      setMessage('Error al eliminar el tema.')
    } else {
      setMessage('Tema eliminado con éxito.')
      setTemas(temas.filter((tema) => tema.id !== id))
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
        {message && <Alert severity={message.startsWith('Error') ? 'error' : 'success'}>{message}</Alert>}
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
          <InputLabel>ID del Curso</InputLabel>
          <Select
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
      {temas.map((tema) => (
        <Box key={tema.id}>
        <h3>{tema.titulo}</h3>
        <p>{tema.objetivo}</p>
        <Button onClick={() => setTemaSeleccionado(tema)} variant="contained" color="primary">Modificar</Button> {/* Actualizado para establecer el tema seleccionado */}
        <Button onClick={() => handleEliminarTema(tema.id)} variant="contained" color="secondary">Eliminar</Button>
      </Box>
      ))}
    </Container>
  )
}

export default TemaComponent

