"use client"

interface GapFillerProps {
  x: number
  y: number
  width: number
  height: number
}

const emojis = ["✨", "🚀", "💻", "🎨", "🔥", "🌟", "💡", "🎯", "🌈", "🎮", "🧠", "🌱", "🏆", "🔍", "⚡"]

export default function GapFiller({ x, y, width, height }: GapFillerProps) {
  // Generate random color and emoji
  const hue = Math.floor(Math.random() * 360)
  const backgroundColor = `hsl(${hue}, 85%, 90%)`
  const emoji = emojis[Math.floor(Math.random() * emojis.length)]

  // Scale emoji size based on gap size
  const minDimension = Math.min(width, height)
  const emojiSize = Math.max(Math.min(minDimension / 2, 72), 24)

  return (
    <div
      className="absolute flex items-center justify-center overflow-hidden rounded-lg border border-gray-100"
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor,
      }}
    >
      <span style={{ fontSize: `${emojiSize}px` }}>{emoji}</span>
    </div>
  )
}

