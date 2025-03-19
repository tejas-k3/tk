"use client"

import { useEffect, useState, useRef } from "react"
import Tile from "./tile"
import GapFiller from "./gap-filler"
import NavBar from "./navbar"
import Resume from "./resume"
import type { PortfolioItem } from "@/lib/types"
import { useWindowSize } from "@/hooks/use-window-size"

export default function TileGrid({ data }: { data: PortfolioItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tiles, setTiles] = useState<any[]>([])
  const [gaps, setGaps] = useState<any[]>([])
  const { width, height } = useWindowSize()
  
  // States for animation and resume mode
  const [isResumeMode, setIsResumeMode] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animatedTiles, setAnimatedTiles] = useState<any[]>([])
  const animationRef = useRef<number | null>(null)

  // Normal tile layout algorithm
  useEffect(() => {
    if (!containerRef.current || isAnimating) return

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
  }, [data, width, height, isAnimating])

  // Generate resume positions for tiles
  const generateResumePositions = () => {
    if (!containerRef.current) return []
    
    const containerWidth = containerRef.current.clientWidth
    const containerHeight = window.innerHeight
    const resumeWidth = Math.min(containerWidth * 0.8, 1024) // Max width of 1024px
    const resumeLeft = (containerWidth - resumeWidth) / 2
    
    // Group tiles into sections
    const sections = [
      { title: "Header", tiles: data.slice(0, 3), height: 120 }, // Name, Current job, Passion
      { title: "Skills", tiles: data.slice(3, 7), height: 180 }, // Skills, Experience, Education, Interests
      { title: "Experience", tiles: data.slice(7, 11), height: 200 }, // Projects, Contact, Hobbies, Location
      { title: "Details", tiles: data.slice(11, 15), height: 180 }, // Languages, Frameworks, Databases, Cloud
      { title: "More", tiles: data.slice(15), height: 160 } // DevOps, Design, Testing, Mobile, Open Source
    ]
    
    let currentY = 50 // Starting Y position
    const positions: any[] = []
    
    sections.forEach(section => {
      const tileHeight = section.height
      const tileWidth = resumeWidth / section.tiles.length
      
      section.tiles.forEach((tile, index) => {
        positions.push({
          id: tile.id,
          x: resumeLeft + (index * tileWidth),
          y: currentY,
          width: tileWidth,
          height: tileHeight,
          content: tile,
          targetOpacity: 1,
          section: section.title
        })
      })
      
      currentY += tileHeight + 20 // Add spacing between sections
    })
    
    return positions
  }
  
  // Toggle between portfolio and resume view with animation
  const handleToggleResume = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    
    if (isResumeMode) {
      // Animate from resume back to portfolio
      const resumePositions = animatedTiles.length > 0 ? animatedTiles : generateResumePositions()
      const targetPositions = [...tiles]
      
      // Create animated tiles with start positions (resume) and target positions (portfolio)
      const animatedTilesCopy = resumePositions.map(resumeTile => {
        const targetTile = targetPositions.find(t => t.id === resumeTile.id) || 
                          { x: Math.random() * width, y: Math.random() * height, width: 200, height: 150 }
        
        return {
          ...resumeTile,
          targetX: targetTile.x,
          targetY: targetTile.y,
          targetWidth: targetTile.width,
          targetHeight: targetTile.height,
          animProgress: 0
        }
      })
      
      setAnimatedTiles(animatedTilesCopy)
      
      // Start animation
      animateToPortfolio(animatedTilesCopy)
    } else {
      // Animate from portfolio to resume
      const resumePositions = generateResumePositions()
      
      // Create animated tiles with start positions (portfolio) and target positions (resume)
      const animatedTilesCopy = tiles.map(tile => {
        const targetTile = resumePositions.find(t => t.id === tile.id) || 
                          { x: width/2, y: height/2, width: 0, height: 0, targetOpacity: 0 }
        
        return {
          ...tile,
          targetX: targetTile.x,
          targetY: targetTile.y,
          targetWidth: targetTile.width,
          targetHeight: targetTile.height,
          targetOpacity: targetTile.targetOpacity || 1,
          section: targetTile.section,
          animProgress: 0
        }
      })
      
      setAnimatedTiles(animatedTilesCopy)
      
      // Start animation
      animateToResume(animatedTilesCopy)
    }
  }
  
  // Animation function for tiles moving to resume positions
  const animateToResume = (initialTiles: any[]) => {
    let animProgress = 0
    const animDuration = 60 // Animation frames (60 = 1 second at 60fps)
    let animTiles = [...initialTiles]
    
    const animate = () => {
      animProgress += 1
      
      if (animProgress >= animDuration) {
        // Animation complete
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
        setIsAnimating(false)
        setIsResumeMode(true)
        return
      }
      
      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t)
      const progress = easeOutQuad(animProgress / animDuration)
      
      // Update positions with easing
      animTiles = animTiles.map(tile => {
        const startX = tile.x
        const startY = tile.y
        const startWidth = tile.width
        const startHeight = tile.height
        
        const x = startX + (tile.targetX - startX) * progress
        const y = startY + (tile.targetY - startY) * progress
        const width = startWidth + (tile.targetWidth - startWidth) * progress
        const height = startHeight + (tile.targetHeight - startHeight) * progress
        const opacity = 1 - (1 - (tile.targetOpacity || 1)) * progress
        
        // Add a slight delay based on section for cascade effect
        const sectionDelay = {
          "Header": 0,
          "Skills": 0.1,
          "Experience": 0.2,
          "Details": 0.3,
          "More": 0.4
        }
        const delay = sectionDelay[tile.section as keyof typeof sectionDelay] || 0
        
        // Apply delay to progress
        const delayedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)))
        
        // Only animate if we're past the delay
        const finalX = progress <= delay ? startX : startX + (tile.targetX - startX) * delayedProgress
        const finalY = progress <= delay ? startY : startY + (tile.targetY - startY) * delayedProgress
        
        return {
          ...tile,
          x: finalX,
          y: finalY,
          width,
          height,
          opacity,
          animProgress: progress
        }
      })
      
      setAnimatedTiles([...animTiles])
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }
  
  // Animation function for tiles moving back to portfolio positions
  const animateToPortfolio = (initialTiles: any[]) => {
    let animProgress = 0
    const animDuration = 60 // Animation frames (60 = 1 second at 60fps)
    let animTiles = [...initialTiles]
    
    const animate = () => {
      animProgress += 1
      
      if (animProgress >= animDuration) {
        // Animation complete
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
        setIsAnimating(false)
        setIsResumeMode(false)
        return
      }
      
      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t)
      const progress = easeOutQuad(animProgress / animDuration)
      
      // Update positions with easing
      animTiles = animTiles.map(tile => {
        const startX = tile.x
        const startY = tile.y
        const startWidth = tile.width
        const startHeight = tile.height
        
        const x = startX + (tile.targetX - startX) * progress
        const y = startY + (tile.targetY - startY) * progress
        const width = startWidth + (tile.targetWidth - startWidth) * progress
        const height = startHeight + (tile.targetHeight - startHeight) * progress
        
        // Apply a slight random offset for a more dynamic feel
        const randomOffsetX = Math.sin(animProgress * 0.1 + tile.id) * 5 * (1 - progress)
        const randomOffsetY = Math.cos(animProgress * 0.1 + tile.id) * 5 * (1 - progress)
        
        return {
          ...tile,
          x: x + randomOffsetX,
          y: y + randomOffsetY,
          width,
          height,
          opacity: 1,
          animProgress: progress
        }
      })
      
      setAnimatedTiles([...animTiles])
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }
  
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
      <NavBar onToggleResume={handleToggleResume} isResumeMode={isResumeMode} />
      
      <div ref={containerRef} className="relative w-full min-h-screen overflow-y-auto bg-gray-50 pt-16">
        {!isAnimating && !isResumeMode && tiles.map((tile) => (
          <Tile 
            key={tile.id} 
            x={tile.x} 
            y={tile.y} 
            width={tile.width} 
            height={tile.height} 
            content={tile.content} 
          />
        ))}
        
        {isAnimating && animatedTiles.map((tile) => (
          <Tile 
            key={tile.id} 
            x={tile.x} 
            y={tile.y} 
            width={tile.width} 
            height={tile.height} 
            content={tile.content}
            opacity={tile.opacity}
            isAnimating={true}
          />
        ))}
        
        {!isAnimating && !isResumeMode && gaps.map((gap) => (
          <GapFiller key={gap.id} x={gap.x} y={gap.y} width={gap.width} height={gap.height} />
        ))}
        
        {!isAnimating && isResumeMode && (
          <div className="pt-8">
            <Resume />
          </div>
        )}
      </div>
    </>
  )
}