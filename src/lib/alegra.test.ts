import { describe, expect, it } from "vitest";
import { ivaDeItem, ivaPersistible, mapItemRow } from "./alegra";

/**
 * El IVA que se guarda en el espejo es el que después se muestra como "precio
 * final". Por eso NO puede caer a `IVA_DEFAULT` como hace `ivaDeItem`: cobrar
 * 21% de más en el checkout se corrige a mano, pero publicar un precio final
 * inventado es una promesa al cliente. Si Alegra no manda `tax`, se guarda null
 * y la exhibición muestra el precio como hasta ahora.
 */
describe("ivaPersistible", () => {
  it("devuelve la alícuota del ítem", () => {
    expect(ivaPersistible({ tax: [{ percentage: "21.00" }] })).toBe(21);
    expect(ivaPersistible({ tax: [{ percentage: 10.5 }] })).toBe(10.5);
  });

  it("suma los impuestos del ítem, igual que la cotización", () => {
    expect(ivaPersistible({ tax: [{ percentage: 21 }, { percentage: "2.5" }] })).toBe(23.5);
  });

  it("respeta un ítem exento (0%) como dato válido", () => {
    expect(ivaPersistible({ tax: [{ percentage: 0 }] })).toBe(0);
  });

  it("devuelve null si Alegra no manda tax, sin caer al default", () => {
    expect(ivaPersistible({})).toBeNull();
    expect(ivaPersistible({ tax: [] })).toBeNull();
    // Contraste: la cotización sí cae al default.
    expect(ivaDeItem({})).toBe(21);
  });

  it("devuelve null si ningún porcentaje es numérico", () => {
    expect(ivaPersistible({ tax: [{ percentage: "abc" }, { name: "IVA" }] })).toBeNull();
  });
});

describe("mapItemRow", () => {
  const base = {
    id: 7,
    name: "Lámpara",
    status: "active",
    price: [{ idPriceList: 1, name: "General", price: 100000, main: true }],
  };

  it("expone ivaPorcentaje sin tocar los precios de lista", () => {
    const fila = mapItemRow({ ...base, tax: [{ percentage: "21.00" }] });
    expect(fila.ivaPorcentaje).toBe(21);
    expect(fila.prices).toEqual([
      { idPriceList: "1", name: "General", price: 100000, main: true },
    ]);
  });

  it("ivaPorcentaje null si el ítem no tiene tax", () => {
    expect(mapItemRow(base).ivaPorcentaje).toBeNull();
  });
});
