/**
 * Generador de imágenes usando node-canvas
 */
import { createCanvas, loadImage, registerFont, type Canvas, type Image } from 'canvas';
import type { BikeRideData } from './types';
import { getTemplate } from './templates';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dimensiones de la imagen
const IMAGE_WIDTH = 1080;
const IMAGE_HEIGHT = 1080;

// Cache para el logo
let logoImage: Image | null = null;

/**
 * Carga el logo (una sola vez)
 */
async function loadLogo(): Promise<Image | null> {
  if (logoImage) return logoImage;
  
  try {
    const logoPath = join(process.cwd(), 'src/assets/logos/logoZ5.png');
    logoImage = await loadImage(logoPath);
    console.log('✓ Logo cargado correctamente');
    return logoImage;
  } catch (error) {
    console.warn('⚠ No se pudo cargar el logo, usando texto de respaldo');
    return null;
  }
}

/**
 * Formatea la fecha en español
 */
function formatearFecha(fechaStr: string): string {
  const fecha = new Date(fechaStr + 'T00:00:00');
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  const diaSemana = diasSemana[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  
  return `${diaSemana}, ${dia} de ${mes}`;
}

/**
 * Trunca el texto si es muy largo
 */
function truncarTexto(ctx: any, texto: string, maxWidth: number): string {
  const width = ctx.measureText(texto).width;
  if (width <= maxWidth) return texto;
  
  let truncado = texto;
  while (ctx.measureText(truncado + '...').width > maxWidth && truncado.length > 0) {
    truncado = truncado.slice(0, -1);
  }
  return truncado + '...';
}

/**
 * Dibuja texto con sombra para mejor legibilidad
 */
function dibujarTextoConSombra(
  ctx: any,
  texto: string,
  x: number,
  y: number,
  color: string
): void {
  // Sombra
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 11;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  
  // Texto
  ctx.fillStyle = color;
  ctx.fillText(texto, x, y);
  
  // Resetear sombra
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

/**
 * Genera la imagen de la salida en bici
 */
export async function generateBikeImage(data: BikeRideData): Promise<Buffer> {
  try {
    // Crear canvas
    const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
    const ctx = canvas.getContext('2d');

    // Obtener configuración de plantilla
    const template = getTemplate(data.plantilla || 'template1');

    // Cargar imagen de fondo
    let background;
    try {
      // Intentar cargar la imagen de la plantilla
      const imagePath = join(process.cwd(), template.imagePath);
      background = await loadImage(imagePath);
    } catch (error) {
      // Si falla, usar un fondo de color sólido
      console.warn('No se pudo cargar la imagen de fondo, usando color sólido');
      ctx.fillStyle = '#2563eb'; // Azul
      ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
      
      // Crear un gradiente de fondo
      const gradient = ctx.createLinearGradient(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
      gradient.addColorStop(0, '#1e40af');
      gradient.addColorStop(1, '#3b82f6');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
    }

    // Dibujar fondo si se cargó correctamente
    if (background) {
      ctx.drawImage(background, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
    }

    // Dibujar overlay semitransparente si está configurado
    if (template.overlay) {
      ctx.fillStyle = template.colorFondo;
      ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
    }

    // Configurar texto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Formatear datos
    const fechaFormateada = formatearFecha(data.fecha);
    const horaFormateada = data.hora;

    // Dibujar fecha (parte superior)
    ctx.font = 'bold 54px sans-serif';
    dibujarTextoConSombra(ctx, fechaFormateada, IMAGE_WIDTH / 2, 160, template.colorTexto);

    // Dibujar hora
    ctx.font = '48px sans-serif';
    dibujarTextoConSombra(ctx, horaFormateada, IMAGE_WIDTH / 2, 240, template.colorTexto);

    // Dibujar lugar (destacado)
    ctx.font = 'bold 86px sans-serif';
    const lugarTruncado = truncarTexto(ctx, data.lugar, IMAGE_WIDTH - 120);
    dibujarTextoConSombra(ctx, lugarTruncado, IMAGE_WIDTH / 2, IMAGE_HEIGHT / 2, template.colorTexto);

    // Dibujar descripción
    ctx.font = '43px sans-serif';
    const descripcionTruncado = truncarTexto(ctx, data.descripcion, IMAGE_WIDTH - 120);
    dibujarTextoConSombra(ctx, descripcionTruncado, IMAGE_WIDTH / 2, IMAGE_HEIGHT / 2 + 135, template.colorTexto);

    // Dibujar información adicional si existe
    let posicionAdicional = IMAGE_HEIGHT - 215;
    
    if (data.distancia) {
      ctx.font = 'bold 43px sans-serif';
      dibujarTextoConSombra(ctx, `📏 ${data.distancia}`, IMAGE_WIDTH / 2, posicionAdicional, template.colorTexto);
      posicionAdicional += 67;
    }
    
    if (data.dificultad) {
      ctx.font = '43px sans-serif';
      const emojiDificultad = data.dificultad === 'fácil' ? '🟢' : data.dificultad === 'moderada' ? '🟡' : '🔴';
      dibujarTextoConSombra(
        ctx,
        `${emojiDificultad} Nivel: ${data.dificultad}`,
        IMAGE_WIDTH / 2,
        posicionAdicional,
        template.colorTexto
      );
    }

    // Logo como marca de agua
    const logo = await loadLogo();
    if (logo) {
      // Calcular dimensiones del logo manteniendo aspect ratio
      const maxLogoWidth = 300; // Ancho máximo del logo
      const maxLogoHeight = 90; // Alto máximo del logo
      
      const logoAspectRatio = logo.width / logo.height;
      let logoWidth = maxLogoWidth;
      let logoHeight = maxLogoWidth / logoAspectRatio;
      
      // Si el alto excede el máximo, ajustar por alto
      if (logoHeight > maxLogoHeight) {
        logoHeight = maxLogoHeight;
        logoWidth = maxLogoHeight * logoAspectRatio;
      }
      
      const logoX = (IMAGE_WIDTH - logoWidth) / 2;
      const logoY = IMAGE_HEIGHT - logoHeight - 40;
      
      // Opcional: dibujar con opacidad si quieres que sea más sutil
      ctx.globalAlpha = 0.9;
      ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
      ctx.globalAlpha = 1.0;
    } else {
      // Fallback: texto si el logo no se pudo cargar
      ctx.font = 'bold 32px sans-serif';
      dibujarTextoConSombra(ctx, 'SportClub', IMAGE_WIDTH / 2, IMAGE_HEIGHT - 67, template.colorTexto);
    }

    // Exportar como PNG
    return canvas.toBuffer('image/png');
  } catch (error) {
    console.error('Error al generar imagen:', error);
    throw new Error('No se pudo generar la imagen');
  }
}
