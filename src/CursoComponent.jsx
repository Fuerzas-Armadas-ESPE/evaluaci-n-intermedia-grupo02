import { useState, useEffect } from 'react'
import { Button, TextField, Container, Box, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import supabase from './supabaseClient'

function CursoComponent() {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [id_docente, setIdDocente] = useState('')
  const [docentes, setDocentes] = useState([])
  const [cursos, setCursos] = useState([])

  useEffect(() => {
    fetchDocentes()
    fetchCursos()
  }, [])

  const fetchDocentes = async () => {
    const { data, error } = await supabase
      .from('Usuarios')
      .select('*')
      .eq('rol', 'Profesor')

    if (error) {
      console.error('Error al obtener los profesores:', error.message)
    } else {
      setDocentes(data)
    }
  }

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

  const handleCrearCurso = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('Cursos')
      .insert([
        { nombre, descripcion, id_docente },
      ])

    if (error) {
      console.error('Error al crear el curso:', error.message)
      alert('Error al crear el curso: ' + error.message)
    } else {
      console.log('Curso creado:', data[0])
      alert('Curso creado correctamente')
      fetchCursos() // Actualizar la lista de cursos
    }
  }

  const handleModificarCurso = async (id) => {
    // Aquí puedes agregar el código para modificar el curso
    // Por ejemplo, podrías abrir un formulario con los datos del curso y permitir al usuario modificarlos
  }

  const handleEliminarCurso = async (id) => {
    const { data, error } = await supabase
      .from('Cursos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error al eliminar el curso:', error.message)
      alert('Error al eliminar el curso: ' + error.message)
    } else {
      console.log('Curso eliminado:', data[0])
      alert('Curso eliminado correctamente')
      fetchCursos() // Actualizar la lista de cursos
    }
  }

  const handleMostrarDetalles = async (id) => {
    const { data, error } = await supabase
      .from('Cursos')
      .select('*')
      .eq('id', id)

    if (error) {
      console.error('Error al obtener los detalles del curso:', error.message)
      alert('Error al obtener los detalles del curso: ' + error.message)
    } else {
      console.log('Detalles del curso:', data[0])
      alert('Detalles del curso: ' + JSON.stringify(data[0]))
    }
  }
  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleCrearCurso}
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Crear Curso</h2>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="docente-label">Profesor</InputLabel>
          <Select
            labelId="docente-label"
            value={id_docente}
            onChange={(e) => setIdDocente(e.target.value)}
          >
            {docentes.map((docente) => (
              <MenuItem key={docente.id} value={docente.id}>{docente.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>Crear Curso</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Profesor</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cursos.map((curso) => (
              <TableRow
                key={curso.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {curso.nombre}
                </TableCell>
                <TableCell>{curso.descripcion}</TableCell>
                <TableCell>{curso.id_docente}</TableCell>
                <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleModificarCurso(curso.id)}>Modificar</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleEliminarCurso(curso.id)}>Eliminar</Button>
                  <Button variant="contained" onClick={() => handleMostrarDetalles(curso.id)}>Detalles</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default CursoComponent



