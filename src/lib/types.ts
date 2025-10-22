/**
 * Tipos y interfaces para la generación de imágenes
 */

export interface BikeRideData {
  fecha: string; // Formato: YYYY-MM-DD
  hora: string; // Formato: HH:MM
  lugar: string;
  descripcion: string;
  plantilla?: 'template1' | 'template2' | 'template3';
  distancia?: string;
  dificultad?: 'fácil' | 'moderada' | 'difícil';
}

export interface TemplateConfig {
  id: string;
  nombre: string;
  imagePath: string;
  colorTexto: string;
  colorFondo: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export interface TextPosition {
  x: number;
  y: number;
  maxWidth?: number;
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  align?: 'left' | 'center' | 'right';
}
