import { redirect } from "next/navigation";
import { CheckoutClient } from "@/components/CheckoutClient";
import { Footer } from "@/components/Footer";
import { identidadActual } from "@/lib/auth";
import { getPerfilFacturacion, perfilCompleto } from "@/lib/facturacion-db";

/**
 * El checkout exige estar logueado, pero NO tener cuenta corriente vinculada:
 * quien no vinculó compra a lista general (decisión de producto). Se corta acá,
 * en el servidor, para que la página nunca renderice sin identidad.
 */
export default async function CheckoutPage() {
  const { clerkUserId, cliente, nombre, email } = await identidadActual();
  if (!clerkUserId && !cliente) {
    redirect("/ingresar");
  }

  /**
   * El perfil VIAJA ENTERO al checkout, no solo un booleano.
   *
   * Antes se mandaba `facturacionCompleta` y, si faltaba, se lo empujaba a
   * /mi-cuenta a cargarlo — o sea, sacarlo del checkout justo cuando estaba por
   * comprar, y hacerle rehacer el camino. Con el perfil completo acá, el
   * formulario se puede resolver en la misma pantalla.
   */
  const perfil = clerkUserId ? await getPerfilFacturacion(clerkUserId) : null;

  return (
    <>
      <CheckoutClient
        nombreSugerido={
          perfil?.razonSocial ?? cliente?.razonsocial ?? nombre ?? ""
        }
        emailCliente={cliente?.email ?? email}
        facturacionCompleta={perfilCompleto(perfil)}
        perfilFacturacion={perfil}
        // Con cuenta corriente vinculada, los datos fiscales los manda Alegra:
        // el cliente los ve, no los edita.
        facturacionBloqueada={Boolean(cliente)}
      />
      <Footer />
    </>
  );
}
