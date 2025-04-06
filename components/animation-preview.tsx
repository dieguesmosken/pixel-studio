"use client"

import { useRef, useEffect } from "react"

interface AnimationPreviewProps {
  frames: any[]
  isPlaying: boolean
  width: number
  height: number
}

export function AnimationPreview({ frames, isPlaying, width, height }: AnimationPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const currentFrameIndexRef = useRef(0)
  const lastFrameTimeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw checkerboard pattern for transparency
    const squareSize = Math.max(2, width / 16)
    for (let y = 0; y < canvas.height; y += squareSize) {
      for (let x = 0; x < canvas.width; x += squareSize) {
        const isEven = (Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0
        ctx.fillStyle = isEven ? "#FFFFFF" : "#EEEEEE"
        ctx.fillRect(x, y, squareSize, squareSize)
      }
    }

    // Draw first frame if available
    if (frames.length > 0 && frames[0].data) {
      const img = new Image()
      img.crossOrigin = "anonymous" // Prevent CORS issues
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      img.src = frames[0].data
    }

    // Animation loop
    const animate = (timestamp: number) => {
      if (!isPlaying) return

      const currentFrame = frames[currentFrameIndexRef.current]
      if (!currentFrame || !currentFrame.data) return

      const elapsed = timestamp - lastFrameTimeRef.current

      if (elapsed > currentFrame.delay) {
        lastFrameTimeRef.current = timestamp

        // Move to next frame
        currentFrameIndexRef.current = (currentFrameIndexRef.current + 1) % frames.length

        const nextFrame = frames[currentFrameIndexRef.current]
        if (nextFrame && nextFrame.data) {
          const img = new Image()
          img.crossOrigin = "anonymous" // Prevent CORS issues
          img.onload = () => {
            if (!ctx) return

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Redraw checkerboard pattern
            for (let y = 0; y < canvas.height; y += squareSize) {
              for (let x = 0; x < canvas.width; x += squareSize) {
                const isEven = (Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0
                ctx.fillStyle = isEven ? "#FFFFFF" : "#EEEEEE"
                ctx.fillRect(x, y, squareSize, squareSize)
              }
            }

            // Draw the frame
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          }
          img.src = nextFrame.data
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isPlaying) {
      lastFrameTimeRef.current = performance.now()
      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [frames, isPlaying, width, height])

  return <canvas ref={canvasRef} className="w-full h-auto" />
}

