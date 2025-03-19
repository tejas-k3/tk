import TileGrid from "@/components/tile-grid"
import { portfolioData } from "@/lib/data"

export default function Home() {
  return (
    <main className="min-h-screen">
      <TileGrid data={portfolioData} />
    </main>
  )
}