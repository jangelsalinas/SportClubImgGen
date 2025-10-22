/**
 * Definición de plantillas disponibles
 */
import type { TemplateConfig } from './types';

export const templates: Record<string, TemplateConfig> = {
  template1: {
    id: 'template1',
    nombre: 'Montaña',
    imagePath: 'src/assets/templates/template1.jpg',
    colorTexto: '#FFFFFF',
    colorFondo: 'rgba(0, 0, 0, 0.6)',
    overlay: true,
    overlayOpacity: 0.5
  },
  template2: {
    id: 'template2',
    nombre: 'Carretera',
    imagePath: 'src/assets/templates/template2.jpg',
    colorTexto: '#FFFFFF',
    colorFondo: 'rgba(20, 50, 100, 0.7)',
    overlay: true,
    overlayOpacity: 0.6
  },
  template3: {
    id: 'template3',
    nombre: 'Ciudad',
    imagePath: 'src/assets/templates/template3.jpg',
    colorTexto: '#FFFFFF',
    colorFondo: 'rgba(50, 50, 50, 0.7)',
    overlay: true,
    overlayOpacity: 0.5
  }
};

export const getTemplate = (templateId: string): TemplateConfig => {
  return templates[templateId] || templates.template1;
};
