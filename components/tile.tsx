"use client"
import { useEffect, useRef, useState } from "react"
import type { PortfolioItem } from "@/lib/types"

interface TileProps {
  x: number
  y: number
  width: number
  height: number
  content: PortfolioItem
  rotation?: number
  opacity?: number
  isAnimating?: boolean
}

// Define a set of pleasant, accessible color combinations
const colorPalettes = [
  { bg: "hsl(210, 70%, 85%)", text: "#000000" },
  { bg: "hsl(140, 70%, 85%)", text: "#000000" },
  { bg: "hsl(340, 60%, 85%)", text: "#000000" },
  { bg: "hsl(40, 85%, 85%)", text: "#000000" },
  { bg: "hsl(280, 60%, 80%)", text: "#000000" },
  { bg: "hsl(170, 70%, 85%)", text: "#000000" },
  { bg: "hsl(320, 60%, 75%)", text: "#000000" },
  { bg: "hsl(200, 70%, 85%)", text: "#000000" },
  { bg: "hsl(60, 80%, 85%)", text: "#000000" },
  { bg: "hsl(100, 70%, 85%)", text: "#000000" },
  { bg: "hsl(180, 70%, 85%)", text: "#000000" },
  { bg: "hsl(240, 50%, 80%)", text: "#000000" },
  { bg: "hsl(300, 50%, 75%)", text: "#ffffff" },
  { bg: "hsl(30, 80%, 85%)", text: "#000000" },
  { bg: "hsl(120, 60%, 75%)", text: "#000000" },
  { bg: "hsl(220, 65%, 75%)", text: "#000000" },
  { bg: "hsl(270, 50%, 70%)", text: "#ffffff" },
  { bg: "hsl(330, 60%, 75%)", text: "#000000" },
  { bg: "hsl(20, 70%, 85%)", text: "#000000" },
  { bg: "hsl(80, 70%, 85%)", text: "#000000" },
]

// Create a store of used colors to avoid repetition
const usedColorIndices = new Set()

// Function to get a random color palette
const getRandomColorPalette = (id: number) => {
  // Reset used colors if we've used all of them
  if (usedColorIndices.size >= colorPalettes.length) {
    usedColorIndices.clear()
  }
  
  // Try to get a random color that hasn't been used yet
  let randomIndex
  do {
    randomIndex = Math.floor(Math.random() * colorPalettes.length)
  } while (usedColorIndices.has(randomIndex))
  
  // Mark this color as used
  usedColorIndices.add(randomIndex)
  
  return colorPalettes[randomIndex]
}

export default function Tile({ x, y, width, height, content, rotation = 0, opacity = 1, isAnimating = false }: TileProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(24)
  const [colorPalette, setColorPalette] = useState(() => getRandomColorPalette(content.id))
  
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

  return (
    <div
      className={`absolute p-6 overflow-hidden rounded-lg shadow-md border border-gray-100 ${isAnimating ? 'transition-none' : 'transition-all duration-300 hover:shadow-lg'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: colorPalette.bg,
        transform: rotation ? `rotate(${rotation}deg)` : 'none',
        opacity: opacity,
        zIndex: isAnimating ? 10 : 1,
        transition: isAnimating ? 'none' : 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <div
        ref={textRef}
        className="w-full h-full flex flex-col justify-center items-center text-center"
        style={{ 
          fontSize: `${fontSize}px`,
          color: colorPalette.text,
          fontWeight: 500 // Make text slightly bolder
        }}
      >
        <h3 className="font-bold mb-2">{content.title}</h3>
        <p className="opacity-90">{content.description}</p>
      </div>
    </div>
  )
}