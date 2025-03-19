"use client"

import { useEffect, useState, useRef } from "react"
import Tile from "./tile"
import GapFiller from "./gap-filler"
import NavBar from "./nav-bar"
import type { PortfolioItem } from "@/lib/types"
import { useWindowSize } from "@/hooks/use-window-size"

// LaTeX Resume Component
const Resume = () => {
  return (
    <div className="bg-white p-8 mx-auto max-w-4xl shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Tejas Kothari</h1>
      
      <div className="mb-6 text-center">
        <p>San Francisco, CA • contact@example.com • (123) 456-7890</p>
        <p>linkedin.com/in/tejaskothari • github.com/tejaskothari</p>
      </div>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 border-b pb-1">Summary</h2>
        <p>Full Stack Developer with 5+ years of experience building web applications using React, Node.js, and TypeScript. Currently working at Observe.AI, developing innovative solutions for contact center intelligence.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 border-b pb-1">Experience</h2>
        
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Observe.AI</h3>
            <span>2021 - Present</span>
          </div>
          <p className="font-italic">Senior Full Stack Developer</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Developed and maintained modern web applications using React and TypeScript</li>
            <li>Implemented RESTful APIs using Node.js and Express</li>
            <li>Improved application performance by 40% through code optimization</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Previous Company</h3>
            <span>2018 - 2021</span>
          </div>
          <p className="font-italic">Full Stack Developer</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Designed and developed responsive web applications</li>
            <li>Collaborated with cross-functional teams to define product requirements</li>
            <li>Implemented CI/CD pipeline using GitHub Actions</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 border-b pb-1">Skills</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold">Languages</h3>
            <p>JavaScript, TypeScript, Python, Go</p>
          </div>
          <div>
            <h3 className="font-bold">Frameworks</h3>
            <p>React, Next.js, Express, Node.js</p>
          </div>
          <div>
            <h3 className="font-bold">Databases</h3>
            <p>MongoDB, PostgreSQL, Redis</p>
          </div>
          <div>
            <h3 className="font-bold">Cloud & DevOps</h3>
            <p>AWS, Docker, Kubernetes, CI/CD</p>
          </div>
        </div>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 border-b pb-1">Education</h2>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">BS in Computer Science</h3>
          <span>2014 - 2018</span>
        </div>
        <p>University of Technology</p>
      </section>
    </div>
  )
}

export default function TileGrid({ data }: { data: PortfolioItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tiles, setTiles] = useState<any[]>([])
  const [gaps, setGaps] = useState<any[]>([])
  const { width, height } = useWindowSize()
  const [isResumeMode, setIsResumeMode] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<number | null>(null)
  const animatedTiles = useRef<any[]>([])

  // Toggle between portfolio and resume modes
  const toggleResumeMode = () => {
    if (isResumeMode) {
      setIsResumeMode(false)
      // Reset animation when switching back to portfolio
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      // Recreate the tile grid
      createTileGrid()
    } else {
      // Start animation before showing resume
      startFloatingAnimation()
    }
  }

  // Create the initial tile grid
  const createTileGrid = () => {
    if (!containerRef.current) return

    // Reset tiles and gaps
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
          // Add initial velocity for animation
          vx: 0,
          vy: 0,
        })

        currentX += finalWidth
      }

      // Add row tiles to placed tiles
      placedTiles.push(...rowTiles)

      // Move to next row with a small gap
      currentY += rowHeight + Math.floor(Math.random() * 3) // 0-2px gap between rows
    }

    // Find gaps between tiles
    findGaps(placedTiles, containerWidth, containerHeight)

    // Set the tiles
    setTiles(placedTiles)
  }

  // Find gaps between tiles
  const findGaps = (placedTiles: any[], containerWidth: number, containerHeight: number) => {
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

    setGaps(foundGaps)
  }

  // Start the floating animation
  const startFloatingAnimation = () => {
    setIsAnimating(true)
    animatedTiles.current = tiles.map(tile => ({
      ...tile,
      vx: (Math.random() - 0.5) * 2, // Random x velocity between -1 and 1
      vy: (Math.random() - 0.5) * 2, // Random y velocity between -1 and 1
    }))
    
    // Start animation loop
    animateFloating()
  }

  // Animate the floating tiles
  const animateFloating = () => {
    if (!containerRef.current) return
    
    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.offsetHeight
    
    // Update positions
    const updatedTiles = animatedTiles.current.map(tile => {
      // Apply velocity
      let newX = tile.x + tile.vx
      let newY = tile.y + tile.vy
      let newVx = tile.vx
      let newVy = tile.vy
      
      // Bounce off edges
      if (newX < 0 || newX + tile.width > containerWidth) {
        newVx = -newVx * 0.8 // Dampen the velocity
        newX = newX < 0 ? 0 : containerWidth - tile.width
      }
      
      if (newY < 0 || newY + tile.height > containerHeight) {
        newVy = -newVy * 0.8 // Dampen the velocity
        newY = newY < 0 ? 0 : containerHeight - tile.height
      }
      
      // Apply a small amount of randomness to create more natural movement
      newVx += (Math.random() - 0.5) * 0.1
      newVy += (Math.random() - 0.5) * 0.1
      
      // Add gravity effect - tiles slowly move toward the center
      const centerX = containerWidth / 2
      const centerY = containerHeight / 2
      newVx += (centerX - (newX + tile.width / 2)) * 0.0001
      newVy += (centerY - (newY + tile.height / 2)) * 0.0001
      
      // Dampen velocity over time
      newVx *= 0.99
      newVy *= 0.99
      
      return {
        ...tile,
        x: newX,
        y: newY,
        vx: newVx,
        vy: newVy,
      }
    })
    
    animatedTiles.current = updatedTiles
    setTiles([...updatedTiles])
    
    // Continue animation or transition to resume
    const totalVelocity = updatedTiles.reduce((sum, tile) => sum + Math.abs(tile.vx) + Math.abs(tile.vy), 0)
    
    if (totalVelocity < 1) {
      // Almost stopped - show resume
      setIsAnimating(false)
      setIsResumeMode(true)
      cancelAnimationFrame(animationRef.current!)
      animationRef.current = null
    } else {
      // Continue animation
      animationRef.current = requestAnimationFrame(animateFloating)
    }
  }

  // Initialize tiles on mount and when window size changes
  useEffect(() => {
    if (isResumeMode || isAnimating) return
    createTileGrid()
  }, [data, width, height, isResumeMode, isAnimating])

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <>
      <NavBar onResumeToggle={toggleResumeMode} isResumeMode={isResumeMode} />
      
      <div className="pt-16"> {/* Add padding-top to account for navbar */}
        {isResumeMode ? (
          <div className="p-8 bg-gray-100 min-h-screen">
            <Resume />
          </div>
        ) : (
          <div 
            ref={containerRef} 
            className="relative w-full min-h-screen overflow-y-auto bg-gray-50"
            style={{ transition: isAnimating ? 'none' : 'all 0.3s ease-in-out' }}
          >
            {tiles.map((tile) => (
              <Tile 
                key={tile.id} 
                x={tile.x} 
                y={tile.y} 
                width={tile.width} 
                height={tile.height} 
                content={tile.content}
                style={{ 
                  transition: isAnimating ? 'none' : 'all 0.3s ease-in-out',
                  animation: isAnimating ? 'pulse 2s infinite' : 'none'
                }}
              />
            ))}

            {!isAnimating && gaps.map((gap) => (
              <GapFiller key={gap.id} x={gap.x} y={gap.y} width={gap.width} height={gap.height} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}