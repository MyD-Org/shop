import { redirect } from "next/navigation"

export default function IngresarPage() {
  const isProd = process.env.NODE_ENV === "production"

  const shopUrl = isProd
    ? "https://www.centralled.com.ar"
    : "http://localhost:3001"

  const crmUrl = isProd
    ? "https://crm.centralled.com.ar"
    : "http://localhost:3000"

  redirect(`${crmUrl}/portal?redirect=${encodeURIComponent(shopUrl)}`)
}
