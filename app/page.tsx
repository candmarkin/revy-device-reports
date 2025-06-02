import type { Metadata } from "next"
import RefurbishedReport from "@/components/refurbished-report"

export const metadata: Metadata = {
  title: "Relatório de Computador Recondicionado",
  description: "Relatório detalhado para computadores e notebooks recondicionados",
}

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <RefurbishedReport />
    </main>
  )
}
