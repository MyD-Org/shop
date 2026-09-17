"use client";

import { useState } from "react";
import { Dialog } from "@myd-org/ui";
import { MediosDePagoDetalle } from "@/components/MediosDePagoDetalle";
import { bloquesMediosDePago } from "@/lib/cuotas-exhibicion";
import { TEXTOS_CUOTAS } from "@/lib/cuotas-textos";
import type { OfertaCuotas } from "@/lib/pagos/cuotas-tipos";

/**
 * Botón "Ver medios de pago" + modal. El `Dialog` de @myd-org/ui es Radix:
 * foco atrapado adentro, Escape cierra, `aria-modal` + título/descripción
 * enlazados, y al cerrar el foco vuelve al elemento que lo abrió (este botón).
 *
 * Los bloques se calculan recién al abrir: la ficha no paga el cálculo si nadie
 * mira el detalle.
 */
export function MediosDePagoModal({
  precioFinal,
  oferta,
  className = "",
}: {
  precioFinal: number;
  oferta: OfertaCuotas;
  className?: string;
}) {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        aria-haspopup="dialog"
        className={`text-sm font-semibold underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] ${className}`}
      >
        {TEXTOS_CUOTAS.verMediosDePago}
      </button>
      <Dialog
        open={abierto}
        onOpenChange={setAbierto}
        title={TEXTOS_CUOTAS.tituloModal}
        description={TEXTOS_CUOTAS.descripcionModal(precioFinal)}
        size="md"
      >
        {abierto && <MediosDePagoDetalle bloques={bloquesMediosDePago(precioFinal, oferta)} />}
      </Dialog>
    </>
  );
}
