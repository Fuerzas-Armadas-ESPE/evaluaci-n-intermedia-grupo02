import { useState } from 'react'
import { Button, TextField, Container, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import supabase from './supabaseClient'

function AuthComponent() {
  const [nombre, setNombre] = useState('')
  const [correo_electronico, setCorreoElectronico] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [rol, setRol] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const handleRegister = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('Usuarios')
      .insert([
        { nombre, correo_electronico, contraseña, rol },
      ])

    if (error) {
      console.error('Error en el registro:', error.message)
    } else {
      console.log('Usuario registrado')
      setIsLogin(true)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('Usuarios')
      .select('*')
      .eq('nombre', nombre)
      .eq('contraseña', contraseña)

    if (error) {
      console.error('Error en el inicio de sesión:', error.message)
    } else if (data.length === 0) {
      console.error('Nombre de usuario o contraseña incorrectos')
    } else {
      console.log('Usuario inició sesión:', data[0])
      // Aquí puedes redirigir al usuario al componente de inicio
    }
  }

  return (
    <Container maxWidth="xs">
      {isLogin ? (
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2>Iniciar sesión</h2>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            label="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>Iniciar sesión</Button>
          <Button onClick={() => setIsLogin(false)} fullWidth>Registrarse</Button>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2>Registrarse</h2>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo electrónico"
            value={correo_electronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            label="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Rol</InputLabel>
            <Select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <MenuItem value={'Estudiante'}>Estudiante</MenuItem>
              <MenuItem value={'Profesor'}>Profesor</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>Registrarse</Button>
          <Button onClick={() => setIsLogin(true)} fullWidth>Volver al inicio de sesión</Button>
        </Box>
      )}
    </Container>
  )
}

export default AuthComponent




