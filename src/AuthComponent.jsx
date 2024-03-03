import { useState } from 'react'
import { Button, TextField, Container, Box, Alert, Select, MenuItem } from '@mui/material'
import supabase from './supabaseClient'
import ProfesorPanel from './ProfesorPanel'

function AuthComponent() {
  const [nombre, setNombre] = useState('')
  const [correo_electronico, setCorreoElectronico] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [rol, setRol] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('Usuarios')
      .insert([
        { nombre, correo_electronico, contraseña, rol },
      ])

    if (error) {
        setError('Error al registrarse.')
    } else {
        setError('Registro exitoso. Por favor, inicie sesión.')
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
        setError('Error en el inicio de sesión.')
    } else if (data.length === 0) {
      setError('Nombre de usuario o contraseña incorrectos.')
    } else {
      setIsLoggedIn(true)
      setRol(data[0].rol)
    }
  }
  if (isLoggedIn && rol === 'Profesor') {
    return <ProfesorPanel />
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
          {error && <Alert severity="error">{error}</Alert>}
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
          {error && <Alert severity="error">{error}</Alert>}
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
          <Select
            label="Rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Profesor">Profesor</MenuItem>
            <MenuItem value="Estudiante">Estudiante</MenuItem>
          </Select>
          <Button type="submit" variant="contained" color="primary" fullWidth>Registrarse</Button>
          <Button onClick={() => setIsLogin(true)} fullWidth>Volver al inicio de sesión</Button>
        </Box>
      )}
    </Container>
  )
}

export default AuthComponent




