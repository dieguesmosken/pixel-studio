"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"

interface CanvasEditorProps {
  width: number
  height: number
  pixelSize: number
  activeColor: string
  activeTool: string
  currentFrame: number
  frames: any[]
  setFrames: (frames: any[]) => void
  onColorPick?: (color: string) => void
  brushSize?: number
  layers?: any[]
  activeLayer?: number
  onClearCanvas?: () => void
}

export function CanvasEditor({
  width,
  height,
  pixelSize,
  activeColor,
  activeTool,
  currentFrame,
  frames,
  setFrames,
  onColorPick,
  brushSize,
  layers,
  activeLayer,
}: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null)

  // Initialize canvas and load frame data
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    // Set canvas size
    canvas.width = width * pixelSize
    canvas.height = height * pixelSize

    // Clear canvas with transparency
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw checkerboard pattern for transparency
    drawCheckerboard(ctx, canvas.width, canvas.height)

    // Draw grid
    drawGrid(ctx, width, height, pixelSize)

    // Load frame data if available
    loadFrameData(ctx, currentFrame)
  }, [width, height, pixelSize, currentFrame, frames, layers])

  // Draw checkerboard pattern for transparency
  const drawCheckerboard = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    const squareSize = Math.max(4, pixelSize / 4)
    for (let y = 0; y < canvasHeight; y += squareSize) {
      for (let x = 0; x < canvasWidth; x += squareSize) {
        const isEven = (Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0
        ctx.fillStyle = isEven ? "#FFFFFF" : "#EEEEEE"
        ctx.fillRect(x, y, squareSize, squareSize)
      }
    }
  }

  // Draw grid lines
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, pixelSize: number) => {
    ctx.strokeStyle = "#CCCCCC"
    ctx.lineWidth = 1

    for (let x = 0; x <= width; x++) {
      ctx.beginPath()
      ctx.moveTo(x * pixelSize, 0)
      ctx.lineTo(x * pixelSize, height * pixelSize)
      ctx.stroke()
    }

    for (let y = 0; y <= height; y++) {
      ctx.beginPath()
      ctx.moveTo(0, y * pixelSize)
      ctx.lineTo(width * pixelSize, y * pixelSize)
      ctx.stroke()
    }
  }

  // Add layer support to the loadFrameData function
  const loadFrameData = (ctx: CanvasRenderingContext2D, frameId: number) => {
    // Clear canvas first
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Redraw checkerboard
    drawCheckerboard(ctx, ctx.canvas.width, ctx.canvas.height)

    // If we have layers, draw each visible layer
    if (layers && layers.length > 0) {
      // Find the current frame data
      const currentFrameData = frames.find((f) => f.id === frameId)

      if (currentFrameData && currentFrameData.data) {
        // Draw the base frame
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          ctx.drawImage(img, 0, 0)

          // Redraw grid
          drawGrid(ctx, width, height, pixelSize)
        }
        img.src = currentFrameData.data
      }
    } else {
      // Legacy mode - just draw the frame data
      const currentFrameData = frames.find((f) => f.id === frameId)
      if (currentFrameData && currentFrameData.data) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          ctx.drawImage(img, 0, 0)

          // Redraw grid
          drawGrid(ctx, width, height, pixelSize)
        }
        img.src = currentFrameData.data
      }
    }
  }

  // Update saveCanvasState to support layers
  const saveCanvasState = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataURL = canvas.toDataURL()

    if (layers && layers.length > 0 && activeLayer) {
      // Update the active layer data
      const updatedLayers = layers.map((layer) => (layer.id === activeLayer ? { ...layer, data: dataURL } : layer))

      // TODO: In a real implementation, you would update the layer data in the parent component
      console.log("Updated layer data", updatedLayers)
    }

    // Update the frame data
    setFrames(frames.map((frame) => (frame.id === currentFrame ? { ...frame, data: dataURL } : frame)))
  }

  // Get pixel coordinates from mouse position
  const getPixelCoords = (x: number, y: number) => {
    return {
      gridX: Math.floor(x / pixelSize),
      gridY: Math.floor(y / pixelSize),
    }
  }

  // Fix the drawPixel function to properly handle pixel coordinates and drawing
  const drawPixel = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    // Convert mouse coordinates to grid coordinates
    const { gridX, gridY } = getPixelCoords(x, y)

    // Make sure we're within bounds
    if (gridX < 0 || gridX >= width || gridY < 0 || gridY >= height) return

    // For the eyedropper tool, we need to sample before clearing
    if (activeTool === "eyedropper") {
      // Get the color at the clicked position
      const imageData = ctx.getImageData(gridX * pixelSize + 1, gridY * pixelSize + 1, 1, 1)
      const [r, g, b, a] = imageData.data

      // Only pick the color if it's not from the checkerboard
      if (a > 0) {
        // Convert to rgba or hex format
        const pickedColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`
        console.log("Picked color:", pickedColor)
        if (onColorPick) {
          onColorPick(pickedColor)
        }
      }
      return { gridX, gridY }
    }

    // Get brush size (default to 1 if not provided)
    const size = brushSize || 1

    // For brush sizes > 1, draw multiple pixels
    for (let offsetY = 0; offsetY < size; offsetY++) {
      for (let offsetX = 0; offsetX < size; offsetX++) {
        const currentX = gridX + offsetX
        const currentY = gridY + offsetY

        // Skip if out of bounds
        if (currentX >= width || currentY >= height) continue

        // Clear the pixel area first (important for transparency)
        ctx.clearRect(currentX * pixelSize, currentY * pixelSize, pixelSize, pixelSize)

        // Redraw the checkerboard pattern for this pixel (for transparency visualization)
        const squareSize = Math.max(4, pixelSize / 4)
        for (let py = currentY * pixelSize; py < (currentY + 1) * pixelSize; py += squareSize) {
          for (let px = currentX * pixelSize; px < (currentX + 1) * pixelSize; px += squareSize) {
            const isEven = (Math.floor(px / squareSize) + Math.floor(py / squareSize)) % 2 === 0
            ctx.fillStyle = isEven ? "#FFFFFF" : "#EEEEEE"
            ctx.fillRect(px, py, squareSize, squareSize)
          }
        }

        if (activeTool === "pencil" || activeTool === "brush") {
          // For pencil/brush, fill with the active color
          ctx.fillStyle = activeColor
          ctx.fillRect(currentX * pixelSize, currentY * pixelSize, pixelSize, pixelSize)
        } else if (activeTool === "eraser") {
          // For eraser, we just leave the checkerboard visible (already done above)
        }
      }
    }

    return { gridX, gridY }
  }

  // Fix the handleMouseDown function to properly handle mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setStartPos({ x, y })

    // Immediately draw at the clicked position
    drawPixel(x, y)
  }

  // Fix the handleMouseMove function for smooth drawing
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !startPos) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (activeTool === "pencil" || activeTool === "eraser" || activeTool === "brush") {
      // For smooth drawing, draw a line between the last position and current position
      const { gridX: lastX, gridY: lastY } = getPixelCoords(startPos.x, startPos.y)
      const { gridX: currentX, gridY: currentY } = getPixelCoords(x, y)

      if (lastX !== currentX || lastY !== currentY) {
        // Use Bresenham's line algorithm for smooth drawing
        const points = bresenhamLine(lastX, lastY, currentX, currentY)

        for (const point of points) {
          drawPixel(point.x * pixelSize + pixelSize / 2, point.y * pixelSize + pixelSize / 2)
        }

        setStartPos({ x, y })
      }
    }
  }

  // Add Bresenham's line algorithm for smooth drawing
  const bresenhamLine = (x0: number, y0: number, x1: number, y1: number) => {
    const points = []
    const dx = Math.abs(x1 - x0)
    const dy = Math.abs(y1 - y0)
    const sx = x0 < x1 ? 1 : -1
    const sy = y0 < y1 ? 1 : -1
    let err = dx - dy

    while (true) {
      points.push({ x: x0, y: y0 })

      if (x0 === x1 && y0 === y1) break

      const e2 = 2 * err
      if (e2 > -dy) {
        err -= dy
        x0 += sx
      }
      if (e2 < dx) {
        err += dx
        y0 += sy
      }
    }

    return points
  }

  // Fix the handleMouseUp function to properly save the canvas state
  const drawRectangle = (x1: number, y1: number, x2: number, y2: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const { gridX: startX, gridY: startY } = getPixelCoords(x1, y1)
    const { gridX: endX, gridY: endY } = getPixelCoords(x2, y2)

    const widthInPixels = Math.abs(endX - startX) * pixelSize
    const heightInPixels = Math.abs(endY - startY) * pixelSize

    const x = Math.min(startX, endX) * pixelSize
    const y = Math.min(startY, endY) * pixelSize

    ctx.fillStyle = activeColor
    ctx.fillRect(x, y, widthInPixels, heightInPixels)
  }

  const drawCircle = (x1: number, y1: number, x2: number, y2: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const { gridX: startX, gridY: startY } = getPixelCoords(x1, y1)
    const { gridX: endX, gridY: endY } = getPixelCoords(x2, y2)

    const radiusX = Math.abs(endX - startX) * pixelSize
    const radiusY = Math.abs(endY - startY) * pixelSize

    const centerX = Math.min(startX, endX) * pixelSize + radiusX
    const centerY = Math.min(startY, endY) * pixelSize + radiusY

    ctx.beginPath()
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
    ctx.fillStyle = activeColor
    ctx.fill()
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDrawing) {
      setIsDrawing(false)
      setStartPos(null)
      return
    }

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) {
      setIsDrawing(false)
      setStartPos(null)
      return
    }

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (activeTool === "rectangle" && startPos) {
      drawRectangle(startPos.x, startPos.y, x, y)
    } else if (activeTool === "circle" && startPos) {
      drawCircle(startPos.x, startPos.y, x, y)
    }

    // Always save the canvas state when mouse is released
    saveCanvasState()

    setIsDrawing(false)
    setStartPos(null)
  }

  // Implement a proper flood fill algorithm
  const floodFill = (startX: number, startY: number, targetColor: Uint8ClampedArray, fillColor: string) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    // Parse fill color to RGBA
    let fillR, fillG, fillB, fillA
    if (fillColor.startsWith("#")) {
      // Convert hex to rgba
      const hex = fillColor.slice(1)
      fillR = Number.parseInt(hex.slice(0, 2), 16)
      fillG = Number.parseInt(hex.slice(2, 4), 16)
      fillB = Number.parseInt(hex.slice(4, 6), 16)
      fillA = 255
    } else if (fillColor.startsWith("rgba")) {
      // Parse rgba format
      const rgba = fillColor.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?$$/)
      if (!rgba) return
      fillR = Number.parseInt(rgba[1])
      fillG = Number.parseInt(rgba[2])
      fillB = Number.parseInt(rgba[3])
      fillA = rgba[4] ? Math.round(Number.parseFloat(rgba[4]) * 255) : 255
    } else {
      return
    }

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Target color values
    const targetR = targetColor[0]
    const targetG = targetColor[1]
    const targetB = targetColor[2]
    const targetA = targetColor[3]

    // Check if fill color is the same as target color
    if (fillR === targetR && fillG === targetG && fillB === targetB && fillA === targetA) {
      return
    }

    // Stack for flood fill algorithm (x, y coordinates)
    const stack: [number, number][] = [[startX, startY]]
    const pixelWidth = canvas.width
    const pixelHeight = canvas.height

    // Helper function to check if a pixel matches the target color
    const matchesTargetColor = (x: number, y: number) => {
      const index = (y * pixelWidth + x) * 4
      return (
        data[index] === targetR &&
        data[index + 1] === targetG &&
        data[index + 2] === targetB &&
        data[index + 3] === targetA
      )
    }

    // Helper function to set a pixel to the fill color
    const setPixelColor = (x: number, y: number) => {
      const index = (y * pixelWidth + x) * 4
      data[index] = fillR
      data[index + 1] = fillG
      data[index + 2] = fillB
      data[index + 3] = fillA
    }

    // Perform flood fill
    while (stack.length > 0) {
      const [x, y] = stack.pop()!

      // Skip if out of bounds
      if (x < 0 || x >= pixelWidth || y < 0 || y >= pixelHeight) {
        continue
      }

      // Skip if pixel doesn't match target color
      if (!matchesTargetColor(x, y)) {
        continue
      }

      // Set pixel to fill color
      setPixelColor(x, y)

      // Add neighboring pixels to stack
      stack.push([x + 1, y])
      stack.push([x - 1, y])
      stack.push([x, y + 1])
      stack.push([x, y - 1])
    }

    // Update canvas with filled image data
    ctx.putImageData(imageData, 0, 0)

    // Redraw grid
    drawGrid(ctx, width, height, pixelSize)
  }

  const handleFill = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const { gridX, gridY } = getPixelCoords(x, y)

    // Make sure we're within bounds
    if (gridX < 0 || gridX >= width || gridY < 0 || gridY >= height) return

    // Get the color at the target position
    const pixelX = gridX * pixelSize + Math.floor(pixelSize / 2)
    const pixelY = gridY * pixelSize + Math.floor(pixelSize / 2)
    const imageData = ctx.getImageData(pixelX, pixelY, 1, 1)
    const targetColor = imageData.data

    // Perform flood fill
    floodFill(pixelX, pixelY, targetColor, activeColor)

    // Save canvas state after fill
    saveCanvasState()
  }

  // Implement clear canvas function
  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Redraw checkerboard pattern
    drawCheckerboard(ctx, canvas.width, canvas.height)

    // Redraw grid
    drawGrid(ctx, width, height, pixelSize)

    // Save the cleared state
    saveCanvasState()
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (activeTool === "fill") {
      handleFill(x, y)
    }
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleCanvasClick}
      className="cursor-crosshair"
      aria-label="Pixel Art Canvas"
      role="img"
    />
  )
}

