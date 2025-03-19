"use client"

import { useEffect, useState, useRef } from "react"
import Tile from "./tile"
import GapFiller from "./gap-filler"
import type { PortfolioItem } from "@/lib/types"
import { useWindowSize } from "@/hooks/use-window-size"

export default function TileGrid({ data }: { data: PortfolioItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tiles, setTiles] = useState<any[]>([])
  const [gaps, setGaps] = useState<any[]>([])
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (!containerRef.current) return

    // Reset tiles and gaps on each resize/refresh
    setTiles([])
    setGaps([])

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = window.innerHeight

    // Improved tile placement algorithm
    const placedTiles: any[] = []
    let currentY = 0

    // Create rows until we've used all tiles
    const remainingTiles = [...data]

    while (remainingTiles.length > 0 && currentY < containerHeight) {
      // Determine row height - more consistent but still dynamic
      const rowHeight = Math.floor(Math.random() * 60) + 140 // Between 140-200px

      // Fill this row with tiles
      let currentX = 0
      const rowTiles: any[] = []

      // Determine how many tiles should be in this row (2-4)
      const tilesInRow = Math.floor(Math.random() * 3) + 2 // 2-4 tiles per row
      const approxTileWidth = containerWidth / tilesInRow

      for (let i = 0; i < tilesInRow; i++) {
        if (remainingTiles.length === 0) break

        // Get the next tile
        const tileContent = remainingTiles.shift()
        if (!tileContent) break

        // Calculate tile width - slightly varied but mostly consistent
        const variationPercent = Math.random() * 0.3 + 0.85 // 85%-115% of average width
        const tileWidth = Math.floor(approxTileWidth * variationPercent)

        // Ensure the last tile in a row fills the remaining space
        const isLastInRow = i === tilesInRow - 1 || remainingTiles.length === 0
        const finalWidth = isLastInRow ? containerWidth - currentX : Math.min(tileWidth, containerWidth - currentX)

        // Add tile
        rowTiles.push({
          id: tileContent.id,
          x: currentX,
          y: currentY,
          width: finalWidth,
          height: rowHeight,
          content: tileContent,
        })

        currentX += finalWidth
      }

      // Add row tiles to placed tiles
      placedTiles.push(...rowTiles)

      // Move to next row with a small gap
      currentY += rowHeight + Math.floor(Math.random() * 3) // 0-2px gap between rows
    }

    // Find gaps between tiles
    const foundGaps: any[] = []

    // More accurate gap detection
    for (let y = 0; y < containerHeight; y += 10) {
      for (let x = 0; x < containerWidth; x += 10) {
        const point = { x, y }

        // Check if this point is inside any tile
        const isInTile = placedTiles.some(
          (tile) =>
            point.x >= tile.x && point.x < tile.x + tile.width && point.y >= tile.y && point.y < tile.y + tile.height,
        )

        if (!isInTile && y < containerHeight) {
          // Find maximum gap size from this point
          let maxWidth = 10
          let maxHeight = 10

          // Expand width
          let canExpandWidth = true
          while (canExpandWidth && x + maxWidth < containerWidth) {
            const isWidthBlocked = placedTiles.some(
              (tile) =>
                x + maxWidth >= tile.x && x + maxWidth < tile.x + tile.width && y >= tile.y && y < tile.y + tile.height,
            )

            if (isWidthBlocked) {
              canExpandWidth = false
            } else {
              maxWidth += 10
            }
          }

          // Expand height
          let canExpandHeight = true
          while (canExpandHeight && y + maxHeight < containerHeight) {
            const isHeightBlocked = placedTiles.some(
              (tile) =>
                x >= tile.x &&
                x < tile.x + tile.width &&
                y + maxHeight >= tile.y &&
                y + maxHeight < tile.y + tile.height,
            )

            if (isHeightBlocked) {
              canExpandHeight = false
            } else {
              maxHeight += 10
            }
          }

          // Only add significant gaps
          if (maxWidth >= 40 && maxHeight >= 40) {
            // Check if this gap overlaps with existing gaps
            const overlapsExisting = foundGaps.some(
              (gap) => x < gap.x + gap.width && x + maxWidth > gap.x && y < gap.y + gap.height && y + maxHeight > gap.y,
            )

            if (!overlapsExisting) {
              foundGaps.push({
                id: `gap-${foundGaps.length}`,
                x,
                y,
                width: maxWidth,
                height: maxHeight,
              })

              // Skip ahead to avoid creating many small overlapping gaps
              x += maxWidth
            }
          }
        }
      }
    }

    setTiles(placedTiles)
    setGaps(foundGaps)
  }, [data, width, height])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gray-50">
      {tiles.map((tile) => (
        <Tile key={tile.id} x={tile.x} y={tile.y} width={tile.width} height={tile.height} content={tile.content} />
      ))}

      {gaps.map((gap) => (
        <GapFiller key={gap.id} x={gap.x} y={gap.y} width={gap.width} height={gap.height} />
      ))}
    </div>
  )
}

