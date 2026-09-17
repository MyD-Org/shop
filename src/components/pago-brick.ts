/**
 * `customization` del Payment Brick con identidad estable por valor.
 *
 * El SDK desmonta y recrea el Brick cuando cambia la identidad de
 * `customization` (regresión #21). Memoizar en el módulo, además del `useMemo`
 * del componente, garantiza la misma instancia para el mismo `maxCuotas`
 * incluso entre remontes, y permite testearlo sin DOM.
 *
 * `mercadoPago: "all"` habilita dinero en cuenta dentro del mismo Brick (ver
 * comentario en PagoMercadoPago.tsx).
 */

export interface CustomizacionBrick {
  readonly paymentMethods: {
    readonly creditCard: "all";
    readonly debitCard: "all";
    readonly mercadoPago: "all";
    readonly maxInstallments?: number;
  };
  readonly visual: { readonly style: { readonly theme: "default" } };
}

const cache = new Map<number | "sin", CustomizacionBrick>();

const congelar = <T extends object>(o: T): T => {
  for (const v of Object.values(o)) if (typeof v === "object" && v !== null) congelar(v);
  return Object.freeze(o);
};

export function customizacionBrick(maxCuotas: number | undefined): CustomizacionBrick {
  const valido = typeof maxCuotas === "number" && Number.isInteger(maxCuotas) && maxCuotas >= 1;
  const clave = valido ? maxCuotas : "sin";
  const previa = cache.get(clave);
  if (previa) return previa;

  const nueva: CustomizacionBrick = congelar({
    paymentMethods: {
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
      ...(valido ? { maxInstallments: maxCuotas } : {}),
    },
    visual: { style: { theme: "default" } },
  });
  cache.set(clave, nueva);
  return nueva;
}
