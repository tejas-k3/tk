"use client"

import { useEffect, useRef, useState } from "react"
import type { PortfolioItem } from "@/lib/types"

interface TileProps {
  x: number
  y: number
  width: number
  height: number
  content: PortfolioItem
}

export default function Tile({ x, y, width, height, content }: TileProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(24)

  // Dynamically adjust font size to fit content
  useEffect(() => {
    if (!textRef.current) return

    const fitText = () => {
      const textElement = textRef.current
      if (!textElement) return

      // Start with a larger base font size
      let currentSize = 24
      setFontSize(currentSize)

      // Check if content overflows and adjust
      while ((textElement.scrollHeight > height - 40 || textElement.scrollWidth > width - 40) && currentSize > 10) {
        currentSize -= 0.5
        setFontSize(currentSize)
      }
    }

    fitText()
  }, [width, height, content])

  // Generate a consistent color based on the content id
  const backgroundColor = content.color || `hsl(${(content.id * 37) % 360}, 70%, 85%)`

  return (
    <div
      className="absolute p-6 overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100"
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor,
      }}
    >
      <div
        ref={textRef}
        className="w-full h-full flex flex-col justify-center items-center text-center"
        style={{ fontSize: `${fontSize}px` }}
      >
        <h3 className="font-bold mb-2">{content.title}</h3>
        <p className="opacity-80">{content.description}</p>
      </div>
    </div>
  )
}

