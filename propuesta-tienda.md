# Propuesta: Plataforma Digital — Electricidad & Materiales Eléctricos Iguazú

---

## Resumen del proyecto

Desarrollo a medida de una plataforma digital para casa de electricidad y materiales eléctricos ubicada en Puerto Iguazú, Misiones. La plataforma se integra con el sistema de gestión **Flexxus** ya en uso, permitiendo que productos, stock y precios estén siempre sincronizados.

El desarrollo se divide en **4 fases**, priorizando primero las herramientas para clientes existentes y luego la tienda online.

---

## Fases del proyecto

### Fase 1 — Portal de Clientes

*Acceso privado para clientes actuales del negocio.*

- Activación de cuenta (el cliente ingresa su CUIT y valida que ya existe en el sistema)
- Inicio de sesión con CUIT o email
- Ver facturas y descargarlas en PDF
- Ver retenciones aplicadas
- Ver deudas pendientes y fechas de vencimiento
- Ver saldo de cuenta corriente

---

### Fase 2 — Shop Online

*Catálogo público con creación de pedidos. Sin cobro online en esta etapa.*

- Home con productos destacados y banners
- Catálogo con filtros por categoría, marca y búsqueda por texto
- Página de producto con galería de fotos, descripción y stock en tiempo real
- Carrito persistente
- Checkout: datos personales, dirección de envío, elección de transporte, elección de pago
- Registro de nuevos clientes e inicio de sesión
- Historial de pedidos
- Botón de consulta por WhatsApp
- **Precios personalizados por cliente** — cada cliente ve su lista de precio asignada (según la configuración en Flexxus)
- **Precios por volumen** — el precio varía según la cantidad comprada (escalas de precio)
- **Notificaciones por email** — confirmación de pedido, cambios de estado (despachado, entregado), confirmación de pago y bienvenida al registrarse

**Medios de pago disponibles en esta fase:**

| Medio | Funcionamiento |
| --- | --- |
| **Transferencia bancaria** | El cliente ve el CBU al finalizar el pedido; un operador confirma el pago manualmente desde el panel admin |
| **Efectivo en local** | Disponible solo si el cliente elige "retiro en local" |

**Envíos (MVP):**

| Opción | Condición |
| --- | --- |
| **Envío gratis** | Compras ≥ $100.000 con destino Puerto Iguazú o El Dorado |
| **A coordinar** | Resto del país — el cliente compra y el local coordina el envío por separado |
| **Retiro en local** | Siempre disponible, sin costo |

---

### Fase 3 — Cobro Online

*Integración de pasarela de pago.*

- MercadoPago: tarjetas de débito y crédito, cuotas (cantidad e interés a definir), confirmación automática de pagos

---

### Fase 4 — Envíos Integrados

*Cotización y etiquetas automáticas con transportistas. Por ejemplo Andreani.*

---

## Panel de administración

Interfaz web accesible desde cualquier dispositivo, sin conocimientos técnicos.

### Gestión de productos

| Feature | Descripción |
| --- | --- |
| Ocultar / mostrar producto | Controlar qué artículos aparecen en la tienda |
| Subir fotos (galería) | Múltiples imágenes por producto, drag & drop para ordenar |
| Peso y dimensiones | Para cálculo de envío (cm y kg) |
| Descripción web | Texto amigable para el cliente |
| Producto destacado | Aparece en la home o secciones especiales |
| Etiquetas visuales | Badges: "Nuevo", "Oferta", "Más vendido" |
| SEO | Título y descripción para buscadores (Google) |

### Gestión de pedidos

| Feature | Descripción |
| --- | --- |
| Lista de pedidos | Todos los pedidos con estado y fecha |
| Cambiar estado | Pendiente → Confirmado → Despachado → Entregado |
| Confirmar pago manual | Para transferencias bancarias |
| Generar etiqueta de envío | Llama a la API del transporte elegido y descarga el PDF |
| Ver datos del cliente | Nombre, dirección, teléfono, CUIT/DNI |
| Notas internas | Anotaciones del negocio, no visibles para el cliente |

### Configuración general

| Feature | Descripción |
| --- | --- |
| Banners de la home | Imágenes promocionales sin tocar código |
| Métodos de envío activos | Activar o desactivar transportes |
| Número de WhatsApp | Para el botón de consulta en la tienda |
| CBU para transferencias | Dato que ve el cliente al elegir ese medio de pago |

---

## Lo que la plataforma gestiona por separado de Flexxus

- **Fotos adicionales** (Flexxus tiene 1 imagen por producto; la plataforma permite subir galería completa)
- **Peso y dimensiones** (necesarios para calcular envío; se cargan desde el panel admin)
- **Descripción amigable del producto** (si en Flexxus no está cargada)
- **Envíos** (coordinación manual en Fase 2, automatizado en Fase 4)
- **Pagos online** (MercadoPago — Fase 3)
- **Emails de confirmación**

---

*Documento preparado el 08/06/2026*
