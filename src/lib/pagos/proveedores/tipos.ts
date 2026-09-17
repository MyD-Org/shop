import type { PlanDeCuotas } from "../cuotas-tipos";

/**
 * Adaptador de un proveedor de pagos para obtener sus planes de cuotas reales.
 * Agregar un proveedor = un adaptador nuevo; motor y UI no cambian.
 */
export interface ProveedorCuotas {
  /** 'mercadopago'. Coincide con `MedioDePago.proveedor`. */
  id: string;
  /**
   * Planes normalizados para los medios pedidos ('visa', 'master').
   *
   * Ante un fallo total (error o timeout en todos los medios) MUST tirar: nunca
   * devolver `[]` como si fuera una respuesta válida, porque la sync pisaría la
   * última copia buena con vacío.
   */
  obtenerPlanes(medios: string[]): Promise<PlanDeCuotas[]>;
}
