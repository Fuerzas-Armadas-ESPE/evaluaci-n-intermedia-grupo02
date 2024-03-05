import supabase from './supabaseClient'
import jsPDF from "jspdf";
import "jspdf-autotable";

// Función para generar el reporte
export const generarReporte = (cursos, temas, actividades, calificaciones) => {
  const doc = new jsPDF();

  // Título del reporte
  doc.setFontSize(18);
  doc.text("Reporte de Progreso del Curso", 14, 22);

  // Tabla de Cursos
  doc.autoTable({
    head: [["ID", "Nombre del Curso", "Descripción"]],
    body: cursos.map(curso => [curso.id, curso.nombre, curso.descripcion]),
    startY: 30
  });

  // Tabla de Temas
  doc.autoTable({
    head: [["ID", "Título del Tema", "Objetivo", "ID del Curso"]],
    body: temas.map(tema => [tema.id, tema.titulo, tema.objetivo, tema.id_curso]),
    startY: doc.previousAutoTable.finalY + 20
  });

  // Tabla de Actividades
  doc.autoTable({
    head: [["ID", "Nombre de la Actividad", "Descripción", "Estado", "ID del Tema"]],
    body: actividades.map(actividad => [actividad.id, actividad.nombre, actividad.descripcion, actividad.estado, actividad.id_tema]),
    startY: doc.previousAutoTable.finalY + 20
  });

  // Tabla de Calificaciones
  doc.autoTable({
    head: [["ID", "Calificación", "ID de la Actividad", "ID del Estudiante"]],
    body: calificaciones.map(calificacion => [calificacion.id, calificacion.calificacion, calificacion.id_actividad, calificacion.id_estudiante]),
    startY: doc.previousAutoTable.finalY + 20
  });

  // Guardar el PDF
  doc.save("reporte.pdf");
};

// Función para obtener los datos de las tablas
export const obtenerDatos = async () => {
  // Obtiene los datos de la tabla 'Cursos'
  const { data: cursos, error: errorCursos } = await supabase
    .from('Cursos')
    .select('*')

  // Obtiene los datos de la tabla 'Temas'
  const { data: temas, error: errorTemas } = await supabase
    .from('Temas')
    .select('*')

  // Obtiene los datos de la tabla 'Actividades'
  const { data: actividades, error: errorActividades } = await supabase
    .from('Actividades')
    .select('*')

  // Obtiene los datos de la tabla 'Calificaciones'
  const { data: calificaciones, error: errorCalificaciones } = await supabase
    .from('Calificaciones')
    .select('*')

  // Llama a la función 'generarReporte' con los datos obtenidos
  generarReporte(cursos, temas, actividades, calificaciones)
}

