import supabase from './supabaseClient'

export default async function obtenerActividades(id_estudiante) {
    const { data: actividades, error } = await supabase
      .from('Actividades')
      .select('*')
  
    if (error) {
      console.error('Error obteniendo actividades:', error)
      return
    }
  
    // Ahora obtenemos las calificaciones del estudiante
    const { data: calificaciones } = await supabase
      .from('Calificaciones')
      .select('*')
      .eq('id_estudiante', id_estudiante)
  
    if (error) {
      console.error('Error obteniendo calificaciones:', error)
      return
    }
  
    // Ahora `actividades` contiene las actividades y `calificaciones` contiene las calificaciones del estudiante
    return { actividades, calificaciones }
}

  

