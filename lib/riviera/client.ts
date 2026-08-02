/**
 * Cliente de integración con Riviera App / Riviera Open.
 *
 * Hoy no existe integración activa: no hay credenciales ni endpoint
 * confirmados. Este módulo deja el punto de extensión listo para cuando
 * exista una API real o un proyecto Supabase compartido con Riviera,
 * sin que los componentes de UI tengan que cambiar.
 */
export const RIVIERA_INTEGRATION_ENABLED = false;

export function getRivieraApiBaseUrl(): string | null {
  return process.env.RIVIERA_API_BASE_URL ?? null;
}
