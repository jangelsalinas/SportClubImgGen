/**
 * API Endpoint para generar imágenes de salidas en bici
 * POST /api/generate-image
 */
import type { APIRoute } from 'astro';
import { generateBikeImage } from '../../lib/imageGenerator';
import type { BikeRideData } from '../../lib/types';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Obtener datos del body
    const data: BikeRideData = await request.json();

    // Validar datos requeridos
    if (!data.fecha || !data.hora || !data.lugar || !data.descripcion) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos obligatorios' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar longitud de descripción
    if (data.descripcion.length > 200) {
      return new Response(
        JSON.stringify({ error: 'La descripción no puede tener más de 200 caracteres' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Generar imagen
    const imageBuffer = await generateBikeImage(data);

    // Crear nombre de archivo con la fecha
    const fileName = `salida-bici-${data.fecha}.png`;

    // Devolver imagen
    return new Response(imageBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Error en API:', error);
    return new Response(
      JSON.stringify({ error: 'Error al generar la imagen' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
