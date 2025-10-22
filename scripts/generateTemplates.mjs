/**
 * Script para generar imágenes de plantilla (JavaScript)
 */
import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WIDTH = 1080;
const HEIGHT = 1080;

function generateTemplate1() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Gradiente de montaña (azul a verde)
  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  gradient.addColorStop(0, '#1e3a8a');
  gradient.addColorStop(0.5, '#3b82f6');
  gradient.addColorStop(1, '#10b981');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Simular montañas
  ctx.fillStyle = 'rgba(30, 58, 138, 0.3)';
  ctx.beginPath();
  ctx.moveTo(0, HEIGHT);
  ctx.lineTo(150, HEIGHT - 200);
  ctx.lineTo(300, HEIGHT);
  ctx.fill();

  ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
  ctx.beginPath();
  ctx.moveTo(100, HEIGHT);
  ctx.lineTo(250, HEIGHT - 150);
  ctx.lineTo(WIDTH, HEIGHT);
  ctx.fill();

  return canvas.toBuffer('image/jpeg');
}

function generateTemplate2() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Gradiente de carretera
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#374151');
  gradient.addColorStop(0.5, '#1e40af');
  gradient.addColorStop(1, '#6b7280');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Líneas de carretera
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * 100 + 50);
    ctx.lineTo(WIDTH, i * 100 + 150);
    ctx.stroke();
  }

  return canvas.toBuffer('image/jpeg');
}

function generateTemplate3() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Gradiente de ciudad
  const gradient = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 0, WIDTH / 2, HEIGHT / 2, WIDTH / 2);
  gradient.addColorStop(0, '#f59e0b');
  gradient.addColorStop(0.5, '#ec4899');
  gradient.addColorStop(1, '#8b5cf6');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Simular edificios
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  for (let i = 0; i < 6; i++) {
    const x = i * 70;
    const height = Math.random() * 150 + 100;
    ctx.fillRect(x, HEIGHT - height, 60, height);
  }

  return canvas.toBuffer('image/jpeg');
}

// Crear directorio
const templatesDir = join(__dirname, '../assets/templates');
mkdirSync(templatesDir, { recursive: true });

// Generar plantillas
console.log('Generando plantillas...');

writeFileSync(join(templatesDir, 'template1.jpg'), generateTemplate1());
console.log('✓ Template 1 (Montaña) generado');

writeFileSync(join(templatesDir, 'template2.jpg'), generateTemplate2());
console.log('✓ Template 2 (Carretera) generado');

writeFileSync(join(templatesDir, 'template3.jpg'), generateTemplate3());
console.log('✓ Template 3 (Ciudad) generado');

console.log('\n¡Todas las plantillas fueron generadas exitosamente!');
