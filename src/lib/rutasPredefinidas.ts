/**
 * Configuración de rutas predefinidas
 * Estas rutas se pueden seleccionar en el formulario para precargar datos
 */

export interface RutaPredefinida {
  id: string;
  nombre: string;
  lugar: string;
  descripcion: string;
  distancia?: string;
  dificultad?: 'fácil' | 'moderada' | 'difícil';
  plantilla?: string;
}

export const rutasPredefinidas: RutaPredefinida[] = [
  {
    id: 'cares',
    nombre: 'Ruta del Cares',
    lugar: 'Picos de Europa',
    descripcion: 'Espectacular ruta por la garganta del Cares con vistas impresionantes',
    distancia: '12 km',
    dificultad: 'moderada',
    plantilla: 'template1'
  },
  {
    id: 'covadonga',
    nombre: 'Lagos de Covadonga',
    lugar: 'Asturias',
    descripcion: 'Ascenso a los míticos lagos con paisajes de montaña',
    distancia: '25 km',
    dificultad: 'difícil',
    plantilla: 'template1'
  },
  {
    id: 'naranjo',
    nombre: 'Naranjo de Bulnes',
    lugar: 'Picos de Europa',
    descripcion: 'Ruta hasta el emblemático Naranjo de Bulnes',
    distancia: '18 km',
    dificultad: 'difícil',
    plantilla: 'template1'
  },
  {
    id: 'senda-costera',
    nombre: 'Senda Costera',
    lugar: 'Costa Asturiana',
    descripcion: 'Ruta panorámica por la costa con vistas al Cantábrico',
    distancia: '30 km',
    dificultad: 'fácil',
    plantilla: 'template2'
  },
  {
    id: 'puerto-pajares',
    nombre: 'Puerto de Pajares',
    lugar: 'León - Asturias',
    descripcion: 'Clásico puerto de montaña con alto desnivel',
    distancia: '35 km',
    dificultad: 'difícil',
    plantilla: 'template1'
  },
  {
    id: 'ruta-urbana',
    nombre: 'Ruta Urbana',
    lugar: 'Centro Ciudad',
    descripcion: 'Paseo urbano por la ciudad y sus alrededores',
    distancia: '15 km',
    dificultad: 'fácil',
    plantilla: 'template3'
  }
];
